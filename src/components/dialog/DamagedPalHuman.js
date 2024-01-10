import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'

const DamagedPalHuman = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const dmg_continueOption = {
    label: 'Okay',
    onClick: () =>
      executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.STATUSES,

        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      }),
  }
  const dmg_counterOption = {
    label: 'Counter',
    onClick: () => {
      dispatch({
        type: ACTIONS.SHOW_COUNTERS,
        payload: {
          pal: state.attack.pal,
          move: state.attack.move,
          phase: ATK_PHASES.STATUSES,

          userSlot: state.attack.userSlot,
          targets: state.attack.targets,
          player: state.attack.player,
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
    message: `${state.attack.pal.name}'s ${state.attack.move.name} dealt ${state.attack.move.damage} damage to your pal. Result: ${state.userParty[0].stats.hp} HP. 
    `,
    options: [dmg_continueOption, dmg_counterOption],
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
