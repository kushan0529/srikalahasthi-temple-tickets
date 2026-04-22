const mongoose = require('mongoose');

const sevaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teluguName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  icon: { type: String },
  available: { type: Boolean, default: true },
  timeSlot: { type: String },
  duration: { type: String },
  maxBookings: { type: Number, default: 50 }
}, { timestamps: true });

module.exports = mongoose.model('Seva', sevaSchema);
