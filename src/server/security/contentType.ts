import { Request, Response, NextFunction } from 'express';

export const enforceContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (
      !contentType ||
      (!contentType.includes('application/json') &&
        !contentType.includes('multipart/form-data'))
    ) {
      res.status(415).json({ error: 'UNSUPPORTED_MEDIA_TYPE' });
      return;
    }
  }
  next();
};
