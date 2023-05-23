import React from "react";
import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLoader}>
        <div className={styles.loader1}></div>
        <div className={styles.loader2}></div>
        <div className={styles.loader3}></div>
        <div className={styles.loader4}></div>
      </div>
      <div className={styles.loading}>LOADING</div>  
    </div>
  );
};

