// damageStateHandlers.js

import { PLAYERS } from '../../consts/consts'
import { EFFECTS } from '../../effects'
import { ATK_PHASES, executeMove } from '../moveHandlers'

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

export const applyBlind = (target, effectValue, effect, type) => {
  console.log(
    `applying blind to ${target.name}, chance: ${effectValue}. effect:`,
    effect,
  )
  target.status = {
    ...target.status,
    blind: {
      active: true,
      amt: effectValue,
      name: EFFECTS.BLIND,
      effect: effect,
      type: type,
    },
  }
  console.log(`target after applying blind but not accuracy change: `, target)
  target = modifyPalAccuracy(target, effectValue)
  console.log(`target after accuracy change: `, target)

  return target
}

export const removeBlind = (target, effectValue) => {
  //TODO: add in the effect?
  // here we remove the blind status, and reverse the effects
  target.status = {
    ...target.status,
    blind: {
      active: false,
      amt: effectValue,
      name: EFFECTS.BLIND,
      // effect: effect,
    },
  }
  target = modifyPalAccuracy(target, -effectValue)
  return target
}

// This function applies the 'weak' status to a pal
export const applyWeak = (pal, weakAmt, effect, type) => {
  console.log(`DUCK: applyWeak, amt: ${weakAmt}, effect, pal:`, effect, pal)
  if (!pal.status) {
    pal.status = {}
  }
  pal.status.weak = {
    active: true, // Indicating that the weak status is currently active.
    amt: weakAmt, // The amount by which the damage will be reduced.
    name: EFFECTS.WEAK,
    effect: effect,
    type: type,
  }
  console.log(
    `Applying 'weak' status, now damage dealt by ${pal.name} will be reduced by ${weakAmt}`,
  )
  return pal
}

// This function removes the 'weak' status from a pal
const removeWeak = (pal) => {
  // Remove the 'weak' status from the pal. need the obj?
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

// Apply poison effect to the target
export const applyPoison = (pal, poisonAmt, effect, type) => {
  console.log(`DUCK: applyPoison, amt: ${poisonAmt}, effect, pal:`, effect, pal)
  if (!pal.status) {
    pal.status = {}
  }
  // replace here with what effect you're adding
  pal.status.poison = {
    active: true, // Indicating that the weak status is currently active.
    amt: poisonAmt, // The amount by which the damage will be reduced.
    name: EFFECTS.POISON,
    effect: effect,
    type: type,
  }
  console.log(
    `Applying 'weak' status, now damage dealt by ${pal.name} will be reduced by ${poisonAmt}`,
  )
  return pal
}

export const updateStatusState = (
  // updateStatusState(, , ,
  //, move.effect.type)
  contextualState, //contextualState
  player, //player
  statusResult, //move.effect.result
  effect, //amt//move.effect.amt
  type,
  //, move.effect.type)
  statusValue = true,
  index = 0,
) => {
  const { HUMAN, AI } = PLAYERS
  console.log(
    `DUCK: updateStatusState:   contextualState,
    player,
    statusResult,
    effect,
    type,
    statusValue,
    index,`,
    contextualState,
    player,
    statusResult, //name of status
    effect,
    type,
    statusValue,
    index,
  )
  if (player === HUMAN) {
    let updatedMonsters = [...contextualState.opponent.monsters]
    console.log(`index: ${index}`)
    updatedMonsters[index] = applyStatusToPal(
      effect,
      statusResult,
      updatedMonsters,
      statusValue,
      index,
      PLAYERS.HUMAN,
      type,
    )
    console.log(`DUCK: updatedMonsters: `, updatedMonsters)
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
      statusResult, //name of status
      statusValue,
    )
    let updatedMonsters = [...contextualState.userParty]
    updatedMonsters[index] = applyStatusToPal(
      effect,
      statusResult,
      updatedMonsters,
      statusValue,
      index,
      PLAYERS.AI,
      type,
    )
    return {
      ...contextualState,
      userParty: updatedMonsters,
    }
  }
  return contextualState // In case player is neither 'human' nor 'AI'
}

const applyStatusToPal = (
  effect,
  statusResult,
  updatedMonsters,
  statusValue,
  index,
  player,
  type,
) => {
  let palToApplyTo = updatedMonsters[index]
  console.log(
    `DUCK: applyStatusToPal: effect, statusResult, updatedMonsters, statusValue, index, player, type`,
    effect,
    statusResult,
    updatedMonsters,
    statusValue,
    index,
    player,
    type,
  )
  switch (statusResult) {
    case 'weak':
      if (
        !(
          palToApplyTo.status &&
          palToApplyTo.status.weak &&
          palToApplyTo.status.weak.active
        )
      ) {
        console.log(
          `Status result: ${statusResult} Status value: ${statusValue}. Effect:`,
          effect,
        )
        console.log(
          `Monster before applying weak to ${palToApplyTo.name}:`,
          palToApplyTo,
        )
        palToApplyTo = applyWeak(palToApplyTo, statusValue, effect, type) // Assuming applyWeak function exists
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
        palToApplyTo = applyBlind(palToApplyTo, statusValue, effect, type)
        console.log(`Monster after applying blind:`, palToApplyTo)
      }
      return palToApplyTo
    case 'poison':
      if (
        !(
          palToApplyTo.status &&
          palToApplyTo.status.poison &&
          palToApplyTo.status.poison.active
        )
      ) {
        console.log(
          `Status result: ${statusResult} Status value: ${statusValue}`,
        )
        console.log(
          `Monster before applying poison to ${palToApplyTo.name}:`,
          palToApplyTo,
        )
        palToApplyTo = applyPoison(palToApplyTo, statusValue, effect, type)
        console.log(`Monster after applying poison:`, palToApplyTo)
      }
      return palToApplyTo
    default:
      // any other status to be applied
      console.log(
        `default status case reached for  ${statusResult} to ${palToApplyTo.name}`,
      )
      // palToApplyTo.status = {
      //   ...palToApplyTo.status,
      //   [statusResult]: statusValue,
      // }
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
