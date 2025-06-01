import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({tracks, onAdd, onLoadMore, hasMoreResults, isLoadingMore}) {
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.resultsHeading}>Results</h1>
      </div>
      <div className={styles.tracklistContainer}>
        <Tracklist tracks={tracks} isRemoval={false} onAdd={onAdd}/>
      </div>
      {hasMoreResults && (
        <div className={styles.loadMoreContainer}>
          <button 
            className={styles.loadMoreButton}
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
