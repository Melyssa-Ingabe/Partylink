const express = require('express');
const router = express.Router();
const pool = require('../db');

// ===========================
// Create booking
// ===========================
router.post('/create', async (req, res) => {
  const { customer_id, vendor_id, service_id, event_date, event_type, guest_count, notes, total_price } = req.body;

  if (!customer_id || !vendor_id || !event_date || !event_type) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    const newBooking = await pool.query(`
      INSERT INTO bookings (customer_id, vendor_id, service_id, event_date, event_type, guest_count, notes, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [customer_id, vendor_id, service_id, event_date, event_type, guest_count, notes, total_price]);

    res.status(201).json({
      message: 'Booking request sent successfully!',
      booking: newBooking.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===========================
// Get all bookings for a vendor
// ===========================
router.get('/vendor/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT b.*, u.name AS customer_name, u.email AS customer_email
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      WHERE b.vendor_id = $1
      ORDER BY b.created_at DESC
    `, [vendor_id]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===========================
// Get all bookings for a client
// ===========================
router.get('/client/:customer_id', async (req, res) => {
  const { customer_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT b.*, vp.business_name, vp.location
      FROM bookings b
      JOIN vendor_profiles vp ON b.vendor_id = vp.user_id
      WHERE b.customer_id = $1
      ORDER BY b.created_at DESC
    `, [customer_id]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===========================
// Update booking status
// ===========================
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'accepted', 'declined', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  try {
    const result = await pool.query(`
      UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *
    `, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.json({
      message: 'Booking status updated!',
      booking: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;