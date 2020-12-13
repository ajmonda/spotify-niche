import React from "react";

import "./login.css";

export default function Login() {
  return (
    <div className="loginContainer">
    <div className="login">
      <h1>
        How <span>niche</span> are you<span>?</span>
      </h1>
      <div className="loginButton">
        <button
          onClick={() =>
            (window.location.href = "http://niche-auth.herokuapp.com/login")
          }
        >
          Find Out
          <img
            src="https://i.imgur.com/t08PUcz.png"
            width="70px"
            alt="Spotify logo"
          />
        </button>
        <label>This app analyzes the obscurity of your Spotify listening habits. After connecting your account, you will be given a score based on the average popularity of your top artists. You will also be shown a text graph of your most frequent genres, the "deep cuts" out of your favorite tracks, and be able to explore your top artists based on their popularity ratings.</label>
      </div>
      </div>
      </div>
  );
}
