import React, { useEffect, useState } from "react";
import Header from "./components/Main/Header/Header";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

import "./App.css";
import { getTopArtists, rankArtists } from "./services";

import queryString from "query-string";

function App() {
  const [artists, setArtists] = useState([]);

  const string = queryString.parse(window.location.search);
  const accessToken = string.access_token;

  useEffect(() => {
    const apiCall = async () => {
      const topArtists = await getTopArtists(accessToken);
      setArtists(topArtists);
    };
    apiCall();
  }, []);

  return (
    <div className="App">
      {accessToken ? (
        <>
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