const {
  findOne, findStyles, findMany, findRelated,
} = require('./models');

const getProducts = async (req, res) => {
  const { count, page } = req.query;
  const data = await findMany(page, count);
  res.json(data);
};
const getOneProduct = async (req, res) => {
  const id = req.params.product_id;
  const data = await findOne(id);
  res.json(data);
};
const getStyles = async (req, res) => {
  const id = req.params.product_id;
  const data = await findStyles(id);
  res.json(data);
};
const getRelated = async (req, res) => {
  const id = req.params.product_id;
  const data = await findRelated(id);
  res.json(data);
};
// const addProduct = async (req, res) => {
//   console.log(req.params);
//   const data = await addToProducts(id);
//   res.json(data);
// };

module.exports = {
  getProducts,
  getOneProduct,
  getStyles,
  getRelated,
};
