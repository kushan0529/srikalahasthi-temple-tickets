const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/sevas', require('./routes/sevas'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', temple: 'Sri Kalahasthi' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/srikalahasthi_temple';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🕉️ Connected to Sri Kalahasthi Temple Database');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
