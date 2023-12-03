import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import {
  createPopupRemovedState,
  createPopupVisibleState,
} from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeAITurn } from '../moveHandlers'

export const endPhase = (
  state,
  attackPayload,
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

  console.group(`END: start`)
  checkForUndefined({
    state,
    pal,
    move,
    phase,
    userSlot,
    targets,
  })
  // const endTurnOptions = [
  //   {
  //     label: `Enemy gets to go now`,
  //     onClick: () => {
  //       console.log(`Enemy gets to attack`)
  //       //doesn't need to return anything because it runs again
  //       executeAITurn(state, )
  //     },
  //     backgroundColor: '#4b770e',
  //     color: '#fff',
  //   },
  // ]

  if (player === PLAYERS.HUMAN) {
    state = switchDialog(state, DIALOGS.SWITCHTURNS_TO_AI)
    // const switchTurns
    // state = createPopupRemovedState(state)

    // display a message with createPopupVisibleState

    // an option should be executeAITurn(stuff)
    // state = createPopupVisibleState({
    //   prevState: state,
    //   message: `We are switching turns, the opponent can go now.`,
    //   options: endTurnOptions,
    //   header: 'End of Your Turn',
    //   title: 'Opponent gets to go now',
    //   color: '#000',
    //   background: '#fff',
    // })

    console.log(`END: phase ending. state`, state)
    console.groupEnd()
    return state
  } else if (player === PLAYERS.AI) {
    // Dialog here?
    // state = switchDialog(state, DIALOGS.SWITCHTURNS_TO_HUMAN)
    console.log(`END: phase ending. state`, state)
    state = createPopupRemovedState(state)
    console.groupEnd()
    return state
  }
}
