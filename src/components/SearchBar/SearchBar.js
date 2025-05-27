import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <div>
        <input type="text" placeholder="Enter a song, album, or artist"></input>
      </div>
      <div>
        <button>Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
