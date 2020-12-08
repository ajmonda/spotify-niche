import React, { useEffect, useState } from "react";
import Header from "./components/Main/Header/Header";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import queryString from "query-string";

import "./App.css";
import { getTopArtists, rankArtists } from "./services";

function App() {
  const [artists, setArtists] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [innerText, setInnerText] = ["four weeks"]

  const { obscurityRating } = rankArtists(artists);

  const string = queryString.parse(window.location.search);
  const accessToken = string.access_token;

  useEffect(() => {
    const apiCall = async () => {
      const topArtists = await getTopArtists(accessToken, timeRange);
      setArtists(topArtists);
    };
    apiCall();
  }, []);

  const handleClick = () => {
    setTimeRange("medium_term");
    window.location.reload(false);
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
