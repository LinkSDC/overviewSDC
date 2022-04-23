const db = require('./db');

async function findOne(id) {
  const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows;
}

async function findMany(page = 1, count = 5) {
  const realPage = (page * count) - count;
  const result = await db.query('SELECT * FROM product OFFSET $1 LIMIT $2', [realPage, count]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows;
}

async function findStyles(id) {
  const result = await db.query('SELECT * FROM styles WHERE product_id = $1', [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows;
}

async function findRelated(id) {
  const result = await db.query('SELECT related_id FROM related WHERE product_id = $1 ORDER BY related_id ASC', [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  const temp = [];
  result.rows.forEach((row) => {
    temp.push(row.related_id);
  });
  return temp;
}

// async function addToProducts(id) {
//   const result = await db.query('INSERT INTO product);
// }

module.exports = {
  findOne,
  findStyles,
  findMany,
  findRelated,
};
