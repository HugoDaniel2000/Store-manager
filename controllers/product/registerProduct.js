const productService = require('../../services/productService');

const register = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const products = await productService.register(name, quantity);
    return res.status(products.code).json(products.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = register;