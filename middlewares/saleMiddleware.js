const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const validateProductId = (req, res, next) => {
  const array = req.body;
  const isNumber = array.some((e) => Number.isInteger(e.productId));
  if (!isNumber) {
    return res.status(BAD_REQUEST).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const array = req.body;

  const isUndefined = array.some((e) => e.quantity === undefined);
  if (isUndefined) {
  return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  }
  const isGreaterEqualZero = array.some((e) => e.quantity <= 0);
  if (isGreaterEqualZero) {
  return res.status(UNPROCESSABLE_ENTITY)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = { validateProductId, validateQuantity };
