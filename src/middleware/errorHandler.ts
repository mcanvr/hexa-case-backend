import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('ERROR 🔥:', err);

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message || 'Validation failed';
  }

  const responseMessage =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal Server Error'
      : message;

  res.status(statusCode).json({ message: responseMessage });
};
