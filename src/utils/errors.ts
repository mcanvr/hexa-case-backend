/**
 * Base class for custom API errors.
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Represents a 404 Not Found error.
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Represents a 400 Bad Request error (often used for validation errors).
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(400, message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
