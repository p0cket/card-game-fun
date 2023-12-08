import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { addUpKeepEffects } from '../Battle/upKeepEffects'
import {
  createPopupRemovedState,
  createPopupVisibleState,
} from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeAITurn } from '../moveHandlers'

export const endPhase = (
  state,
  attackPayload,
) => {
  const { move, pal, phase, player, userSlot, targets } = attackPayload

  console.group(`END: start`)
  checkForUndefined({
    state,
    pal,
    move,
    phase,
    userSlot,
    targets,
  })

  if (player === PLAYERS.HUMAN) {
    state = switchDialog(state, DIALOGS.SWITCHTURNS_TO_AI)
    console.log(`END: phase ending. state`, state)
    console.groupEnd()
    return state
  } else if (player === PLAYERS.AI) {
    // Dialog here?
    // state = switchDialog(state, DIALOGS.SWITCHTURNS_TO_HUMAN)
    console.log(`END: phase ending. state`, state)
    state = addUpKeepEffects(state)
    state = createPopupRemovedState(state)
    console.groupEnd()
    return state
  }
}
