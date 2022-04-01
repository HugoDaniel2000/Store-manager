const saleService = require('../../services/saleService');

const update = async (req, res, next) => {
  const { id } = req.params; 
  try {
    const sale = await saleService.update(id, req.body);
    return res.status(sale.code).json(sale.payload);
  } catch (e) {
    next(e);
  }
};

module.exports = update;