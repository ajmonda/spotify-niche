import React from 'react'

import ArtistCard from '../ArtistCard/ArtistCard'

import './artists-grid.css'

export default function ArtistsGrid(props) {
  const { displayedArtists } = props

  return (
    <div className="artistsGrid">
        {displayedArtists.length > 0 ? (
        displayedArtists.map((artist, i) => {
            console.log(artist.images[0])
            return (
              <ArtistCard key={i} artist={artist} />
            );
          })
        ) : (
          <h6>Move the slider to explore your top artists.</h6>
        )}
      </div>
  )
}