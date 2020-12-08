import React, { useEffect, useState } from "react";
import Header from "./components/Main/Header/Header";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import queryString from "query-string";

import "./App.css";
import { getTopArtists, rankArtists } from "./services";

function App() {
  const [artists, setArtists] = useState([]);

  const [topArtistsShortTerm, setTopArtistsShortTerm] = useState([])
  const [topArtistsMediumTerm, setTopArtistsMediumTerm] = useState([])

  const [timeRange, setTimeRange] = useState("short_term");
  const [innerText, setInnerText] = useState("four weeks");

  const { obscurityRating } = rankArtists(artists);

  const string = queryString.parse(window.location.search);
  const accessToken = string.access_token;

  useEffect(() => {
    const apiCall = async () => {
      const topArtistsShortTerm = await getTopArtists(accessToken, "short_term");
      const topArtistsMediumTerm = await getTopArtists(accessToken, "medium_term");

      setTopArtistsShortTerm(topArtistsShortTerm)
      setTopArtistsMediumTerm(topArtistsMediumTerm)

      setArtists(topArtistsShortTerm);

    };
    apiCall();
  }, []);

  const handleClick = (e) => {
    e.preventDefault()
    if (timeRange === "short_term") {
      setTimeRange("medium_term");
      setInnerText("six months");
      setArtists(topArtistsMediumTerm)
    } else {
      setTimeRange("short_term");
      setInnerText("four weeks");
      setArtists(topArtistsShortTerm)
    }

  };

  return (
    <div className="App">
      {accessToken ? (
        <>
          <Header
            timeRange={timeRange}
            obscurityRating={obscurityRating}
            innerText={innerText}
            handleClick={handleClick}
          />
          <Main artists={artists} />
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
