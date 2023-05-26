const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const getVideogames = async () => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=`;
  let apiGames = [];
  let page = 1;
  while (apiGames.length !== 100) {
    let result = await axios(`${url}${page}`);
    apiGames = [...apiGames, ...result.data.results];
    ++page;
  }

  apiGames = apiGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
      origin: "api",
      rating: game.rating,
    };
  });

  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
      attributes: [],
      },
    },
  });

  const Games = [...apiGames, ...dbGames];

  let formatGames = Games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
      origin: game.origin,
      rating: game.rating,
    };
  });
  
  if (!formatGames) throw new Error("Unfortunately, no data were found.");

  return formatGames;
};

const createVideogame = async (
    name,
    description,
    platforms,
    background_image,
    launched,
    rating,
    genres
  ) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !background_image ||
    !launched ||
    !rating ||
    !genres
  ) throw Error("Fields are missing to create the videogame.");

  const newGame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    launched,
    rating,
  });
  await newGame.addGenre(genres);
  return newGame;
};

const getGameDetail = async (idVideogame) => {
  try {
    const dbGame = await Videogame.findByPk(idVideogame, {
      include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
      },
    });
    if (dbGame) {
      return {
      id: dbGame.id,
      name: dbGame.name,
      description: dbGame.description,
      platforms: dbGame.platforms,
      background_image: dbGame.background_image,
      launched: dbGame.launched,
      rating: dbGame.rating,
      genres: dbGame.genres,
    };
    } else {
      throw new Error("The videogame was not found.");
    }
  } catch (error) {
    const url = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
    const apiGame = await axios(url);
    if (Object.keys(apiGame.data).length !== 0) {
      return {
      id: apiGame.data.id,
      name: apiGame.data.name,
      description: apiGame.data.description,
      platforms: apiGame.data.platforms,
      background_image: apiGame.data.background_image,
      launched: apiGame.data.launched,
      rating: apiGame.data.rating,
      genres: apiGame.data.genres,
      };
    } else {
      throw new Error("The videogame was not found.");
    }
  }
};

const getGameByName = async (name) => {
  let games = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  games = games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      origin: game.origin,
      rating: game.rating,
    };
  });

  const url = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;
  const apiGame = await axios(url);
  let results = apiGame.data.results;
  results = results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      rating: game.rating,
      origin: "api",
    };
  });

  if (games.length > 0 && results.length > 0) {
    let allGamesByName = [...games, ...results];
    return allGamesByName;
  } else if (games.length === 0 && results.length > 0) {
    return results;
  } else if (games.length > 0 && results.length === 0) {
    return games;
  } else {
    throw new Error("The videogame was not found.");
  }
};

module.exports = {
  getVideogames,
  createVideogame,
  getGameDetail,
  getGameByName,
};
