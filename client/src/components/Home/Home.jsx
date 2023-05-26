import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllVideogames, getVideogameByName, getGenres, Filter, } from "../../redux/actions.js";
import Card from "../Card/Card.jsx";
import { Loading } from "../Loading/Loading.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state);
  const { videogamesDisplay } = useSelector((state) => state);
  const [videogames, setVideogames] = useState([]);
  const [filters, setFilters] = useState({
    alphabetic: "none",
    rating: "none",
    origin: "none",
    genre: "none",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const gamesPerPage = 15;
  const videogamesDisplayLength = videogamesDisplay ? videogamesDisplay.length : 0;
  const pagesCount = Math.ceil(videogamesDisplayLength / gamesPerPage);

  const showVideogames = () => {
    return videogames.map((game) => {
      return (
        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          image={game.background_image}
          genres={game.genres}
        />
      );
    });
  };

  const handlePageChange = (increment) => {
    const nextPage = currentPage + increment;
    if (nextPage >= 0 && nextPage < pagesCount) {
      setLoading(true);
      setCurrentPage(nextPage);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  const renderNavigationButtons = () => {
    return (
      <div className={styles.pagContainer}>
        <button title="Previous" className={styles.pagBtns} onClick={() => handlePageChange(-1)}>◀</button>
        {renderPageNumbers()}
        <button title="Next" className={styles.pagBtns} onClick={() => handlePageChange(1)}>▶</button>
      </div>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i);

    return (
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              key={pageNumber}
              className={`${styles.pagBtns} ${currentPage === pageNumber ? "active" : ""}`}
              onClick={() => {
                if (pageNumber !== currentPage) {
                  setLoading(true);
                  setCurrentPage(pageNumber);
                  setTimeout(() => {
                    setLoading(false);
                  }, 600);
                }
              }}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const restaurarFilter = () => {
    setVideogames([]);
    dispatch(getAllVideogames());
    setFilters({
      alphabetic: "none",
      rating: "none",
      origin: "none",
      genre: "none",
    });
    setLoading(true);
    setCurrentPage(0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleFilters = (event) => {
    const { value, name } = event.target;
    if (filters[name] !== value) {
      setFilters({ ...filters, [name]: value });
      dispatch(Filter(filters));
      setLoading(true);
      setCurrentPage(0);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const inputHandler = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    if (name !== "") {
      dispatch(getVideogameByName(name));
      setVideogames([]);
      setLoading(true);
      setCurrentPage(0);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!videogamesDisplay || videogamesDisplay.length === 0) {
      dispatch(getAllVideogames());
    } else {
      setVideogames(
        videogamesDisplay.slice(
          currentPage * gamesPerPage,
          (currentPage + 1) * gamesPerPage
        )
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [videogamesDisplay, dispatch, currentPage, gamesPerPage]);

  useEffect(() => {
    if (!genres || genres.length === 0) {
      dispatch(getGenres());
    }
  }, [genres, dispatch]);

  useEffect(() => {
    dispatch(Filter(filters));
  }, [filters, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.space}>
        <section>
          <div className={styles.containerhome}>
            <div className={styles.nav}>
                <div className={styles.header}>
                    <NavLink to={"/"}>
                      <h2 className={styles.textTitle}>GAMES VIEW </h2>
                    </NavLink>
                    <div className={styles.searchBar}>
                        <NavLink to={"/create"}>
                        <button title="Create new videogame" className={styles.newVideogame}>+</button>
                        </NavLink>
                        <input
                        type="text"
                        name="search"
                        placeholder="Search Videogames..."
                        onChange={inputHandler}
                        />
                        <button title="Search videogame" className={styles.searchButton} onClick={handleSearch}>
                          SEARCH
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.filterBtns}>
              <select
                  onChange={(sel) => handleFilters(sel)}
                  name="alphabetic"
                  value={filters.alphabetic}
              >
                  <option value="none">ALPHABETICALLY</option>
                  <option value="asc"> A-Z </option>
                  <option value="desc"> Z-A </option>
              </select>
              <select
                  onChange={(sel) => handleFilters(sel)}
                  name="rating"
                  value={filters.rating}
              >
                  <option value="none">RATING</option>
                  <option value="desc">MOST POPULAR</option>
                  <option value="asc">LESS POPULAR</option>
              </select>
              <select
                  onChange={(sel) => handleFilters(sel)}
                  name="genre"
                  value={filters.genre}
              >
                  <option value="none">GENRES</option>
                  {genres?.map((genre, index) => (
                  <option key={index} value={genre.name}>
                      {genre.name}
                  </option>
                  ))}
              </select>
              <select
                  onChange={(sel) => handleFilters(sel)}
                  name="origin"
                  value={filters.origin}
              >
                  <option value="none">ORIGIN</option>
                  <option value="none">ALL</option>
                  <option value="db">CREATED</option>
                  <option value="api">FROM API</option>
              </select>
              <button onClick={restaurarFilter} className={styles.recharge}>
                  RECHARGE
              </button>
            </div>
            <div className={styles.containerCards}>
              {loading ? <Loading /> : showVideogames()}
            </div>
            <div>{renderNavigationButtons()}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
