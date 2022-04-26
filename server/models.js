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
      WHERE product_id = $1`, [id]);
  if (!result || !result.rows || !result.rows.length) return [];
  return result.rows[0].product;
}

async function findStyles(id) {
  const result = await db.query(`SELECT s.product_id AS product_id,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'style_id', s.id,
      'name', s.style_name,
      'original_price', s.original_price,
      'sale_price', s.sale_price,
      'default?', s.default_style,
      'photos', (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'thumbnail_url', photos.thumbnail_url,
            'url', photos.url
          )
        )
        FROM photos WHERE photos.style_id=s.id
      ),
      'skus', (
        SELECT JSON_OBJECT_AGG(
          inventory.id, JSON_BUILD_OBJECT(
            'quantity', inventory.quantity,
            'size', inventory.inv_size
          )
        )
        FROM inventory WHERE inventory.style_id=s.id
      )
    )
  ) AS results
  FROM styles s
  WHERE s.product_id = $1
  GROUP BY s.product_id`, [id]);
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
