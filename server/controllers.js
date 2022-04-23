const { findOne } = require('./models');

const getProducts = (req, res) => {
  console.log(req.params);
};
const getOneProduct = (req, res) => {
  const id = req.params.product_id;
  const result = findOne(id);
  res.json(result);
};
const getStyles = (req, res) => {
  console.log(req.params);
};
const getRelated = (req, res) => {
  console.log(req.params);
};
const addProduct = (req, res) => {
  console.log(req.params);
};

module.exports = {
  getProducts,
  getOneProduct,
  getStyles,
  getRelated,
  addProduct,
};
