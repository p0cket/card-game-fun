export const updatePartyWithPal = (state, pal, palIndex) => {
  console.log(`updatePartyWithPal: state,pal, palIndex`, state, pal, palIndex)
  const updatedParty = [...state.userParty]
  updatedParty[palIndex] = pal
  console.log(`updatePartyWithPal: updatedParty`, updatedParty)
  return updatedParty
}
