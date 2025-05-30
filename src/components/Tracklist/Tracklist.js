import React from "react";
import Track from "../Track/Track";

function Tracklist({ tracks, isRemoval, onAdd, onRemove}) {
  return (
    <div>
      {tracks.map((track) => (
        <Track key={track.id} track={track} isRemoval={isRemoval} onAdd={onAdd} onRemove={onRemove}/>
      ))}
    </div>
  );
}

export default Tracklist;
