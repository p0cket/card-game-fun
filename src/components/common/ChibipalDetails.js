import React from "react";

const ChibipalDetails = ({ selectedMonster, handleSelect, handleGoBack }) => {
  const popupStyle = {
    // Your popup style goes here
  };

  return (
    <div style={popupStyle}>
      {/* Details view JSX code goes here */}
      <p style={{ fontSize: "16px", marginBottom: "4px" }}>
        {selectedMonster.name}
      </p>
      <div style={{ display: "flex" }}>
        {/* ... */}
      </div>
      <div>
        <span style={{ marginRight: "10px" }}>
          Lvl: {selectedMonster.level}
        </span>
        <span style={{ marginRight: "10px" }}>
          Exp: {selectedMonster.experience}
        </span>
        <span>Exp to Next Lvl: xxx</span>
        <div
          style={{
            width: "100%",
            backgroundColor: "gray",
            height: "10px",
            borderRadius: "2px",
            border: "1px solid lightgreen",
          }}
        >
          <div
            style={{
              width: `${30}%`,
              backgroundColor: "darkgreen",
              height: "100%",
              borderRadius: "2px",
            }}
          ></div>
        </div>
      </div>
      <div>
        <p style={{ padding: "10px" }}>
          <span>{selectedMonster.description}</span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          gap: "4px",
        }}
      >
        <div>Moves: </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: `2px`,
          }}
        >
          {/* ... */}
        </div>
        <div>
          <div>Possible Moves:</div>
          <span>
            <div
              style={{ color: "lightGray", gap: "2px", display: "flex" }}
            >
              {/* ... */}
            </div>
          </span>
        </div>
        <span>
          <div>Passive:</div>
          <span
            style={{
              backgroundColor: "lightgreen",
              borderRadius: "4px",
              padding: "1px",
              color: "green",
            }}
          >
            {selectedMonster.passives}
          </span>
        </span>
      </div>
      <div style={{ padding: "4px" }}>
        <button onClick={() => handleSelect(selectedMonster)}>Select</button>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
};

export default ChibipalDetails;
