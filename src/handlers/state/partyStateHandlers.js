export const updateHumanPartyWithPal = (state, pal, palIndex) => {
  console.log(
    `updateHumanPartyWithPal: state,pal, palIndex`,
    state,
    pal,
    palIndex,
  )
  const updatedParty = Array.isArray(state.userParty)
    ? [...state.userParty]
    : []
  if (!Array.isArray(state.userParty)) {
    console.error(
      'Expected state.userParty to be an array, but received:',
      state.userParty,
    )
  }
  // const updatedParty = [...state.userParty]
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

export const applyLevelUpBonus = (state) => {
  const levelIncrease = Math.floor(Math.random() * 8)
  const levelIncreaseBonus = 4
  const totalBonus = levelIncrease * levelIncreaseBonus
  state = addToUserPartyLvl(state, levelIncrease)
  state = addToUserPartyHP(state, totalBonus)
  state = addToUserPartyMaxHP(state, totalBonus)
  return state
}

export const addToUserPartyHP = (state, amt) => {
  let updatedParty = [...state.userParty]
  if (updatedParty.length > 0) {
    updatedParty[0] = {
      ...updatedParty[0],
      stats: {
        ...updatedParty[0].stats,
        hp: updatedParty[0].stats.hp + amt,
      },
    }
  }
  return {
    ...state,
    userParty: updatedParty,
  }
}

export const addToUserPartyMaxHP = (state, amt) => {
  let updatedParty = [...state.userParty]
  if (updatedParty.length > 0) {
    updatedParty[0] = {
      ...updatedParty[0],
      stats: {
        ...updatedParty[0].stats,
        max_hp: updatedParty[0].stats.max_hp + amt,
      },
    }
  }
  return {
    ...state,
    userParty: updatedParty,
  }
}

export const addToUserPartyLvl = (state, amt) => {
  let updatedParty = [...state.userParty]
  if (updatedParty.length > 0) {
    updatedParty[0] = {
      ...updatedParty[0],
      lvl: updatedParty[0].lvl + amt,
    }
  }
  return {
    ...state,
    userParty: updatedParty,
  }
}

export const adToUserPartyLvl = (state, amt) => {
  state = {
    ...state,
    userParty: {
      ...state.userParty,
      [0]: {
        ...state.userParty[0],
        lvl: state.userParty[0].lvl + amt,
      },
    },
  }
  return state
}

export const swapPals = (
  state,
  pal,
  palLocation,
  palToSwapWith,
  palToSwapWithLocation,
  //later use player to determine for enemy party instead
  player,
) => {
  // we take the location of the first pal, and put the second pal
  // we then take the second pal slot, and put the first pal there
console.log( state,
  `pal,
  palLocation,
  palToSwapWith,
  palToSwapWithLocation,
  player`,pal,
  palLocation,
  palToSwapWith,
  palToSwapWithLocation,
  player)
  console.log(`swapPals: original userParty`, state.userParty)
  const updatedParty = [...state.userParty]
  console.log(
    `swapPals: putting palToSwapWith in updatedParty[${palLocation}]`,
    palToSwapWith,
    updatedParty,
  )
  updatedParty[palLocation] = palToSwapWith
  console.log(
    `swapPals: updated party after placing palToSwapWith`,
    updatedParty,
  )
  console.log(
    `swapPals: placing pal in updatedParty[${palToSwapWithLocation}]`,
    pal,
    updatedParty,
  )
  updatedParty[palToSwapWithLocation] = pal
  console.log(`swapPals: final updated party`, updatedParty)
  state = {
    ...state,
    userParty: updatedParty,
  }
  console.log(`swapPals: full state - returning`, state)
  return state
}
