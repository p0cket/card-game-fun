import React from 'react'
import { eventChoiceAction } from '../../actions'
import { possibleEvents } from '../../consts/allEvents'

const Event = ({ dispatch }) => {
  const executeChoice = (choice) => {
    dispatch(eventChoiceAction(choice))
    //pass in the full object of the choice. it should have the result information, and the reducer should send
    // the user to the trans scene with enough info to have the trans go to the next scene
  }

  const chosenEvent = Math.floor(Math.random() * possibleEvents.length)
  const ourEvent = possibleEvents[chosenEvent]
  return (
    <div>
      <img src="/eventImages/questionMark.png" alt="Question Mark" />
      <h5>Event Name: {ourEvent.name} </h5>
      <div>{ourEvent.description}</div>
      <br />
      {ourEvent.choices.map((choiceOBJ, index) => {
        return (
          <button key={index} onClick={() => executeChoice(choiceOBJ)}>
            {choiceOBJ.choice}
          </button>
        )
      })}
      <br />
      <br />
    </div>
  )
}

export default Event
