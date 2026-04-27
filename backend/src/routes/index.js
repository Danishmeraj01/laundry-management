'use strict';

const express   = require('express');
const router    = express.Router();

const authRoutes      = require('./auth.routes');
const orderRoutes     = require('./order.routes');
const dashboardRoutes = require('./dashboard.routes');

router.use('/auth',      authRoutes);
router.use('/orders',    orderRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Laundry Management API v1.0' });
});

module.exports = router;