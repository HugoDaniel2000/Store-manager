const productService = require('../../services/productService');

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const products = await productService.remove(id);
    return res.status(products.code).json(products.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = remove;