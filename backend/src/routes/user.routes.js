'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/auth.middleware');
const { getUsers } = require('../controllers/user.controller');

router.get('/', auth, requireRole('admin'), getUsers);

module.exports = router;