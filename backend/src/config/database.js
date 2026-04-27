'use strict';

const { Sequelize } = require('sequelize');
const { config }    = require('./env');
const logger        = require('../utils/logger');

const POOL_CONFIG = {
  max:     10,
  min:     2,
  acquire: 30000,
  idle:    10000,
};

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host:    config.db.host,
    port:    config.db.port,
    dialect: 'mysql',        // ← changed from 'postgres' to 'mysql'

    pool:    POOL_CONFIG,

    logging: config.server.isDev
      ? (sql) => logger.debug(`[SQL] ${sql}`)
      : false,

    timezone: '+00:00',

    dialectOptions: {
      // MySQL specific: auto-reconnect on lost connection
      connectTimeout: 60000,
    },

    define: {
      underscored: true,
      paranoid:    false,
      timestamps:  true,
    },
  }
);

const testConnection = async () => {
  await sequelize.authenticate();
};

module.exports = { sequelize, testConnection };