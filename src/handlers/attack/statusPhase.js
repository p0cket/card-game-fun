import { ACTIONS } from '../../MainContext'
import {
  applyStatusEffect,
  calculateDoesItLand,
} from '../../utils/battle-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'

export const statusPhase = (
  contextualState,
  contextualDispatch,
  user,
  move,
  targetMonster,
  player,
  damagedHP,
) => {
  console.group(`😵‍💫 STATUS: start`)
  // console.trace('Trace at the start of statusPhase');
  let doesItLand = calculateDoesItLand(move)
  let newState = contextualState

  const statusOptions = [
    {
      label: `ok, cool thing`,
      onClick: () => {
        console.log('statusOptions onClick: start')
      
        console.log(`Clicked status did land`)
        //doesn't need to return anything because it runs again
        executeMove(
          move,
          newState,
          contextualDispatch,
          user,
          ATK_PHASES.EFFECTS, // phase,
        )
          // ... rest of the function body here...
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
          move,
          newState,
          contextualDispatch,
          user,
          ATK_PHASES.EFFECTS, // phase,
        )
          console.log('statusNotLandOptions onClick: end')
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  if (doesItLand) {
    console.log(`effect lands`)
    
    newState = applyStatusEffect(newState, player, move)
    console.log('Before calling createPopupVisibleState, contextualState:', contextualState);

    newState = createPopupVisibleState({
      prevState: newState,
      message: `${move?.effect?.result} applied.
      ${user.name} ${move?.effect?.result}'d the opponent`,
      options: statusOptions,
      header: `ok, cool thing`,
      title: 'status applied',
    })
    // console.trace('Trace after first call to createPopupVisibleState in statusPhase');



    console.groupEnd()
    return contextualDispatch({
      payload: newState,
      type: ACTIONS.UPDATEGAMEDATA,
    })
  } else {
    // Handle the case where the effect does not land
    console.log(`effect did not land`)
    console.log('Before calling createPopupVisibleState, contextualState on did not land:', contextualState);

    newState = createPopupVisibleState({
      prevState: newState,
      message: `${move?.effect?.result} did not land.
      ${user.name} failed to ${move?.effect?.result} the opponent`,
      options: statusNotLandOptions,
      header: `oh no, cool thing`,
      title: 'status not applied',
    })
    // console.trace('Trace after second call to createPopupVisibleState in statusPhase');


    console.log(`statusPhase: ending, newState`, newState)
    console.groupEnd()
    return contextualDispatch({
      payload: newState, // No update if effect did not land
      type: ACTIONS.UPDATEGAMEDATA,
    })
  }
}
