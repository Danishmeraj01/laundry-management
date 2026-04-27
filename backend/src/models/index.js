'use strict';

const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const User      = require('./User')(sequelize, DataTypes);
const Order     = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);

// Associations
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'creator' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

module.exports = { sequelize, User, Order, OrderItem };