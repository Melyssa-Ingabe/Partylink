const express = require('express');
const router = express.Router();
const pool = require('../db');

// ===========================
// Create review
// ===========================
router.post('/create', async (req, res) => {
  const { customer_id, vendor_id, rating, comment } = req.body;

  if (!customer_id || !vendor_id || !rating) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  try {
    // Create the review
    const newReview = await pool.query(`
      INSERT INTO reviews (customer_id, vendor_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [customer_id, vendor_id, rating, comment]);

    // Update vendor average rating
    await pool.query(`
      UPDATE vendor_profiles
      SET rating = (
        SELECT ROUND(AVG(rating)::numeric, 1)
        FROM reviews
        WHERE vendor_id = $1
      )
      WHERE user_id = $1
    `, [vendor_id]);

    res.status(201).json({
      message: 'Review submitted successfully!',
      review: newReview.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===========================
// Get all reviews for a vendor
// ===========================
router.get('/vendor/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT r.*, u.name AS customer_name
      FROM reviews r
      JOIN users u ON r.customer_id = u.id
      WHERE r.vendor_id = $1
      ORDER BY r.created_at DESC
    `, [vendor_id]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;