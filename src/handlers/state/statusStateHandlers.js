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
// Apply blind effect to the target
export const applyBlind = (target, effectValue) => {
  console.log(`applying blind to ${target.name}, chance: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    blind: {
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

    // check if already has the status,
    // if it doesn't, add it and apply effect
    // apply any general effects as well
    // switch (statusResult) {
    //   case 'poison':
    //     console.log(`applying poison to ${updatedMonsters[index].name}`)
    //     updatedMonsters[index] = applyPoison(
    //       updatedMonsters[index],
    //       statusValue,
    //     )
    //     break
    //   case 'burn':
    //     console.log(`applying burn to ${updatedMonsters[index].name}`)
    //     updatedMonsters[index] = applyBurn(updatedMonsters[index], statusValue)
    //     break
    //   case 'freeze':
    //     console.log(`applying freeze to ${updatedMonsters[index].name}`)
    //     updatedMonsters[index] = applyFreeze(
    //       updatedMonsters[index],
    //       statusValue,
    //     )
    //     break
    //   case 'paralysis':
    //     console.log(`applying paralysis to ${updatedMonsters[index].name}`)
    //     updatedMonsters[index] = applyParalysis(
    //       updatedMonsters[index],
    //       statusValue,
    //     )
    //     break
    //   case 'blind':
    //     console.log(`applying blind to ${updatedMonsters[index].name}`)
    //     updatedMonsters[index] = applyBlind(updatedMonsters[index], statusValue)
    //     break
    //   default:
    //     // any other status to be applied
    //     console.log(
    //       `applying ${statusResult} to ${updatedMonsters[index].name}`,
    //     )
    //     updatedMonsters[index].status = {
    //       ...updatedMonsters[index].status,
    //       [statusResult]: statusValue,
    //     }
    //     break
    // }
    // const applyStatusToPal = (statusResult, updatedMonsters, statusValue, index) => {
    updatedMonsters = applyStatusToPal(
      statusResult,
      updatedMonsters,
      statusValue,
      index,
      PLAYERS.HUMAN,
    )
    const nextState = {
      ...contextualState,
      opponent: {
        ...contextualState.opponent,
        monsters: updatedMonsters,
      },
    }
    return nextState
  } else if (player === AI) {
    console.warn(
      `updateStatusState: AI player: ${player} contextualState, player, statusResult, statusValue`,
      contextualState,
      player,
      statusResult,
      statusValue,
    )
    let updatedMonsters = [...contextualState.userParty]
    updatedMonsters = applyStatusToPal(
      statusResult,
      updatedMonsters,
      statusValue,
      index,
      PLAYERS.AI,
    )
    return {
      ...contextualState,
      userParty: updatedMonsters,
    }
  }
  return contextualState // In case player is neither 'human' nor 'AI'
}

const applyStatusToPal = (
  statusResult,
  updatedMonsters,
  statusValue,
  index,
  player,
) => {
  switch (statusResult) {
    // case 'poison':
    //   console.log(`applying poison to ${updatedMonsters[index].name}`)
    //   updatedMonsters[index] = applyPoison(
    //     updatedMonsters[index],
    //     statusValue,
    //   )
    //   return updatedMonsters
    // case 'burn':
    //   console.log(`applying burn to ${updatedMonsters[index].name}`)
    //   updatedMonsters[index] = applyBurn(updatedMonsters[index], statusValue)
    //   return updatedMonsters
    // case 'freeze':
    //   console.log(`applying freeze to ${updatedMonsters[index].name}`)
    //   updatedMonsters[index] = applyFreeze(
    //     updatedMonsters[index],
    //     statusValue,
    //   )
    //   return updatedMonsters
    // case 'paralysis':
    //   console.log(`applying paralysis to ${updatedMonsters[index].name}`)
    //   updatedMonsters[index] = applyParalysis(
    //     updatedMonsters[index],
    //     statusValue,
    //   )
    //   return updatedMonsters
    // case 'blind':
    //   console.log(`Status result: ${statusResult}`)
    //   console.log(
    //     `Index: ${index}, Valid index: ${
    //       index >= 0 && index < updatedMonsters.length
    //     }`,
    //   )
    //   console.log(`Status value: ${statusValue}`)
    //   console.log(`Monster before applying blind:`, updatedMonsters[index])
    //   console.log(`applying blind to ${updatedMonsters[index].name}`)
    //   updatedMonsters[index] = applyBlind(updatedMonsters[index], statusValue)
    //   console.log(`Monster after applying blind:`, updatedMonsters[index])
    //   return updatedMonsters
    default:
      // any other status to be applied
      console.log(`applying ${statusResult} to ${updatedMonsters[index].name}`)
      updatedMonsters[index].status = {
        ...updatedMonsters[index].status,
        [statusResult]: statusValue,
      }
      return updatedMonsters
  }
}
