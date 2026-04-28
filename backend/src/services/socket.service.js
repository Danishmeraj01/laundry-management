'use strict';

const logger = require('../utils/logger');

let io = null;

const initSocket = (httpServer) => {
  const { Server } = require('socket.io');

  // ✅ Handle multiple origins from .env
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : ['http://localhost:5173'];

  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps / curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error('CORS not allowed'));
      },
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    logger.info(`🔌 Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`❌ Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initSocket, getIO };