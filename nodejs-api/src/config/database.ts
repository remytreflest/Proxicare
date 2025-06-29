// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.POSTGRES_DB || '';
const user = process.env.POSTGRES_USER || '';
const password = process.env.POSTGRES_PASSWORD || '';

const sequelize = new Sequelize(db, user, password, {
  host: 'db',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
