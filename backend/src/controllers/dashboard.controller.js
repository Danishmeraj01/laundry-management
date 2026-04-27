'use strict';

const { Order, OrderItem, User } = require('../models');
const { success, error } = require('../utils/response');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getStats = async (req, res) => {
  try {
    const totalOrders    = await Order.count();
    const totalRevenue   = await Order.sum('total_amount') || 0;
    const pendingOrders  = await Order.count({ where: { status: 'RECEIVED' } });
    const deliveredOrders = await Order.count({ where: { status: 'DELIVERED' } });

    // Orders by status
    const statusBreakdown = await sequelize.query(`
      SELECT status, COUNT(*) as count
      FROM orders
      GROUP BY status
    `, { type: QueryTypes.SELECT });

    // Top garments
    const topGarments = await sequelize.query(`
      SELECT garment_type, SUM(quantity) as total_qty, SUM(subtotal) as total_revenue
      FROM order_items
      GROUP BY garment_type
      ORDER BY total_qty DESC
      LIMIT 5
    `, { type: QueryTypes.SELECT });

    // Revenue last 7 days
    const revenueByDay = await sequelize.query(`
      SELECT DATE(created_at) as date, SUM(total_amount) as revenue
      FROM orders
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `, { type: QueryTypes.SELECT });

    return success(res, {
      totalOrders,
      totalRevenue: parseFloat(totalRevenue).toFixed(2),
      pendingOrders,
      deliveredOrders,
      statusBreakdown,
      topGarments,
      revenueByDay,
    }, 'Dashboard stats fetched');

  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { getStats };