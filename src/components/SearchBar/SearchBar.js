import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = ({ target }) => {
    setTerm(target.value);
  };

  const search = () => {
    onSearch(term);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div>
        <input
          type="text"
          placeholder="Enter a song, album, or artist"
          value={term}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <button className={styles.searchButton} onClick={search}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
