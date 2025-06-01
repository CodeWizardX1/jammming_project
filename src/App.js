import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Playlist from "./components/Playlist/Playlist";
import SearchResults from "./components/SearchResults/SearchResults";
import Spotify from "./utils/Spotify";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) return;
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    setTracks((prev) => prev.filter((item) => item.id !== track.id));
  };

  const removeFromPlaylist = (track) => {
    setPlaylistTracks((prev) =>
      prev.filter((savedTrack) => savedTrack.id !== track.id)
    );
    // Optionally add back to search results:
    // setTracks(prev => [...prev, track]);
  };

  const handleChange = ({ target }) => {
    setPlaylistName(target.value);
  };

  const handleSearch = async (term) => {
    if (!isAuthorized) {
      const token = await Spotify.getAccessToken();
      if (token) {
        console.log("Access token obtained:", token);
        setIsAuthorized(true);
      } else {
        console.warn("Spotify login required.");
        return; // Exit early if login fails
      }
    }

    const searchResults = await Spotify.search(term);
    setTracks(searchResults);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName("My Playlist");
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      <Header />
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
    </div>
  );
}

export default App;
