const connection = require('./connection');

const getAll = async () => {
  const query = (
    `SELECT salesProduct.sale_id AS saleId,
     sales.date,
     salesProduct.product_id AS productId,
     salesProduct.quantity
     FROM StoreManager.sales_products AS salesProduct
     INNER JOIN StoreManager.sales AS sales
     ON salesProduct.sale_id =  sales.id
     ORDER BY salesProduct.product_id ASC, salesProduct.sale_id ASC
     `);
  const [result] = await connection.execute(query);
  return result;
};

module.exports = { getAll };