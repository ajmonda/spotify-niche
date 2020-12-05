import React, { useEffect, useState } from "react";

import "./App.css";
import { getTopArtists, getPercentages, groupArtists } from "./services";

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

  // determine "uniqueness" avg of artists

  // group artists by popularity in quarter increments
  const ranking = groupArtists(artists);

  // // assign percentage to each grouping
  console.log(getPercentages(ranking));

  // // generate dichromatic scale based on percentages

  // // hover over grouping displays artists in group

  // // // deep cuts playlist


  return accessToken ? (
    <div className="App">
      <h1>Hello</h1>
    </div>
  ) : (
    // Login component here
    <button>Login</button>
  );
}

export default App;
