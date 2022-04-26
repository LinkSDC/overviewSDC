const db = require('./db');

async function findMany(page = 1, count = 5) {
  const realPage = (page * count) - count;
  const result = await db.query('SELECT * FROM product OFFSET $1 LIMIT $2', [realPage, count]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows;
}

async function findOne(id) {
  const result = await db.query(`SELECT json_agg(p)
      AS product
      FROM (
        SELECT *
        FROM product p
        CROSS JOIN LATERAL (
          SELECT json_agg(features)
          AS features
          FROM (
            SELECT feature, feat_val
            FROM features
            WHERE product_id = p.product_id
          ) features
        ) s
      ) p
      WHERE product_id = $1;`, [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows[0].product;
}

async function findStyles(id) {
  const result = await db.query('SELECT * FROM styles WHERE product_id = $1', [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows;
}

async function findRelated(id) {
  const result = await db.query('SELECT json_agg(related_id) FROM related WHERE product_id = $1', [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows[0].json_agg;
}

module.exports = {
  findOne,
  findStyles,
  findMany,
  findRelated,
};

// working array of objects
// SELECT json_agg(json_build_object(
//   'feature', "feature",
//   'value' , "feat_val"))
// FROM   features
// WHERE product_id = 66545;

// working product + related
// SELECT json_agg(pro)
// AS product
// FROM (
//   SELECT *
//   FROM product p
//   CROSS JOIN LATERAL (
//     SELECT json_agg(features) AS features
//     FROM (
//       SELECT feature, feat_val
//       FROM features
//       WHERE product_id = p.product_id
//     ) features
//   ) s
// ) pro WHERE product_id = 66545;

// SELECT *
// FROM (
//   SELECT *
//   FROM product p
//   CROSS JOIN LATERAL (
//     SELECT json_agg(features) AS features
//     FROM (
//       SELECT feature, feat_val
//       FROM features
//       WHERE product_id = p.product_id
//     ) features
//   ) s
// ) pro OFFSET 3 LIMIT 5;

// SELECT * FROM styles
// LEFT JOIN photos
// ON product_id = styles.product_id LIMIT 2;
