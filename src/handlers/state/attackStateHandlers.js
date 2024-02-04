import { updateHumanPartyWithPal } from './partyStateHandlers'

export const addMoveToPalInState = (state, move, palIndex) => {
  console.log(
    `add moveToPalInState: state, move, palIndex`,
    state,
    move,
    palIndex,
  )
  // add move to pal
  const updatedPalWithNewMove = addMoveToPal(state.userParty[palIndex], move)
  // add pal (update) to state in correct location
  const updatedPartyWithPal = updateHumanPartyWithPal(
    state,
    updatedPalWithNewMove,
    palIndex,
  )
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

export const addDamageToAttack = (attack, damage) => {
  if (!attack.damage) {
    console.log(`Attack ${attack.name} does not have a base damage to add to.`)
    return attack
  }
  const updatedAttack = {
    ...attack,
    damage: attack.damage + damage,
  }
  console.log(
    `Added ${damage} damage to ${attack.name}, total damage is now ${updatedAttack.damage}.`,
  )
  return updatedAttack
}
export const addAccuracyToAttack = (attack, accuracy) => {
  if (attack.accuracy == null) {
    console.log(
      `Attack ${attack.name} does not have an accuracy value to add to.`,
    )
    return attack
  }
  const updatedAttack = {
    ...attack,
    accuracy: Math.min(attack.accuracy + accuracy, 100),
  }
  console.log(
    `Added ${accuracy}% accuracy to ${attack.name}, total accuracy is now ${updatedAttack.accuracy}%.`,
  )
  return updatedAttack
}

export const decreaseEnergyCost = (attack, energyReduction) => {
  if (attack.energyCost == null) {
    console.log(
      `Attack ${attack.name} does not have an energy cost to decrease.`,
    )
    return attack
  }
  const updatedAttack = {
    ...attack,
    energyCost: Math.max(0, attack.energyCost - energyReduction),
  }
  console.log(
    `Decreased energy cost of ${attack.name} by ${energyReduction}, total energy cost is now ${updatedAttack.energyCost}.`,
  )
  return updatedAttack
}

export const addWeakToAttack = (attack, weakEffect) => {
  const updatedAttack = {
    ...attack,
    effect: {
      ...attack.effect,
      result: 'weak',
      ...weakEffect,
    },
  }
  console.log(`Added 'weak' effect to ${attack.name}.`, updatedAttack.effect)
  return updatedAttack
}

export const addBlindToAttack = (attack, blindEffect) => {
  const updatedAttack = {
    ...attack,
    effect: {
      ...attack.effect,
      result: 'blind',
      ...blindEffect,
    },
  }
  console.log(`Added 'blind' effect to ${attack.name}.`, updatedAttack.effect)
  return updatedAttack
}

// export const addAccuracyToAttackEffect = (attack, accuracyEffect) => {
//   const updatedAttack = {
//     ...attack,
//     effect: {
//       ...attack.effect,
//       accuracy: accuracyEffect,
//     },
//   }
//   console.log(`Added accuracy effect to ${attack.name}.`, updatedAttack.effect)
//   return updatedAttack
// }

export const updateMoveOnPal = (pal, moveIndex, additionalDamage) => {
  if (moveIndex < 0 || moveIndex >= pal.moves.length) {
    console.error(`Invalid moveIndex: ${moveIndex}`)
    return pal
  }

  const moveToUpdate = pal.moves[moveIndex]
  const updatedMove = addDamageToAttack(moveToUpdate, additionalDamage)

  const updatedMoves = [...pal.moves]
  updatedMoves[moveIndex] = updatedMove

  const updatedPal = {
    ...pal,
    moves: updatedMoves,
  }

  console.log(`Updated move on pal:`, updatedPal)
  return updatedPal
}

// export const updatePartyWithPal = (state, pal, palIndex) => {
//   console.log(`updatePartyWithPal: state,pal, palIndex`, state, pal, palIndex)
//   const updatedParty = [...state.userParty]
//   updatedParty[palIndex] = pal
//   console.log(`updatePartyWithPal: updatedParty`, updatedParty)
//   return updatedParty
// }
