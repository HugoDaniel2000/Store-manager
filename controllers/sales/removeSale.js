const saleService = require('../../services/saleService');

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await saleService.remove(id);
    return res.status(sale.code).json(sale.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = remove;