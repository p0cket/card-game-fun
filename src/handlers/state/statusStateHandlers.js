// damageStateHandlers.js (but really statusStateHandlers)

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
      // amt: effectValue,
      amt: effect,
      name: EFFECTS.BLIND,
      effect: effect,
      // effect: effectValue,
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
// export const applyPoison = (pal, poisonAmt, effect, type) => {
export const applyPoison = ({ pal, poisonAmt, effect, type }) => {
  console.log(`DUCK: applyPoison, amt: ${poisonAmt}, effect, pal:`, effect, pal)
  if (!pal.status) {
    pal.status = {}
  }
  // replace here with what effect you're adding
  // pal.status.poison = {
  //   active: true, // Indicating that the weak status is currently active.
  //   amt: poisonAmt, // The amount by which the damage will be reduced.
  //   name: EFFECTS.POISON,
  //   // effect: effect,
  //   // effect is the part that shows on screen by the status.
  //   effect: poisonAmt,
  //   type: type,
  // }

  if (pal.status.poison && pal.status.poison.active) {
    pal.status.poison.amt += poisonAmt
  } else {
    // If the pal does not have an active poison status, set the initial amount
    pal.status.poison = {
      active: true,
      amt: poisonAmt,
      name: EFFECTS.POISON,
      effect: effect,
      type: type,
    }
  }
  console.log(
    `Applying 'weak' status, now damage dealt by ${pal.name} will be reduced by ${poisonAmt}`,
  )
  return pal
}
export const applyBuff = ({ pal, buffAmt, effect, type }) => {
  console.log(
    `DUCK: applyPoison, amt: ${buffAmt}, effect, pal:`,
    effect,
    pal,
    type,
  )
  if (!pal.status) {
    pal.status = {}
  }

  if (pal.status.buff && pal.status.buff.active) {
    // Convert string to number before adding
    const currentAmt = parseInt(pal.status.buff.amt, 10)
    const additionalAmt = parseInt(buffAmt, 10)
    const newAmt = currentAmt + additionalAmt
    console.log(
      `DUCK: buff already active, adding to amt of ${currentAmt} to ${additionalAmt} = ${newAmt}`,
    )
    pal.status.buff.amt = newAmt
    pal.status.buff.effect = newAmt // Assuming effect should also be the new amount
  } else {
    console.log(`DUCK: buff not active, setting amt to ${buffAmt}`)
    // If the pal does not have an active buff status, set the initial amount
    pal.status.buff = {
      active: true,
      amt: buffAmt, /// currently both are being used. we should only use one.
      name: EFFECTS.BUFF,
      // effect: effect,
      effect: buffAmt, /// currently both are being used. we should only use one.
      type: type,
    }
  }
  console.log(
    `Applying 'buff' status, now damage dealt by ${pal.name} will be buffed by ${buffAmt}`,
  )
  return pal
}
export const updateStatusState = ({
  contextualState,
  player,
  statusResult,
  effectAmt, // Assuming this is the renamed parameter for clarity
  type,
  effectObj,
  statusValue = true,
  index = 0,
}) => {
  const { HUMAN, AI } = PLAYERS
  console.log(
    `DUCK: updateStatusState:   contextualState,
    player,
    statusResult,
    effect,
    type,
    effectObj,
    statusValue,
    index,`,
    contextualState,
    player,
    statusResult, //name of status
    effectAmt,
    type,
    effectObj,
    statusValue,
    index,
  )
  console.log(`updateStatusState effectAmt`, effectAmt)
  console.log(`Starting effect application for player type: ${player}`)

  if (player === HUMAN) {
    console.log(`Processing effect for HUMAN player.`)
    let updatedAiParty = [...contextualState.opponent.monsters]
    console.log(`Initial AI Party State: `, updatedAiParty)

    let userParty = [...contextualState.userParty]
    console.log(`Initial User Party State: `, userParty)

    console.log(`Effect index: ${index}`)

    //our alternative will be     targets: ['opponent'] for opponent targets
    let targetParty = effectObj.targets.includes('self')
      ? userParty
      : updatedAiParty
    let targetIndex = effectObj.targets.includes('self') ? 0 : index // Assuming self always targets the first index
    console.log(
      `Targeting ${
        effectObj.targets.includes('self') ? 'self' : 'opponent'
      } at index ${targetIndex}`,
    )

    targetParty[targetIndex] = applyStatusToPal(
      effectAmt,
      statusResult,
      targetParty,
      statusValue,
      targetIndex,
      player,
      type,
    )
    console.log(`Post-effect application, targetParty: `, targetParty)

    let nextState
    if (effectObj.targets.includes('self')) {
      nextState = {
        ...contextualState,
        userParty: targetParty,
      }
      console.log(`Updated state with effect applied to user's party.`)
    } else {
      nextState = {
        ...contextualState,
        opponent: {
          ...contextualState.opponent,
          monsters: targetParty,
        },
      }
      console.log(`Updated state with effect applied to AI's party.`)
    }
    console.log(`Final state for HUMAN player action: `, nextState)
    return nextState
  } else if (player === AI) {
    //
    console.log(`AI STATUS BEING APPLIED: Starting AI effect application.`)
    console.log(`Processing effect for AI player.`)
    let updatedHumanParty = [...contextualState.userParty]
    console.log(`Initial Human Party State: `, updatedHumanParty)

    let updatedAiParty = [...contextualState.opponent.monsters]
    console.log(`Initial AI Party State: `, updatedAiParty)

    console.log(`Effect index: ${index}`)

    let targetParty = effectObj.targets.includes('self')
      ? updatedAiParty
      : updatedHumanParty
    let targetIndex = effectObj.targets.includes('self') ? 0 : index
    console.log(
      `Targeting ${
        effectObj.targets.includes('self') ? 'self' : 'human'
      } at index ${targetIndex}`,
    )

    targetParty[targetIndex] = applyStatusToPal(
      effectAmt,
      statusResult,
      targetParty,
      statusValue,
      targetIndex,
      player,
      type,
    )
    console.log(`Post-effect application, targetParty: `, targetParty)

    let nextState
    if (effectObj.targets.includes('self')) {
      nextState = {
        ...contextualState,
        opponent: {
          ...contextualState.opponent,
          monsters: targetParty,
        },
      }
      console.log(`Updated state with effect applied to AI's party.`)
    } else {
      nextState = {
        ...contextualState,
        userParty: targetParty,
      }
      console.log(`Updated state with effect applied to user's party.`)
    }
    console.log(`Final state for AI player action: `, nextState)
    return nextState
  }

  console.log(`No action taken, returning contextual state as is.`)
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
      console.log(
        `Status result: ${statusResult} Status value: ${statusValue} and effect ${effect}`,
        statusValue,
        effect,
      )
      console.log(
        `Monster before applying poison to ${palToApplyTo.name}:`,
        palToApplyTo,
      )
      palToApplyTo = applyPoison({
        pal: palToApplyTo,
        poisonAmt: effect, // or whatever the amount should be
        effect: statusValue, // Additional details about the effect, if necessary
        type: type, // The type of the effect
      })
      console.log(`Monster after applying poison:`, palToApplyTo)
      return palToApplyTo
    case 'buff':
      console.log(
        `Status result: ${statusResult} Status value: ${statusValue} and effect ${effect}`,
        statusValue,
        effect,
      )
      console.log(
        `Monster before applying buff to ${palToApplyTo.name}:`,
        palToApplyTo,
        type,
      )
      // somehow pass in your pal instead of the opponent pal
      palToApplyTo = applyBuff({
        pal: palToApplyTo,
        buffAmt: effect, // or whatever the amount should be
        effect: statusValue, // Additional details about the effect, if necessary
        type: type, // The type of the effect
      })
      console.log(`Monster after applying buff:`, palToApplyTo)
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
