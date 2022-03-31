const productsModel = require('../models/productModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products.length) {
    return { code: 400, payload: [] };
  }
  return { code: 200, payload: products };
};

const getById = async (id) => {
  console.log(id);
  const product = await productsModel.getById(id);
  if (!product.length) {
    return { code: 404, payload: { message: 'Product not found' } };
  }
  return { code: 200, payload: product[0] };
};

module.exports = { getAll, getById };