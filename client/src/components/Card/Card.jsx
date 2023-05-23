import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({id, image, name, genres }) => {
    return(
        <Link to={`/detail/${id}`} key={id}>
            <div className={styles.card} key={id}>
                <div className={styles.cardGenres}>
                    {genres?.map((genre) => {
                        return (
                            <p key={genre.name}>
                                {genre.name}
                            </p>
                        );
                    })}
                </div>
                <img className={styles.image} src={image} alt={name} width="230px" height="150" />
                <h2 className={styles.videogameName}>{name}</h2>
            </div>
        </Link>
    );
};

export default Card;