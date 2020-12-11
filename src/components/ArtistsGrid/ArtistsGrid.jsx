import React from "react";

import ArtistCard from "../ArtistCard/ArtistCard";

import "./artists-grid.css";

export default function ArtistsGrid(props) {
  const { displayedArtists } = props;

  return (
    <div className="artistsGridContainer">
      <div className="artistsGrid">
        {displayedArtists.length > 0 ? (
          displayedArtists.map((artist, i) => {
            return <ArtistCard key={i} artist={artist} />;
          })
        ) : (
          <p>Move the slider to explore your top artists.</p>
        )}
      </div>
    </div>
  );
}
