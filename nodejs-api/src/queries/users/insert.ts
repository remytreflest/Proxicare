const pool = require('../../db');

async function insertUser(firstName: string, lastName: string, email: string, role: string, createdAt: Date)
{
    const result = await pool.query(
        'INSERT INTO "Users" ("FirstName", "LastName", "Email", "Role", "CreatedAt") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, email, role, createdAt]
      );
    return result.rows[0];
}

export default insertUser;