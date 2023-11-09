import { createPopupRemovedState } from "../dialog/basicDialogHandlers"

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

  // const switchTurns

  newState = createPopupRemovedState(newState) 

console.log(`END: phase ending. newState`, newState)
  return newState
}
