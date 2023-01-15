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
  const goldEmoji = "💰"

  return (
    <>
      <div className="sceneContainer">
        <div className="battleUIcontainer">
          <div>
            <div className="battleUI">
              <div className="battleStats">
                <p>
                  {`${goldEmoji}${gameData.gold}`}
                  <span style={{ color: "#e6ecc3" }}>Gold</span>
                  <span style={{ color: "#e6ecc3" }}> Level</span>
                  {gameData.curScene.lvl}
                  {" -"}
                  <span style={{ color: "#e6ecc3" }}>ACT</span>
                  {gameData.curScene.act}- Simulation Room: No Effects
                </p>
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
                  {/* <div style={{ color: "yellow", textShadow: "1px 1px 4px black" }}> */}
                  <div>
                    {" "}
                    {gameData.battle.enemy.status ? (
                      <>
                        {" "}
                        <span
                          style={{
                            color: "yellow",
                            textShadow:
                              "-2px 0px black, 0 1px black, 1px 0 black, 0 -1px black",
                          }}
                        >
                          He is {gameData.battle.enemy.status}ed
                        </span>{" "}
                        <span>(can't attack this turn)</span>
                      </>
                    ) : (
                      ``
                    )}
                  </div>
                </div>{" "}
                <div className="battleTopRight">
                  {" "}
                  {/* First Basic SVG for adding attack animations */}
                  {/* <motion.svg
                  initial={{ d: "M0 50 H100" }}
                  animate={{ d: "M0 50 H200" }}
                  transition={{ duration: 6 }}
                >
                  <motion.path></motion.path>
                  <img src={gameData.battle.enemy.img} alt="Enemy" />
                </motion.svg> */}
                  {/* Second attempt at an SVG. Works okay, but isn't overlayed on the image */}
                  {/* <svg
                  id="eMJmwrH5NbW1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 300"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                >
                  <path
                    style={{
                      strokeDasharray: "30",
                      animation: "dash 10s infinite",
                    }}
                    d="M48.099357,97.101989C79.149414,107.263826,114.715842,2.25818,161.5732,11.290924s45.615356,145.652992,92.585623,130.410237s19.759126,86.375612,32.179149,91.45653-20.323671,109.522023-88.069249,32.743701s64.170115-83.251793-36.695523-104.441104-27.435716,20.544271-44.034626,94.279262-32.396854-25.279024-84.117425-49.68009-16.371849-119.119308,14.678208-108.957471Z"
                    transform="translate(.000003 0.000006)"
                    fill="none"
                    stroke="rgb(75, 119, 13)"
                    stroke-width="3"
                  />
                </svg> */}
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
                    alt="Your Chibipal"
                  />
                </div>
                <div className="battleBotLeft">
                  <div className="battleBLname" style={{ fontSize: "25px" }}>
                    Your Chibipal{" "}
                    <span>
                      {" "}
                      {gameData.hero.effects.buff ? (
                        <span>status:{gameData.hero.effects.buff}</span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="battleTLdesc" style={{ fontSize: "12px" }}>
                    "This {gameData.battle.enemy.name} seems tough!"
                    -Communicator
                  </div>
                  <div className="battleBLhealth">
                    {health}HP{" "}
                    <progress
                      id="health"
                      value={health}
                      max="100"
                      style={{
                        backgroundColor: "#4caf50",
                      }}
                    ></progress>
                  </div>
                  <h1 className="battleBLattack">
                    {energy} PP{energyEmoji}
                  </h1>
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
            {gameData.battle.dialog
              ? gameData.battle.dialog
              : "Tell your Chibipal what to do!"}
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
            <div>End Turn</div>{" "}
            <div>(also refills all PP and draws two cards) </div>
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
      </div>
    </>
  )
}

export default Battle
