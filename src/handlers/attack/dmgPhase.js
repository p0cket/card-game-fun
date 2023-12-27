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
    //I guess target pal is the attacker here
    targetPal = newState.opponent.monsters[0]
    const palAccuracyStat = targetPal.stats.accuracy
    const combinedAccuracy = (accuracy + palAccuracyStat) / 2
    console.warn(`🫠check attacker passed as human`, targetPal)
    console.log(
      `Roll: ${roll} ${typeof roll} < ${accuracy} ${typeof accuracy} ${palAccuracyStat} ${typeof palAccuracyStat} / 2 = ${
        roll < combinedAccuracy
      }. move:`,
      move,
    )
    if (roll < combinedAccuracy) {
      // Roll passes, apply damage
      const damageAppliedFromHumanState = runDmgHuman(
        newState,
        targetPal,
        move,
        pal,
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
    targetPal = newState.opponent.monsters[0]
    const palAccuracyStat = targetPal.stats.accuracy
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
      // Roll passes, apply damage
      const damageAppliedFromAIState = runDmgAI(newState, targetPal, move, pal) //stuff here
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

const runDmgHuman = (newState, targetPal, move) => {
  console.log(`ATK: DMG phase: targetPal, move`, targetPal, move)
  // add the Effects Handler here:
  //  newState = dmgEffectsHandler(newState, pal, 0)
  const moveCost = move.cost.energy
  ourDmg = move.damage
  damagedHP = targetPal.stats.hp - ourDmg
  console.warn(
    `AI pal's HP ${targetPal.stats.hp} - ${ourDmg}dmg = ${damagedHP}`,
  )
  console.log(
    `dmg b4 the createAIDamagedState, 'AI' pal's HP is now ${damagedHP}`,
    newState,
  )
  newState = createAIDamagedState(newState, damagedHP, moveCost, move)
  console.log(`createAIDamagedState:`, newState)

  newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_AI)
  console.log(`dmg after the createAIDamagedState:`, newState)
  return newState
}
const runDmgAI = (newState, targetPal, move) => {
  console.log(`Player is AI: newState.userParty`, newState.userParty)
  const moveCost = move.cost.energy
  console.log(
    `ATK: DMG phase: targetPal, move`,
    targetPal,
    move,
    `The AI damage to be dealt is ${move.damage}.
This will result in targetPal.stats.hp (${targetPal.stats.hp})
 at: ${targetPal.stats.hp - move.damage}`,
  )
  damagedHP = targetPal.stats.hp - move.damage
  newState = createHumanDamagedState(newState, damagedHP, moveCost, move)
  newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_HUMAN)
  console.log(`After createHumanDamagedState:`, newState)
  console.log(`ATK: DAMAGE phase ending:`, newState)
  return newState
}
