import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const SEARCH_GAME = "SEARCH_GAME";
export const CREATE_GAME = "CREATE_GAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES = "GET_GENRES";
export const SET_ACTIVE_PLATFORM = "SET_ACTIVE_PLATFORM";
export const SET_INITIAL_INPUTS = "SET_INITIAL_INPUTS";
export const SET_HOME_INPUTS = "SET_HOME_INPUTS";
export const UPDATE_SEARCH = "UPDATE_SEARCH";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

const host = "https://pi-videogames-production-8b28.up.railway.app"
// const host = "http://localhost:3001"


export const getAllGames = () => {
    return async (dispatch)=>{
        const response = await axios(`${host}/videogames`);
        let idArray = response.data.databaseGames.map(obj=>obj.id)
        dispatch({
            type: CREATE_GAME,
            payload: idArray
        })
        dispatch({
            type: GET_ALL_GAMES,
            payload: [
                ...response.data.apiGames,
                ...response.data.databaseGames
            ]
        });
    };
};


export const getGameDetail = (id) =>{
    return async (dispatch)=>{
        try {
            const response = await axios(`${host}/videogames/${id}`);
            dispatch({
                type: GET_GAME_DETAIL,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type:GET_GAME_DETAIL,
                payload:error.message
            })
        } 
    };
};


export const createGame = (game) =>{
    return async (dispatch)=>{
        await axios.post(`${host}/videogames`, game);
    }
};


export const searchGame = (name) => {
    return async dispatch => {
        const response = await axios(`${host}/videogames?name=${name.toLowerCase()}`);
        let payload;
        if (name){
            payload = response.data;
        }else{
            payload = [
                ...response.data.apiGames,
                ...response.data.databaseGames
            ]
        }
        dispatch({
            type:SEARCH_GAME,
            payload
        })  
    }
}

export const getPlatforms = () => {
    return async dispatch => {
        const response = await axios(`${host}/platforms`);
        dispatch({
            type: GET_PLATFORMS,
            payload: response.data
        })
    }
}

export const getGenres = () => {
    return async dispatch => {
        const response = await axios(`${host}/genres`);
        dispatch({
            type: GET_GENRES,
            payload: response.data
        })
    }
}

export const setActivePlatform = (platform) => {
    return {
        type: SET_ACTIVE_PLATFORM,
        payload: platform
    }
}

export const setInitialInputs = (inputs) => {
    return {
        type: SET_INITIAL_INPUTS,
        payload: inputs
    }
}

export const setHomeInputs = (inputs) => {
    return{
        type:SET_HOME_INPUTS,
        payload:inputs
    }
}

export const updateSearch = (search)=>{
    return {
        type: UPDATE_SEARCH,
        payload: search
    }
}

export const setCurrentPAge = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    }
}
