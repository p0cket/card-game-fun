import React from "react"
import Card from "../Card"
import { ACTIONS } from "../../actions"



const Reward = ({ gameData, dispatch }) => {
  const currentRewards = gameData.availableRewards

  const addCard = (card) => {
    console.log(`adding this card:`, card)
    dispatch({
      type: ACTIONS.SELECT_REWARD,
      payload: { card },
    })
  }
  // ------------
  console.log(`gameData from Rewards`, gameData)

  return (
    <div>
      <h1>Reward Component</h1>
      <br />
      <h3>Thank you for vanquishing those foes.</h3>
      <h4>Please take something, its on us</h4>
      <div>
        {currentRewards.map((card) => {
          return <Card key={card.id} cardValue={card} useCard={addCard} />
        })}
      </div>
    </div>
  )
}

export default Reward
