import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import {
  applyStatusAtCleanup,
  cleanupAbilitiesHandler,
} from '../phaseHelpers/cleanupPhaseHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
export const cleanupPhase = (state, attackPayload) => {
  const { phase } = attackPayload
  const { move, pal, player, userSlot, targets } = state.attack

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
  state = cleanupAbilitiesHandler(state) // may not need pal, userSlot
  // Apply stuff like poison damage, seeing if they wake from sleep, etc

  // To simplify: just apply status at AI cleanup, end of the cycle
  if (player === PLAYERS.AI) {
    state = applyStatusAtCleanup(state)
  }

  if (player === PLAYERS.HUMAN) {
    state = switchDialog(state, DIALOGS.CLEANUP_HUMAN)
  } else if (player === PLAYERS.AI) {
    state = switchDialog(state, DIALOGS.CLEANUP_AI)
  }
  console.log(`effects: phase ending`)
  console.groupEnd()
  return state
}
