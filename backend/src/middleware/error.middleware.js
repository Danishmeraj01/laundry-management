/**
 * error.middleware.js — Global Error Handler
 */

'use strict';

const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message    = err.message    || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.originalUrl} → ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;