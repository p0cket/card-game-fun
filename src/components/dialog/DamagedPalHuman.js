import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const DamagedPalHuman = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const dmg_continueOption = {
    label: 'Continue',
    onClick: executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.STATUS,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
    }),
  }
  const damagedPalHumanProps = {
    title: `Human's Pal Damaged`,
    header: `Human's Pal took damage`,
    message: `Human's Pal HP reduced to ${state.attack.pal.stats.hp}`,
    options: [dmg_continueOption],
  }

  return <DialogTemplate {...damagedPalHumanProps} />
}

export default DamagedPalHuman
