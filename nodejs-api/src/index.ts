import app from '@/app';
import https from 'https';
import http from 'http';
import fs from 'fs';
import sequelize from '@/config/database';
import { initModels } from '@/models/base';
import 'tsconfig-paths/register';

const PORT = process.env.PORT || 5000;

initModels();
sequelize.sync()
  .then(() => console.log('Database synced with models'))
  .catch((err) => console.error('Error syncing database:', err));

http.createServer(app).listen(PORT, () => {
  console.log(`Serveur HTTP démarré sur http://localhost:${PORT}`);
});