import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { applyPalPassive, cleanupAbilitiesHandler } from '../phaseHelpers/cleanupPhaseHandlers'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeMove } from '../moveHandlers'
export const cleanupPhase = (state, attackPayload) => {
  // const { move, pal, phase, player, userSlot, targets } = attackPayload
  const { phase} = attackPayload

  // const { move, pal, phase, player, userSlot, targets } = attackPayload
    const { move, pal, player, userSlot, targets } = state.attack
  // pal: state.attack.pal,
  // move: state.attack.move,
  // phase: ATK_PHASES.CLEANUP,
  // userSlot: state.attack.userSlot,
  // targets: state.attack.targets,
  // player: state.attack.player,
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

  // #TODO: Finish cleanupAbilitiesHandler and cleanupAbilitiesHandler
  state = cleanupAbilitiesHandler(state)  // may not need pal, userSlot

  if (player === PLAYERS.HUMAN) {
    state = switchDialog(state, DIALOGS.CLEANUP_HUMAN)
  } else if (player === PLAYERS.AI) {
    state = switchDialog(state, DIALOGS.CLEANUP_AI)
  }
  console.log(`effects: phase ending`)
  console.groupEnd()
  return state
}