import React from "react";
import styles from "./Track.module.css";

function Track({ track, isRemoval, onAdd, onRemove }) {
  const handleClick = () => {
    isRemoval ? onRemove(track) : onAdd(track);
  };
  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackInfo}>
        <span className={styles.trackName}>{track.name}</span>
        <span className={styles.trackMeta}>
          {track.artist} | {track.album}
        </span>
      </div>
      <button className={styles.addButton} onClick={handleClick}>{isRemoval ? "-" : "+"}</button>
    </div>
  );
}

export default Track;
