'use strict';

// ── 1. Load environment variables
require('dotenv').config();

const http = require('http');
const app = require('./src/app');

const { validateEnv }  = require('./src/config/env');
const { sequelize }    = require('./src/config/database');
const { connectRedis } = require('./src/config/redis');
const { initSocket }   = require('./src/services/socket.service');
const logger           = require('./src/utils/logger');

// ── 2. Validate env
validateEnv();

const PORT = process.env.PORT || 5000;

// ── 3. Start server
(async () => {
  try {
    // ── MySQL connect
    await sequelize.authenticate();
    logger.info('✅ MySQL connected successfully');

    require('./src/models/index');

    await sequelize.sync({ alter: true });
    logger.info('✅ Database models synced');

    // ── Redis (optional)
    try {
      await connectRedis();
      logger.info('✅ Redis connected successfully');
    } catch (err) {
      logger.warn('⚠️ Redis unavailable — caching disabled.');
    }

    // ── HTTP server + socket
    const httpServer = http.createServer(app);
    initSocket(httpServer);
    logger.info('✅ Socket.io initialized');

    // ── Listen
    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      logger.info(`📡 API base URL: http://localhost:${PORT}/api`);
    });

    // ── Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`\n${signal} received — shutting down...`);
      httpServer.close(async () => {
        await sequelize.close();
        logger.info('MySQL connection closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    logger.error('❌ Failed to start server');
    console.error(error);
    process.exit(1);
  }
})();