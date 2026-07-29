const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===========================
// Middleware
// ===========================
app.use(cors({
  origin: 'https://partylink-app.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// ===========================
// Test route
// ===========================
app.get('/', (req, res) => {
  res.json({ message: 'PartyLink API is running!' });
});

// ===========================
// Routes
// ===========================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));

// ===========================
// Start server
// ===========================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});