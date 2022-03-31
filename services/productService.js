const productsModel = require('../models/productModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products.length) {
    return { code: 200, payload: [] };
  }
  return { code: 200, payload: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product.length) {
    return { code: 404, payload: { message: 'Product not found' } };
  }
  return { code: 200, payload: product[0] };
};

const register = async (name, quantity) => {
  const products = await productsModel.getAll();
  const verify = products.some((elem) => elem.name === name);
  if (verify) {
    return { code: 409, payload: { message: 'Product already exists' } };
  }
  const product = await productsModel.register(name, quantity);
  return { code: 201, payload: product };
};

module.exports = { getAll, getById, register };