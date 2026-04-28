'use strict';

const { verifyToken } = require('../utils/jwt');
const { error } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'No token provided. Please login.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id || decoded.user_id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    if (!req.user.id || !req.user.role) {
      return error(res, 'Invalid token payload. Please login again.', 401);
    }

    next();
  } catch (err) {
    return error(res, 'Invalid or expired token. Please login again.', 401);
  }
};

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return error(res, 'Unauthorized. User role not found.', 403);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return error(res, 'Access denied. Insufficient permissions.', 403);
    }

    next();
  };
};

// Old import support: const auth = require(...)
module.exports = authMiddleware;

// New import support: const { authMiddleware, requireRole } = require(...)
module.exports.authMiddleware = authMiddleware;
module.exports.requireRole = requireRole;