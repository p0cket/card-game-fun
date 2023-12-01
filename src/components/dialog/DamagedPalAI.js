import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const DamagedPalAI = () => {
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
  const aiPalDamagedDialogProps = {
    title: 'AI Pal Damaged',
    header: 'AI Pal took damage',
    message: `AI's Pal HP reduced to ${state.attack.pal.stats.hp}`,
    options: [dmg_continueOption],
  }

  return <DialogTemplate {...aiPalDamagedDialogProps} />
}

export default DamagedPalAI


// import React, { useEffect, useState } from 'react'
// import DialogTemplate from '../common/DialogTemplate'
// import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
// import { useDispatchContext, useStateContext } from '../../MainContext'

// const DamagedPalAI = ({ damagedHP }) => {
//   const state = useStateContext()
//   const dispatch = useDispatchContext()
//   const [dialogProps, setDialogProps] = useState({
//     title: '',
//     message: '',
//     options: []
//   });
//   const dmg_continueOption = {
//     label: 'Continue',
//     onClick: executeMove(dispatch, {
//       pal: state.attack.pal,
//       move: state.attack.move,
//       phase: ATK_PHASES.STATUS,

//       userSlot: state.attack.userSlot,
//       targets: state.attack.targets,
//       player: state.attack.player,
//       // possessed: false,
//     }),
//   }
//   useEffect(() => {
//     const dmg_continueOption = {
//       label: 'Continue',
//       onClick: executeMove(dispatch, {
//         pal: state.attack.pal,
//         move: state.attack.move,
//         phase: ATK_PHASES.STATUS,

//         userSlot: state.attack.userSlot,
//         targets: state.attack.targets,
//         player: state.attack.player,
//         // possessed: false,
//       }),
//     }
//   }, [])
//   const aiDamagedDialogProps = {
//     title: 'AI Damaged',
//     header: 'AI took damage',
//     message: `AI's HP reduced to ${damagedHP}`,
//     options: [dmg_continueOption],
//   }

//   return <DialogTemplate {...aiDamagedDialogProps} />
// }

// export default DamagedPalAI
