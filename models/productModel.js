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
module.exports = { getAll, getById, register };