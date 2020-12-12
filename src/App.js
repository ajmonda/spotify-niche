import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Header from "./components/Header/Header";
import Genres from "./components/Genres/Genres";
import GradientSlider from "./components/GradientSlider/GradientSlider";
import ArtistsGrid from "./components/ArtistsGrid/ArtistsGrid";
import Login from "./components/Login/Login";

import {
  getTopArtists,
  getNicheScore,
  getScoreDescriptor,
  getTopGenres,
  getTopTracks,
  groupArtistsByPopularity,
} from "./services";

import "./App.css";

function App() {
  const [currentArtists, setCurrentArtists] = useState([]);
  const [currentTracks, setCurrentTracks] = useState([]);
  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState([]);
  const [topTracksShortTerm, setTopTracksShortTerm] = useState([]);
  const [topArtistsMediumTerm, setTopArtistsMediumTerm] = useState([]);
  const [topTracksMediumTerm, setTopTracksMediumTerm] = useState([]);
  const [topArtistsLongTerm, setTopArtistsLongTerm] = useState([]);
  const [topTracksLongTerm, setTopTracksLongTerm] = useState([]);
  const [selectValue, setSelectValue] = useState("short_term");
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);

  const urlString = queryString.parse(window.location.search);
  const accessToken = urlString.access_token;

  const genres = getTopGenres(currentArtists).slice(0, 20).sort();
  const nicheScore = getNicheScore(currentArtists);
  const scoreDescriptor = getScoreDescriptor(nicheScore);
  const groupedArtists = groupArtistsByPopularity(currentArtists).filter(group => group.length);

  useEffect(() => {
    const apiCall = async () => {
      const topArtistsShortTerm = await getTopArtists(
        accessToken,
        "short_term"
      );
      const topTracksShortTerm = await getTopTracks(accessToken, "short_term");

      const topArtistsMediumTerm = await getTopArtists(
        accessToken,
        "medium_term"
      );
      const topTracksMediumTerm = await getTopTracks(
        accessToken,
        "medium_term"
      );

      const topArtistsLongTerm = await getTopArtists(accessToken, "long_term");
      const topTracksLongTerm = await getTopTracks(accessToken, "long_term");

      setTopArtistsShortTerm(topArtistsShortTerm);
      setTopArtistsMediumTerm(topArtistsMediumTerm);
      setTopArtistsLongTerm(topArtistsLongTerm);

      setTopTracksShortTerm(topTracksShortTerm);
      setTopTracksMediumTerm(topTracksMediumTerm);
      setTopTracksLongTerm(topTracksLongTerm);

      setCurrentArtists(topArtistsShortTerm);
      setCurrentTracks(topTracksShortTerm);
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

    groupedArtists.map((group, i) => {
      if (value === i) {
        setDisplayedArtists(group);
      }
    });
  };

  console.log(groupedArtists)

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
            groupedArtists={groupedArtists}
            sliderValue={sliderValue}
            onSliderChange={onSliderChange}
          />
          <ArtistsGrid
            currentArtists={currentArtists}
            displayedArtists={displayedArtists}
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
