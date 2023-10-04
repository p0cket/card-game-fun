import React, { useState } from "react";
import { testPals } from "../../consts/pals/pals";

const ChibipalsSelection = () => {
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // const monsters = [
  //   { id: 1, name: 'Monster1', image: 'monster1.png', description: 'Description of Monster1' },
  //   { id: 2, name: 'Monster2', image: '', description: 'Description of Monster2' }, // No image available
  //   { id: 3, name: 'Monster3', image: 'monster3.png', description: 'Description of Monster3' },
  // ];
  const [Luminowl, Glowbuggle, Umbrabunny] = [
    testPals[0],
    testPals[1],
    testPals[2],
  ];
  const monsters = [Luminowl, Glowbuggle, Umbrabunny];

  const handleMonsterSelect = (monster) => {
    setSelectedMonster(monster);
    setShowDetails(true);
  };

  const handleSelect = () => {
    // dispatch({ type: 'ADD_TO_PARTY', monster: selectedMonster });
    setShowDetails(false);
  };

  const handleGoBack = () => {
    setShowDetails(false);
  };

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "green",
    padding: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    color: "white",
    textAlign: "center",
  };

  const monsterListStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const placeholderImageStyle = {
    backgroundColor: "green",
    borderRadius: "50%",
    width: "100%",
    paddingTop: "100%",
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Choose Your Chibipal</h1>
      <div className="monster-list" style={monsterListStyle}>
        {monsters.map((monster) => (
          <div
            key={monster.id}
            className={`monster ${
              selectedMonster === monster ? "selected" : ""
            }`}
            onClick={() => handleMonsterSelect(monster)}
            style={{ flex: "1", margin: "10px", cursor: "pointer" }}
          >
            <div
              style={placeholderImageStyle}
              className={monster.image ? "with-image" : "without-image"}
            >
              {monster.image && (
                <img
                  src={monster.image}
                  alt={monster.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <p style={{ color: "white" }}>{monster.name}</p>
          </div>
        ))}
      </div>

      {showDetails && (
        <div style={popupStyle}>
          <div
            className="popup-content"
            style={{ fontSize: "14px", margin: "10px" }}
          >
            <p style={{ fontSize: "16px", marginBottom: "4px" }}>
              {selectedMonster.name}
            </p>
            <div style={{ display: "flex" }}>
              <img
                src={selectedMonster.image}
                alt={selectedMonster.name}
                style={{
                  width: "240px",
                  height: "240px",
                  objectFit: "cover",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              />{" "}
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "10px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Level:</span>
                      <span>{selectedMonster.level}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "4px",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "100px",
                          height: "10px",
                          backgroundColor: "lightgray",
                          borderRadius: "5px",
                          border: "1px solid lightgreen",
                        }}
                      >
                        <div
                          style={{
                            width: `${
                              (selectedMonster.stats.hp /
                                selectedMonster.stats.max_hp) *
                              100
                            }%`,
                            height: "100%",
                            backgroundColor: "darkgreen",
                            borderRadius: "3px",
                          }}
                        ></div>
                      </div>
                      <div style={{ marginTop: "4px", fontSize: "12px" }}>
                        {selectedMonster.stats.hp} /{" "}
                        {selectedMonster.stats.max_hp
                          ? selectedMonster.stats.max_hp
                          : "not found"}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Atk:</span>
                    <span>{selectedMonster.stats.attack}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Def:</span>
                    <span>{selectedMonster.stats.defense}</span>
                  </div>
                  {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>SpAtk:</span>
    <span>{selectedMonster.stats.special_attack}</span>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>SpDef:</span>
    <span>{selectedMonster.stats.special_defense}</span>
  </div> */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Speed:</span>
                    <span>{selectedMonster.stats.speed}</span>
                  </div>
                  {/* Uncomment and customize as needed
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>Size:</span>
    <span>{selectedMonster.size}</span>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>Weight:</span>
    <span>{selectedMonster.weight}</span>
  </div> */}
                </div>
                {selectedMonster.elemental_type}
                {"-"}
                {selectedMonster.creature_type} [
                {selectedMonster.specialty_group}]
              </div>{" "}
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
              {/* <span style={{ marginRight: "10px" }}>
                Quirks: {selectedMonster.quirks.join(", ")}
              </span> */}
            </div>
            <div>{/* <span>Stats:</span> */}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "4px",
              }}
            >
              {/* <div style={{ display: "flex", gap: "4px" }}>
                <button>Stats</button>
                <button>Moves</button>
                <button>Passives</button>
              </div> */}
              <div>Moves: </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  gap: `2px`,
                }}
              >
                {selectedMonster.moves.map((move, index) => (
                  <div style={{ padding: "1px" }}>
                    <span
                      key={index}
                      style={{
                        backgroundColor: "lightgreen",
                        borderRadius: "4px",
                        padding: "3px",
                        color: "darkgreen",
                      }}
                    >
                      {move}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div>Possible Moves:</div>
                <span>
                  <div
                    style={{ color: "lightGray", gap: "2px", display: "flex" }}
                  >
                    {selectedMonster.possible_moves.map((move, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // marginBottom: "4px",
                          backgroundColor: "black",
                          borderRadius: "8%",
                          padding: "2px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "gray",
                            borderRadius: "50%",
                            width: "7px", // Adjust the width and height as needed
                            height: "7px",
                            marginRight: "2px",
                            // padding: "3px",
                          }}
                        ></div>
                        <span>{move}</span>
                      </div>
                    ))}
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
                  {selectedMonster.passive_ability}
                </span>
              </span>
            </div>
            {/* <p style={{ margin: "4px 0" }}>Lore: {selectedMonster.lore}</p> */}
            <div style={{ padding: "4px" }}>
              <button onClick={handleSelect}>Select</button>
              <button onClick={handleGoBack}>Go Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChibipalsSelection;
