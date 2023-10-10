import React from "react";
import { dmgEmoji, energyEmoji, goldEmoji } from "../../consts/consts";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import "./../scenes/Battle.css";
import "./../common/Button.css";
import { useDispatchContext, useStateContext } from "../../MainContext";
import { placeholderTrainer } from "../../consts/party/trainers";
import { Ticklefairy } from "../../consts/pals/pals";

export default function BattleTopDisplay({ gameData }) {
  const { name, status, poison, health, maxHP, img, nextAttack } =
    gameData.battle.enemy;

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

  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();

  const currentMonDetails = contextualState.opponent.monsters[0];
  const currentMon = Ticklefairy;
  const {
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
          {/* {name} */}
          {currentMonDetails
            ? currentMonDetails.name
            : placeholderTrainer.monsters[0].name}
          <span style={{ color: "gray", fontSize: "12px" }}>
            lvl{" "}
            {currentMonDetails
              ? currentMonDetails.level
              : placeholderTrainer.monsters[0].level}
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
        <button> {moves[0]}</button>
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
