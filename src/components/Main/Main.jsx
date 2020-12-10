import React, { useState } from "react";
import Genres from "../Genres/Genres";

import { rankArtists, getTopGenres } from "../../services.js";

import "./main.css";
import "../GradientSlider/node_modules/rc-slider/assets/index.css";

export default function Main(props) {
  const [displayedArtists, setDisplayedArtists] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  const { red, orange, yellow, green } = rankArtists(props.artists);

  const genres = getTopGenres(props.artists).slice(0, 30).sort();

  const gradient = `#3DDC97 0%,
    #FFBF00 ${green.percentage}%,
    #FF842E ${orange.percentage}%,
    #FF495C 100%`;

  return (
    <main>
      <Genres genres={genres} />

    </main>
  );
}
