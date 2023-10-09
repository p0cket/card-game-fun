import React from "react";
import { dmgEmoji, energyEmoji, goldEmoji } from "../../consts/consts";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import "./../scenes/Battle.css";
import "./../common/Button.css";
import { useDispatchContext, useStateContext } from "../../MainContext";

function BattleTopDisplay({ gameData }) {
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

  return (
    <div className="battleTop">
      <div className="battleTopLeft">
        <div></div>
        <div className="battleTLname" style={{ fontSize: "25px" }}>
          {name}
        </div>
        <div>
          {" "}
          {status ? (
            <>
              {" "}
              <span
                style={{
                  color: "yellow",
                  textShadow:
                    "-2px 0px black, 0 1px black, 1px 0 black, 0 -1px black",
                }}
              >
                He is {status}ed
              </span>{" "}
              <span>(can't attack this turn)</span>
            </>
          ) : (
            ``
          )}
          <span style={{ color: "red" }}>
            {poison ? "Poisoned: " + poison : ""}
          </span>
        </div>
        <div className="battleTLhealth">
          {health}HP{" "}
          <progress
            id="health"
            value={health}
            max={maxHP}
            style={{
              backgroundColor: "#4caf50",
            }}
          ></progress>
        </div>
        <div className="battleTLnext" style={{ color: "gray" }}>
          Next Attack:
        </div>
        <div className="battleTLattack">
          {nextAttack.name} ({dmgEmoji}
          {nextAttack.damage})
        </div>
      </div>{" "}
      <div className="battleTopRight">
        <motion.img
          style={{ width: 180, height: 150 }}
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src={img}
          alt="Enemy Frontside"
        />
      </div>
    </div>
  );
}

export default BattleTopDisplay;
