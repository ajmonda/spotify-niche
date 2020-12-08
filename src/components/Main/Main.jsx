import React, { useState } from "react";
import Genres from "./Genres/Genres";
import Slider from "rc-slider";

import { rankArtists, getTopGenres } from "../../services.js";

import "./main.css";
import "rc-slider/assets/index.css";

export default function Main(props) {
  const [displayedArtists, setDisplayedArtists] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  const { red, orange, yellow, green} = rankArtists(
    props.artists
  );
  const genres = getTopGenres(props.artists).slice(0, 30).sort();

  const positions = {
    green: 0,
    yellow: green.percentage,
    orange: yellow.percentage,
    red: 100,
  };

  const onSliderChange = (value) => {
    setSliderValue(value);
    if (sliderValue <= positions.yellow) {
      setDisplayedArtists(green);
    } else if (
      sliderValue >= positions.yellow &&
      sliderValue <= positions.orange
    ) {
      setDisplayedArtists(yellow);
    } else if (
      sliderValue >= positions.orange &&
      sliderValue <= Math.floor(100 - red.percentage)
    ) {
      setDisplayedArtists(orange);
    } else if (sliderValue >= Math.floor(100 - red.percentage)) {
      setDisplayedArtists(red);
    }
  };

  const gradient = `#3DDC97 ${positions.green}%,
    #FFBF00 ${positions.yellow}%,
    #FF842E ${positions.orange}%,
    #FF495C 100%`;

  return (
    <main>
      <Genres genres={genres} />

      <div>
        <Slider
          min={1}
          max={100}
          value={sliderValue}
          onChange={onSliderChange}
          railStyle={{
            height: 50,
            border: "2px solid white",
            borderRadius: 0,
            background: `-moz-linear-gradient(90deg, ${gradient})`,
            background: `-webkit-linear-gradient(360deg, ${gradient})`,
            background: `linear-gradient(90deg, ${gradient})`,
          }}
          handleStyle={{
            height: 48,
            width: 10,
            borderRadius: 5,
            marginTop: 1,
            backgroundColor: "white",
            border: "1px solid black",
          }}
          trackStyle={{
            background: "none",
          }}
        />
        <label>
          <h5 id="popular">Popular</h5>
          <h5 id="obscure">Obscure</h5>
        </label>
      </div>

      <div className="artistGrid">
        {displayedArtists ? (
          displayedArtists.artists.map((artist, i) => {
            return (
              <>
                <p
                  key={i}
                  style={{
                    color: displayedArtists.color,
                  }}
                >
                  {artist.name}
                </p>
              </>
            );
          })
        ) : (
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Move the slider to explore your top artists.
          </p>
        )}
      </div>
    </main>
  );
}