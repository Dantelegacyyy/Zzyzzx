import { Router, Request, Response } from 'express';
import {
  signAuthToken,
  verifyAuthToken,
  getAuthCookieOptions,
  AUTH_COOKIE_NAME,
  UserSessionPayload,
} from './jwt.js';
import { extractTokenFromRequest, optionalAuthToken, requireAuthToken } from './session.js';

export const authRoutes = Router();

/**
 * GET /api/auth/me
 * Retrieves current authentication status from HttpOnly cookie.
 * If no valid token exists, returns authenticated: false.
 */
// In-memory registered user store for sessions across requests
interface StoredUser {
  subjectId: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  onboardingComplete: boolean;
  emailVerified: boolean;
  school?: string;
  password?: string;
  selectedCourses?: string[];
  customizedDashboardConfig?: any;
}

const USER_REGISTRY = new Map<string, StoredUser>([
  [
    'alex.returning@asu.edu',
    {
      subjectId: 'usr_returning_alex',
      email: 'alex.returning@asu.edu',
      name: 'Alex Rivera',
      role: 'STUDENT',
      onboardingComplete: true,
      emailVerified: true,
      school: 'Arizona State University — Tempe Campus',
      selectedCourses: ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
    },
  ],
  [
    'commander@cerebro.edu',
    {
      subjectId: 'usr_commander',
      email: 'commander@cerebro.edu',
      name: 'Commander Titus',
      role: 'ADMIN',
      onboardingComplete: true,
      emailVerified: true,
      school: 'Princeton University',
      selectedCourses: ['Advanced Operating Systems', 'Distributed Systems', 'Neural Network Architectures'],
    },
  ],
]);

/**
 * GET /api/auth/me
 * Returns verified session state. When no valid session exists, returns authenticated: false.
 */
authRoutes.get('/me', optionalAuthToken, (req: Request, res: Response) => {
  if (req.principal) {
    // If the registered user store has newer info, merge it
    const stored = USER_REGISTRY.get(req.principal.email.toLowerCase());
    const user = stored
      ? {
          ...req.principal,
          onboardingComplete: stored.onboardingComplete,
          name: stored.name || req.principal.name,
          school: stored.school || req.principal.school,
          selectedCourses: stored.selectedCourses || req.principal.selectedCourses,
          customizedDashboardConfig: stored.customizedDashboardConfig || req.principal.customizedDashboardConfig,
        }
      : req.principal;

    return res.json({
      authenticated: true,
      user,
    });
  }

  // No authenticated session present - return clean unauthenticated state
  return res.json({
    authenticated: false,
    user: null,
  });
});

/**
 * POST /api/auth/register
 * Creates a brand new student account with onboardingComplete = false
 */
authRoutes.post('/register', (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'EMAIL_REQUIRED', message: 'Email is required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const subjectId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const newUser: StoredUser = {
    subjectId,
    email: normalizedEmail,
    name: name?.trim() || normalizedEmail.split('@')[0] || 'Student',
    role: 'STUDENT',
    onboardingComplete: false,
    emailVerified: true,
    password: password || undefined,
  };

  USER_REGISTRY.set(normalizedEmail, newUser);

  const payload: UserSessionPayload = {
    subjectId: newUser.subjectId,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    onboardingComplete: false,
    emailVerified: true,
  };

  const token = signAuthToken(payload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    user: payload,
  });
});

/**
 * POST /api/auth/login
 * Creates/authenticates session and issues HttpOnly JWT cookie
 */
authRoutes.post('/login', (req: Request, res: Response) => {
  const { email, password, name, school, role } = req.body;
  const normalizedEmail = (email || 'student@university.edu').trim().toLowerCase();

  const existing = USER_REGISTRY.get(normalizedEmail);

  let payload: UserSessionPayload;
  if (existing) {
    payload = {
      subjectId: existing.subjectId,
      email: existing.email,
      name: existing.name,
      role: existing.role,
      onboardingComplete: existing.onboardingComplete,
      emailVerified: existing.emailVerified,
      school: existing.school,
    };
  } else {
    // New user signing in
    const isReturning = Boolean(req.body.onboardingComplete);
    payload = {
      subjectId: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      name: name || normalizedEmail.split('@')[0] || 'Student',
      role: role === 'FACULTY' || role === 'ADMIN' ? role : 'STUDENT',
      onboardingComplete: isReturning,
      emailVerified: true,
      school: school || 'Arizona State University — Tempe Campus',
    };
    USER_REGISTRY.set(normalizedEmail, {
      ...payload,
      password: password || undefined,
    });
  }

  const token = signAuthToken(payload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.json({
    success: true,
    message: 'Authenticated successfully. Session cookie issued.',
    user: payload,
  });
});

/**
 * POST /api/auth/google
 * Google Identity bridge for Screen 04
 */
authRoutes.post('/google', (req: Request, res: Response) => {
  const email = (req.body.email || 'student.google@asu.edu').trim().toLowerCase();
  const name = req.body.name || 'Alex';

  let user = USER_REGISTRY.get(email);
  if (!user) {
    user = {
      subjectId: `usr_g_${Date.now()}`,
      email,
      name,
      role: 'STUDENT',
      onboardingComplete: false,
      emailVerified: true,
      school: 'Arizona State University — Tempe Campus',
    };
    USER_REGISTRY.set(email, user);
  }

  const payload: UserSessionPayload = {
    subjectId: user.subjectId,
    email: user.email,
    name: user.name,
    role: user.role,
    onboardingComplete: user.onboardingComplete,
    emailVerified: true,
    school: user.school,
  };

  const token = signAuthToken(payload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.json({
    success: true,
    message: 'Google authentication successful.',
    user: payload,
  });
});

/**
 * POST /api/auth/onboarding-complete
 * Updates session JWT state to onboardingComplete = true and re-issues HttpOnly cookie
 */
authRoutes.post('/onboarding-complete', optionalAuthToken, (req: Request, res: Response) => {
  const current = req.principal || {
    subjectId: `usr_${Date.now()}`,
    email: 'commander@cerebro.edu',
    name: 'Commander',
    role: 'STUDENT' as const,
    emailVerified: true,
    onboardingComplete: false,
    school: 'University',
  };

  const updatedPayload: UserSessionPayload = {
    ...current,
    name: req.body.name || current.name,
    school: req.body.school || current.school,
    onboardingComplete: true,
    selectedCourses: req.body.selectedCourses || current.selectedCourses || ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
    customizedDashboardConfig: req.body.customizedDashboardConfig || current.customizedDashboardConfig,
  };

  const existing = USER_REGISTRY.get(updatedPayload.email.toLowerCase());
  if (existing) {
    USER_REGISTRY.set(updatedPayload.email.toLowerCase(), {
      ...existing,
      name: updatedPayload.name || existing.name,
      school: updatedPayload.school || existing.school,
      onboardingComplete: true,
      selectedCourses: updatedPayload.selectedCourses,
      customizedDashboardConfig: updatedPayload.customizedDashboardConfig,
    });
  } else {
    USER_REGISTRY.set(updatedPayload.email.toLowerCase(), {
      ...updatedPayload,
      name: updatedPayload.name || 'Student',
    });
  }

  const token = signAuthToken(updatedPayload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.json({
    success: true,
    message: 'Onboarding completed. Session state updated.',
    user: updatedPayload,
  });
});

/**
 * POST /api/auth/reset-onboarding
 * Resets onboarding status in session token
 */
authRoutes.post('/reset-onboarding', optionalAuthToken, (req: Request, res: Response) => {
  const current = req.principal || {
    subjectId: `usr_${Date.now()}`,
    email: 'commander@cerebro.edu',
    name: 'Commander',
    role: 'STUDENT' as const,
    emailVerified: true,
    onboardingComplete: false,
  };

  const updatedPayload: UserSessionPayload = {
    ...current,
    onboardingComplete: false,
  };

  const token = signAuthToken(updatedPayload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.json({
    success: true,
    message: 'Onboarding status reset.',
    user: updatedPayload,
  });
});

/**
 * POST /api/auth/logout
 * Clears HttpOnly session cookie
 */
authRoutes.post('/logout', (req: Request, res: Response) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  });

  return res.json({
    success: true,
    message: 'Logged out successfully. HttpOnly cookie cleared.',
  });
});
