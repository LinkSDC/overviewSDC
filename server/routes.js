const express = require('express');

const routes = express.Router();
const {
  getProducts, getOneProduct, getStyles, getRelated,
} = require('./controllers');

routes.get('/', getProducts);
routes.get('/:product_id', getOneProduct);
routes.get('/:product_id/styles', getStyles);
routes.get('/:product_id/related', getRelated);

module.exports = routes;
