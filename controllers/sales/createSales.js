const saleService = require('../../services/saleService');

const createSales = async (req, res, next) => {
  try {
    const sales = await saleService.create(req.body);
    return res.status(sales.code).json(sales.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = createSales;