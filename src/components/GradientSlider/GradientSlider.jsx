import React, { useState } from "react";
import Slider from "rc-slider";

import "./gradient-slider.css";
import "rc-slider/assets/index.css";

export default function GradientSlider(props) {
  const { groupedArtists, onSliderChange, sliderValue } = props;

  const gradient = `#63A088,
    #56638A 25%,
    #483A58 75%,
    #56203D 100%`;

  return (
    <div className="gradientSlider">
      <Slider
        reverse={true}
        min={0}
        max={groupedArtists.length}
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
        <h5 id="popular">More Popular</h5>
        <h5 id="obscure">More Obscure</h5>
      </label>
    </div>
  );
}
