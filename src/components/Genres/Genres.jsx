import React from "react";

import "./genres.css";

export default function Genres(props) {
  return (
    <div className="genres">
      <div className="genreList">
        {props.genres.map((genre, i) => {
          return (
            <p
              key={i}
              style={{
                fontSize:
                  genre[1] > 3 ? `${genre[1] + 12}px` : `${genre[1] + 9}px`,
                fontWeight: genre[1] > 5 ? "bold" : "200",
                color: genre[1] > 10 ? "white" : null,
                alignSelf: "center",
              }}
            >
              {genre[0]}
            </p>
          );
        })}
      </div>
    </div>
  );
}
