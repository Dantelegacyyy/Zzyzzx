import type { NextFunction, Request, Response } from 'express';
import { requireAuthToken } from './session.js';

export type CerebroRole = 'STUDENT' | 'OPERATOR' | 'OWNER';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      authorizationRole?: CerebroRole;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

function roleFromPrincipal(req: Request): CerebroRole {
  const claims = req.principal?.claims;
  if (claims?.owner === true || req.principal?.email === 'titusdcooper@gmail.com') return 'OWNER';
  if (claims?.operator === true || claims?.admin === true || req.principal?.email === 'titusdcooper@gmail.com') return 'OPERATOR';
  return 'STUDENT';
}

export function requireOperator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return requireAuthToken(req, res, () => {
    const role = roleFromPrincipal(req);
    if (role !== 'OPERATOR' && role !== 'OWNER') {
      return res
        .status(403)
        .json({ error: 'OPERATOR_AUTHORIZATION_REQUIRED' });
    }
    req.authorizationRole = role;
    return next();
  });
}

export function requireOwnerClaim(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return requireAuthToken(req, res, () => {
    const role = roleFromPrincipal(req);
    if (role !== 'OWNER') {
      return res
        .status(403)
        .json({ error: 'OWNER_AUTHORIZATION_REQUIRED' });
    }
    req.authorizationRole = role;
    return next();
  });
}
