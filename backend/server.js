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

// ── 2. Validate all required env vars ────────────────────────────────────────
validateEnv();

const PORT = process.env.PORT || 5000;

// ── 3. Startup ────────────────────────────────────────────────────────────────
(async () => {
  try {

    // ── 4. Connect to MySQL ─────────────────────────────────────────────────
    await sequelize.authenticate();
    logger.info('✅  MySQL connected successfully');

    // Load all models so Sequelize knows about them before sync
    require('./src/models/index');

    // Always sync — creates tables if they don't exist
    await sequelize.sync({ alter: true });
    logger.info('✅  Database models synced');

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

    // ── 8. Graceful shutdown ─────────────────────────────────────────────────
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