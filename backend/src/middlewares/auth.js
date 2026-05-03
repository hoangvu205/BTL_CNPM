const jwt = require('jsonwebtoken');

const JWT_SECRET = "hoang";

// Middleware to verify JWT token and authenticate user
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      check: false,
      message: "Access token required"
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      check: false,
      message: "Invalid or expired token"
    });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      check: false,
      message: "Admin access required"
    });
  }
  next();
};

// Middleware to check if user is authenticated (any role)
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      check: false,
      message: "Authentication required"
    });
  }
  next();
};

module.exports = {
  authenticateUser,
  requireAdmin,
  requireAuth
};