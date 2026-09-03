import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const assignRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.headers['x-request-id'] =
    req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('x-request-id', req.headers['x-request-id'] as string);
  next();
};
