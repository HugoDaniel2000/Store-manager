const saleService = require('../../services/saleService');

const getAll = async (req, res, next) => {
  try {
    const sales = await saleService.getAll();
    return res.status(sales.code).json(sales.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = getAll;