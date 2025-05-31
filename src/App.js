import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Playlist from "./components/Playlist/Playlist";
import SearchResults from "./components/SearchResults/SearchResults";
// import mockTracks from "./data/mockTracks";
import Spotify from "./utils/Spotify";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    async function fetchToken() {
      const token = await Spotify.getAccessToken();
      console.log("Access Token:", token);
    }
    fetchToken();
  }, []);

  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return; //track is already in the playlist
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  const removeFromPlaylist = (track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  };

  const handleChange = ({ target }) => {
    setPlaylistName(target.value);
  };

  const savePlaylist = () => {
    //returns an array of all the track uris
    const trackUris = playlistTracks.map((track) => track.uri);

    //log array to console
    console.log("Saving playlist with URIs: ", trackUris);

    //clear playlist tracks and clear name input
    setPlaylistTracks([]);
    setPlaylistName("");

    //alert confirmation message
    alert("Saved Playlist to Spotify! (mock)");
  };

  const handleSearch = async (term) => {
    const searchResults = await Spotify.search(term);
    setTracks(searchResults);
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
