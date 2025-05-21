import app from '@/app';
import sequelize from '@/config/database';
import { initModels } from '@/models/base';
import 'tsconfig-paths/register';

const PORT = process.env.PORT || 5000;

initModels();
sequelize.sync()
  .then(() => console.log('Database synced with models'))
  .catch((err) => console.error('Error syncing database:', err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});