/**
 * env.js — Environment Variable Validator
 *
 * Validates that every required environment variable is present at startup.
 * Failing fast here is far better than cryptic errors deep inside the app
 * (e.g., "Cannot read property of undefined" when a DB password is missing).
 *
 * Usage: call validateEnv() once at the very start of server.js
 */

'use strict';

// List every env var the application needs to run.
// Group them logically so missing vars are easy to spot in the error message.
const REQUIRED_VARS = [
  // Server
  'NODE_ENV',
  'PORT',

  // Database
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',

  // JWT
  'JWT_SECRET',
  'JWT_EXPIRES_IN',

  // Redis (optional in dev — commented out; uncomment for production)
  // 'REDIS_URL',
];

/**
 * Validates all required environment variables.
 * Throws a descriptive error and exits if any are missing.
 */
const validateEnv = () => {
  const missing = REQUIRED_VARS.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('\n❌  Missing required environment variables:');
    missing.forEach(key => console.error(`   → ${key}`));
    console.error('\n   Please check your .env file and try again.\n');
    process.exit(1);
  }

  // Extra safety: warn if JWT_SECRET is too short or obviously weak
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️   JWT_SECRET is shorter than 32 characters. Use a stronger secret in production.');
  }

  console.log('✅  Environment variables validated');
};

/**
 * Typed config object — use this throughout the app instead of
 * accessing process.env directly. Centralises defaults and type coercion.
 */
const config = {
  server: {
    port:     parseInt(process.env.PORT, 10)   || 5000,
    nodeEnv:  process.env.NODE_ENV             || 'development',
    isDev:    process.env.NODE_ENV             !== 'production',
    allowedOrigins: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
  },

  db: {
    host:     process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name:     process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  jwt: {
    secret:    process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN      || '7d',
  },

  redis: {
    url: process.env.REDIS_URL                 || 'redis://localhost:6379',
  },

  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
  },
};

module.exports = { validateEnv, config };