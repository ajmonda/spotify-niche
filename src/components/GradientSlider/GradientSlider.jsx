import React, { useState } from "react";
import Slider from "rc-slider";

import ArtistsGrid from "../ArtistsGrid/ArtistsGrid";

import "./gradient-slider.css";
import "rc-slider/assets/index.css";

export default function GradientSlider(props) {
  const { currentArtists } = props;

  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [sliderValue, setSliderValue] = useState(50);

  const gradient = `#F679E5,
    #F497DA 25%,
    #F8BDC4 50%,
    #DEF6CA 100%`;

  const onSliderChange = (value) => {
    setSliderValue(value);
    if (
      value < currentArtists[0].popularity ||
      value > currentArtists[49].popularity
    ) {
      return false;
    } else if (value <= 25) {
      setDisplayedArtists(
        currentArtists.filter((artist) => artist.popularity <= value)
      );
    } else if (value < 50) {
      setDisplayedArtists(
        currentArtists.filter(
          (artist) => artist.popularity <= value && artist.popularity >= 25
        )
      );
    } else if (value >= 50 && value < 75) {
      setDisplayedArtists(
        currentArtists.filter(
          (artist) => artist.popularity >= value && artist.popularity <= 75
        )
      );
    } else {
      setDisplayedArtists(
        currentArtists.filter((artist) => artist.popularity >= value)
      );
    } 
  };

  return (
    <>
      <div className="gradientSlider">
        <Slider
          min={0}
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
          <h5 id="obscure">More Obscure</h5>
          <h5 id="popular">More Popular</h5>
        </label>
      </div>

      <ArtistsGrid displayedArtists={displayedArtists} />
    </>
  );
}
