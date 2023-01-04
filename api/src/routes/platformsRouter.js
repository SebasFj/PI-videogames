const {Router} = require("express");
require("dotenv").config();
const {API_KEY} = process.env;
const axios = require("axios");
const {Platform} =require("../db");

async function getPlatforms (){
    try {
        for (let i = 1; i<=2; i++){
            let response = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=${i}`,{
                headers: { "Accept-Encoding": "gzip,deflate,compress" }
            });
            let platformsArray = response.data.results;
            platformsArray.forEach(platform=>{
                Platform.create({
                    id:platform.id,
                    name:platform.name,
                })
            })
        }
    } catch (error) {
        throw new Error (error.message)
    }
};

const platformsRouter = Router();

platformsRouter.route("/")
.get(async (req,res)=>{
    try {
        let platforms = await Platform.findAll();
        if (!platforms.length){
            await getPlatforms();
        }
        let response= await axios(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`,{
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });
        let platformsParents = response.data.results;
        let parents =[];
        platformsParents.forEach(parent=>{
            let platforms = [];
            for (let i = 0; i<parent.platforms.length; i++){
                platforms.push({
                    id:parent.platforms[i].id,
                    name: parent.platforms[i].name,
                })
            }
            parents.push({
                id:parent.id,
                name:parent.name,
                platforms
            })
        })
        res.json(parents)
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = platformsRouter;