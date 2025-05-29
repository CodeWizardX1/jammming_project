import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Playlist from "./components/Playlist/Playlist";
import SearchResults from "./components/SearchResults/SearchResults";
import mockTracks from "./data/mockTracks";

function App() {
  const [tracks, setTracks] = useState(mockTracks);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    mockTracks[1],
    mockTracks[2],
  ]);

  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return; //track is already in the playlist
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  const removeFromPlaylist = (track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  };

  return (
    <div className="App">
      <Header />
      <SearchBar />
      <div className="bodyContent">
        <SearchResults tracks={tracks} onAdd={addTrackToPlaylist} />
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeFromPlaylist}/>
      </div>
    </div>
  );
}

export default App;
