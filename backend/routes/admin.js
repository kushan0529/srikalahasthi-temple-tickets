const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');
const router = express.Router();

router.use(protect, adminOnly);

router.get('/dashboard', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    const totalUsers = await User.countDocuments({ role: 'devotee' });
    
    const revenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        totalUsers,
        totalRevenue: revenue[0] ? revenue[0].total : 0
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, darshanType } = req.query;
    const query = {};
    if (status) query.status = status;
    if (darshanType) query.darshanType = darshanType;

    const bookings = await Booking.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort('-createdAt');

    const count = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/bookings/:id/checkin', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    
    booking.checkedIn = true;
    booking.checkedInAt = new Date();
    booking.status = 'used';
    await booking.save();
    
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
