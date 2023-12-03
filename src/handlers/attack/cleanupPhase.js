import { DIALOGS } from '../../components/dialog/DialogManager'
import { checkForUndefined } from '../../utils/debugging-utils'
import { cleanupStepHandler } from '../Battle/cleanupStepHandlers'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeMove } from '../moveHandlers'
// import { createCleanupDialogState } from '../state/statusStateHandlers'

export const cleanupPhase = (
  state, attackPayload
  // state,
  // ,
  // // move details
  // move,
  // pal,
  // player,
  // userSlot,
  // // target details
  // targets,
) => {
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
  // const cleanupOptions = [
  //   {
  //     label: `Cleaning up - end of turn effects`,
  //     onClick: () => {
  //       console.log(`Clicked cleaning up'`)
  //       executeMove({
  //         state: state,
  //         //
  //         pal: pal,
  //         move: move,
  //         player: player,
  //         phase: ATK_PHASES.END,
  //         userSlot: 0,
  //         //
  //         targets: targets,
  //         // possessed: false,
  //       })
  //     },
  //     backgroundColor: '#4b770e',
  //     color: '#fff',
  //   },
  // ]

  // DO ALL THE  END OF TURN THINGS HERE:
  // 1. run through all the end of turn effects (poison damage, burn, sleep, stun, etc.)
  // statusHandlers.js // statusStateHandlers.js // battleHandlers.js applyStatusHandler
  // state = cleanupStepHandler(state)

  state = switchDialog(state, DIALOGS.CLEANUP)
  // state = createPopupVisibleState({
  //   prevState: state,
  //   message: `cleaning up..
  //   any status end of turn effects applied to the opponent`,
  //   options: cleanupOptions,
  //   header: `good turn`,
  //   title: 'Cleanup phase',
  // })
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
