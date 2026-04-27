/**
 * app.js — Express Application Factory
 *
 * This file creates and configures the Express app.
 * It is kept separate from server.js so the app can be imported
 * in tests without starting an HTTP server.
 *
 * Middleware order matters:
 *  security → parsing → logging → routes → error handling
 */

'use strict';

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const compression  = require('compression');
const rateLimit    = require('express-rate-limit');

const routes       = require('./routes/index');
const errorMiddleware = require('./middleware/error.middleware');
const logger       = require('./utils/logger');

const app = express();

// ─────────────────────────────────────────────────────────────────────────────
// 1. SECURITY HEADERS — Helmet sets a suite of HTTP headers that protect
//    against well-known web vulnerabilities (XSS, clickjacking, MIME-sniffing).
// ─────────────────────────────────────────────────────────────────────────────
app.use(helmet());

// ─────────────────────────────────────────────────────────────────────────────
// 2. CORS — Allow the React frontend (and Postman in dev) to talk to this API.
//    In production, restrict origin to your actual frontend domain.
// ─────────────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} is not allowed`));
    }
  },
  credentials: true,                 // allow cookies / Authorization header
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─────────────────────────────────────────────────────────────────────────────
// 3. RATE LIMITING — Protect against brute-force and DoS attacks.
//    The auth limiter is stricter; the global one is more lenient.
// ─────────────────────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 200,                    // requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// Tighter limit for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many login attempts, please try again in 15 minutes.' },
});

app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);  // applied again specifically for auth

// ─────────────────────────────────────────────────────────────────────────────
// 4. BODY PARSING — Parse JSON and URL-encoded bodies.
//    Limits prevent large payload attacks.
// ─────────────────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─────────────────────────────────────────────────────────────────────────────
// 5. COMPRESSION — Gzip responses to reduce payload size.
// ─────────────────────────────────────────────────────────────────────────────
app.use(compression());

// ─────────────────────────────────────────────────────────────────────────────
// 6. REQUEST LOGGING — Morgan logs every HTTP request.
//    In development: colorful "dev" format.
//    In production:  structured "combined" format piped to Winston.
// ─────────────────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: (msg) => logger.http(msg.trim()) },
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. HEALTH CHECK — A simple endpoint so Docker/Render can verify the app is up.
//    Does NOT go through the rate limiter.
// ─────────────────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Laundry Management API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. API ROUTES — All business routes are mounted under /api
// ─────────────────────────────────────────────────────────────────────────────
app.use('/api', routes);

// ─────────────────────────────────────────────────────────────────────────────
// 9. 404 HANDLER — Catch any requests that didn't match a route above
// ─────────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. GLOBAL ERROR HANDLER — Must be LAST and have 4 parameters (err, req, res, next)
// ─────────────────────────────────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;