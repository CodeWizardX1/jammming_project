import React from "react";
import styles from "./Playlist.module.css";

function Playlist() {
  return (
    <div className={styles.playlistContainer}>
      <div className={styles.borderline}></div>
      <div className={styles.tracklistContainer}></div>
      <button className={styles.saveButton}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
