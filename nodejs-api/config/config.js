const dotenv = require('dotenv');
dotenv.config();

const db = process.env.POSTGRES_DB || '';
const user = process.env.POSTGRES_USER || '';
const password = process.env.POSTGRES_PASSWORD || '';

const config = {
  development: {
    username: user,
    password: password,
    database: db,
    host: 'db',
    dialect: 'postgres',
  },
  production: {
    username: user,
    password: password,
    database: db,
    host: 'db',
    dialect: 'postgres',
  },
};

module.exports = config;