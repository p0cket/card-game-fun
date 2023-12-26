import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { checkIfDead } from '../Battle/deadHandlers'
import { upkeepEnergyRefill, upkeepPermanentEnergyIncrease } from '../Battle/upKeepEffects'
import {
  createPopupRemovedState,
  createPopupVisibleState,
} from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeAITurn } from '../moveHandlers'

export const endPhase = (state, attackPayload) => {
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
    // check if dead
    state = checkIfDead(state)


    console.groupEnd()
    return state
  } else if (player === PLAYERS.AI) {
    console.log(`END: phase ending. state`, state)
    // refill 5 energy
    state = upkeepEnergyRefill(state)
    // increase permanently by 1
    state = upkeepPermanentEnergyIncrease(state)
    state = createPopupRemovedState(state)
    // check if dead
    state = checkIfDead(state)

    // onClick={() =>
    //   handleChangeLevel(contextualState, {
    //     screen: SCENES.BATTLE,
    //     details: {
    //       type: 'trainer',
    //       trainer: hikerBrak,
    //       area: 'tranquil forest',
    //       difficulty: 'easy',
    //     },
    //   })
    // }

    console.groupEnd()
    return state
  }
}
