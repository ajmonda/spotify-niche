import React, { useEffect, useState } from "react";
import Scale from "./components/Scale/Scale";

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

  const { red, orange, yellow, green } = rankArtists(artists);

  return accessToken ? (
    <div className="App">
      <h1>niche</h1>

      <Scale
        red={red.percentage}
        orange={red.percentage + orange.percentage}
        yellow={orange.percentage + yellow.percentage}
      />
    </div>
    
  ) : (
    // Login component here
    <button>Login</button>
  );
}

export default App;
