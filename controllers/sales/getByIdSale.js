const saleService = require('../../services/saleService');

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await saleService.getById(id);
    return res.status(sale.code).json(sale.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = getById;