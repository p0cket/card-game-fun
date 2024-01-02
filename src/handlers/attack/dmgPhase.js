import { ACTIONS } from '../../MainContext'
import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import {
  ATK_PHASES,
  calculateTargets,
  createPayloadState,
  executeMove,
} from '../moveHandlers'
import { dmgEffectsHandler } from '../phaseHelpers/dmgPhaseHandlers'
import {
  createAIDamagedState,
  createHumanDamagedState,
} from '../state/damageStateHandlers'
let ourDmg
let damagedHP
export const dmgPhase = (state, attackPayload) => {
  let newState = createPayloadState(state, attackPayload)
  const { move, pal, phase, player, userSlot, targets } = attackPayload
  console.groupCollapsed(
    `💵 dmgPhase: starting`,
    newState,
    move,
    pal,
    phase,

    player,
    userSlot,
    targets,
  )
  checkForUndefined({
    newState,
    move,
    pal,
    phase,
    player,
    userSlot,
    targets,
  })
  let targetPal

  // get move's accuracy
  const accuracy = move.accuracy
  // roll random
  const roll = Math.floor(Math.random() * 100)

  if (player === PLAYERS.HUMAN) {
    // Check if hit. based on accuracy stat of atk and user
    // Figure out the user, we neeed their accuracy
    let user = newState.userParty[0]
    // user's accuracy stat
    const palAccuracyStat = user.stats.accuracy

    // targetPal is the reciever of the atk
    targetPal = newState.opponent.monsters[0]
    const combinedAccuracy = (accuracy + palAccuracyStat) / 2
    console.warn(`🫠check attacker passed as human`, targetPal)
    console.log(
      `Roll: ${roll} < ${accuracy} ${palAccuracyStat} / 2 = ${
        roll < combinedAccuracy
      }. move:`,
      move,
    )
    if (roll < combinedAccuracy) {
      // Roll passes, apply weak if there is any,

      let finalDmg = move.damage
      // handle `weak` status
      console.log(
        `HUMAN hit lands, dmg is ${finalDmg} before ifWeakDoLessDamage`,
      )
      finalDmg = ifWeakDoLessDamage(user, finalDmg)
      newState = lowerAttackDamageInState(newState, user, finalDmg)
      console.log(` dmg is ${finalDmg} after ifWeakDoLessDamage`)

      // then apply sheild if there is any

      // then apply dmg damage
      const damageAppliedFromHumanState = runDmgHuman(
        newState,
        targetPal,
        move,
        finalDmg,
      ) //stuff here
      console.groupEnd()
      return damageAppliedFromHumanState
    } else {
      // hit doesn't land for HUMAN, handle it.
      console.log(`hit doesn't land for HUMAN`)
      newState = switchDialog(newState, DIALOGS.MISSED_ATTACK_HUMAN)
      console.groupEnd()
      return newState
    }
  } else if (player === PLAYERS.AI) {
    // Figure out the user, we neeed their accuracy
    let user = newState.opponent.monsters[0]
    const palAccuracyStat = user.stats.accuracy

    targetPal = newState.userParty[0]
    const combinedAccuracy = (accuracy + palAccuracyStat) / 2
    console.log(
      `ATK: DMG phase: AI->  targetPal, move, pal`,
      targetPal,
      move,
      pal,
    )
    console.warn(
      `Roll: ${roll} < ${accuracy} ${palAccuracyStat} / 2 = ${
        roll < combinedAccuracy
      } move:`,
      move,
    )
    if (roll < combinedAccuracy) {
      // We're getting rid of some dmg if buffed here
      let finalDmg = move.damage
      console.log(`AI hit lands, dmg is ${finalDmg} before ifWeakDoLessDamage`)
      // #TODO:  consolidate these two
      finalDmg = ifWeakDoLessDamage(user, finalDmg)
      newState = lowerAttackDamageInState(newState, user, finalDmg)
      console.log(`dmg is ${finalDmg} after ifWeakDoLessDamage`)

      // Roll passes, apply damage
      const damageAppliedFromAIState = runDmgAI(
        newState,
        targetPal,
        move,
        finalDmg,
      ) //stuff here. pal
      console.groupEnd()
      return damageAppliedFromAIState
    } else {
      // hit doesn't land for AI, handle it.
      console.log(`hit doesn't land for AI`)
      newState = switchDialog(newState, DIALOGS.MISSED_ATTACK_AI)
      console.groupEnd()
      return newState
    }
  }
}

const runDmgHuman = (newState, targetPal, move, dmgAmt) => {
  console.log(`ATK: DMG phase: targetPal, move`, targetPal, move)
  // add the Effects Handler here:
  //  newState = dmgEffectsHandler(newState, pal, 0)
  const moveCost = move.cost.energy
  ourDmg = dmgAmt
  damagedHP = targetPal.stats.hp - ourDmg
  console.warn(
    `AI pal's HP ${targetPal.stats.hp} - ${ourDmg}dmg = ${damagedHP}`,
  )
  console.log(
    `dmg b4 the createAIDamagedState, 'AI' pal's HP is now ${damagedHP}`,
    newState,
  )
  newState = createAIDamagedState(newState, damagedHP)
  console.log(`createAIDamagedState:`, newState)

  newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_AI)
  console.log(`dmg after the createAIDamagedState:`, newState)
  return newState
}
const runDmgAI = (newState, targetPal, move, dmgAmt) => {
  console.log(`Player is AI: newState.userParty`, newState.userParty)
  const moveCost = move.cost.energy
  console.log(
    `ATK: DMG phase: targetPal, move`,
    targetPal,
    move,
    `The AI damage to be dealt is ${dmgAmt}.
This will result in targetPal.stats.hp (${targetPal.stats.hp})
 at: ${targetPal.stats.hp - dmgAmt}`,
  )
  damagedHP = targetPal.stats.hp - dmgAmt
  newState = createHumanDamagedState(newState, damagedHP)
  newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_HUMAN)
  console.log(`After createHumanDamagedState:`, newState)
  console.log(`ATK: DAMAGE phase ending:`, newState)
  return newState
}

const ifWeakDoLessDamage = (userPal, dmg) => {
  if (userPal.status && userPal.status.weak) {
    console.log(
      `Applying weakness, reducing damage (${dmg}) by ${
        userPal.status.weak.amt
      }. Dmg is now ${dmg - userPal.status.weak.amt}`,
    )
    dmg -= userPal.status.weak.amt
  }
  console.log(`dmg result: ifWeakDoLessDamage: ${dmg}`)
  return dmg
}

const lowerAttackDamageInState = (newState, userPal, newDmgAmt) => {
  // Adjusts the damage in the state and returns the updated state object.
  if (userPal.status && userPal.status.weak) {
    console.log(
      `Applying weakness, reducing damage (${newDmgAmt}) by ${
        userPal.status.weak.amt
      }. newDmgAmt is now ${newDmgAmt - userPal.status.weak.amt}`,
    )
    // newDmgAmt -= userPal.status.weak.amt
    newState = {
      ...newState,
      attack: {
        ...newState.attack,
        move: {
          ...newState.attack.move,
          damage: newDmgAmt - userPal.status.weak.amt,
        },
      },
    }
  }
  // apply the weak to the attack itself
  newState = appendAttackDebuffState(newState, userPal.status.weak)
  console.log(`newDmgAmt result sate after lowerDamageByWeak`, newState)
  return newState // Returns the full state object with the new damage applied.
}
const appendAttackDebuffState = (newState, debuff) => {
  newState = {
    ...newState,
    attack: {
      ...newState.attack,
      debuffs: newState.attack.debuffs
        ? [...newState.attack.debuffs, debuff]
        : [debuff],
    },
  }
  console.log(
    `newState result after appending debuff: appendAttackDebuffState`,
    newState,
  )
  return newState
}
