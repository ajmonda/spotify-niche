import React from "react";

import "./header.css";

export default function Header(props) {
  return (
    <header>
      <h2><span
          style={{
            fontSize: "45px"
          }}
        >
          {Math.floor(props.obscurityRating)}%
        </span> of the music you listened to in the past <a href="#">month</a> was obscure.
      </h2>
    </header>
  );
}
