import React, { useState } from "react";
import { getMostObscureArtist } from "../../services";

import "./header.css";

export default function Header(props) {
  const {
    nicheScore,
    scoreDescriptor,
    mostObscureArtist,
    selectValue,
    handleChange,
  } = props;

  return (
    <header>
      <label htmlFor="Time Range">Time Range:</label>
      <select value={selectValue} onChange={handleChange}>
        <option value="four weeks">four weeks</option>
        <option value="six months">six months</option>
        <option value="several years">several years</option>
      </select>{" "}
      <div className="score">
        <h3>Niche Score: </h3>
        <h1>{nicheScore}</h1>
        <h4>{scoreDescriptor}</h4>
      </div>
      <h4>
        Most Obscure Top Artist:{" "}
        {mostObscureArtist ? mostObscureArtist.name : null}
      </h4>
      <img
        src={mostObscureArtist ? mostObscureArtist.images[0].url : null}
        alt="artist image"
        width="100px"
      />
    </header>
  );
}
