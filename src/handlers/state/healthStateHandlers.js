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

export const setPlayerPalHPToMax = (state) => {
  // export const healHumanPal = (ourState, healAmount) => {
  console.log('ourState.userParty[0]:', state.userParty[0])
  state = {
    ...state,
    userParty: state.userParty.map((partyMember, index) =>
      index === 0
        ? {
            ...partyMember,
            stats: {
              ...partyMember.stats,
              hp: partyMember.stats.max_hp, // Increase HP by healAmount
            },
          }
        : partyMember,
    ),
  }

  console.log('state after healing:', state)
  return state
  // }
}

export const setEnemyPalEnergyToMax = (state) => {
  // give max energy
  state = {
    ...state,
    game: {
      ...state.game,
      player: {
        ...state.game.player,
        energy: state.game.player.maxEnergy,
      },
    },
  }
  return state
}

export const setEnemyPalHPToMax = (state) => {
  console.warn(`setEnemyPalHPToMax: state`,state)
  // set hp to max
  state = {
    // state.opponent.monsters[0].stats.hp
    ...state,
    opponent: {
      ...state.opponent,
      monsters: [
        {
          ...state.opponent.monsters[0],
          stats: {
            ...state.opponent.monsters[0].stats,
            hp: state.opponent.monsters[0].stats.max_hp,
          },
        },
      ],
    },
  }
  
  return state
}
