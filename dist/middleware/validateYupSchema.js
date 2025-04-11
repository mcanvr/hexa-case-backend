"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateYupSchema = void 0;
const errors_1 = require("../utils/errors");
/**
 * Middleware to validate request against a Yup schema.
 * Validates req.body, req.params, and req.query based on the schema definition.
 */
const validateYupSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        }, {
            abortEarly: false, // Return all errors, not just the first
            stripUnknown: true, // Remove fields not defined in the schema
        });
        return next();
    }
    catch (error) {
        // Yup validation errors
        if (error.name === 'ValidationError') {
            const message = error.errors?.join(', ') || 'Validation failed';
            return next(new errors_1.BadRequestError(message));
        }
        // Other errors
        return next(error);
    }
};
exports.validateYupSchema = validateYupSchema;
