import React, { useState } from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

export default function GradientSlider(props) {
  const { green, yellow, orange, red } = props;

  const [displayedArtists, setDisplayedArtists] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  const gradient = `#3DDC97 0%,
    #FFBF00 ${green.percentage}%,
    #FF842E ${orange.percentage}%,
    #FF495C 100%`;
  
  const onSliderChange = (value) => {
    setSliderValue(value);
    if (sliderValue < green.percentage) {
      setDisplayedArtists(green);
    } else if (
      sliderValue >= green.percentage &&
      sliderValue < yellow.percentage
    ) {
      setDisplayedArtists(yellow);
    } else if (
      sliderValue >= yellow.percentage &&
      sliderValue < Math.floor(100 - red.percentage)
    ) {
      setDisplayedArtists(orange);
    } else if (sliderValue >= Math.floor(100 - red.percentage)) {
      setDisplayedArtists(red);
    }
  };
  return (
    <>
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
    </>
  );
}
