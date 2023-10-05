import React from "react";
import { clockEmoji, energyEmoji } from "../../consts/consts";

function MenuButtonGroup({ togglePopup }) {
  return (
    <div
      style={{
        fontFamily: "Silkscreen",
        display: "flex",
        color: "white",
        backgroundColor: "#5a7d2a",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "20px",
          alignContent: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "4px",
        }}
      >
        10{energyEmoji.repeat(10)}
      </div>
      <div
        style={{
          fontFamily: "Silkscreen",
          display: "flex",
          justifyContent: "space-around",
          flex: 2,
          backgroundColor: "#5a7d2a",
          color: "white",
          margin: "3px",
        }}
      >
        <div>
          <div
            style={{ padding: "3px" }}
            onClick={togglePopup}
            className="text-green-200"
          >
            Attack
          </div>
          <div style={{ padding: "3px" }} className="text-blue-400">
            Items
          </div>
        </div>
        <div>
          <div style={{ padding: "3px" }}>PaLs</div>
          <div style={{ padding: "3px" }}>Options</div>
        </div>
      </div>
    </div>
  );
}

export default MenuButtonGroup;
