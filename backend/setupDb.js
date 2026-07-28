const pool = require('./db');
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.join(__dirname, 'db.sql'), 'utf8');

pool.query(sql)
  .then(() => {
    console.log('All tables created successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error creating tables:', err);
    process.exit(1);
  });