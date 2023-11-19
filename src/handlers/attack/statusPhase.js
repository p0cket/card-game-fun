import { ACTIONS } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'
import {
  applyStatusEffect,
  calculateDoesItLand,
} from '../../utils/battle-utils'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'

export const statusPhase = (
  state,
  dispatch,
  //
  move,
  pal,
  player,
  userSlot,
  //
  targets,
) => {
  console.group(`😵‍💫 STATUS: start`)
  checkForUndefined({
    state,
    dispatch,
    //
    pal,
    move,
    player,
    //
    userSlot,
    targets,
  })
  // console.trace('Trace at the start of statusPhase');
  let doesItLand = calculateDoesItLand(move)
  let newState = state

  const statusOptions = [
    {
      label: `ok, status lands`,
      onClick: () => {
        console.log('statusOptions onClick: start')
        executeMove({
          state: newState,
          dispatch: dispatch,
          //
          pal: pal,
          move: move,
          player: player,
          phase: ATK_PHASES.EFFECTS,
          userSlot: 0,
          //
          targets: targets,
          // possessed: false,
        })

        console.log('statusOptions onClick: end')
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
    {
      label: 'Add on',
      onClick: () => {
        //replace here with our function create
        // const closedPopupState = createRemovedState(whateverMakesSenseHere)
        // handle onClick logic here
        const closedPopupState = {
          ...newState,
          dialog: {
            ...newState.dialog,
            isOpen: false,
          },
        }
        return closedPopupState
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]
  const statusNotLandOptions = [
    {
      label: `status not land. ok`,
      onClick: () => {
        console.log('statusNotLandOptions onClick: start')
        executeMove({
          state: newState,
          dispatch: dispatch,

          pal: pal,
          move: move,
          player: player,
          phase: ATK_PHASES.EFFECTS,
          userSlot: 0,

          targets: targets,
          // possessed: false,
        })
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  if (doesItLand) {
    if (player === PLAYERS.HUMAN) {
      console.log(
        `effect lands - now applyStatusEffect() with newState, player, move`,
        newState,
        player,
        move,
      )
      newState = applyStatusEffect(newState, player, move)
      console.log(
        'b4 calling createPopupVisibleState, newState,player, move:',
        newState,
        player,
        move,
      )
      newState = createPopupVisibleState({
        prevState: newState,
        message: `${move?.effect?.result} applied.
      ${pal.name} ${move?.effect?.result}'d the opponent`,
        options: statusOptions,
        header: `ok, cool thing`,
        title: 'status applied',
      })
      console.groupEnd()
      return newState
    } else if (player === PLAYERS.AI) {
      console.log(
        `statusPhase: AI applyStatusEffect(newState, player, move)`,
        newState,
        player,
        move,
      )
      newState = applyStatusEffect(newState, player, move)
      console.warn(
        `statusPhase: b4 calling createPopupVisibleState, enemy landed effect'`,
        newState,
        player,
        move,
      )
      const ourPal = pal.obj
      console.warn(`move, ourPal`, move, ourPal)
      newState = createPopupVisibleState({
        prevState: newState,
        message: `${move?.effect?.result} applied to human.
      ${ourPal.name} ${move?.effect?.result}'d you pal`,
        options: statusOptions,
        header: `Status applied`,
        title: 'status applied',
      })
      console.groupEnd()
      return newState
    }
  } else {
    // Handle the case where the effect does not land
    console.log(
      `effect did not land. statusPhase: b4 calling createPopupVisibleState, state on did not land:', state`,
    )
    if (player === PLAYERS.HUMAN) {
      newState = createPopupVisibleState({
        prevState: newState,
        message: `${move?.effect?.result} did not land.
      ${pal.name} failed to ${move?.effect?.result} the opponent`,
        options: statusNotLandOptions,
        header: `oh no, status #fail`,
        title: 'status not applied',
      })
      console.log(`statusPhase: ending, newState`, newState)
      console.groupEnd()
      return newState
    } else if (player === PLAYERS.AI) {
      console.log(`enemy did not land. statusPhase: ending, newState`, newState)
      const ourPal = pal.obj
      console.warn(`move, ourPal`, move, ourPal)
      newState = createPopupVisibleState({
        prevState: newState,
        message: `${move?.effect?.result} did not land.
      ${ourPal.name} failed to ${move?.effect?.result} your pal`,
        options: statusNotLandOptions,
        header: `oh no, status #fail`,
        title: 'status not applied to your pal',
      })
      console.groupEnd()
      return newState
    }
  }
}
