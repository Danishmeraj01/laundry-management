'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/auth.middleware');

const {
  getOrders,
  getOrderById,
  createOrder,
  updateStatus,
  deleteOrder,
} = require('../controllers/order.controller');

router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createOrder);

router.patch('/:id/status', auth, requireRole('admin', 'staff'), updateStatus);

router.delete('/:id', auth, requireRole('admin'), deleteOrder);

module.exports = router;