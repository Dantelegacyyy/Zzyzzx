import { Request, Response, NextFunction } from 'express';
import { verifyAuthToken, AUTH_COOKIE_NAME, UserSessionPayload } from './jwt.js';

export interface AuthenticatedPrincipal {
  subjectId: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  onboardingComplete: boolean;
  emailVerified: boolean;
  school?: string;
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      principal?: AuthenticatedPrincipal;
      user?: AuthenticatedPrincipal;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

/**
 * Extract token from cookies or Authorization header
 */
export function extractTokenFromRequest(req: Request): string | null {
  // 1. Check HttpOnly cookie first
  if (req.cookies && req.cookies[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }

  // 2. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  return null;
}

/**
 * Express middleware enforcing authentication via valid JWT token
 */
export const requireAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Authentication session token missing. Please sign in.',
    });
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    return res.status(401).json({
      success: false,
      error: 'INVALID_TOKEN',
      message: 'Session token expired or invalid.',
    });
  }

  const principal: AuthenticatedPrincipal = {
    subjectId: payload.subjectId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    onboardingComplete: payload.onboardingComplete,
    emailVerified: payload.emailVerified,
    school: payload.school,
  };

  req.principal = principal;
  req.user = principal;

  next();
};

/**
 * Optional authentication middleware that populates req.principal if valid, but does not block request
 */
export const optionalAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromRequest(req);
  if (token) {
    const payload = verifyAuthToken(token);
    if (payload) {
      const principal: AuthenticatedPrincipal = {
        subjectId: payload.subjectId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        onboardingComplete: payload.onboardingComplete,
        emailVerified: payload.emailVerified,
        school: payload.school,
      };
      req.principal = principal;
      req.user = principal;
    }
  }
  next();
};
