import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { checkIfDead } from '../Battle/deadHandlers'
import {
  upkeepEnergyRefill,
  upkeepPermanentEnergyIncrease,
} from '../Battle/upKeepEffects'
import {
  createPopupRemovedState,
  createPopupVisibleState,
} from '../dialog/basicDialogHandlers'
import { switchDialog } from '../dialog/energyDialogHandler'
import { ATK_PHASES, executeAITurn, executeMove } from '../moveHandlers'

export const endPhase = (state, attackPayload) => {
  // const { move, pal, phase, player, userSlot, targets } = attackPayload
  const { phase } = attackPayload

  // const { move, pal, phase, player, userSlot, targets } = attackPayload
  const { move, pal, player, userSlot, targets } = state.attack
  // pal: state.attack.pal,
  // move: state.attack.move,
  // phase: ATK_PHASES.CLEANUP,
  // userSlot: state.attack.userSlot,
  // targets: state.attack.targets,
  // player: state.attack.player,

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

    // state = createPopupRemovedState(state)

    const type = move.isCounter ? 'counter' : 'normal'
    if (type === 'counter') {
      // remove the current popup?
      // whatever phase the previous move was in, continue from there
      //-----
      // Pop off previous phase and continue
      // let prevMove = null
      // if (state.moveStack.length > 0) {
      //   prevMove = state.moveStack[state.moveStack.length - 1]
      //   const poppedState = {
      //     ...state,
      //     //take the last item in the moveStack of the moveStack and remove it
      //     moveStack: state.moveStack.slice(0, state.moveStack.length - 1),
      //   }
      //   //not that this will change the state but still
      // }
      // if (prevMove) {
      //   // state = executeMove(state, prevMove)
      // }
      //----

      // if theres a previous popup, continue from where we left off
      // state = nextPhase
      //(create an enum with the phases based on the phase)

      // const nextPhase = findPrevPhase(phase)

      // so in our example it would be statusPhase with the prevPayload
      // not this switchdialog.
      // state = switchDialog(state, state.previous.dialog)

      if (state.moveStack.length > 0) {
        // Execute the last move and update the state
        console.log(
          'executing move from moveStack: Def break here',
          state,
          state.moveStack[state.moveStack.length - 1],
        )
        state = state.moveStack[state.moveStack.length - 1]()
        console.log('executed move from moveStack', state)
        // Now that the last move has been executed, remove it from the stack
        state.moveStack = state.moveStack.slice(0, -1)
      } else {
        // Handle the case where moveStack is empty
        console.error('moveStack is empty, cannot move to a previous state.')
        // Optionally set state to a default value if that's the intended behavior
        // state = someDefaultValue;
      }
    }
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

    const type = move.isCounter ? 'counter' : 'normal'
    if (type === 'counter') {
      // remove the current popup.
      state = createPopupRemovedState(state)
      // if theres a previous popup, continue from where we left off
      // state = switchDialog(state, state.previous.dialog)
      state = state.previous.moveFunc()
      return state
    }

    console.groupEnd()
    return state
  }
}
