import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const Cleanup = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const cleanup_continueOption = {
    label: 'Continue',
    onClick: () => executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.END,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
    }),
  }
  const cleanupProps = {
    title: `___ cleanup (to human)`,
    header: `___ cleanup (to human)`,
    message: `cleanup of ____ to human`,
    options: [cleanup_continueOption],
  }
  return <DialogTemplate {...cleanupProps} />
}
export default Cleanup
