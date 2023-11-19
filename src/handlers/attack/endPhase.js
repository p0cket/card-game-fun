import { PLAYERS } from '../../consts/consts'
import {
  createPopupRemovedState,
  createPopupVisibleState,
} from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeAITurn } from '../moveHandlers'




export const endPhase = (
  contextualState,
  contextualDispatch,
  // move details
  move,
  pal,
  player,
  userSlot,
  // target details
  targets,
) => {
  console.group(`END: start`)
  console.log(
    `END: move, contextualState, contextualDispatch, pal, `,
    move,
    contextualState,
    contextualDispatch,
    pal,
  )
  let newState = contextualState

  const endTurnOptions = [
    {
      label: `Enemy gets to go now`,
      onClick: () => {
        console.log(`Enemy gets to attack`)
        //doesn't need to return anything because it runs again
        executeAITurn(newState, contextualDispatch)
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  if(player === PLAYERS.HUMAN){

  
  // const switchTurns
  // newState = createPopupRemovedState(newState)

  // display a message with createPopupVisibleState

  // an option should be executeAITurn(stuff)
  newState = createPopupVisibleState({
    prevState: newState,
    message: `We are switching turns, the opponent can go now.`,
    options: endTurnOptions,
    header: 'End of Your Turn',
    title: 'Opponent gets to go now',
    color: '#000',
    background: '#fff',
  })

  console.log(`END: phase ending. newState`, newState)
  console.groupEnd()
  return newState }
  else if (player === PLAYERS.AI) {
    console.log(`END: phase ending. newState`, newState)
    newState = createPopupRemovedState(newState)
    console.groupEnd()
    return newState
  }
}
