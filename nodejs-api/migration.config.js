/**
 * Configuration permettant les migrations de la base de données
 */
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  db: {
    user: process.env.MIGRATION_USER || '',
    host: process.env.MIGRATION_HOST
    || '',
    database: process.env.MIGRATION_DATABASE || '',
    password: process.env.MIGRATION_PASSWORD || '',
    port: 5432,
  },
};