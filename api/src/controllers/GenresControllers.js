const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

const getAllGenres = async () => {
    // Extrae los datos de géneros de la API.
    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
    const getGenres = await axios(url);
    // En una variable, se guardan los nombres de los géneros.
    const allGenres = getGenres.data.results.map((genre) => genre.name);

    // Se itéra y en cada iteración, se realiza una función asincrónica que busca o crea el género en la base de datos 
    // utilizando el método findOrCreate de Sequelize.
    allGenres.map(async (genre) => {
        await Genre.findOrCreate({
            where: { name: genre },
        });
    });

    // genresDb contiene todos los géneros obtenidos de la base de datos o devuelve un error en caso contrario.
    const genresDb = await Genre.findAll();
    if (genresDb.length) {
        return genresDb;
    } else {
        throw new Error("Lamentablemente, no se encuentran géneros en la base de datos.");
    }
};

module.exports = {
    getAllGenres,
};