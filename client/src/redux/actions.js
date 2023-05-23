import { ALL_VIDEOGAMES, VIDEOGAME_DETAILS, VIDEOGAME_BY_NAME, GENRES, NEW_VIDEOGAME, FILTER } from "./actions-types";
import axios from "axios";
const url="http://localhost:3001";

export function getAllVideogames() {
    return async function (dispatch) {
        try {
            const result = await axios(`${url}/videogames`);
            return dispatch({
                type: ALL_VIDEOGAMES,
                payload: result.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    };
}

export function getVideogameDetails(id) {
    return async function (dispatch) {
        try {
            const result = await axios(`${url}/videogames/${id}`);
            return dispatch({
                type: VIDEOGAME_DETAILS,
                payload: result.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    };
}

export function getVideogameByName(name) {
    return async function (dispatch) {
        try {
            const result = await axios(`${url}/videogames?name=${name}`);
            return dispatch({
                type: VIDEOGAME_BY_NAME,
                payload: result.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    };
}

export function getGenres() {
    return async function (dispatch) {
        try {
            const result = await axios(`${url}/genres`);
            return dispatch({
                type: GENRES,
                payload: result.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    };
}

export function postVideogames(dataGame) {
    return async function (dispatch) {
      try {
        const result = await axios.post(`${url}/videogames`, dataGame);
        dispatch({ type: NEW_VIDEOGAME, payload: result.data });
      } catch (error) {
        console.log(error.message)
      }
    };
}

export function Filter(filtros) {
    return {
        type: FILTER,
        payload: filtros,
    };
}