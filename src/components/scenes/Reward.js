import React from "react"
import Card from "../common/Card"
import { addCardAction } from "../../actions"
import { motion } from 'framer-motion'
import ChibipalsSelection from "../reward/ChibipalsSelection"

const Reward = () => {
  return (
    <div>
      reward page:
      <ChibipalsSelection />
    </div>
  )
}

// const Reward = ({ gameData, dispatch }) => {
//   const currentRewards = gameData.availableRewards

//   const addCard = (card) => {
//     console.log(`adding this card:`, card)
//     dispatch(addCardAction(card))
//   }
//   console.log(`gameData from Rewards`, gameData)

//   return (
//     <div>
//       <br />
//       <h1>A Reward!</h1>
//       <br />
//       <h3>
//         Thank you for vanquishing those foes. You have {gameData.deck.length}{" "}
//         cards.
//       </h3>
//       <h4>Please take something, its on us</h4>

//       <motion.div
//         initial={{ opacity: 0.5 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.1, duration: 3 }}
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {currentRewards.map((card) => {
//           return <Card key={card.id} cardValue={card} useCard={addCard} />
//         })}
//       </motion.div>
//       <br />
//     </div>
//   )
// }

export default Reward
