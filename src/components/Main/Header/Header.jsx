import React, { useEffect, useState } from "react";

import "./header.css";

export default function Header(props) {
  const [timeSelectExpand, setTimeSelectExpand] = useState(false);
  const { timeRange, obscurityRating, innerText, handleClick } = props;

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
        obscure over the past{" "}
        <div
          className="timeWrapper">
          {innerText},
          <div className="timeSelect">
            <a href={handleClick}
              style={{
              transform: timeSelectExpand === true ? 'translateY(0)' : null
            }}>
              {innerText === "four weeks" ? "six months" : "four weeks"}
            </a>
          </div>
        </div>
      </h2>
    </header>
  );
}
