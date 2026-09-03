import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedPrincipal {
  subjectId: string;
  email?: string;
  emailVerified: boolean;
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      principal?: AuthenticatedPrincipal;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export const requireAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Mock authentication logic since we removed Firebase
  req.principal = {
    subjectId: 'MOCK_SUBJECT_ID',
    emailVerified: true,
    email: 'mock@example.com',
  };
  next();
};
