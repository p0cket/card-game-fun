import React from "react";
import { goldEmoji } from "../../consts/consts";

function HUDHeader({ gameData }) {
  return (
    <p
      style={{
        margin: "4px",
        backgroundColor: "#5a7d2a",
        color: "white",
        flex: "1",
      }}
    >
      Simulation Room: No Effects
    </p>
  );
}

export default HUDHeader;
