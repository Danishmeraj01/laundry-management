'use strict';

const { Order, OrderItem, User } = require('../models');
const { calculateItems, calculateTotal } = require('../services/billing.service');
const { success, error } = require('../utils/response');

const getOrders = async (req, res) => {
  try {
    const whereCondition = {};

    if (req.user.role === 'customer') {
      whereCondition.user_id = req.user.id;
    }

    const orders = await Order.findAll({
      where: whereCondition,
      include: [
        { model: OrderItem, as: 'items' },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email', 'role'] },
      ],
      order: [['created_at', 'DESC']],
    });

    return success(res, orders, 'Orders fetched');
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: OrderItem, as: 'items' },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email', 'role'] },
      ],
    });

    if (!order) return error(res, 'Order not found', 404);

    if (req.user.role === 'customer' && order.user_id !== req.user.id) {
      return error(res, 'Access denied. You can view only your own orders.', 403);
    }

    return success(res, order, 'Order fetched');
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const createOrder = async (req, res) => {
  try {
    const { customer_name, customer_phone, notes, items } = req.body;

    if (!customer_name || !customer_phone || !items || !items.length) {
      return error(res, 'customer_name, customer_phone and items are required', 400);
    }

    const calculatedItems = calculateItems(items);
    const total_amount = calculateTotal(calculatedItems);

    const order = await Order.create({
      user_id: req.user.id,
      customer_name,
      customer_phone,
      notes,
      total_amount,
      status: 'RECEIVED',
    });

    const orderItems = calculatedItems.map((i) => ({
      order_id: order.id,
      garment_type: i.garment_type,
      quantity: i.quantity,
      unit_price: i.unit_price,
      subtotal: i.subtotal,
    }));

    await OrderItem.bulkCreate(orderItems);

    const fullOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });

    return success(res, fullOrder, 'Order created successfully', 201);
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const updateStatus = async (req, res) => {
  try {
    if (!['admin', 'staff'].includes(req.user.role)) {
      return error(res, 'Only admin or staff can update order status.', 403);
    }

    const { status } = req.body;
    const validStatuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

    if (!validStatuses.includes(status)) {
      return error(res, `Status must be one of: ${validStatuses.join(', ')}`, 400);
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) return error(res, 'Order not found', 404);

    await order.update({ status });

    return success(res, order, 'Status updated');
  } catch (err) {
    return error(res, err.message, 500);
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return error(res, 'Only admin can delete orders.', 403);
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) return error(res, 'Order not found', 404);

    await OrderItem.destroy({ where: { order_id: order.id } });
    await order.destroy();

    return success(res, null, 'Order deleted successfully');
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateStatus,
  deleteOrder,
};