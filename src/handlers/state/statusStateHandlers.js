// damageStateHandlers.js

import { PLAYERS } from '../../consts/consts'
import { EFFECTS } from '../../effects'
import { ATK_PHASES, executeMove } from '../moveHandlers'

// Apply poison effect to the target
export const applyPoison = (target, effectValue) => {
  console.log(`applying poison to ${target.name}, damage: ${effectValue}`)
  target.status = {
    ...target.status,
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
  target.status = {
    ...target.status,
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
  target.status = {
    ...target.status,
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
  target.status = {
    ...target.status,
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
  target.status = {
    ...target.status,
    blind: {
      active: true,
      amt: effectValue,
      name: EFFECTS.BLIND,
    },
  }
  console.log(`target after applying blind but not accuracy change: `, target)
  target = modifyPalAccuracy(target, effectValue)
  console.log(`target after accuracy change: `, target)

  return target
}

export const removeBlind = (target, effectValue) => {
  // here we remove the blind status, and reverse the effects
  target.status = {
    ...target.status,
    blind: {
      active: false,
      amt: effectValue,
      name: EFFECTS.BLIND,
    },
  }
  target = modifyPalAccuracy(target, -effectValue)
  return target
}

// This function applies the 'weak' status to a pal
const applyWeak = (pal, weakAmt) => {
  if (!pal.status) {
    pal.status = {}
  }
  pal.status.weak = {
    active: true, // Indicating that the weak status is currently active.
    amt: weakAmt, // The amount by which the damage will be reduced.
    name: EFFECTS.WEAK,
  }
  console.log(
    `Applying 'weak' status, now damage dealt by ${pal.name} will be reduced by ${weakAmt}`,
  )
  return pal
}

// This function removes the 'weak' status from a pal
const removeWeak = (pal) => {
  if (pal.status && pal.status.weak) {
    console.log(`Removing 'weak' status from ${pal.name}`)
    delete pal.status.weak
  } else {
    console.log(`No 'weak' status found on ${pal.name} to remove`)
  }

  return pal
}

// this is probably elsewhere
const modifyPalAccuracy = (pal, amt) => {
  // could be increase + or decrease -
  console.log(`modifying accuracy of ${pal.name} by ${amt}`, pal)
  pal.stats.accuracy = pal.stats.accuracy + amt
  console.log(`modified accuracy of ${pal.name} to ${pal.stats.accuracy}`, pal)
  return pal
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
// accuracy: 100,
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
    updatedMonsters[index] = applyStatusToPal(
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
    updatedMonsters[index] = applyStatusToPal(
      statusResult,
      updatedMonsters,
      statusValue,
      index,
      PLAYERS.AI,
    )
    // updatedMonsters = applyStatusToPal(
    //   statusResult,
    //   updatedMonsters,
    //   statusValue,
    //   index,
    //   PLAYERS.AI,
    // )
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
  let palToApplyTo = updatedMonsters[index]
  switch (statusResult) {
    // case 'poison':
    //   console.log(`applying poison to ${palToApplyTo.name}`)
    //   palToApplyTo = applyPoison(
    //     palToApplyTo,
    //     statusValue,
    //   )
    //   return palToApplyTo
    // case 'burn':
    //   console.log(`applying burn to ${palToApplyTo.name}`)
    //   palToApplyTo = applyBurn(palToApplyTo, statusValue)
    //   return palToApplyTo
    // case 'freeze':
    //   console.log(`applying freeze to ${palToApplyTo.name}`)
    //   palToApplyTo = applyFreeze(
    //     palToApplyTo,
    //     statusValue,
    //   )
    //   return palToApplyTo
    // case 'paralysis':
    //   console.log(`applying paralysis to ${palToApplyTo.name}`)
    //   palToApplyTo = applyParalysis(
    //     palToApplyTo,
    //     statusValue,
    //   )
    //   return palToApplyTo
    case 'weak':
      // only apply if 'weak' does not exist or 'weak.active' is not true
      if (
        !(
          palToApplyTo.status &&
          palToApplyTo.status.weak &&
          palToApplyTo.status.weak.active
        )
      ) {
        console.log(
          `Status result: ${statusResult} Status value: ${statusValue}`,
        )
        console.log(
          `Monster before applying weak to ${palToApplyTo.name}:`,
          palToApplyTo,
        )
        palToApplyTo = applyWeak(palToApplyTo, statusValue) // Assuming applyWeak function exists
        console.log(`Monster after applying weak:`, palToApplyTo)
      }
      return palToApplyTo
    case 'blind':
      // only apply if 'blind' does not exist or 'blind.active' is not true
      if (
        !(
          palToApplyTo.status &&
          palToApplyTo.status.blind &&
          palToApplyTo.status.blind.active
        )
      ) {
        console.log(
          `Status result: ${statusResult} Status value: ${statusValue}`,
        )
        console.log(
          `Monster before applying blind to ${palToApplyTo.name}:`,
          palToApplyTo,
        )
        palToApplyTo = applyBlind(palToApplyTo, statusValue)
        console.log(`Monster after applying blind:`, palToApplyTo)
      }
      return palToApplyTo
    default:
      // any other status to be applied
      console.log(`applying ${statusResult} to ${palToApplyTo.name}`)
      palToApplyTo.status = {
        ...palToApplyTo.status,
        [statusResult]: statusValue,
      }
      return palToApplyTo
  }
}

export const removeStatusFromPal = (statusResult, pal, statusValue) => {
  // Create a copy of the pal object
  let palCopy = { ...pal }

  if (palCopy.status && palCopy.status[statusResult]) {
    console.log(`Removing ${statusResult} from ${palCopy.name}`)
    if (statusResult === 'blind') {
      // Reverse the effect of blind status, assuming modifyPalAccuracy returns a new object
      palCopy = modifyPalAccuracy(palCopy, -statusValue)
    }
    // Remove the status from the copy
    delete palCopy.status[statusResult]
  } else {
    console.log(`No status ${statusResult} found on ${palCopy.name} to remove`)
  }

  return palCopy
}
// This function removes a specified status effect from a pal
// export const removeStatusFromPal = (
//   statusResult,
//   updatedMonsters,
//   statusValue,
//   index,
//   player,
// ) => {
//   if (
//     updatedMonsters[index] &&
//     updatedMonsters[index].status &&
//     updatedMonsters[index].status[statusResult]
//   ) {
//     console.log(`Removing ${statusResult} from ${updatedMonsters[index].name}`)
//     if (statusResult === 'blind') {
//   // Reverse the effect of blind status
//   updatedMonsters[index] = modifyPalAccuracy(
//     updatedMonsters[index],
//     -statusValue, // Assuming negative value reverses the effect
//   )
//   // Remove the 'blind' status from the pal
//   delete updatedMonsters[index].status[statusResult]
// }
//   } else {
//     console.log(
//       `No status ${statusResult} found on ${updatedMonsters[index].name} to remove`,
//     )
//   }
//   return updatedMonsters
// }
