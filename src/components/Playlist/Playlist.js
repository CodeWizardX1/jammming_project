import React from "react";
import styles from "./Playlist.module.css";
import Track from "../Track/Track";

function Playlist({ playlistName, playlistTracks, onChange, onRemove, onSave}) {
  return (
    <div className={styles.playlistContainer}>
      <input
        className={styles.playlistTitle}
        type="text"
        value={playlistName}
        onChange={onChange}
      />
      <div className={styles.tracklistContainer}>
        {playlistTracks.map((track) => (
          <Track key={track.id} track={track} isRemoval={true} onRemove={onRemove}/>
        ))}
      </div>
      <button className={styles.saveButton} onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
