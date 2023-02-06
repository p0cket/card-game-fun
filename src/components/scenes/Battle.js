import React from "react"
import { endTurnAction, playCardAction } from "../../actions"
import Card from "../common/Card"
import { dmgEmoji, energyEmoji, goldEmoji } from "../../consts/consts"
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion"
import "../common/Button.css"
import "./Battle.css"
import Dialog from "../common/Dialog"

const Battle = ({ gameData, dispatch }) => {
  const playCard = (card) => {
    dispatch(playCardAction(card))
  }

  const endTurn = () => {
    dispatch(endTurnAction())
  }
  const { health, energy, maxHP } = gameData.hero
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
// TODO Leverage the knowledge events to make victory scenes, and any scene that goes between another
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
                <div className="battleTopLeft">
                  <div></div>
                  <div className="battleTLname" style={{ fontSize: "25px" }}>
                    {gameData.battle.enemy.name}
                  </div>
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
                    <span style={{ color: "red" }}>
                      {gameData.battle.enemy.poison
                        ? "Poisoned: " + gameData.battle.enemy.poison
                        : ""}
                    </span>
                  </div>
                  <div className="battleTLhealth">
                    {gameData.battle.enemy.health}HP{" "}
                    <progress
                      id="health"
                      value={gameData.battle.enemy.health}
                      max={gameData.battle.enemy.maxHP}
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
                    {/* <span role="img" aria-label="fist">
                      👊
                    </span> */}
                    {dmgEmoji}
                    {gameData.battle.enemy.nextAttack.damage})
                  </div>
                  {/* <div style={{ color: "yellow", textShadow: "1px 1px 4px black" }}> */}
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
                  <div className="battleBotLeftUpper">
                    <div>
                      <div
                        className="battleBLname"
                        style={{ fontSize: "25px" }}
                      >
                        Your Pal{" "}
                      </div>
                      <div className="battleBLhealth">
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
                    {" "}
                    <h1 className="battleBLattack">
                      {energy} Energy{": "}
                      {energyEmoji.repeat(energy)}
                    </h1>
                  </div>
                </div>
              </div>
              {/* <div className="battleStats"><p>Your stats: Armor 1  Attack 2</p></div> */}
            </div>
          </div>
          <div className="battleDialog">
            <Dialog
              // style={{
              //   fontFamily: "Silkscreen",
              //   // backgroundColor: "rgb(75, 119, 13)",
              //   color: "#a5e54d",
              //   margin: "0px 30px",
              //   padding: "10px 0px",
              //   fontSize: "20px"
              // }}
              size="30"
              key={gameData.battle.dialog}
              myText={
                gameData.battle.dialog
                  ? gameData.battle.dialog
                  : "Tell your Chibipal what to do!"
              }
            />
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
          <AnimatePresence>
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
                      <Card
                        key={card.id}
                        cardValue={card}
                        useCard={playCard}
                        isBattle={true}
                      />
                    )
                  })
                : `No Cards in hand. Click "End Turn" to let enemies attack and you'll draw a card.`}
            </motion.div>
          </AnimatePresence>
          <div>
            <br />
            <button onClick={endTurn} className="simpleButton">
              <div>End Turn</div>{" "}
              <div>(also refills all Energy and draws two cards) </div>
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
                return (
                  <Card key={card.id} cardValue={card} playCard={playCard} />
                )
              })}
            </motion.div>
            <h4 style={{ color: "gray" }}>
              {gameData.battle.discarded.length} cards in your Used Cards pile
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Battle
