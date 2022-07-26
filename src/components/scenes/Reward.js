import React from "react"
import Card from "../Card"
import { addCardAction } from "../../actions"
import { motion } from "framer-motion/dist/framer-motion"

const Reward = ({ gameData, dispatch }) => {
  const currentRewards = gameData.availableRewards

  const addCard = (card) => {
    console.log(`adding this card:`, card)
    dispatch(addCardAction(card))
  }
  // ------------
  console.log(`gameData from Rewards`, gameData)

  return (
    <div>
      <h1>A Reward!</h1>
      <br />
      <h3>Thank you for vanquishing those foes.</h3>
      <h4>Please take something, its on us</h4>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 3 }}
      >
        {currentRewards.map((card) => {
          return <Card key={card.id} cardValue={card} useCard={addCard} />
        })}
      </motion.div>
    </div>
  )
}

export default Reward
