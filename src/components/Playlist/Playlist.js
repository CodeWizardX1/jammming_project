import React from "react";
import styles from "./Playlist.module.css";
import Track from "../Track/Track";

function Playlist({ playlistName, playlistTracks }) {
  return (
    <div className={styles.playlistContainer}>
      <input
        className={styles.playlistTitle}
        type="text"
        value={playlistName}
      />
      <div className={styles.tracklistContainer}>
        {playlistTracks.map((track) => (
          <Track key={track.id} track={track} isRemoval={true}/>
        ))}
      </div>
      <button className={styles.saveButton}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
