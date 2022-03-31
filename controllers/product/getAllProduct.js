const productService = require('../../services/productService');

const getAll = async (req, res, next) => {
  try {
    const products = await productService.getAll();
    return res.status(products.code).json(products.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll };