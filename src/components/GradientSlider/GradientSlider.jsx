import React, { useState } from "react";
import Slider from "rc-slider";

import ArtistsGrid from "../ArtistsGrid/ArtistsGrid";

import "./gradient-slider.css";
import "rc-slider/assets/index.css";

export default function GradientSlider(props) {
  const { displayedArtists, onSliderChange, sliderValue } = props;

  const gradient = `#56203D,
    #483A58 25%,
    #56638A 50%,
    #63A088 100%`;

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
