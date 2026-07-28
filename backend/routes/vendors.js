const express = require('express');
const router = express.Router();
const pool = require('../db');

// ===========================
// GET ALL VENDORS
// ===========================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT vp.*, u.name, u.email, u.phone, c.name AS category_name
      FROM vendor_profiles vp
      JOIN users u ON vp.user_id = u.id
      JOIN categories c ON vp.category_id = c.id
      WHERE vp.verified = true
      ORDER BY vp.rating DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===========================
// GET SINGLE VENDOR BY ID
// ===========================
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await pool.query(`
      SELECT vp.*, u.name, u.email, u.phone, c.name AS category_name
      FROM vendor_profiles vp
      JOIN users u ON vp.user_id = u.id
      JOIN categories c ON vp.category_id = c.id
      WHERE vp.id = $1
    `, [id]);

    if (vendor.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found.' });
    }

    // Get vendor services
    const services = await pool.query(
      'SELECT * FROM services WHERE vendor_id = $1', [id]
    );

    // Get vendor reviews
    const reviews = await pool.query(`
      SELECT r.*, u.name AS customer_name
      FROM reviews r
      JOIN users u ON r.customer_id = u.id
      WHERE r.vendor_id = $1
      ORDER BY r.created_at DESC
    `, [id]);

    res.json({
      vendor: vendor.rows[0],
      services: services.rows,
      reviews: reviews.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===========================
// CREATE VENDOR PROFILE
// ===========================
router.post('/create', async (req, res) => {
  const { user_id, business_name, description, category_id, location, pricing_info } = req.body;

  if (!user_id || !business_name || !category_id) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    const newVendor = await pool.query(`
      INSERT INTO vendor_profiles (user_id, business_name, description, category_id, location, pricing_info)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [user_id, business_name, description, category_id, location, pricing_info]);

    res.status(201).json({
      message: 'Vendor profile created successfully!',
      vendor: newVendor.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;