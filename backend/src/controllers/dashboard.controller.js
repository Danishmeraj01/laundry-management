'use strict';

const { Order, OrderItem } = require('../models');
const { success, error } = require('../utils/response');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getStats = async (req, res) => {
  try {
    if (req.user.role === 'customer') {
      const userId = req.user.id;

      const myOrders = await Order.count({ where: { user_id: userId } });

      const myPendingOrders = await Order.count({
        where: { user_id: userId, status: 'RECEIVED' },
      });

      const myDeliveredOrders = await Order.count({
        where: { user_id: userId, status: 'DELIVERED' },
      });

      const myActiveOrders = await Order.count({
        where: {
          user_id: userId,
          status: ['RECEIVED', 'PROCESSING', 'READY'],
        },
      });

      const recentOrders = await Order.findAll({
        where: { user_id: userId },
        include: [{ model: OrderItem, as: 'items' }],
        order: [['created_at', 'DESC']],
        limit: 5,
      });

      // Customer-only order status breakdown
      const statusBreakdown = await sequelize.query(`
        SELECT status, COUNT(*) as count
        FROM orders
        WHERE user_id = :userId
        GROUP BY status
      `, {
        replacements: { userId },
        type: QueryTypes.SELECT,
      });

      // Customer-only top garments
      const topGarments = await sequelize.query(`
        SELECT oi.garment_type, SUM(oi.quantity) as total_qty
        FROM order_items oi
        INNER JOIN orders o ON o.id = oi.order_id
        WHERE o.user_id = :userId
        GROUP BY oi.garment_type
        ORDER BY total_qty DESC
        LIMIT 5
      `, {
        replacements: { userId },
        type: QueryTypes.SELECT,
      });

      return success(res, {
        role: 'customer',
        myOrders,
        myPendingOrders,
        myDeliveredOrders,
        myActiveOrders,
        recentOrders,
        statusBreakdown,
        topGarments,
      }, 'Customer dashboard stats fetched');
    }

    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum('total_amount') || 0;
    const pendingOrders = await Order.count({ where: { status: 'RECEIVED' } });
    const deliveredOrders = await Order.count({ where: { status: 'DELIVERED' } });

    const statusBreakdown = await sequelize.query(`
      SELECT status, COUNT(*) as count
      FROM orders
      GROUP BY status
    `, { type: QueryTypes.SELECT });

    const topGarments = await sequelize.query(`
      SELECT garment_type, SUM(quantity) as total_qty, SUM(subtotal) as total_revenue
      FROM order_items
      GROUP BY garment_type
      ORDER BY total_qty DESC
      LIMIT 5
    `, { type: QueryTypes.SELECT });

    const revenueByDay = await sequelize.query(`
      SELECT DATE(created_at) as date, SUM(total_amount) as revenue
      FROM orders
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `, { type: QueryTypes.SELECT });

    return success(res, {
      role: req.user.role,
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