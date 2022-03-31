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
  const productExist = products.some((elem) => elem.name === name);
  if (productExist) {
    return { code: 409, payload: { message: 'Product already exists' } };
  }
  const product = await productsModel.register(name, quantity);
  return { code: 201, payload: product };
};

const update = async (name, quantity, id) => {
  const productExist = await productsModel.getById(id);
  if (!productExist) {
    return { code: 404, payload: { message: 'Product not found' } };
  }
  const updatePerformed = await productsModel.update(name, quantity, id);
  return { code: 200, payload: updatePerformed };
};

module.exports = { getAll, getById, register, update };