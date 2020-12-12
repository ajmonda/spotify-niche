import React from "react";

import ArtistCard from "../ArtistCard/ArtistCard";

import "./artists-grid.css";

export default function ArtistsGrid(props) {
  const { currentArtists, displayedArtists } = props;

  console.log(currentArtists);
  console.log(displayedArtists);

  return (
    <div className="artistsGridContainer">
      <div className="artistsGrid">
        <p style={{
          width: '100%',
          textAlign: 'center',
        margin: '0 auto 30px auto'}}>Move the slider to explore your top artists.</p>
        {displayedArtists
          ? displayedArtists.map((artist, i) => {
              return (
                <a href={artist.external_urls["spotify"]} target="_blank">
                  <ArtistCard key={i} artist={artist} />
                </a>
              );
            })
          : null}
      </div>
    </div>
  );
}
