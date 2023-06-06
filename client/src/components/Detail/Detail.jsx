import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetails } from "../../redux/actions.js";
import { NavLink } from "react-router-dom";

import styles from "./Detail.module.css";
import { Loading } from "../Loading/Loading.jsx";

const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const detail = useSelector((state) => state.videogameDetails);
    const dispatch = useDispatch();
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getVideogameDetails(id));
        setTimeout(() => {
        setLoading(false);
        }, 2000);
    }, [dispatch, id]);

    const gamePlatform = detail.platforms?.map(
    (platform) => platform.platform?.name
    );
    const gameGenres = detail.genres?.map((genre) => genre.name);
    
    return (
        <div>
            {loading ? <Loading /> : 
                <div className={styles.container}>
                    <div className={styles.infoSup}>
                        <img src={detail.background_image} alt={detail.name} />
                        <div>
                            <h2>{detail.name}</h2>
                        </div>
                        <div>
                            <h4 className={styles.margin}>GENRES</h4>
                            {gameGenres?.map((genre, index) => (
                            <h4 key={index}>{genre}</h4>
                            ))}
                        </div>
                        <div>
                            <h4 className={styles.margin}>PLATFORMS</h4>
                            {gamePlatform?.map((platform) => (
                            <h4 key={platform}>{platform}</h4>
                            ))}
                        </div>
                        <div>
                            <h4 className={styles.margin}>RATING</h4>
                            <h4>{detail.rating}</h4>
                        </div>
                        <div>
                            <h4 className={styles.margin}>LAUNCH</h4>
                            <h4>{detail.released}</h4>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h4 className={styles.marginDescription}>DESCRIPCIÓN</h4>
                        <p>{detail.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    </div>
                    <div>
                        <NavLink to={"/home"} >
                            <button className={styles.back}>BACK</button>
                        </NavLink>
                    </div>
                </div>
            }
        </div>
    );
};

export default DetailPage;