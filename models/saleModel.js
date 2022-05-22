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

const quantityAllowed = async (sales) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const valid = await sales.map(async (e) => {
      const [result] = await connection.execute(query, [e.productId]);
      return result.some((elem) => (elem.quantity - e.quantity) < 0);
    });
    const response = await Promise.all(valid).then((data) => data);
    return response.some((e) => e === true);
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

 const decreaseQuantityProduct = async (sales) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?';
  sales.forEach(async (e) => {
    await connection.execute(query, [e.quantity, e.productId]);
  });
 };

 const create = async (sales) => {
   await decreaseQuantityProduct(sales);
  const [result] = await connection.query('INSERT INTO sales VALUES()');
  const values = sales.map((e) => [result.insertId, e.productId, e.quantity]);
  const query = (
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?');
      await connection.query(query, [values]);
  return { id: result.insertId, itemsSold: [...sales] };
 };

 const update = async (id, sales) => {
  const queryId = (
    'SELECT product_id AS productId, quantity FROM StoreManager.sales_products WHERE sale_id = ?');
     const query = `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
     WHERE sale_id = ? AND  product_id = ?`;
     sales.forEach(async (e) => {
       await connection.execute(query, [e.productId, e.quantity, id, e.productId]);
     });
     const [result] = await connection.execute(queryId, [id]);
   return { saleId: id, itemUpdated: result };
 };

//  const update = async (id, sales) => {
//   const query = `UPDATE StoreManager.sales_products SET quantity = ?
//   WHERE sale_id = ? AND product_id = ?;`;
//    sales.forEach(async (e) => {
//     await connection.execute(query, [e.quantity, id, e.productId]);
//   });

// return { saleId: id, itemUpdated: sales };
// };

 const increasedQuantityProduct = async (id) => {
   const queryId = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';
   const [salesId] = await connection.execute(queryId, [id]);
   const query = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?';
   salesId.forEach(async (e) => {
     await connection.execute(query, [e.quantity, e.product_id]);
   });
 };

 const remove = async (id) => {
   await increasedQuantityProduct(id);
  const query = ('DELETE FROM  StoreManager.sales WHERE id = ?');
  const queryProducts = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(queryProducts, [id]);
  await connection.execute(query, [id]);
  return id;
};

 module.exports = {
   getAll,
   getById,
   create,
   update,
   remove,
   increasedQuantityProduct,
   quantityAllowed };