import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Header from './components/Header/Header'
import Genres from "./components/Genres/Genres";
import GradientSlider from "./components/GradientSlider/GradientSlider";
import Login from "./components/Login/Login";

import {
  getTopArtists,
  getNicheScore,
  getScoreDescriptor,
  getTopGenres,
  rankArtists,
  getMostObscureArtist,
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

  const genres = getTopGenres(currentArtists).slice(0, 30).sort();
  const mostObscureArtist = getMostObscureArtist(currentArtists);
  const nicheScore = getNicheScore(currentArtists);
  const scoreDescriptor = getScoreDescriptor(nicheScore);
  const { green, yellow, orange, red } = rankArtists(currentArtists);

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
            mostObscureArtist={mostObscureArtist}
            nicheScore={nicheScore}
            scoreDescriptor={scoreDescriptor}
            selectValue={selectValue}
            handleChange={handleChange}
          />
          <Genres genres={genres} />
          <GradientSlider
            green={green}
            yellow={yellow}
            orange={orange}
            red={red}
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
