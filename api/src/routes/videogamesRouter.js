const { Router } = require('express');
require("dotenv").config();
const {API_KEY} = process.env;
const {getProperties, getId, getGames} = require("../controllers/controllers");

const videogamesRouter = Router();
const {Videogame, Genre, Platform} = require("../db");
const axios = require("axios");
var apiGames, databaseGames;

(async function (){
    apiGames=await getGames();
})();

let id=getId();

videogamesRouter.route("/")
.get(async (req,res)=>{
    try {
        databaseGames = await Videogame.findAll({
            attributes: ["id", "name", "image", "rating"],
            include: [
                {
                    model: Genre,
                    attributes: ["id","name"],
                    through: {attributes:[]}
                }
            ]
        });
        let totalGames = {
            apiGames,
            databaseGames
         }
        if (!req.query.name) {
            res.json(totalGames)
        }else{
            const {name} = req.query;
            let gamesToSend = totalGames.apiGames.filter(game=>game.name.includes(name))
            gamesToSend = [...gamesToSend, ...totalGames.databaseGames.filter(game=>game.name.includes(name))]
            if (gamesToSend.length)res.json(gamesToSend.slice(0,15))
            else {res.json([])}
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    } 
})
.post(async (req,res)=>{
    try {
        const {name, description, released, rating, genres, platforms, image} = req.body;
        let idArray = [];
        apiGames.forEach(game=>{idArray.push(game.id)})
        databaseGames.forEach(game=>{idArray.push(game.id)})
        let newGame = await Videogame.create({
            id: id(idArray),
            name: name.toLowerCase(),
            description,
            released,
            rating,
            image
        });
        await newGame.addGenres(genres);
        await newGame.addPlatforms(platforms);
        // const game = await Videogame.findOne({
        //     where: {id: newGame.id},
        //     include: [
        //         {
        //             model: Platform,
        //             attributes: ["id","name"],
        //             through: {attributes:[]}
        //         },
        //         {
        //             model: Genre,
        //             attributes: ["id","name"],
        //             through: {attributes:[]}
        //         }
        //     ]
        // })
        const arrId = await Videogame.findAll({
            attributes: ["id"]
        })
        res.json(arrId)
        databaseGames = await Videogame.findAll({
            attributes: ["id", "name", "image"],
            include: [
                {
                    model: Genre,
                    attributes: ["id","name"],
                    through: {attributes:[]}
                }
            ]
        });
    } catch (error) {
        res.status(400).json(error.message)
    }
})

videogamesRouter.route("/:id")
.get(async (req,res)=>{
    try {
        let {id} = req.params;
        id=parseInt(id);
        let apiId = apiGames.map(game=>game.id);
        let dbId = databaseGames.map(game=>game.id);
        if (dbId.includes(id)) {
            const game = await Videogame.findAll({
                where: {id},
                include: [
                    {
                        model: Platform,
                        attributes: ["id","name"],
                        through: {attributes:[]} //para que no traiga las timestamps
                    },
                    {
                        model: Genre,
                        attributes: ["id","name"],
                        through: {attributes:[]}
                    }
                ]
            });
            res.json(game[0]);
        }else if(apiId.includes(id)){
            const response = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`,{ 
                headers: { "Accept-Encoding": "gzip,deflate,compress" } 
            });
            const game = response.data;
            let genres = getProperties(game,"genres");
            let platforms = getProperties(game, "platforms");
            res.json({
                id:game.id,
                name:game.name,
                description: game.description,
                released: game.released,
                rating: game.rating,
                image: game.background_image,
                platforms,
                genres,
            })
        }else{
            throw new Error ("ID not found")
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = {
    videogamesRouter,
}