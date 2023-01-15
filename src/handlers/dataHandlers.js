// General GameData handlers

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
  ourDeck.push(payload.card)
  // set some notification that the card is added
  const updatedDeck = ourDeck
  console.log(`adding card to deck, and full deck here`, payload, updatedDeck)
  return { ...state, deck: updatedDeck }
}

export const setAlertHandler = (state, payload) => {
  console.error("payload", payload)
  return {
    ...state,
    alert: payload,
  }
}