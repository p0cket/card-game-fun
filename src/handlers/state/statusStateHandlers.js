// damageStateHandlers.js

import { PLAYERS } from '../../consts/consts'
import { ATK_PHASES, executeMove } from '../moveHandlers'

// Apply poison effect to the target
export const applyPoison = (target, effectValue) => {
  console.log(`applying poison to ${target.name}, damage: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    poison: {
      active: true,
      damage: effectValue,
    },
  }
  return target
}

// Apply burn effect to the target
export const applyBurn = (target, effectValue) => {
  console.log(`applying burn to ${target.name}, damage: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    burn: {
      active: true,
      damage: effectValue,
    },
  }
  return target
}

// Apply freeze effect to the target
export const applyFreeze = (target, effectValue) => {
  console.log(`applying freeze to ${target.name}, duration: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    freeze: {
      active: true,
      duration: effectValue,
    },
  }
  return target
}

// Apply paralysis effect to the target
export const applyParalysis = (target, effectValue) => {
  console.log(`applying paralysis to ${target.name}, chance: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    paralysis: {
      active: true,
      chance: effectValue,
    },
  }
  return target
}

// fix this. All this does is apply the status to the array of statuses
// in the monster's stats.
// the shape for this looks like:
//  pal = {
//   name: 'Luminowl',
//   quirks: ['Guiding Light', 'Soothing Feathers'],
//   stats: {
//     hp: 91,
//     max_hp: 111,
//     attack: 80,
//     defense: 60,
//     special_attack: 120,
//     special_defense: 90,
//     speed: 110,
//   },
//   status: { test: true },
// ... }
// in status is where we should store the status if it is applied
// to the monster. so like status: {test: true, poison: {active: true, damage: 10}} etc.
export const updateStatusState = (
  contextualState,
  player,
  statusResult,
  statusValue = true,
  index = 0,
) => {
  const { HUMAN, AI } = PLAYERS
  if (player === HUMAN) {
    let updatedMonsters = [...contextualState.opponent.monsters]
    console.log(`index: ${index}`)
    updatedMonsters[index].status = {
      ...updatedMonsters[index].status,
      [statusResult]: statusValue,
    }
    return {
      ...contextualState,
      opponent: {
        ...contextualState.opponent,
        monsters: updatedMonsters,
      },
    }
  } else if (player === AI) {
    console.warn(
      `updateStatusState: AI player: ${player} contextualState, player, statusResult, statusValue`,
      contextualState,
      player,
      statusResult,
      statusValue,
    )
    let updatedMonsters = [...contextualState.userParty]
    updatedMonsters[index].status = {
      ...updatedMonsters[index].status,
      [statusResult]: statusValue,
    }
    return {
      ...contextualState,
      userParty: updatedMonsters,
    }
  }
  return contextualState // In case player is neither 'human' nor 'AI'
}
