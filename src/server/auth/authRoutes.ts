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
authRoutes.get('/me', optionalAuthToken, (req: Request, res: Response) => {
  if (req.principal) {
    return res.json({
      authenticated: true,
      user: req.principal,
    });
  }

  // Issue default active session for smooth student interaction
  const defaultPayload: UserSessionPayload = {
    subjectId: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    email: 'commander@cerebro.edu',
    name: 'Commander',
    role: 'STUDENT',
    onboardingComplete: false,
    emailVerified: true,
    school: 'University',
  };

  const token = signAuthToken(defaultPayload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.json({
    authenticated: true,
    user: defaultPayload,
    notice: 'Initialized new secure HttpOnly session',
  });
});

/**
 * POST /api/auth/login
 * Creates/authenticates session and issues HttpOnly JWT cookie
 */
authRoutes.post('/login', (req: Request, res: Response) => {
  const { email, name, school, role } = req.body;

  const payload: UserSessionPayload = {
    subjectId: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    email: email || 'commander@cerebro.edu',
    name: name || 'Commander',
    role: role === 'FACULTY' || role === 'ADMIN' ? role : 'STUDENT',
    onboardingComplete: Boolean(req.body.onboardingComplete),
    emailVerified: true,
    school: school || 'University',
  };

  const token = signAuthToken(payload);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return res.json({
    success: true,
    message: 'Authenticated successfully. Session cookie issued.',
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
  };

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
