import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export interface UserSessionPayload {
  subjectId: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  onboardingComplete: boolean;
  emailVerified: boolean;
  school?: string;
}

export const AUTH_COOKIE_NAME = 'auth_token';

/**
 * Sign a JWT token with user session payload
 */
export function signAuthToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'cerebro-mainframe',
    subject: payload.subjectId,
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyAuthToken(token: string): UserSessionPayload | null {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET, {
      issuer: 'cerebro-mainframe',
    }) as UserSessionPayload & jwt.JwtPayload;

    return {
      subjectId: decoded.subjectId || decoded.sub || 'usr_anonymous',
      email: decoded.email || 'student@university.edu',
      name: decoded.name || 'Commander',
      role: decoded.role || 'STUDENT',
      onboardingComplete: Boolean(decoded.onboardingComplete),
      emailVerified: Boolean(decoded.emailVerified),
      school: decoded.school,
    };
  } catch (err) {
    return null;
  }
}

/**
 * Get cookie options for session management
 */
export function getAuthCookieOptions() {
  const isProd = ENV.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}
