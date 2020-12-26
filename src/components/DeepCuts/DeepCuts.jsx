import React from "react";

import "./deep-cuts.css";

export default function DeepCuts(props) {
  const { currentTracks } = props;

  // top tracks ordered by popularity
  // 5 least popular tracks, excluding singles
  const deepCuts = currentTracks
    .filter((track) => track.album.type !== "SINGLE")
    .slice(0, 5);

  return (
    <div className="deep-cuts">
      <h4>Deep Cuts:</h4>
      {deepCuts.map((song, i) => {
        return (
          <div className="song" key={i}>
            <h5 style={{ color: "#63A088" }}>{song.artists[0].name}</h5>
            <h5>{song.name}</h5>
          </div>
        );
      })}
    </div>
  );
}
