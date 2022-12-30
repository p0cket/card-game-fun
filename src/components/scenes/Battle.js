import React from "react"
import { endTurnAction, playCardAction } from "../../actions"
import Card from "../common/Card"
// import Enemy from "../common/Enemy"
import { motion } from "framer-motion/dist/framer-motion"
import "../common/Button.css"
import "./Battle.css"

const Battle = ({ gameData, dispatch }) => {
  const playCard = (card) => {
    dispatch(playCardAction(card))
  }

  const endTurn = () => {
    dispatch(endTurnAction())
  }
  const { health, energy } = gameData.hero
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
  }
  // const healthBarCount = health / 4
  // const heartEmoji = `❤️`
  const energyEmoji = "🧪"

  // 5 cases: beginning, inBattle, victory, reward screen, loss
  // just change the scene to victory, pass the data,
  //  {/* different phases will be done through scene changes */}
  return (
    <>
      <div>
        <div className="battleUIcontainer">
          <div className="battleUI">
            <div className="battleStats">
              <p>Simulation Room: No Effects</p>
            </div>
            <div className="battleTop">
              {/* Top column */}
              <div className="battleTopLeft">
                <div></div>
                <div className="battleTLname" style={{ fontSize: "25px" }}>
                  {gameData.battle.enemy.name}
                </div>
                <div className="battleTLhealth">
                  {gameData.battle.enemy.health}HP{" "}
                  <progress
                    id="health"
                    value={gameData.battle.enemy.health}
                    max="100"
                    style={{
                      backgroundColor: "#4caf50",
                    }}
                  ></progress>
                </div>
                <div className="battleTLdesc" style={{ fontSize: "12px" }}>
                  {gameData.battle.enemy.bio}
                </div>
                <div className="battleTLnext" style={{ color: "gray" }}>
                  Next Attack:
                </div>
                <div className="battleTLattack">
                  {gameData.battle.enemy.nextAttack.name} (
                  <span role="img" aria-label="fist">
                    👊
                  </span>
                  {gameData.battle.enemy.nextAttack.damage})
                </div>
              </div>{" "}
              <div className="battleTopRight">
                {" "}
                {/* <div className="battleTRimg">enemy img</div> */}
                <motion.img
                  style={{ width: 180, height: 150 }}
                  animate="visible"
                  whileHover="hover"
                  variants={yourVariants}
                  src={gameData.battle.enemy.img}
                  alt="Enemy Frontside"
                />
              </div>
            </div>
            <div className="battleBot">
              {/* @TODO: reverse left and right here */}
              <div className="battleBotRight">
                <motion.img
                  style={{ width: 180, height: 150 }}
                  animate="visible"
                  whileHover="hover"
                  variants={yourVariants}
                  src="/creatures/Chibipal.png"
                  alt="Enemy"
                />
              </div>
              <div className="battleBotLeft">
                <div className="battleBLname" style={{ fontSize: "25px" }}>
                  Your Chibipal
                </div>
                <div className="battleTLdesc" style={{ fontSize: "12px" }}>
                  "This {gameData.battle.enemy.name} seems tough!" -Communicator
                </div>
                <div className="battleBLhealth">
                  {health}HP{" "}
                  <progress
                    id="health"
                    value="80"
                    max="100"
                    style={{
                      backgroundColor: "#4caf50",
                    }}
                  ></progress>
                </div>
                <div className="battleBLattack">
                  {energy} PP{energyEmoji}
                </div>
              </div>
            </div>
            {/* <div className="battleStats"><p>Your stats: Armor 1  Attack 2</p></div> */}
          </div>
        </div>
        <h3
          style={{
            fontFamily: "Silkscreen",
            backgroundColor: "rgb(75, 119, 13)",
            color: "#a5e54d",
            margin: "0px 30px",
          }}
        >
          Tell your Chibipal what to do! You have {energy} PP{energyEmoji}
        </h3>
        <div style={{ color: "Red" }}>{gameData.alert}</div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1, duration: 2 }}
          style={{ color: "Red" }}
          className="battleUIhand"
        >
          {gameData.battle.hand.length > 0
            ? gameData.battle.hand.map((card) => {
                return (
                  <Card key={card.id} cardValue={card} useCard={playCard} />
                )
              })
            : `No Cards in hand. Click "End Turn" to let enemies attack and you'll draw a card.`}
        </motion.div>
      </div>
      <br />
      <div>
        <button onClick={endTurn} className="simpleButton">
          End Turn
        </button>
        <br />

        <h5 style={{ color: "gray" }}>Our deck:</h5>
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          style={{ pointerEvents: "none", opacity: "0.4" }}
          className="battleUIdeck"
        >
          {" "}
          {gameData.deck.map((card) => {
            return <Card key={card.id} cardValue={card} playCard={playCard} />
          })}
        </motion.div>
        <h4 style={{ color: "gray" }}>
          {gameData.battle.discarded.length} discarded Cards
        </h4>
      </div>
      {/* Keeping draw button for debugging */}
      {/* <button onClick={() => drawCard()}>
          Draw a card
        </button> */}
    </>
  )
}

export default Battle
