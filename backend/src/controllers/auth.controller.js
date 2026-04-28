'use strict';

const bcrypt       = require('bcryptjs');
const { User }     = require('../models');
const { signToken } = require('../utils/jwt');
const { success, error } = require('../utils/response');

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return error(res, 'Name, email and password are required', 400);

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return error(res, 'Email already registered', 409);

    const hashed = await bcrypt.hash(password, 12);
    const user   = await User.create({ name, email, password: hashed, role: role || 'staff' });

    console.log("TOKEN PAYLOAD:", {
  id: user.id,
  email: user.email,
  role: user.role
});

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return success(res, {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }, 'Account created successfully', 201);

  } catch (err) {
    return error(res, err.message, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return error(res, 'Email and password are required', 400);

    const user = await User.findOne({ where: { email } });
    if (!user)
      return error(res, 'Invalid email or password', 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return error(res, 'Invalid email or password', 401);

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return success(res, {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }, 'Login successful');

  } catch (err) {
    return error(res, err.message, 500);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'created_at'],
    });
    if (!user) return error(res, 'User not found', 404);
    return success(res, user, 'User fetched');
  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { signup, login, getMe };