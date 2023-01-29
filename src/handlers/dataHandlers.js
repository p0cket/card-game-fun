// General GameData handlers

import { applyUniqueId } from "../utils/reducer-utils"

export const setMyDataHandler = (state) => {
  return state
}

export const healHandler = (state, payload) => {
  let nextState = { ...state }
  const newHealth = nextState.hero.health + payload
  console.log(`newHealth is  ${newHealth}`)
  nextState = { ...nextState, hero: { ...nextState.hero, health: newHealth } }
  console.log(`nextState`, nextState)
  return nextState
}

export const setMyBalanceHandler = (state, payload) => {
  const newBalance = state.gold + payload
  console.log(`newBalance is  ${newBalance}`)
  const nextState = { ...state, gold: newBalance }
  return nextState
}

export const addCardHandler = (state, payload) => {
  const ourDeck = state.deck
  const cardWithFreshID = applyUniqueId(payload.card) 
  console.table("ourDeck and cardWithFreshIDb4:",ourDeck, cardWithFreshID)
  ourDeck.push(cardWithFreshID)
  console.table("ourDeck and cardWithFreshIDa:",ourDeck, cardWithFreshID)

  // ourDeck.push(payload.card)
  // set some notification that the card is added
  const updatedDeck = ourDeck
  return { ...state, deck: updatedDeck }
}

// export const addUniqueIdToCard = (state, payload) => {
//   const {card} = payload
//   return
// }

export const addPackHandler = (state, payload) => {
  const {pack} = payload
  let newState = { ...state}
  // const ourDeck = newState.deck
  // const packWithIds = []
  //for loop breaks ALL the things
  // const packWithIDs = pack.map(card => {
  //   return {...card, id: uniqueId()}
  // })
  for(let i = 0; i < pack.length; i++){
    newState = addCardHandler(newState, {card: pack[i]} )
  }
  // pack added
  // const newDeck = [...ourDeck, ...payload.pack]
  // const newDeck = [...ourDeck, ...packWithIDs]

  return { ...newState }
  // return { ...newState, deck: newDeck }
}

export const setAlertHandler = (state, payload) => {
  return {
    ...state,
    alert: payload,
  }
}

export const setDialogHandler = (state, payload) => {
  const { dialog } = payload
  return { ...state, battle: { ...state.battle, dialog: dialog } }
}
