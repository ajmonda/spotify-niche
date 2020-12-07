import React, { useState } from "react";
import Slider from "rc-slider";

import { rankArtists } from "../../services.js";

import "./main.css";
import "rc-slider/assets/index.css";

export default function Main(props) {
  const [displayedArtists, setDisplayedArtists] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  const { red, orange, yellow, green } = rankArtists(props.artists);

  const positions = {
    red: red.percentage,
    orange: orange.percentage + red.percentage,
    yellow: yellow.percentage + orange.percentage + red.percentage,
    green: 100,
  };

  const onSliderChange = (value) => {
    setSliderValue(value);

    if (sliderValue <= positions.red) {
      setDisplayedArtists(red);
    } else if (sliderValue <= positions.orange && sliderValue > positions.red) {
      setDisplayedArtists(orange);
    } else if (
      sliderValue <= positions.yellow &&
      sliderValue > positions.orange
    ) {
      setDisplayedArtists(yellow);
    } else if (sliderValue <= positions.green) {
      setDisplayedArtists(green);
    }

    console.log(displayedArtists);
  };

  const gradient = `red ${positions.red}%,
    orange ${positions.orange}%,
    yellow ${positions.yellow}%,
    green 100%)`;

  return (
    <main>
      <div>
        <div className="label">
          <h5>Obscure</h5>
          <h5>Popular</h5>
        </div>
        <Slider
          min={0}
          max={100}
          value={sliderValue}
          onChange={onSliderChange}
          railStyle={{
            height: 50,
            borderRadius: 0,
            background: `-moz-linear-gradient(90deg, ${gradient}`,
            background: `-webkit-linear-gradient(360deg, ${gradient}`,
            background: `linear-gradient(90deg, ${gradient}`,
          }}
          handleStyle={{
            height: 50,
            width: 10,
            borderRadius: 0,
            marginTop: 0,
            backgroundColor: "black",
            border: 0,
          }}
          trackStyle={{
            background: "none",
          }}
        />
      </div>

      <div className="artistGrid">
        {displayedArtists
          ? displayedArtists.artists.map((artist) => {
              return (
                <>
                  <p>{artist.name}</p>
                </>
              );
            })
          : null}
      </div>
    </main>
  );
}
