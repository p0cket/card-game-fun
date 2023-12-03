import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const Cleanup = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const cleanup_continueOption = {
    label: 'Continue',
    onClick: executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.END,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
    }),
  }

//   const cleanupOptions = [
//     {
//       label: `Cleaning up - end of turn effects`,
//       onClick: () => {
//         console.log(`Clicked cleaning up'`)
//         executeMove({
//           state: state,
//           //
//           pal: pal,
//           move: move,
//           player: player,
//           phase: ATK_PHASES.END,
//           userSlot: 0,
//           //
//           targets: targets,
//           // possessed: false,
//         })
//       },
//       backgroundColor: '#4b770e',
//       color: '#fff',
//     },
//   ]
  const cleanupProps = {
    title: `___ cleanup not Applied (to human)`,
    header: `___ cleanup not Applied (to human)`,
    message: `cleanup not Applied of ____ to human`,
    options: [cleanup_continueOption],
  }

  return <DialogTemplate {...cleanupProps} />
}
// state = createPopupVisibleState({
//     prevState: state,
//     message: `cleaning up..
//     any cleanup end of turn effects applied to the opponent`,
//     options: cleanupOptions,
//     header: `good turn`,
//     title: 'Cleanup phase',
//   })
export default Cleanup
