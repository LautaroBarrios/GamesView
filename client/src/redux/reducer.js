import { ALL_VIDEOGAMES, VIDEOGAME_DETAILS, VIDEOGAME_BY_NAME, GENRES, NEW_VIDEOGAME, FILTER } from "./actions-types";
  
const initialState = {
  allVideogames: [],
  videogameDetails: {},
  videogamesDisplay: [],
  genres: [],
};
  
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ALL_VIDEOGAMES:
          return {
              ...state,
              allVideogames: payload,
              videogamesDisplay: payload,
          };
      case VIDEOGAME_DETAILS:
          return {
              ...state,
              videogameDetails: payload,
          };
      case VIDEOGAME_BY_NAME:
          return {
              ...state,
              allVideogames: payload,
              videogamesDisplay: payload,
          };
  
      case FILTER:
          const currentFilters = payload;
          let filteredGames = state.allVideogames;

      if (currentFilters.rating === "asc") {
        filteredGames = [...filteredGames].sort((a, b) => a.rating - b.rating);
      } else if (currentFilters.rating === "desc") {
        filteredGames = [...filteredGames].sort((a, b) => b.rating - a.rating);
      }

      if (currentFilters.alphabetic === "asc") {
        filteredGames = [...filteredGames].sort((gameA, gameB) => {
          const nameA = gameA.name.toLowerCase();
          const nameB = gameB.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else if (currentFilters.alphabetic === "desc") {
        filteredGames = [...filteredGames].sort((gameA, gameB) => {
          const nameA = gameA.name.toLowerCase();
          const nameB = gameB.name.toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
      }

      if (currentFilters.genre !== "none") {
        filteredGames = filteredGames.filter((game) =>
          game.genres.some((genre) => genre.name === currentFilters.genre)
        );
      }

      if (currentFilters.origin !== "none") {
        filteredGames = filteredGames.filter(
          (game) => game.origin === currentFilters.origin
        );
      }
      return {
        ...state,
        videogamesDisplay: filteredGames,
      };

      case GENRES:
          return {
          ...state,
          genres: payload,
          };
      case NEW_VIDEOGAME:
          return {
          ...state,
          allVideogames: [...state.allVideogames, payload],
          };
      default:
          return state;
    }
};

export default reducer;