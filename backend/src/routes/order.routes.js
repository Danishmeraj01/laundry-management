'use strict';

const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth.middleware');
const {
  getOrders, getOrderById, createOrder, updateStatus, deleteOrder
} = require('../controllers/order.controller');

router.get('/',           auth, getOrders);
router.get('/:id',        auth, getOrderById);
router.post('/',          auth, createOrder);
router.patch('/:id/status', auth, updateStatus);
router.delete('/:id',     auth, deleteOrder);

module.exports = router;