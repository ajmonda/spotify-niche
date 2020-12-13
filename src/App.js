import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Header from "./components/Header/Header";
import Genres from "./components/Genres/Genres";
import DeepCuts from './components/DeepCuts/DeepCuts'
import GradientSlider from "./components/GradientSlider/GradientSlider";
import ArtistsGrid from "./components/ArtistsGrid/ArtistsGrid";
import Login from "./components/Login/Login";

import { getTopArtists, getTopTracks } from "./services/services";
import {
  getNicheScore,
  getScoreDescriptor,
  getTopGenres,
  groupArtistsByPopularity,
} from "./utilities/utils";

import "./App.css";

function App() {
  const [currentArtists, setCurrentArtists] = useState([]);
  const [currentTracks, setCurrentTracks] = useState([])

  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState([]);
  const [topArtistsMediumTerm, setTopArtistsMediumTerm] = useState([]);
  const [topArtistsLongTerm, setTopArtistsLongTerm] = useState([]);

  const [topTracksShortTerm, setTopTracksShortTerm] = useState([]);
  const [topTracksMediumTerm, setTopTracksMediumTerm] = useState([]);
  const [topTracksLongTerm, setTopTracksLongTerm] = useState([]);

  const [selectValue, setSelectValue] = useState("short term");
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [sliderValue, setSliderValue] = useState(5);

  // https://github.com/mpj/oauth-bridge-template
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

      const topTracksShortTerm = await getTopTracks(
        accessToken,
        "short_term"
      );
      const topTracksMediumTerm = await getTopTracks(
        accessToken,
        "medium_term"
      );
      const topTracksLongTerm = await getTopTracks(accessToken, "long_term");

      setTopArtistsShortTerm(topArtistsShortTerm);
      setTopArtistsMediumTerm(topArtistsMediumTerm);
      setTopArtistsLongTerm(topArtistsLongTerm);

      setTopTracksShortTerm(topTracksShortTerm);
      setTopTracksMediumTerm(topTracksMediumTerm);
      setTopTracksLongTerm(topTracksLongTerm);

      setCurrentArtists(topArtistsShortTerm);
      setCurrentTracks(topTracksShortTerm)
    };
    apiCall();
  }, []);

  // user data select
  const handleChange = (e) => {
    setSelectValue(e.target.value);
    setSliderValue(5);
    setDisplayedArtists([]);
    switch (e.target.value) {
      case "medium term":
        setCurrentArtists(topArtistsMediumTerm);
        setCurrentTracks(topTracksMediumTerm)
        break;
      case "long term":
        setCurrentArtists(topArtistsLongTerm);
        setCurrentTracks(topTracksLongTerm)
        break;
      default:
        setCurrentArtists(topArtistsShortTerm);
        setCurrentTracks(topTracksShortTerm)
    }
  };

  // artists to be displayed based on slider position
  // artist ordered, grouped by popularity; array index = slider value
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
              <DeepCuts
                currentTracks={currentTracks} />
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