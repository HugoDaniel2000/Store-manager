const productService = require('../../services/productService');

const update = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const products = await productService.update(name, quantity, id);
    return res.status(products.code).json(products.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = update;