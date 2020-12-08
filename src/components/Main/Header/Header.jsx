import React, { useEffect, useState } from "react";

import "./header.css";

export default function Header(props) {
  const { obscurityRating, innerText, handleClick } = props;

  return (
    <header>
      <h2>
        Your taste in music was
        <span
          style={{
            fontSize: "45px",
          }}
        >
          {" "}
          {Math.floor(obscurityRating)}%
        </span>{" "}
        obscure over the past <div className="timeWrapper">&rarr;<span>{innerText}</span>&larr;</div>
        <div className="timeSelect">
          <a
            onClick={handleClick}
          >
            {innerText === "four weeks" ? "six months" : "four weeks"}
          </a>
        </div>
      </h2>
    </header>
  );
}
