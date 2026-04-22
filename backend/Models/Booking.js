const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema({
  bookingRef: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String },
  mobile: { type: String, required: true },
  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
  visitDate: { type: Date, required: true },
  darshanType: { 
    type: String, 
    enum: ['Free Darshan', 'Special Darshan', 'VIP Darshan', 'Athi Vishishta', 'Rahu Ketu Pooja', 'Archana'],
    required: true 
  },
  timeSlot: { type: String },
  adults: { type: Number, required: true, min: 1, max: 10 },
  children: { type: Number, default: 0 },
  pricePerHead: { type: Number },
  totalAmount: { type: Number },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  paymentId: { type: String },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'used', 'expired'], 
    default: 'confirmed' 
  },
  checkedIn: { type: Boolean, default: false },
  checkedInAt: { type: Date }
}, { timestamps: true });

// Pre-save hook for logic
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate SKT reference
    this.bookingRef = 'SKT' + uuidv4().split('-')[0].toUpperCase();
  }

  const priceMap = { 
    'Free Darshan': 0, 
    'Special Darshan': 100, 
    'VIP Darshan': 300, 
    'Athi Vishishta': 500,
    'Rahu Ketu Pooja': 1116,
    'Archana': 10
  };
  
  this.pricePerHead = priceMap[this.darshanType];
  this.totalAmount = this.pricePerHead * this.adults;
  
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
