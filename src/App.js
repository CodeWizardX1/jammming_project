import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Playlist from "./components/Playlist/Playlist";
import SearchResults from "./components/SearchResults/SearchResults";
import Spotify from "./utils/Spotify";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Fetch access token on mount
  useEffect(() => {
    async function fetchToken() {
      const token = await Spotify.getAccessToken();
      if (token) {
        console.log("Access token obtained:", token);
        setIsAuthorized(true); // Update state to show app features
      } else {
        console.warn("Failed to obtain token.");
        setIsAuthorized(false);
      }
    }
    fetchToken();
  }, []);

  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) return;

    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    setTracks((prevTracks) =>
      prevTracks.filter((item) => item.id !== track.id)
    );
  };

  const removeFromPlaylist = (track) => {
    setPlaylistTracks((prev) =>
      prev.filter((savedTrack) => savedTrack.id !== track.id)
    );
    setTracks((prev) => [...prev, track]); // Optional: add back to search results
  };

  const handleChange = ({ target }) => {
    setPlaylistName(target.value);
  };

  const handleSearch = async (term) => {
    const searchResults = await Spotify.search(term);
    setTracks(searchResults);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris);
    alert(`Successfully Saved ${playlistName} to Spotify!`)
    setPlaylistName("");
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      <Header />
      {isAuthorized ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="bodyContent">
            <SearchResults tracks={tracks} onAdd={addTrackToPlaylist} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeFromPlaylist}
              onChange={handleChange}
              onSave={savePlaylist}
            />
          </div>
        </>
      ) : (
        <p>Please log in to Spotify to use Jammming.</p>
      )}
    </div>
  );
}

export default App;
