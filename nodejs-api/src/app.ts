import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './Controllers/base/baseController';
import checkJwt from './middlewares/expressjwt.config';
import { extractUserId } from './middlewares/extractUserId';

// Load environment variables
dotenv.config();

const app = express();
const AUTH_TOKEN_CHECK = checkJwt;
  
// Middleware
app.use(express.json());

app.use(cors({
  origin: process.env.API_CORS || 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-UserId'],
}));
  
// SECURITE : Permet l'accès à l'API uniquement si un token personnalisé x-userid est présent
app.use(extractUserId);
// SECURITE : Permet l'accès à l'API uniquement si un token d'authentification est présent
app.use(AUTH_TOKEN_CHECK);
// Ajoute les différentes routes de l'api
app.use('/api', routes);

export default app;