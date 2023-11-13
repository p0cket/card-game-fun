import { ACTIONS } from '../../MainContext'
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
    // phase,
    userSlot,
    targets,
  })
  // console.trace('Trace at the start of statusPhase');
  let doesItLand = calculateDoesItLand(move)
  let newState = state

  const statusOptions = [
    {
      label: `ok, cool thing`,
      onClick: () => {
        console.log('statusOptions onClick: start')

        console.log(`Clicked status did land`)
        //doesn't need to return anything because it runs again
        executeMove(
          // move,
          // newState,
          // dispatch,
          // pal,
          // ATK_PHASES.EFFECTS, // phase,
          {
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
          },
        )

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
            ...ourState.dialog,
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
      label: `sad, not cool thing`,
      onClick: () => {
        console.log('statusNotLandOptions onClick: start')

        console.log(`Clicked status not land`)
        //doesn't need to return anything because it runs again
        executeMove(
          // move,
          // newState,
          // dispatch,
          // pal,
          // ATK_PHASES.EFFECTS, // phase,
          {
            state: newState,
            dispatch: dispatch,

            pal: pal,
            move: move,
            player: player,
            phase: ATK_PHASES.EFFECTS,
            userSlot: 0,

            targets: targets,
            // possessed: false,
          },
        )

        console.log('statusNotLandOptions onClick: end')
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  if (doesItLand) {
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
    // console.trace('Trace after first call to createPopupVisibleState in statusPhase');
    console.groupEnd()
    // return dispatch({
    //   payload: newState,
    //   type: ACTIONS.UPDATEGAMEDATA,
    // })
    return newState
  } else {
    // Handle the case where the effect does not land
    console.log(
      `effect did not land. statusPhase: b4 calling createPopupVisibleState, state on did not land:', state`,
    )
    newState = createPopupVisibleState({
      prevState: newState,
      message: `${move?.effect?.result} did not land.
      ${pal.name} failed to ${move?.effect?.result} the opponent`,
      options: statusNotLandOptions,
      header: `oh no, cool thing`,
      title: 'status not applied',
    })
    // console.trace('Trace after second call to createPopupVisibleState in statusPhase');

    console.log(`statusPhase: ending, newState`, newState)
    console.groupEnd()
    // return dispatch({
    //   payload: newState, // No update if effect did not land
    //   type: ACTIONS.UPDATEGAMEDATA,
    // })
    return newState
  }
}
