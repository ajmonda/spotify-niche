import React, { useEffect, useState } from "react";

import "./header.css";

export default function Header(props) {
  return (
    <header>
      <h2>
        In the past{" "}
        <div className="timeSelect">
          {" "}
          <button onClick={props.handleClick}>njkknknlkl</button>,
        </div>
        your taste in music was{" "}
        <span
          style={{
            fontSize: "45px",
          }}
        >
          {Math.floor(props.obscurityRating)}%
        </span>{" "}
        obscure.
      </h2>
    </header>
  );
}
