import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Header from "./components/Main/Header/Header";
import Genres from "./components/Genres/Genres";
import GradientSlider from "./components/GradientSlider/GradientSlider";
import Login from "./components/Login/Login";

import { getNicheScore, getTopArtists, getTopGenres, rankArtists } from "./services";

import "./App.css";

function App() {
  const [artists, setArtists] = useState([]);
  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState([]);
  const [topArtistsMediumTerm, setTopArtistsMediumTerm] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [innerText, setInnerText] = useState("four weeks");

  const genres = getTopGenres(artists).slice(0, 30).sort();

  const urlString = queryString.parse(window.location.search);
  const accessToken = urlString.access_token;

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

      setTopArtistsShortTerm(topArtistsShortTerm);
      setTopArtistsMediumTerm(topArtistsMediumTerm);

      setArtists(topArtistsShortTerm);
    };
    apiCall();
  }, []);

  const nicheScore = getNicheScore(artists)

  const { green, yellow, orange, red } = rankArtists(artists);

  const handleClick = () => {
    if (timeRange === "short_term") {
      setTimeRange("medium_term");
      setInnerText("six months");
      setArtists(topArtistsMediumTerm);
    } else {
      setTimeRange("short_term");
      setInnerText("four weeks");
      setArtists(topArtistsShortTerm);
    }
  };

  return (
    <div className="App">
      {accessToken ? (
        <>
          <Header
            timeRange={timeRange}
            nicheScore={nicheScore}
            innerText={innerText}
            handleClick={handleClick}
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
