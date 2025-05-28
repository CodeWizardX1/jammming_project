import React from "react";
import styles from "./SearchResults.module.css";

function SearchResults() {
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.resultsHeading}>Results</h1>
      </div>
      <div className={styles.tracklistContainer}></div>
    </div>
  );
}

export default SearchResults;
