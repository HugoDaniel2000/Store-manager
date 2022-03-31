const productsModel = require('../models/productModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products.length) {
    return { code: 400, payload: [] };
  }
  return { code: 200, payload: products };
};

module.exports = { getAll };