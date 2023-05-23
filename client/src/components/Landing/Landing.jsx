import React from "react";
import styles from "./Landing.module.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.space}>
                <h1 className={styles.textTitle}>GAMES<br/>VIEW</h1>
            </div>
            <div> 
                <span className={styles.textSubtitle}>"Insert a coin and press START"</span>
            </div>
            <div className={styles.subContainer}>
                <NavLink to={"/home"} className={styles.navlink}>
                    START
                </NavLink>
            </div>
        </div>
    );
}


export default LandingPage;