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
              {/* <span style={{ marginRight: '10px' }}>Cost: {selectedMonster.cost}</span> */}
              <span style={{ marginRight: "10px" }}>
                {" "}
                Lvl: {selectedMonster.level}
              </span>
              <span style={{ marginRight: "10px" }}>
                Exp: {selectedMonster.experience}
              </span>
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
                <table
                  style={{ borderCollapse: "collapse", marginRight: "10px" }}
                >
                  <tbody>
                    <tr>
                      <td>HP:</td>
                      <td>{selectedMonster.stats.hp}</td>
                    </tr>
                    <tr>
                      <td>Atk:</td>
                      <td>{selectedMonster.stats.attack}</td>
                    </tr>
                    <tr>
                      <td>Def:</td>
                      <td>{selectedMonster.stats.defense}</td>
                    </tr>
                    <tr>
                      <td>Sp Atk:</td>
                      <td>{selectedMonster.stats.special_attack}</td>
                    </tr>
                    <tr>
                      <td>Sp Def:</td>
                      <td>{selectedMonster.stats.special_defense}</td>
                    </tr>
                    <tr>
                      <td>Speed:</td>
                      <td>{selectedMonster.stats.speed}</td>
                    </tr>
                    {/* <tr>
                      <td>Size:</td>
                      <td>{selectedMonster.size}</td>
                    </tr>
                    <tr>
                      <td>Weight:</td>
                      <td>{selectedMonster.weight}</td>
                    </tr> */}
                  </tbody>
                </table>
                {selectedMonster.elemental_type}
                {"-"}
                {selectedMonster.creature_type} [
                {selectedMonster.specialty_group}]
              </div>{" "}
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
              {/* <span >
                {`Moves: ${selectedMonster.moves.join(" | ")}`}
              </span> */}
              <div
                style={{
                  backgroundColor: "lightgreen",
                  padding: "4px",
                  borderRadius: "4px",
                  marginBottom: "4px",
                }}
              >
                Moves:{" "}
                {selectedMonster.moves.map((move, index) => (
                  <span key={index} style={{ marginRight: "4px" }}>
                    {move}
                  </span>
                ))}
              </div>
              <span style={{ color: "lightGray" }}>
                {` ${selectedMonster.possible_moves.join(", ")}`}
              </span>
              <span>Passive: {selectedMonster.passive_ability}</span>
            </div>
            {/* <p style={{ margin: "4px 0" }}>Lore: {selectedMonster.lore}</p> */}
            <button onClick={handleSelect}>Select</button>
            <button onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChibipalsSelection;
