import React from "react";

import ArtistCard from "../ArtistCard/ArtistCard";

import "./artists-grid.css";

export default function ArtistsGrid(props) {
  const { displayedArtists } = props;

  return (
    <div className="artistsGridContainer">
      <div className="artistsGrid">
        {displayedArtists.length
          ? displayedArtists.map((artist, i) => {
              return (
                <a href={artist.external_urls["spotify"]} target="_blank">
                  <ArtistCard key={i} artist={artist} />
                </a>
              );
            })
          : <p>Move the slider to explore your top artists.</p>}
      </div>
    </div>
  );
}
