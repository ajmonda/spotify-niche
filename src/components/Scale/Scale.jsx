import React from "react";

import "./scale.css";

export default function Scale(props) {
  const { red, orange, yellow } = props;

  return (
    <div
      className="scale"
      style={{
        background: `-moz-linear-gradient(90deg, red ${red}%,
          orange ${orange}%,
          yellow ${yellow}%,
          green 100%)`,
        background: `-webkit-linear-gradient(360deg, red ${red}%,
          orange ${orange}%,
          yellow ${yellow}%,
          green 100%)`,
        background: `linear-gradient(90deg, red ${red}%,
          orange ${orange}%,
          yellow ${yellow}%,
          green 100%)`,
      }}
    ></div>
  );
}
