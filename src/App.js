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
  const [selectValue, setSelectValue] = useState("four weeks");

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
    switch (e.target.value) {
      case "six months":
        setSelectValue(e.target.value);
        setCurrentArtists(topArtistsMediumTerm);
        break;
      case "several years":
        setSelectValue(e.target.value);
        setCurrentArtists(topArtistsLongTerm);
        break;
      default:
        setSelectValue(e.target.value);
        setCurrentArtists(topArtistsShortTerm);
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
