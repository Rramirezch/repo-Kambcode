import { Op } from '@sequelize/core';
import Artists from '../models/artists.models.js';
import Songs from '../models/songs.model.js';

export class ArtistsController {



    getArtist = async (req, res) => {
        const { limit } = req.query;
    
        try {
            const artist = await Artists.findAll({
                //attributes: ['releaseYear', 'id']
                include: {   
                model: Songs,
                attributes: ['title', 'id'],
                },
                limit,
            });
            res.json(artist);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server Error'});
        }
        
    }

    
    getArtistWithSongs = async (req, res) => {
        const id = parseInt(req.query.id);    
        try {
            const artist = await Artists.findAll({
                where: {
                    model: Songs,
                    attributes: ['title', 'duration']
                }
            })
              
    
            res.json(artist);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server Error'});
        }
        
    }

    
    getArtistByName = async (req, res) => {

        try {
            const { name } = parseInt(req.params.id);

            if (!name) return res.status(404).json({message: 'artist Not found'});

            const artist = await Artists.findOne({ where: {name: name} })

            res.json(artist);
            
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }

    }

    
    getSongsByArtist = async (req, res) => {

        try {
            const id = parseInt(req.params.id);
        
            const artist =  await Artists.findAll({
                where: { id },
                include: {
                    model: Songs,
                    attributes: ['title', 'id']
                }
            });
            res.json(artist[0]);
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'});
        }

    }

    getArtistBySongsDuration = async (req, res) => {

        try {
            const duration = parseInt(req.params.duration);

            //gt > x,
            //gte >= x,
        
            const artist =  await Artists.findAll({
                include: {
                    model: Songs,
                    attributes: ['title', 'duration', 'releaseYear'],
                    where: { duration: { [Op.gte]: duration}}
                }
            });
            res.json(artist);
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'});
        }

    }

    getArtistById = async (req, res) => {

        try {
            const id = parseInt(req.params.id);
        
            const artist =  await Artists.findByPk(id);

            if (!artist) return res.status(404).json({message: 'movie Not found'});
            res.json(artist);
            
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }

    }

    create = async (req, res) => {

        try {
            const { name, bio, photoUrl } = req.body
    
            if (!name || !bio || !photoUrl ){
                return res.status(400).send('format Invalid')};
    
            const artist = await Artists.create({name, bio, photoUrl});

        console.log(artist)
            res.status(201).json(artist);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server Error'});   
        }
    }

    updateArtist = async (req, res ) => {

        try {
            const id = parseInt(req.params.id);
            const { name, bio, photoUrl } = req.body
            console.log(req.body)
    
            if (!name || !bio || !photoUrl ){
                return res.status(400).send('format Invalid')};
    
            //const movies = await Movies.update({releaseYear, title, genre}, {where: {id}});
            const artist = await Artists.findByPk(id);
            console.log(artist)
            
            if (!artist) return res.status(404).json({message: "movie not Found"});

            artist.set({
                name,
                bio,
                photoUrl
            })
            await artist.save();

            res.status(200).json(artist)
        } catch (error) {
            
        }
    }

    deleteArtist = async (req, res) => {

        try {
            const id = parseInt(req.params.id);
        
            const result = await Artists.destroy({ where: { id: id}});
            console.log(result);
    
            if (!result || result <= 0) return res.status(404).json({message: 'Movie Not Found'});
            res.json({id: id});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(error);
        }
    }

};
