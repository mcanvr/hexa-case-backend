"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotFoundError = exports.ApiError = void 0;
/**
 * Base class for custom API errors.
 */
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
exports.ApiError = ApiError;
/**
 * Represents a 404 Not Found error.
 */
class NotFoundError extends ApiError {
    constructor(message = 'Resource not found') {
        super(404, message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Represents a 400 Bad Request error (often used for validation errors).
 */
class BadRequestError extends ApiError {
    constructor(message = 'Bad request') {
        super(400, message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
