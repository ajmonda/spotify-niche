import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Header from "./components/Header/Header";
import Genres from "./components/Genres/Genres";
import GradientSlider from "./components/GradientSlider/GradientSlider";
import ArtistsGrid from "./components/ArtistsGrid/ArtistsGrid";
import Login from "./components/Login/Login";

import { getTopArtists } from "./services/services";
import {
  getNicheScore,
  getScoreDescriptor,
  getTopGenres,
  groupArtistsByPopularity,
} from "./utilities/utils";

import "./App.css";

function App() {
  const [currentArtists, setCurrentArtists] = useState([]);
  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState([]);
  const [topArtistsMediumTerm, setTopArtistsMediumTerm] = useState([]);
  const [topArtistsLongTerm, setTopArtistsLongTerm] = useState([]);
  const [selectValue, setSelectValue] = useState("short_term");
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [sliderValue, setSliderValue] = useState(5);

  const urlString = queryString.parse(window.location.search);
  const accessToken = urlString.access_token;

  const genres = getTopGenres(currentArtists).slice(0, 20).sort();
  const nicheScore = getNicheScore(currentArtists);
  const scoreDescriptor = getScoreDescriptor(nicheScore);
  const groupedArtists = groupArtistsByPopularity(currentArtists).filter(
    (group) => group.length
  );

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
    setSliderValue(5);
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

    groupedArtists.map((group, i) => {
      if (value === i) {
        setDisplayedArtists(group);
      }
    });
  };
  return (
    <div className="App">
      {accessToken ? (
        currentArtists.length ? (
          <>
            <div className="container">
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
                groupedArtists={groupedArtists}
                sliderValue={sliderValue}
                onSliderChange={onSliderChange}
              />
            </div>
            <ArtistsGrid
              currentArtists={currentArtists}
              displayedArtists={displayedArtists}
            />
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              margin: "100px",
            }}
          >
            Analyzing...
          </p>
        )
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
export default App;