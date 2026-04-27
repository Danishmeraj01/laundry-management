/**
 * logger.js — Winston Logger
 *
 * Provides structured, leveled logging throughout the backend.
 * In development: colorful console output.
 * In production:  JSON-formatted logs (easy to ingest into Datadog, Logtail, etc.)
 */

'use strict';

const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf, colorize, errors } = format;

// ── Custom log format for development ─────────────────────────────────────────
const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack }) =>
    stack
      ? `[${timestamp}] ${level}: ${message}\n${stack}`
      : `[${timestamp}] ${level}: ${message}`
  )
);

// ── JSON format for production (structured logging) ───────────────────────────
const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  format.json()
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
  transports: [
    new transports.Console(),
  ],
  // Don't crash the app on unhandled logger errors
  exitOnError: false,
});

module.exports = logger;