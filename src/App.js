import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Playlist from "./components/Playlist/Playlist";
import SearchResults from "./components/SearchResults/SearchResults";
import mockTracks from "./data/mockTracks";

function App() {
  const [tracks, setTracks] = useState(mockTracks);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

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

  return (
    <div className="App">
      <Header />
      <SearchBar />
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
