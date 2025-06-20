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

// const key = fs.readFileSync(`../${process.env.YOUR_IP}-key.pem`);
// const cert = fs.readFileSync(`../${process.env.YOUR_IP}.pem`);
// const key = fs.readFileSync(`../localhost-key.pem`);
// const cert = fs.readFileSync(`../localhost.pem`);

// https.createServer({ key, cert }, app).listen(5000, () => {
//   console.log('✅ HTTPS Server running at https://YOUR_IP:5000');
// });

http.createServer(app).listen(PORT, () => {
  console.log(`Serveur HTTP démarré sur http://localhost:${PORT}`);
});