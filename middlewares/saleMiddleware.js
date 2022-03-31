const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const validateProductId = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(BAD_REQUEST).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity) {
  return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
  return res.status(UNPROCESSABLE_ENTITY)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = { validateProductId, validateQuantity };
