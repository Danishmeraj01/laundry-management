'use strict';

const { User } = require('../models');
const { success, error } = require('../utils/response');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    const totalUsers = users.length;
    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const totalStaff = users.filter(u => u.role === 'staff').length;
    const totalCustomers = users.filter(u => u.role === 'customer').length;

    return success(res, {
      totalUsers,
      totalAdmins,
      totalStaff,
      totalCustomers,
      users,
    }, 'Users fetched successfully');

  } catch (err) {
    return error(res, err.message, 500);
  }
};

module.exports = { getUsers };