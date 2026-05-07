const express = require('express');
const router = express.Router();
const bookingRoutes = require('../modules/booking/routes/bookingRoutes');

// Tất cả các API đặt vé sẽ bắt đầu bằng /api/bookings
router.use('/bookings', bookingRoutes);

module.exports = router;