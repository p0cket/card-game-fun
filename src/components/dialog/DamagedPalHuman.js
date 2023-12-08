import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const DamagedPalHuman = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const dmg_continueOption = {
    label: 'Continue',
    onClick: () => executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.STATUSES,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
    }),
  }
  console.log(`DamagedPalHuman: state.attack`, state.attack)
  const damagedPalHumanProps = {
    title: `Human's Pal Damaged`,
    header: `Human's Pal took damage`,
    message: `${state.attack.pal.name}'s ${state.attack.move.name} dealt ${state.attack.move.damage} damage. (AI Pal's HP now ${state.userParty[0].stats.hp})`,
    options: [dmg_continueOption],
  }

  return <DialogTemplate {...damagedPalHumanProps} />
}

export default DamagedPalHuman
