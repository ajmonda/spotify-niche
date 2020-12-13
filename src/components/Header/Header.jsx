import React from "react";

import "./header.css";

export default function Header(props) {
  const { nicheScore, scoreDescriptor, selectValue, handleChange } = props;

  // colors reflect slider gradient
  const scoreColor = (scoreDescriptor) => {
    let scoreColor;
    switch (scoreDescriptor) {
      case "Extremely Obscure":
        scoreColor = "#56203D";
        break;
      case "Very Obscure":
        scoreColor = "#4F2D4B";
        break;
      case "Pretty Obscure":
        scoreColor = "#483A58";
        break;
      case "Kinda Basic":
        scoreColor = "#56638A";
        break;
      default:
        scoreColor = "#63A088";
    }
    return scoreColor;
  };

  return (
    <header>
      <h3>Niche Score: </h3>
      <div className="score">
        <h1
          style={{
            color: `${scoreColor(scoreDescriptor)}`,
          }}
        >
          {nicheScore}
        </h1>
        <h4>{scoreDescriptor}</h4>
      </div>
      <div className="timeSelect">
        <label htmlFor="Time Range">Range: </label>
        <select value={selectValue} onChange={handleChange}>
          <option value="short_term">Four Weeks</option>
          <option value="medium_term">Six Months</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
    </header>
  );
}
