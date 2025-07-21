import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from '@/Controllers/base/baseController';
import checkJwt from '@/middlewares/expressjwt.config';
import extractUserId from '@/middlewares/extractUserId';
import { setupSwagger } from '@/swagger';

dotenv.config();

const app = express();
const AUTH_TOKEN_CHECK = checkJwt;


setupSwagger(app);


app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    //if (!origin) return callback(new Error('No origin provided'), false);
    if (!origin) return callback(null, true);

    const allowedOrigins = process.env.API_CORS ?? [''];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-UserId'],
}));

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});
  
// SECURITE : Permet l'accès à l'API uniquement si un token personnalisé x-userid est présent
app.use(extractUserId);
// SECURITE : Permet l'accès à l'API uniquement si un token d'authentification est présent
// Exception faite des routes déclarées dans le unless
app.use(AUTH_TOKEN_CHECK);
// Ajoute les différentes routes de l'api
app.use('/api', routes);

export default app;