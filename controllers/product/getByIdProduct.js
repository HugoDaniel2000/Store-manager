const productService = require('../../services/productService');

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const products = await productService.getById(id);
    return res.status(products.code).json(products.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = getById;