import React, { useEffect, useState } from "react";
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


  return accessToken ? (
    <div className="App">
      <h1>niche</h1>
      <Main artists={artists} />
    </div>
  ) : (
    // Login component here
    <button>Login</button>
  );
}

export default App;
