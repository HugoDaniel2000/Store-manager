// Renomeie esse arquivo
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const validateName = (req, res, next) => {
const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = { validateName, validateQuantity };