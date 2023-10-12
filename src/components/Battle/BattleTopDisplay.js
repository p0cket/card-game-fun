import React, { useState } from "react";
import { dmgEmoji, energyEmoji, goldEmoji } from "../../consts/consts";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import "./../scenes/Battle.css";
import "./../common/Button.css";
import { useDispatchContext, useStateContext } from "../../MainContext";
import { placeholderTrainer } from "../../consts/party/trainers";
import { Ticklefairy } from "../../consts/pals/pals";
import AttackPopup from "../common/AttackPopup";

export default function BattleTopDisplay({ gameData }) {
  const attackPopupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      // background: "lightgreen",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    container: {
      // background: "#fff",
      background: "lightgreen",

      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      padding: "20px",
      borderRadius: "2px",
    },
  };

  
  const [isAttackDisplayVisible, setAttackDisplayVisible] = useState(false);

  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();

  const handleAttackClick = (name) => {
    // Dispatch an action to perform the selected attack
    contextualDispatch({
      type: "PERFORM_ATTACK",
      payload: { attackName: name },
    });
  };

  const [isAttackPopupVisible, setAttackPopupVisible] = useState(false);

  const openAttackPopup = () => {
    setAttackPopupVisible(true);
  };

  const closeAttackPopup = () => {
    setAttackPopupVisible(false);
  };

  const renderAttack = (name, damage, description, energyCost) => {
    return (
      <AttackPopup
        name={name}
        damage={damage}
        description={description}
        energyCost={energyCost}
        onAttackClick={() => handleAttackClick(name)}
      />
    );
  };

  // const { name, status, poison, health, maxHP, img, nextAttack } =
  //   gameData.battle.enemy;

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

  // Def work on this later
  const currentMonDetails = contextualState.opponent.monsters[0];

  const currentMon =
    contextualState.current.scene.details.trainer.monsters[0].obj; // .level
  console.log(`currentMon:`, currentMon);
  // const currentMon = Ticklefairy;
  const {
    name,
    lore,
    image,
    elemental_type,
    creature_type,
    specialty_group,
    nature,
    quirks,
    stats,
    enterAbility,
    strengths,
    weaknesses,
    cost,
    moves,
    possible_moves,
    passive_ability,
    experience,
    lvl,
  } = currentMon;
  console.log(`currentMonDetails:`, currentMonDetails, currentMon, stats);

  return (
    <div className="battleTop">
      <div className="battleTopLeft">
        <div></div>
        <div className="battleTLname" style={{ fontSize: "25px" }}>
          {name}
          {/* {currentMonDetails
            ? currentMonDetails.name
            : placeholderTrainer.monsters[0].name} */}
          <span style={{ color: "gray", fontSize: "12px" }}>
            lvl {lvl}
            {/* {currentMonDetails
              ? currentMonDetails.level
              : placeholderTrainer.monsters[0].level} */}
          </span>
        </div>
        <div></div>
        <div className="battleTLhealth">
          {stats.hp}HP
          <progress
            id="health"
            value={stats.hp}
            max={stats.hp}
            style={{
              backgroundColor: "#4caf50",
            }}
          ></progress>
        </div>
        <div className="battleTLnext">
          {/* <span style={{ color: "gray" }}>Next: </span> */}
          <span style={{ color: "gray" }}>
            In 10{" "}
            <img
              src={`./icons/Seconds.png`}
              style={{ width: 20, height: 20 }}
              alt="Seconds Icon"
            />{" "}
          </span>
          , will use:
        </div>
        <div>
        <button onClick={openAttackPopup}>{moves[0].name}</button>
      </div>

      {isAttackPopupVisible && (
        <div style={attackPopupStyles.overlay} onClick={closeAttackPopup}>
          <div style={attackPopupStyles.container}>
            <AttackPopup
              name={moves[0].name} // Pass the attack details here
              damage="30"
              description="An example attack description."
              energyCost="10"
              onAttackClick={closeAttackPopup}
              closeAttackPopup={closeAttackPopup}
              removeAttackButton={false}
            />
          </div>
        </div>
      )}
        <div></div>
      </div>{" "}
      <div className="battleTopRight">
        <motion.img
          style={{ width: 180, height: 150 }}
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          // src={img}
          src={image}
          alt="Enemy Frontside"
        />
      </div>
    </div>
  );
}

// export default BattleTopDisplay;
