const axios = require("axios");
require("dotenv").config();
const {API_KEY} = process.env;

const getGames = async () => {
    try {
        let games = [];
        for (let i = 1; i<=5; i++){0
            let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`,{ 
                headers: { "Accept-Encoding": "gzip,deflate,compress" } 
            })
            for (let j = 0; j<20; j++){
                let genresArray = response.data.results[j].genres, genres=[];
                genresArray.forEach(genre=>{
                    genres.push({
                        id: genre.id,
                        name: genre.name,
                    })
                })
                games.push({
                    id:response.data.results[j].id,
                    name:response.data.results[j].name.toLowerCase(),
                    image:response.data.results[j].background_image,
                    rating: response.data.results[j].rating,
                    genres,
                })
            }
        }
        return games
    } catch (error) {
        throw new Error (error.message)
    }
}

const getId = ()=>{
    let id = 1;
    return (idArray)=>{
        while (idArray.includes(id)){
            id++;
        }
        return id;
    }
}

const getProperties = (obj, property)=>{
    let array = [];
    for (let i = 0; i<obj[property].length;i++){
        if (property==="platforms"){
            array.push({
                id:obj[property][i].platform.id,
                name:obj[property][i].platform.name,
            })
            continue;
        }
        array.push({
            id: obj[property][i].id,
            name: obj[property][i].name
        })
    }
    return array;
}

module.exports = {
    getProperties,
    getId,
    getGames
}