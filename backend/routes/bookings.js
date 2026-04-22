const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/payment/order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/payment/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Create actual booking
      const booking = await Booking.create({
        ...bookingData,
        user: req.user._id,
        paymentStatus: 'paid',
        paymentId: razorpay_payment_id,
        status: 'confirmed'
      });
      res.json({ success: true, booking });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:ref', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref.toUpperCase() });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:ref/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref.toUpperCase(), user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    
    booking.status = 'cancelled';
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
