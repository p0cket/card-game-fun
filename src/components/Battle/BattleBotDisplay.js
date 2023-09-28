import React from "react";
import { energyEmoji } from "../../consts/consts";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import "./../scenes/Battle.css";
import "./../common/Button.css";

function BattleBotDisplay({ gameData, health, maxHP, energy }) {
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
  return (
    <div className="battleBot">
      {/* @TODO: reverse left and right here */}
      <div className="battleBotRight">
        <motion.img
          style={{ width: 180, height: 150 }}
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src="/creatures/Chibipal.png"
          alt="Your Chibipal"
        />
      </div>
      <div className="battleBotLeft">
        <div className="battleBotLeftUpper">
          <div>
            <div className="battleBLname" style={{ fontSize: "25px" }}>
              Pupcake Lvl 1
            </div>
            <div className="battleBLhealth">
              {health}
              <img
                style={{ width: 10, height: 10 }}
                src="./icons/heart.png"
                alt="Health"
              />
              <progress
                id="health"
                value={health}
                max={maxHP}
                style={{
                  backgroundColor: "#4caf50",
                }}
              ></progress>
            </div>
          </div>
          <div className="battleBuffs">
            {" "}
            <span>
              {" "}
              {gameData.hero.effects.buff ? (
                <span>{gameData.hero.effects.buff}</span>
              ) : (
                ""
              )}
            </span>
          </div>
          {/* <div className="battleBLdesc" style={{ fontSize: "12px" }}>
            "This {gameData.battle.enemy.name} seems tough!"
            -Communicator
          </div> */}
        </div>

        <div>
        </div>
      </div>
    </div>
  );
}

export default BattleBotDisplay;
