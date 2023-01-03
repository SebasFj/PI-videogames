const { Router } = require('express');
const {Videogame, Genre, Platform, Favorites} = require("../db");


const favoritesRouter = Router();

favoritesRouter.route("/")
.get(async (req,res)=>{
    try {
        let ids = await Favorites.findAll();
        res.json(ids)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
.post(async (req,res)=>{
    try {
        const {id} = req.body;
        let idPosted = await Favorites.create({
            id
        })
        let ids = await Favorites.findAll();
        res.json(ids)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
.put(async (req,res)=>{
    try {
        const {id} = req.body;
        const idToDelete = await Favorites.findByPk(id);
        idToDelete.destroy();
        let ids = await Favorites.findAll();
        res.json(ids)
    } catch (error) {
        res.status(400).json({error: error.message})        
    }
})

module.exports={
    favoritesRouter
}