import  { Router }  from 'express';
//import sequelize from '../db/sequelize.js';
import { ArtistsController } from '../controllers/artists.controller.js';

//import { QueryTypes } from "sequelize";


const artistRoutes = Router();
const controller = new ArtistsController();
artistRoutes.get('/artists', controller.getArtist);

artistRoutes.get('/artists/:id/songs', controller.getSongsByArtist)

artistRoutes.get('/artists-by-song-duration/:duration', controller.getArtistBySongsDuration)

artistRoutes.get('/artists/:id', controller.getArtistByName);

artistRoutes.get('/artists/:id', controller.getArtistById);

artistRoutes.post('/artists', controller.create);

artistRoutes.put('/artists/:id', controller.updateArtist);

artistRoutes.delete('/artists/:id', controller.deleteArtist)



export default artistRoutes;