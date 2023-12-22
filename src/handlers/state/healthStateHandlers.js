// Full state change to heal a pal
export const healAIPal = (state, healAmount) => {
  console.log('healAIPal,  healAmount:', state, healAmount)

  let resultState = {
    ...state,
    opponent: {
      ...state.opponent,
      monsters: state.opponent.monsters.map((monster, index) =>
        index === 0
          ? {
              ...monster,
              stats: {
                ...monster.stats,
                hp: monster.stats.hp + healAmount, // Increase HP by healAmount
              },
            }
          : monster,
      ),
    },
  }

  console.log('resultState after healing:', resultState)
  return resultState
}
// Full state change to heal a pal
export const healHumanPal = (ourState, healAmount) => {
  console.log(
    'Entered healHumanPal: ourState, healAmount',
    ourState,
    healAmount,
  )
  console.log('ourState.userParty[0]:', ourState.userParty[0])

  let resultState = {
    ...ourState,
    userParty: ourState.userParty.map((partyMember, index) =>
      index === 0
        ? {
            ...partyMember,
            stats: {
              ...partyMember.stats,
              hp: partyMember.stats.hp + healAmount, // Increase HP by healAmount
            },
          }
        : partyMember,
    ),
  }

  console.log('resultState after healing:', resultState)
  return resultState
}

// This heals a pal but returns only that object.
// the others return the full state
export const healPal = (pal, healAmount) => {
  console.log('healPal healAmount:', pal, healAmount)
  const healedPal = {
    ...pal,
    stats: {
      ...pal.stats,
      hp: pal.stats.hp + healAmount, // Increase HP by healAmount
    },
  }

  console.log('healPal healedPal:', healedPal)
  return healedPal
}
