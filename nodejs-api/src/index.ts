import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from '../routes/routes';
import checkJwt from '../expressjwt.config';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const AUTH_TOKEN_CHECK = checkJwt;
  
  // Middleware
  app.use(express.json());
  app.use(cors({
    origin: process.env.API_CORS || '',
    credentials: true,
  }));
  
app.use(morgan('dev'));

// SECURITE : Permet l'accès à l'API uniquement si un token d'authentification est présent
app.use('/api', AUTH_TOKEN_CHECK);
// Ajoute les différentes routes de l'api
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});