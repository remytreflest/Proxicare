const pool = require('../../db');

async function getAllUsers()
{
  const result = await pool.query('SELECT * FROM "Users"');
  return result.rows;
}

export default getAllUsers;