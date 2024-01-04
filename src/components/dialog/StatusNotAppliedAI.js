import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const StatusNotAppliedAI = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const status_continueOption = {
    label: 'Continue',
    onClick: () => executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.CLEANUP,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
    }),
  }
  const statusNotAppliedProps = {
    title: `Status not Applied`,
    header: `Status not Applied`,
    message: `No status has been applied.`,
    options: [status_continueOption],
  }

  return <DialogTemplate {...statusNotAppliedProps} />
}

export default StatusNotAppliedAI
