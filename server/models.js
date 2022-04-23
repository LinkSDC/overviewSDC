const db = require('./db');

const findOne = (id) => {
  let result;
  db.query('SELECT * FROM product WHERE id = $1', [id])
    .then((res) => {
      result = res.rows[0];
    })
    .catch((err) => console.log('Error in findOne: ', err));
  if (result) return result;
};

module.exports = {
  findOne,
};
