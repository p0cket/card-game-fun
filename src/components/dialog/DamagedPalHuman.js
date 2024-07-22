import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { DIALOGS } from './DialogManager'

const DamagedPalHuman = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const inDebug =  state.debug && state.debug.isOpen
  const movePayload = {
    
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.STATUSES,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
  }

  // storing the current variables of the move, not the stack
  // at the end of the counter, we can execute the snapshotted move
  // are the variables going to be the state variables changed or 
  // is it the snapshot of what was there

  // functions don't belong in state. they're  not serializable 

  const dmg_continueOption = {
    label: 'Okay',
    onClick: () =>
      executeMove(dispatch, movePayload),
  }
  const dmg_counterOption = {
    label: 'Counter',
    onClick: () => { 
      dispatch({
        type: ACTIONS.ADD_MOVE_TO_STACK,
        payload: {
          prevMove: () =>
            executeMove(dispatch, movePayload),
          prevDialog: DIALOGS.DAMAGED_PAL_HUMAN,
        },
      })
      dispatch({
        type: ACTIONS.SHOW_COUNTERS,
        //add the way to show which dialog it came from,
        // and what the dialog needs to show
        // this is the dialog we were at:
        // newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_HUMAN)
        payload: {
          prevPayload: movePayload,
          prevMove: () =>
            executeMove(dispatch, movePayload),
          prevDialog: DIALOGS.DAMAGED_PAL_HUMAN,
          popupType: 'counters',
        },
      })
     
      dispatch({ type: ACTIONS.CLOSE_DIALOG })
    },
  }
  console.log(`DamagedPalHuman: state.attack`, state.attack)
  const damagedPalHumanProps = {
    title: `Your Pal Damaged`,
    header: `Your Pal took damage`,
    // message: `${state.attack.pal.name}'s ${state.attack.move.name} dealt ${state.attack.move.damage} damage to your pal. Result: ${state.userParty[0].stats.hp} HP. 
    // `,
    message: `${state.attack.pal.name}'s ${state.attack.move.name} dealt ${state.attack.move.damage} damage to your pal. 
    `,
    // options: [dmg_continueOption, dmg_counterOption],

    options: [dmg_continueOption, inDebug ? dmg_counterOption : null],
  }
  return <DialogTemplate {...damagedPalHumanProps} />
}

export default DamagedPalHuman

// apply the debuff text with ${debuffText(state.attack)}
// const debuffText = (move) => {
//   console.warn(`move:`, move)
//   if (move.debuffs) {
//     return `${move.debuffs[0].name} of ${move.debuffs[0].amt} applied`
//   } else {
//     return `No debuffs applied`
//   }
// }
