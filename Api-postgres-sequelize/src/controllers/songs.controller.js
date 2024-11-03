import sequelize from '../db/sequelize.js';
import Artists from '../models/artists.models.js';
import  Songs from '../models/songs.model.js';

export class SongsController {

    getSong = async (req, res) => {
        const { limit } = req.query
    
        try {
            const song = await Songs.findAll({
                //attributes: ['releaseYear', 'id']
                //limit,
                include: {
                    model: Artists,
                    attributes: ['name'],
                }
            })
              
    
            res.json(song);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server Error'});
        }
        
    }

    getSongWithArtist = async (req, res) => {
    
        try {
            const song = await Songs.findAll({
                include: {
                    model: Artists,
                    attributes: ['name', 'bio', 'photoUrl']
                }
            });
            res.json(song);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server Error'});
        }
        
    }

    getSongById = async (req, res) => {

        try {
            const id = parseInt(req.params.id);
        
            const song =  await Songs.findByPk(id);

            if (!song) return res.status(404).json({message: 'movie Not found'});
            res.json(song);
            
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }

    }

    getSongByArtist = async (req, res) => {

        try {
            const artistId = parseInt(req.params.artistId);
        
            const song =  await Songs.findAll({
                where: { artistId: artistId },
                include:{ 
                    model: Artists,
                    attributes: ['name'],
                    },
            });
            res.json(song);
            
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }

    }

    create = async (req, res) => {

        try {
            const { title, artistId, releaseYear, duration, coverUrl } = req.body

            console.log(req.body);
    
            if (!title || !artistId || !releaseYear || !duration || !coverUrl ){
                return res.status(400).send('format Invalid')};
                if(isNaN(artistId) || isNaN(releaseYear) || isNaN(duration)){
                    return res.status(404).json({ message: 'releaseYear, artistID and duration, should be a numbers'})
                }
    
            const song = await Songs.create({title, artistId, releaseYear, duration, coverUrl});

        //console.log(song)
            res.status(201).json(song);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server Error'});   
        }
    }

    updateSong = async (req, res ) => {

        try {
            const id = parseInt(req.params.id);
            const { title, artistId, releaseYear, duration, coverUrl } = req.body
            console.log(req.body)
    
            if (!title || !artistId || !releaseYear || !duration || !coverUrl  ){
                return res.status(400).send('format Invalid')};

                if(isNaN(artistId) || isNaN(releaseYear) || isNaN(duration)){
                    return res.status(404).json({ message: 'releaseYear, artistID and duration, should be a numbers'})
                }
    
            //const movies = await Movies.update({releaseYear, title, genre}, {where: {id}});
            const song = await Songs.findByPk(id);
            console.log(song)
            
            if (!song) return res.status(404).json({message: "movie not Found"});

            song.set({
                title,
                artistId,
                releaseYear,
                duration,
                coverUrl
            })
            await song.save();

            res.status(200).json(song)
        } catch (error) {
            
        }
    }

    deleteSong = async (req, res) => {

        try {
            const id = parseInt(req.params.id);
        
            const result = await Songs.destroy({ where: { id: id}});
            console.log(result);
    
            if (!result || result <= 0) return res.status(404).json({message: 'Movie Not Found'});
            res.json({id: id});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(error);
        }
    }

};
