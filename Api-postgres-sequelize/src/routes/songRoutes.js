import  { Router }  from 'express';
import { SongsController } from '../controllers/songs.controller.js';


const songRoutes = Router();
const controller = new SongsController();

songRoutes.get('/songs', controller.getSong);

songRoutes.get('/songs/:id', controller.getSongById);

songRoutes.get('/songs/:artistId/artists', controller.getSongByArtist);

songRoutes.get('/songs-with-artists', controller.getSongWithArtist)

songRoutes.post('/songs', controller.create);

songRoutes.put('/songs/:id', controller.updateSong);

songRoutes.delete('/songs/:id', controller.deleteSong)

export default songRoutes;