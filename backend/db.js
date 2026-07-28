const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
  rejectUnauthorized: false,
  sslmode: 'verify-full'
}
});

pool.connect()
  .then(() => console.log('Connected to Neon database!'))
  .catch(err => console.error('Database connection error:', err));

module.exports = pool;