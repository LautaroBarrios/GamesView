import React from "react";
import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGenres, postVideogames, } from "../../redux/actions.js";
import { NavLink } from "react-router-dom";
import { Loading } from "../Loading/Loading.jsx";
import { validate } from "./validate";

const FormPage = () => {
    const dispatch = useDispatch();
    const platforms = useSelector((state) =>
        state.allVideogames
        .map((game) => Array.isArray(game.platforms) ? game.platforms?.map((p) => p?.platform?.name): [] ) ?.flat()
    );
    const [create, setCreate] = useState(false);
    let uniquePlatforms = [...new Set(platforms)];
    const genres = useSelector((state) => state.genres);
    const [loading, setLoading] = useState(true);
    const [empy, setEmpy] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        platforms: [],
        description: "",
        released: "",
        rating: 0,
        image: "",
        genres: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        !platforms || dispatch(getAllVideogames());
        dispatch(getGenres());
        setTimeout(() => {
        setLoading(false);
        }, 500);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
        if (
            inputs.name !== "" &&
            inputs.platforms.length > 0 &&
            inputs.description !== "" &&
            inputs.released !== "" &&
            inputs.rating !== 0 &&
            inputs.image !== "" &&
            inputs.genres.length > 0
        ) {
            setLoading(true);
            let formatPlatforms = inputs.platforms.map((p) => {
            return {
                platform: {
                name: p,
                },
            };
            });

            let formatGenres = inputs.genres.map((genreName) => {
            const matchingGenre = genres.find(
                (genre) => genre.name === genreName
            );
            return matchingGenre ? matchingGenre.id : null;
            });
            let gamePost = {
            name: inputs.name,
            description: inputs.description,
            platforms: formatPlatforms,
            background_image: inputs.image,
            released: inputs.released,
            rating: Number(inputs.rating),
            genres: formatGenres,
            };
            dispatch(postVideogames(gamePost));
            setInputs({
            name: "",
            platforms: [],
            description: "",
            released: "",
            rating: 0,
            image: "",
            genres: [],
            });
            setTimeout(() => {
            setLoading(false);
            setCreate(true);
            }, 500);
        } else {
            setEmpy(true);
        }
        }
    };
    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputs({
        ...inputs,
        [name]: value,
        });
        setErrors(
        validate({
            ...inputs,
            [name]: value,
        })
        );
    }

    const handleSelectorChange = (event) => {
        const { name, value } = event.target;

        setInputs({
        ...inputs,
        [name]: [value, ...inputs[name]],
        });
    };

    const removePlatform = (platform) => {
        const filterPlatform = inputs.platforms.filter((p) => p !== platform);
        setInputs({
        ...inputs,
        platforms: filterPlatform,
        });
    };

    const removeGenre = (genre) => {
        const filterGenre = inputs.genres.filter((g) => g !== genre);
        setInputs({
        ...inputs,
        genres: filterGenre,
        });
    };

    const empyMessage = () => {
        return (
        <div className={styles.empy}>
            <div className={styles.empyMessage}>
            <h4>Complete all requested items</h4>
            <button onClick={() => setEmpy(false)}>OK</button>
            </div>
        </div>
        );
    };

    const createMessage = () => {
        return (
        <div className={styles.create}>
            <div className={styles.createMessage}>
            <h4>New videogame created</h4>
            <NavLink to={"/home"}>
                <button onClick={() => setCreate(false)}>OK</button>
            </NavLink>
            </div>
        </div>
        );
    };
    return (
        <div>
        <section>
            <div className={styles.container}>
                <NavLink to={"/"}>
                <div className={styles.landing}>
                    <h2>GAMES<br/>VIEW</h2>
                </div>
                </NavLink>
                {loading ? (
                <Loading />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                className={styles.title}
                                type="text"
                                name="name"
                                placeholder="Name Videogame"
                                value={inputs.name}
                                onChange={handleInputChange}
                            /><br/>
                            <label
                                htmlFor="name"
                                className={styles.error}
                            >
                                {errors.name && `${errors.name}`}
                            </label>
                        </div>
                            <select
                                className={styles.formSelect}
                                name="platforms"
                                id="platforms"
                                value={inputs.platforms[0]}
                                onChange={handleSelectorChange}
                            >
                                <option key="defaul">Platforms</option>
                                {inputs.platforms.length < 9 &&
                                uniquePlatforms
                                    .filter(
                                    (platform) => !inputs.platforms.includes(platform)
                                    )
                                    .map((platform, index) => {
                                    return <option key={index}>{platform}</option>;
                                    })}
                            </select>
                            <div>
                                {inputs?.platforms?.map((platform, index) => {
                                return (
                                    <div key={index}>
                                        <h4 className={styles.nameX} onClick={() => removePlatform(platform)}>{platform}</h4>
                                    </div>
                                );
                                })}
                            </div>

                            <select
                                className={styles.formSelect}
                                name="genres"
                                id="genres"
                                value={inputs.genres[0]}
                                onChange={handleSelectorChange}
                            >
                                <option key="defaul">Genres</option>
                                {inputs.genres.length < 4 &&
                                genres
                                    .filter((genre) => !inputs.genres.includes(genre.name))
                                    .map((genre, index) => {
                                    return <option key={index}>{genre.name}</option>;
                                    })}
                            </select>
                            <div>
                                {inputs.genres &&
                                inputs?.genres?.map((genre, index) => {
                                    return (
                                    <div key={index}>
                                        <h4 className={styles.nameX} onClick={() => removeGenre(genre)}>{genre} </h4>
                                    </div>
                                    );
                                })}
                            </div>
                        <div>
                            <input
                                className={styles.title}
                                type="text"
                                name="image"
                                placeholder="URL Image"
                                value={inputs.image}
                                onChange={handleInputChange}
                            /><br/>
                            <label
                                htmlFor="image"
                                className={styles.error}
                            >
                                {errors.image && `${errors.image}`}
                            </label>
                        </div>
                        <div>
                            <input
                                className={styles.title}
                                type="date"
                                name="released"
                                placeholder="date"
                                value={inputs.released}
                                onChange={handleInputChange}
                            /><br/>
                            <label
                                htmlFor="released"
                                className={styles.error}
                            >
                                {errors.released && `${errors.released}`}
                            </label>
                        </div>
                        <div>
                            <textarea
                                className={styles.description}
                                placeholder="Description of the videogame"
                                name="description"
                                value={inputs.description}
                                onChange={handleInputChange}
                            ></textarea><br/>
                            <label
                                htmlFor="textarea"
                                className={styles.error}
                            >
                                {errors.description && `${errors.description}`}
                            </label>
                        </div>
                        <div className={styles.range}>
                            <input
                            type="range"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            value={inputs.rating}
                            onChange={handleInputChange}
                            /><br/>
                            <label htmlFor="range">Rating {inputs.rating}</label>
                        </div>
                        
                        <div className={styles.buttons}>
                            {empy && empyMessage()}
                            {create && createMessage()}
                            <div>
                                <button type="submit">CREATE NEW VIDEOGAME</button>
                            </div>
                        </div>               
                    </form>
                )}
                <div className={styles.buttons}>
                    <NavLink to={"/home"} >
                        <button>BACK</button>
                    </NavLink>
                </div>
            </div>
        </section>
        </div>
    );
};

export default FormPage;