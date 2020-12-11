import React from "react";

import "./artist-card.css";

export default function ArtistCard(props) {
  const { artist, style } = props;
  return (
    <div className="artistCard"
      style={style}>
      <img
        src={
          artist.images[0]
            ? artist.images[0].url
            : "https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png"
        }
        alt={artist.name}
      />
      <p>{artist.name}</p>
    </div>
  );
}
