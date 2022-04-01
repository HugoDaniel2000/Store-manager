const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
 const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
 const [result] = await connection.execute(query, [id]);
 return result;
};

const register = async (name, quantity) => {
  const query = ('INSERT INTO StoreManager.products (name, quantity) VALUES(?, ?)');
    const [result] = await connection.execute(query, [name, quantity]);
    return {
      id: result.insertId,
      name,
      quantity,
    };
};

const update = async (name, quantity, id) => {
  const query = (
    `UPDATE StoreManager.products SET name = ?, quantity = ?
     WHERE id = ?`);
  await connection.execute(query, [name, quantity, id]);
  return { id, name, quantity };
};

const remove = async (id) => {
  const query = (
    `DELETE FROM  StoreManager.products
     WHERE id =?`);
  await connection.execute(query, [id]);
};
module.exports = { getAll, getById, register, update, remove };