const {Router} = require("express");
require("dotenv").config();
const {API_KEY} = process.env;
const axios = require("axios");
const {Videogame, Genre} =require("../db");

async function getGenres(){
    try {
        let response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`,{
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });
        let genresArray = response.data.results;
        genresArray.forEach(genre=>{
            Genre.create({
                id:genre.id,
                name:genre.name,
            })
        })
    } catch (error) {
        throw new Error (error.message)
    }
};

const genresRouter = Router();

genresRouter.route("/")
.get(async (req,res)=>{
    try {
        let genres = await Genre.findAll();
        if (!genres.length){
            await getGenres();
            genres = await Genre.findAll();
        }
        res.json(genres)
    } catch (error) {
        res.status(400).json(error.message)
    }
    
});

module.exports = genresRouter;