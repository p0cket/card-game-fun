import React from "react"
import { endTurnAction, playCardAction } from "../../actions"
import Card from "../Card"
import Enemy from "../Enemy"
import { motion } from "framer-motion/dist/framer-motion"
import heroBackImg from "../../assets/Protagonist.png"

const Battle = ({ gameData, dispatch }) => {
  //keeping drawCard for debugging
  // const drawCard = () => {
  //   dispatch({
  //     type: ACTIONS.DRAW_CARD,
  //     payload: { deck: gameData.deck, hand: gameData.battle.hand },
  //   });
  // };

  const playCard = (card) => {
    dispatch(playCardAction(card))
  }

  const endTurn = () => {
    dispatch(endTurnAction())
  }
  const { health, energy } = gameData.hero
  // const healthBarCount = health / 4
  // const heartEmoji = `❤️`

  // 5 cases: beginning, inBattle, victory, reward screen, loss
  // just change the scene to victory, pass the data,
  //  {/* different phases will be done through scene changes */}

  return (
    <>
      <div>
        <Enemy enemyData={gameData.battle.enemy} />
        <br />
        {/* Image of you */}
        <div>
          <img src={heroBackImg} alt="Hero Backside" />
        </div>
        <div>
          {`🧪${energy} Energy 💞${health}HP`}
          {``}
          {``}
          <progress
            id="health"
            value={health}
            max="100"
            style={{ color: "red" }}
          ></progress>
        </div>
        <div>
          {/* <span style={{ textAlign: "center" }}>
            {heartEmoji.repeat(healthBarCount)}
          </span> */}
        </div>
        <div style={{ color: "Red" }}>{gameData.alert}</div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1, duration: 2 }}
          style={{ color: "Red" }}
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
        <button onClick={endTurn}>End Turn</button>
        <br />

        <h5 style={{ color: "gray" }}>Our deck:</h5>
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          style={{ pointerEvents: "none", opacity: "0.4" }}
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
