import { createPopupRemovedState, createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeAITurn, executeMove } from '../moveHandlers'

export const endPhase = (move, ourState, contextualDispatch, user, phase) => {
  console.group(`END: start`)
  console.log(
    `END: move, ourState, contextualDispatch, user, phase`,
    move,
    ourState,
    contextualDispatch,
    user,
    phase,
  )
  let newState = ourState



  const endTurnOptions = [
    {
      label: `Enemy gets to go now`,
      onClick: () => {
        console.log(`Enemy gets to attack`)
        //doesn't need to return anything because it runs again
        executeAITurn(
          newState,
          contextualDispatch,
          user,
        )
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  // const switchTurns
  // newState = createPopupRemovedState(newState)

  // display a message with createPopupVisibleState

  // an option should be executeAITurn(stuff)
  newState = createPopupVisibleState({
    prevState: newState,
    message: `We are switching turns, the opponent can go now.`,
    options: endTurnOptions,
    header: "End of Your Turn",
    title: "Opponent gets to go now",
    color: "#000",
    background: "#fff",
  })



  
  console.log(`END: phase ending. newState`, newState)
  return newState
}
