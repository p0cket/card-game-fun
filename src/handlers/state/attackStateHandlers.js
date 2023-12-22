import { updateHumanPartyWithPal } from "./partyStateHandlers"

export const addMoveToPalInState = (state, move, palIndex) => {
  console.log(`add moveToPalInState: state, move, palIndex`, state, move, palIndex)
  // add move to pal
  const updatedPalWithNewMove = addMoveToPal(state.userParty[palIndex], move)
  // add pal (update) to state in correct location
  const updatedPartyWithPal = updateHumanPartyWithPal(state, updatedPalWithNewMove, palIndex)
  state = {
    ...state,
    userParty: updatedPartyWithPal,
  }
  return state
}

export const addMoveToPal = (pal, move) => {
  console.log(`addMoveToPal: pal, move`, pal, move)
  // #TODO: add move to pal
  const palWithNewMove = {
    ...pal,
    moves: [...pal.moves, move],
  }
  console.log(`addMoveToPal: palWithNewMove`, palWithNewMove)
  return palWithNewMove
}
// export const updatePartyWithPal = (state, pal, palIndex) => {
//   console.log(`updatePartyWithPal: state,pal, palIndex`, state, pal, palIndex)
//   const updatedParty = [...state.userParty]
//   updatedParty[palIndex] = pal
//   console.log(`updatePartyWithPal: updatedParty`, updatedParty)
//   return updatedParty
// }
