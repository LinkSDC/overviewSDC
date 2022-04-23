const { Pool } = require('pg');

const db = new Pool({
  user: null,
  host: 'localhost',
  database: 'products',
  password: null,
  port: 5432,
});

module.exports = db;
