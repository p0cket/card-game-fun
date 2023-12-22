export const updateHumanPartyWithPal = (state, pal, palIndex) => {
  console.log(
    `updateHumanPartyWithPal: state,pal, palIndex`,
    state,
    pal,
    palIndex,
  )
  const updatedParty = [...state.userParty]
  updatedParty[palIndex] = pal
  console.log(`updatePartyWithPal: updatedParty`, updatedParty)
  return updatedParty
}

export const updateOpponentPartyWithPal = (state, pal, palIndex) => {
  console.log(
    `updateOpponentPartyWithPal: state,pal, palIndex`,
    state,
    pal,
    palIndex,
  )
  const updatedParty = [...state.opponent.monsters]
  updatedParty[palIndex] = pal
  console.log(`updatePartyWithPal: updatedParty`, updatedParty)
  return updatedParty
}

export const updateHumanStateWithParty = (state, party) => {
  console.log(`updateHumanStateWithParty: state, party`, state, party)
  const updatedParty = {
    ...state,
    userParty: party,
  }
  return updatedParty
}
