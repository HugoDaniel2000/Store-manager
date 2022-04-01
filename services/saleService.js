const salesModel = require('../models/saleModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales.length) {
    return { code: 200, payload: [] };
  }
  return { code: 200, payload: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) {
    return { code: 404, payload: { message: 'Sale not found' } };
  }
  return { code: 200, payload: sale };
};

const create = async (sales) => {
  const salesId = await salesModel.create(sales);
  return { code: 201, payload: { id: salesId, itemsSold: [...sales] } };
};

module.exports = { getAll, getById, create };