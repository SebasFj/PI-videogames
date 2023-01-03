import {
    GET_ALL_GAMES,
    SEARCH_GAME,
    GET_GAME_DETAIL,
    GET_GENRES,
    GET_PLATFORMS,
    CREATE_GAME,
    SET_ACTIVE_PLATFORM,
    SET_INITIAL_INPUTS,
    UPDATE_SEARCH,
    SET_HOME_INPUTS,
    SET_CURRENT_PAGE,
} from "./actions.js";

const initialState = {
    games:[],
    currentPage:1,
    search:"",  
    foundGames: [],
    gameDetail: {},
    createdGames: [],
    genres: [],
    platforms: [],
    activePlatform:null,
    inputs:{
        name: "",
        image: "",
        genres: [],
        description: "",
        released: "",
        rating: 0,
        platforms: []
    },
    homeInputs:{
        genreFilter:"All",
        createdFilter:"All",
        nameOrder:"none",
        ratingOrder:"none",
    }
}

export default function reducer (state = initialState, action) {
    switch(action.type){
        case GET_ALL_GAMES:
            return {
                ...state,
                games:action.payload,
            }
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.payload
            }
        case SEARCH_GAME:
            return {
                ...state,
                games: action.payload,
                foundGames: action.payload
            }
        case CREATE_GAME:
            let idArray = [
                ...state.createdGames,
                ...action.payload
            ]
            idArray = idArray.filter((id,index)=>idArray.indexOf(id)===index)
            return {
                ...state,
                createdGames: idArray
            }
        case UPDATE_SEARCH:
            return{
                ...state,
                search: action.payload,
                currentPage: 1
            }
        case GET_PLATFORMS: 
        return {
            ...state,
            platforms: action.payload
        }
        case GET_GENRES: 
        return {
            ...state,
            genres: action.payload
        }
        case SET_ACTIVE_PLATFORM:
            return {
                ...state,
                activePlatform: action.payload
            }
        case SET_INITIAL_INPUTS:
            return {
                ...state,
                inputs: action.payload
            }
        case SET_HOME_INPUTS:
            let {genreFilter, nameOrder, ratingOrder, createdFilter} = action.payload
            if(ratingOrder!==state.homeInputs.ratingOrder){
                nameOrder="none"
            }else if (nameOrder!==state.homeInputs.nameOrder){
                ratingOrder="none"
            }
            let filterAndOrderedGames = []
            if (genreFilter!=="All"){
                state.foundGames.forEach(game=>{
                    game.genres.forEach(genre=>{
                        if (genre.name===genreFilter){
                            filterAndOrderedGames.push(game)
                        }
                    })
                })
            }else{
                filterAndOrderedGames = [...state.foundGames]
            }
            if (createdFilter!=="All"){
                if (createdFilter==="Created"){
                    filterAndOrderedGames = filterAndOrderedGames.filter(
                        game=>state.createdGames.includes(game.id)
                    )
                }else{
                    filterAndOrderedGames = filterAndOrderedGames.filter(
                        game=>!state.createdGames.includes(game.id)
                    )
                }
            }
            if (nameOrder!=="none"){
                if (nameOrder==="Ascendant"){
                    filterAndOrderedGames.sort(function (a, b) {
                        if (a.name > b.name) {
                        return 1;
                        }
                        if (a.name < b.name) {
                        return -1;
                        }
                        return 0;
                    });
                }else{
                    filterAndOrderedGames.sort(function (a, b) {
                        if (a.name > b.name) {
                        return -1;
                        }
                        if (a.name < b.name) {
                        return 1;
                        }
                        return 0;
                    });
                }
            }

            if (ratingOrder!=="none"){
                if (ratingOrder==="Ascendant"){
                    filterAndOrderedGames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                          return 1;
                        }
                        if (a.rating < b.rating) {
                          return -1;
                        }
                        return 0;
                      });
                }else{
                    filterAndOrderedGames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                          return -1;
                        }
                        if (a.rating < b.rating) {
                          return 1;
                        }
                        return 0;
                      });
                }
            }
            return {
                    ...state,
                    games: filterAndOrderedGames,
                    homeInputs:{
                        genreFilter,
                        nameOrder,
                        createdFilter,
                        ratingOrder
                    }
                }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default: 
            return state;
    }
}

