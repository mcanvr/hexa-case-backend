import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import { BadRequestError } from '../utils/errors';

/**
 * Middleware to validate request against a Yup schema.
 * Validates req.body, req.params, and req.query based on the schema definition.
 */
export const validateYupSchema =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        {
          abortEarly: false, // Return all errors, not just the first
          stripUnknown: true, // Remove fields not defined in the schema
        },
      );
      return next();
    } catch (error: any) {
      // Yup validation errors
      if (error.name === 'ValidationError') {
        const message = error.errors?.join(', ') || 'Validation failed';
        return next(new BadRequestError(message));
      }
      // Other errors
      return next(error);
    }
  };
