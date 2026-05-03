const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, requireAdmin, requireAuth } = require('../middlewares/auth');
const {conn}=require('../config/dbConnect');

router.post("/login", userController.login);
router.post("/register", userController.register);

// Protected routes - require authentication
router.get("/profile", authenticateUser, (req, res) => {
  res.json({
    check: true,
    message: "User profile",
    user: {
      name: req.user.username,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Admin only routes
router.get("/admin/dashboard", authenticateUser, requireAdmin, (req, res) => {
  res.json({
    check: true,
    message: "Admin dashboard",
    user: req.user
  });
});

router.get("/admin/users", authenticateUser, requireAdmin, async (req, res) => {
  const [userList] = await conn.execute("select * from users");
  res.json({
    check: true,
    message: "Admin users list",
    userList: userList
  });
});

module.exports = router;