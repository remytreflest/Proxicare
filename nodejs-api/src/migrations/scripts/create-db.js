const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'db',
  port: 5432,
  database: 'postgres', // Connexion à postgres pour pouvoir créer une autre base
});

const dbName = process.env.POSTGRES_DB;

client.connect()
  .then(() => client.query(`CREATE DATABASE ${dbName};`))
  .then(() => console.log(`Database "${dbName}" created.`))
  .catch(err => {
    if (err.code === '42P04') {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      console.error('Error creating database:', err);
    }
  })
  .finally(() => client.end());
