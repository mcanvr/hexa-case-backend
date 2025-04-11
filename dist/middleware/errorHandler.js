"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const errorHandler = (err, req, res, next) => {
    console.error('ERROR 🔥:', err);
    let statusCode = 500;
    let message = 'Internal Server Error';
    if (err instanceof errors_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message || 'Validation failed';
    }
    const responseMessage = process.env.NODE_ENV === 'production' && statusCode === 500
        ? 'Internal Server Error'
        : message;
    res.status(statusCode).json({ message: responseMessage });
};
exports.errorHandler = errorHandler;
