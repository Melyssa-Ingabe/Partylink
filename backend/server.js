const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===========================
// MIDDLEWARE
// ===========================
app.use(cors());
app.use(express.json());

// ===========================
// TEST ROUTE
// ===========================
app.get('/', (req, res) => {
  res.json({ message: 'PartyLink API is running!' });
});

// ===========================
// ROUTES 
// ===========================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/bookings', require('./routes/bookings'));

// ===========================
// START SERVER
// ===========================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});