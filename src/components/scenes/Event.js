import React from "react"
import { eventChoiceAction } from "../../actions"
import { possibleEvents } from "../../consts/allEvents"

const Event = ({ dispatch }) => {
  const executeChoice = (choice) => {
    dispatch(eventChoiceAction(choice.type, choice.num))
  }

  const chosenEvent = Math.floor(Math.random() * possibleEvents.length)
  const ourEvent = possibleEvents[chosenEvent]

  return (
    <div>
      <h5>Event Name: {ourEvent.name} </h5>
      <div>{ourEvent.description}</div>
      <br />
      <button onClick={() => executeChoice(ourEvent.choiceResults[0])}>
        {ourEvent.choices[0]}
      </button>
      <button onClick={() => executeChoice(ourEvent.choiceResults[1])}>
        {ourEvent.choices[1]}
      </button>
      <br />
      <br />
    </div>
  )
}

export default Event
