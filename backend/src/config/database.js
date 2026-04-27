'use strict';

const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

let sequelize;

if (process.env.DATABASE_URL) {
  // Production — use connection URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
      ssl: { rejectUnauthorized: false },
    },
    define: {
      underscored: true,
      timestamps: true,
    },
  });
} else {
  // Local development
  const { config } = require('./env');
  sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
      host:    config.db.host,
      port:    config.db.port,
      dialect: 'mysql',
      logging: (sql) => logger.debug(`[SQL] ${sql}`),
      dialectOptions: { connectTimeout: 60000 },
      define: {
        underscored: true,
        timestamps: true,
      },
    }
  );
}

const testConnection = async () => {
  await sequelize.authenticate();
};

module.exports = { sequelize, testConnection };