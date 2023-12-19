import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { applyPalPassive, cleanupPassivesHandler, cleanupStepHandler } from '../Battle/cleanupStepHandlers'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeMove } from '../moveHandlers'
export const cleanupPhase = (state, attackPayload) => {
  const { move, pal, phase, player, userSlot, targets } = attackPayload
  console.group(`😵‍💫 CLEANUP: start`)
  checkForUndefined({
    state,

    pal,
    move,
    phase,

    player,
    userSlot,
    targets,
  })
  // DO ALL THE  END OF TURN THINGS HERE:
  // 1. run through all the end of turn effects (poison damage, burn, sleep, stun, etc.)
  // statusHandlers.js // statusStateHandlers.js // battleHandlers.js applyStatusHandler
  // state = cleanupStepHandler(state)

  // #TODO: Finish cleanupPassivesHandler and cleanupPassivesHandler
  // state = cleanupPassivesHandler(state)

  if (player === PLAYERS.HUMAN) {
    state = switchDialog(state, DIALOGS.CLEANUP_HUMAN)
  } else if (player === PLAYERS.AI) {
    state = switchDialog(state, DIALOGS.CLEANUP_AI)
  }
  console.log(`effects: phase ending`)
  return state
}
// const stateWithStatusesApplied = applyStatuses(move, pal) // switch(move.statuses)
// if (move.effect && doesItLand) {
//   console.log(`move.effect is ${move.effect.result} && lands`, move)
//   const effect = move.effect.result
//   switch (effect) {
//     case 'blind':
//       // Dialogue: applying blind
//       console.log(`applying blind to ${targetMonster.name}`)
//       //applyBlind(targetMonster)
//       //evasion less
//       // acuracy less
//       // note the effect is applied to the target
//       targetMonster.status.blind = true
//       break
//     case 'buff':
//       // applyBuff(targetMonster)
//       // Dialogue: applying buff
//       targetMonster.stats.attack += 2
//       break
//     default:
//       console.log(`default case for hero buffs applied`)
//   }
//   // 6. Resolve End Steps (is this taken care of here?)
//   // Dialogue: ___ is taking x poison damage (or any other effect)
//   // const stateWithEndStepsResolved = resolveEndSteps(move, pal) // switch(move.endStepsTriggers)
// }
// This currently means nothing but we'll add the effects and send back
