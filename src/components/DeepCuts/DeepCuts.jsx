import React from "react";

import "./deep-cuts.css";

export default function DeepCuts(props) {
  const { currentTracks } = props;
  const deepCuts = currentTracks.slice(0, 5);

  return (
    <div className="deep-cuts">
      <h4>Deep Cuts:</h4>
      {deepCuts.map((song) => {
        return (
          <div className="song">
            <h5 style={{ color: "#63A088" }}>{song.artists[0].name}</h5>
            <h5>{song.name}</h5>
          </div>
        );
      })}
    </div>
  );
}
