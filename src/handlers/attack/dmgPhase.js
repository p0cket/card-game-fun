import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { switchDialog } from '../dialog/energyDialogHandler'
import { createPayloadState } from '../moveHandlers'
import {
  ifBuffDoMoreDamage,
  lowerAttackDamageInState,
  runDmgAI,
  runDmgHuman,
} from '../state/damageStateHandlers'

export const dmgPhase = (state, attackPayload) => {
  let newState = createPayloadState(state, attackPayload)
  const { phase } = attackPayload
  const { move, pal, player, userSlot, targets } = state.attack

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

  const accuracy = move.accuracy / 100
  const roll = Math.floor(Math.random() * 100)

  if (player === PLAYERS.HUMAN) {
    // Check if hit. based on accuracy stat of atk and user
    // Figure out the user, we neeed their accuracy
    let user = newState.userParty[0]
    // user's accuracy stat
    const palAccuracyStat = user.stats.accuracy / 100

    // targetPal is the reciever of the atk
    targetPal = newState.opponent.monsters[0]
    // CRITS???? (Determine if the roll is a critical hit (in the lowest 5%))
    const isCrit = roll < 5
    let crit = false
    if (isCrit) {
      crit = true
      console.log('Critical hit!')
    }
    //
    const combinedAccuracy = accuracy * palAccuracyStat * 100
    console.warn(`🫠check attacker passed as human`, targetPal)
    console.log(
      `Roll: ${roll} < ((${accuracy} * ${palAccuracyStat}) * 100 ) = ${combinedAccuracy} ${
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

      // applyDmgModifications = () ={ switch(atkPayload){
      // case: "buff" return state;
      // case "weak" return state;
      // then apply sheild if there is any
      // case default:
      // }}

      // finalDmg = ifWeakDoLessDamage(user, finalDmg)
      finalDmg = ifBuffDoMoreDamage(user, finalDmg)
      // finalDmg = newDamage
      newState = lowerAttackDamageInState(newState, user, finalDmg)
      console.log(` dmg is ${finalDmg} after ifWeakDoLessDamage`)

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
      // finalDmg = ifWeakDoLessDamage(user, finalDmg)
      finalDmg = ifBuffDoMoreDamage(user, finalDmg)
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
