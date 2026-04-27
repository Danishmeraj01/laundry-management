'use strict';

const logger = require('../utils/logger');

let redisClient = null;

const CACHE_TTL = {
  DASHBOARD_STATS: 300,
  ORDER_LIST:       60,
  SINGLE_ORDER:    120,
  AI_INSIGHTS:     600,
};

/**
 * connectRedis — skips Redis if REDIS_ENABLED is not 'true'
 */
const connectRedis = async () => {
  if (process.env.REDIS_ENABLED !== 'true') {
    logger.warn('⚠️  Redis disabled — running without cache (set REDIS_ENABLED=true to enable)');
    return;
  }

  const Redis = require('ioredis');
  const { config } = require('./env');

  redisClient = new Redis(config.redis.url, {
    retryStrategy: (times) => {
      if (times > 10) {
        logger.error('Redis: max reconnection attempts reached');
        return null;
      }
      const delay = Math.min(times * 200, 30000);
      logger.warn(`Redis: retrying in ${delay}ms (attempt ${times})`);
      return delay;
    },
    enableReadyCheck:     true,
    maxRetriesPerRequest: 3,
    lazyConnect:          true,
  });

  redisClient.on('connect',      () => logger.info('Redis: connected'));
  redisClient.on('ready',        () => logger.info('Redis: ready'));
  redisClient.on('error',  (err) => logger.error('Redis error:', err.message));
  redisClient.on('close',        () => logger.warn('Redis: connection closed'));
  redisClient.on('reconnecting', () => logger.warn('Redis: reconnecting'));

  await redisClient.connect();
  await redisClient.ping();
};

const getCache = async (key) => {
  if (!redisClient) return null;
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    logger.warn(`Redis getCache error "${key}":`, err.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 60) => {
  if (!redisClient) return;
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', ttl);
  } catch (err) {
    logger.warn(`Redis setCache error "${key}":`, err.message);
  }
};

const deleteCache = async (key) => {
  if (!redisClient) return;
  try {
    await redisClient.del(key);
  } catch (err) {
    logger.warn(`Redis deleteCache error "${key}":`, err.message);
  }
};

const deleteCacheByPattern = async (pattern) => {
  if (!redisClient) return;
  try {
    let cursor = '0';
    do {
      const [nextCursor, keys] = await redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = nextCursor;
      if (keys.length > 0) await redisClient.del(...keys);
    } while (cursor !== '0');
  } catch (err) {
    logger.warn(`Redis deleteCacheByPattern error "${pattern}":`, err.message);
  }
};

const getRedisClient = () => redisClient;

module.exports = {
  connectRedis,
  getCache,
  setCache,
  deleteCache,
  deleteCacheByPattern,
  getRedisClient,
  CACHE_TTL,
};