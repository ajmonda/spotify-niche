import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Header from "./components/Header/Header";
import Genres from "./components/Genres/Genres";
import GradientSlider from "./components/GradientSlider/GradientSlider";
import Login from "./components/Login/Login";

import {
  getTopArtists,
  getNicheScore,
  getScoreDescriptor,
  getTopGenres,
} from "./services";

import "./App.css";

function App() {
  const [currentArtists, setCurrentArtists] = useState([]);
  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState([]);
  const [topArtistsMediumTerm, setTopArtistsMediumTerm] = useState([]);
  const [topArtistsLongTerm, setTopArtistsLongTerm] = useState([]);
  const [selectValue, setSelectValue] = useState("short_term");
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [sliderValue, setSliderValue] = useState(50);

  const urlString = queryString.parse(window.location.search);
  const accessToken = urlString.access_token;

  const genres = getTopGenres(currentArtists).slice(0, 20).sort();
  const nicheScore = getNicheScore(currentArtists);
  const scoreDescriptor = getScoreDescriptor(nicheScore);

  useEffect(() => {
    const apiCall = async () => {
      const topArtistsShortTerm = await getTopArtists(
        accessToken,
        "short_term"
      );
      const topArtistsMediumTerm = await getTopArtists(
        accessToken,
        "medium_term"
      );
      const topArtistsLongTerm = await getTopArtists(accessToken, "long_term");

      setTopArtistsShortTerm(topArtistsShortTerm);
      setTopArtistsMediumTerm(topArtistsMediumTerm);
      setTopArtistsLongTerm(topArtistsLongTerm);

      setCurrentArtists(topArtistsShortTerm);
    };
    apiCall();
  }, []);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
    setSliderValue(50);
    setDisplayedArtists([]);
    switch (e.target.value) {
      case "medium_term":
        setCurrentArtists(topArtistsMediumTerm);
        break;
      case "long_term":
        setCurrentArtists(topArtistsLongTerm);
        break;
      default:
        setCurrentArtists(topArtistsShortTerm);
    }
  };

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
    <div className="App">
      {accessToken ? (
        <>
          <Header
            nicheScore={nicheScore}
            scoreDescriptor={scoreDescriptor}
            selectValue={selectValue}
            handleChange={handleChange}
          />
          <Genres genres={genres} />
          <GradientSlider
            currentArtists={currentArtists}
            displayedArtists={displayedArtists}
            sliderValue={sliderValue}
            onSliderChange={onSliderChange}
          />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
export default App;
