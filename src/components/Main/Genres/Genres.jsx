import React from "react";

import "./genres.css";

export default function Genres(props) {
  return (
    <div className="genres">
      <div className="genreList">
        {props.genres.map((genre) => {
          console.log(genre[1]);
          return <p style={{
            fontSize: genre[1] + 10,
            color: genre[1] >= 5 ? '#F9564F' : null,
          fontWeight: genre[1] >= 10 ? 'bold' : null}}>{genre[0]}</p>;
        })}
      </div>
    </div>
  );
}
