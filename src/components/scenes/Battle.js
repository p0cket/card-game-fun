import React, { useState } from "react";
import { endTurnAction, playCardAction } from "../../actions";
import Card from "../common/Card";
import { dmgEmoji, energyEmoji, goldEmoji } from "../../consts/consts";
import { motion } from "framer-motion/dist/framer-motion";

import Dialog from "../common/Dialog";
import Popup from "../common/Popup";
import HUDHeader from "../Battle/HUDHeader";
import EnemyDisplay from "../Battle/BattleTopDisplay";
import BattleTopDisplay from "../Battle/BattleTopDisplay";
import BattleBotDisplay from "../Battle/BattleBotDisplay";
import UserPartyDisplay from "../Battle/UserPartyDisplay";
import MenuButtonGroup from "../Battle/MenuButtonGroup";

const Battle = ({ gameData, dispatch }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen(!popupOpen);
  const playCard = (card) => {
    dispatch(playCardAction(card));
  };

  const endTurn = () => {
    dispatch(endTurnAction());
  };
  const { health, energy, maxHP } = gameData.hero;
  const yourVariants = {
    visible: {
      x: [0, 2, -3, 5, -1, 5, -3, 0],
      y: [0, 3, -1],
      transition: {
        // delay: 0.5,
        duration: 15,
        yoyo: Infinity,
      },
    },
  };

  function renderUserAbility(name, damage, description, energyCost) {
    return (
      <div style={{ ...attackContainerStyle, backgroundColor: "#5a7d2a" }}>
        <div style={attackInfoStyle}>
          <div style={attackNameStyle}>{name}</div>
          <div style={attackDamageStyle}>{damage}</div>
        </div>
        <div style={attackDescriptionStyle}>{description}</div>
        <div style={attackEnergyCostStyle}>Energy Cost: {energyCost}</div>
      </div>
    );
  }
  // TODO Leverage the knowledge events to make victory scenes, and any scene that goes between another
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      <div style={{}}>
        <div>
          <div
            style={{
              fontFamily: "Silkscreen",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <HUDHeader gameData={gameData} />
            <UserPartyDisplay />
            <BattleTopDisplay gameData={gameData} />
            <BattleBotDisplay
              gameData={gameData}
              health={health}
              maxHP={maxHP}
              energy={energy}
            />
          </div>
        </div>
        {gameData.alert ? (
          <div
            style={{
              color: "Red",
              padding: "10px 0px",
              margin: "0px 30px",
              backgroundColor: "black",
            }}
          >
            {gameData.alert}
          </div>
        ) : (
          <></>
        )}

        <div style={{ display: "flex" }}>
          <div style={{ color: "#a5e54d", flex: 3, fontFamily: "Silkscreen",    backgroundColor: "#5a7d2a", }}>
            {/* Oh man, the battle is on */}
          </div>
       
          <MenuButtonGroup togglePopup={togglePopup} />
        </div>
        <UserPartyDisplay />
        <div
          style={{
            fontFamily: "Silkscreen",
            backgroundColor: "#5a7d2a",
            color: "white",
          }}
        >
          <Popup trigger={popupOpen} togglePopup={togglePopup} zIndex={1}>
            {" "}
          </Popup>
        </div>
      </div>
    </div>
  );
};

const attackContainerStyle = {
  border: "1px solid #a5e54d",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  padding: "12px",
  margin: "8px 0",
  backgroundColor: "#fff",
};

const attackInfoStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const attackNameStyle = {
  fontWeight: "bold",
};

const attackDamageStyle = {
  flex: 1,
  textAlign: "right",
};

const attackDescriptionStyle = {
  flex: 1,
  textAlign: "left",
  color: "black",
};

const attackEnergyCostStyle = {
  alignSelf: "flex-end",
  textAlign: "right",
};

const attackHeaderStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

export default Battle;
