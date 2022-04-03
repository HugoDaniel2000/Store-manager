const connection = require('./connection');

const getAll = async () => {
  const query = (
    `SELECT
        salesProduct.sale_id AS saleId,
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

const getById = async (id) => {
  const query = (
    `SELECT
        sales.date,
        salesProduct.product_id AS productId,
        salesProduct.quantity
     FROM StoreManager.sales_products AS salesProduct
     INNER JOIN StoreManager.sales AS sales
     ON salesProduct.sale_id =  sales.id
     WHERE salesProduct.sale_id = ?
     ORDER BY salesProduct.product_id ASC, salesProduct.sale_id ASC
     `);
  const [result] = await connection.execute(query, [id]);
  return result;
 };

 const create = async (sales) => {
  const [result] = await connection.query('INSERT INTO sales VALUES()');
  const values = sales.map((e) => [result.insertId, e.productId, e.quantity]);
  const query = (
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?');
      await connection.query(query, [values]);
  return { id: result.insertId, itemsSold: [...sales] };
 };

 const update = async (id, sales) => {
   const queryId = (
     'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?');
     const [result] = await connection.execute(queryId, [id]);
   const query = `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
   WHERE sale_Id = ?;`;
   const [values] = sales;
   await connection.execute(query, [values.productId, values.quantity, id]);
   return { saleId: id, itemUpdated: result };
 };

 module.exports = { getAll, getById, create, update };