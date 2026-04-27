/**
 * server.js — Entry Point
 *
 * Responsibilities:
 *  1. Load environment variables FIRST (before any other import uses them)
 *  2. Create the HTTP server from the Express app
 *  3. Attach Socket.io to the same HTTP server
 *  4. Connect to MySQL via Sequelize
 *  5. Connect to Redis (optional)
 *  6. Start listening on the configured port
 */

'use strict';

// ── 1. Environment variables must be loaded before anything else ─────────────
require('dotenv').config();

const http = require('http');
const app  = require('./src/app');

const { validateEnv }  = require('./src/config/env');
const { sequelize }    = require('./src/config/database');
const { connectRedis } = require('./src/config/redis');
const { initSocket }   = require('./src/services/socket.service');
const logger           = require('./src/utils/logger');

// ── 2. Validate all required env vars before touching any service ─────────────
validateEnv();

const PORT = process.env.PORT || 5000;

// ── 3. Wrap startup in an async IIFE so we can use await cleanly ──────────────
(async () => {
  try {

    // ── 4. Connect to MySQL via Sequelize ───────────────────────────────────
    await sequelize.authenticate();
    logger.info('✅  MySQL connected successfully');

    // Sync models in development only.
    // alter:true updates existing tables without dropping data
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('✅  Database models synced (alter mode)');
    }

    // ── 5. Connect to Redis (optional) ──────────────────────────────────────
    try {
      await connectRedis();
      logger.info('✅  Redis connected successfully');
    } catch (err) {
      logger.warn('⚠️  Redis unavailable — caching disabled. App will still work.');
    }

    // ── 6. Create HTTP server and attach Socket.io ──────────────────────────
    const httpServer = http.createServer(app);
    initSocket(httpServer);
    logger.info('✅  Socket.io initialized');

    // ── 7. Start listening ──────────────────────────────────────────────────
    httpServer.listen(PORT, () => {
      logger.info(`🚀  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      logger.info(`📡  API base URL: http://localhost:${PORT}/api`);
    });

    // ── 8. Serve React frontend in production ───────────────────────────────
    if (process.env.NODE_ENV === 'production') {
      const path = require('path');
      app.use(require('express').static(path.join(__dirname, '../frontend/dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
      });
    }

    // ── 9. Graceful shutdown handlers ────────────────────────────────────────
    const shutdown = async (signal) => {
      logger.info(`\n${signal} received — shutting down gracefully…`);
      httpServer.close(async () => {
        await sequelize.close();
        logger.info('MySQL connection closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT',  () => shutdown('SIGINT'));

  } catch (error) {
    logger.error('❌  Failed to start server:');
    console.error(error);
    process.exit(1);
  }
})();