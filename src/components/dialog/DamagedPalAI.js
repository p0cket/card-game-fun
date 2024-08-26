import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const DamagedPalAI = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const dmg_continueOption = {
    label: 'Continue',
    onClick: () => {
      console.log('dmg_continueOption onClick: state.attack', state.attack)
      executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.STATUSES,
        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
      })
    },
  }
  const aiPalDamagedDialogProps = {
    title: 'AI Pal Damaged',
    header: 'AI Pal took damage',
    //change to take in the actual damage
    // add in what dealt what damage
    message: `${state.attack.pal.name} dealt ${state.attack.move.damage} damage.`,

    options: [dmg_continueOption],
  }

  return <DialogTemplate {...aiPalDamagedDialogProps} />
}

export default DamagedPalAI
