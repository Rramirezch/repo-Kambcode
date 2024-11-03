import { Server } from './server.js';
import  { Router }  from 'express';
import sequelize from './src/db/sequelize.js';
import artistRoutes from './src/routes/artistRoutes.js';
import songRoutes from './src/routes/songRoutes.js';

import env from './src/config/env.js';

import './src/models/songs.model.js';
import './src/models/artists.models.js'

const router = Router();
router.use(songRoutes);
router.use(artistRoutes);

//routes:router
async function main() {

  const server = new Server({
    port : env.port,
    routes: router,
  });

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync({ force: false });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  server.start();

}

main();
