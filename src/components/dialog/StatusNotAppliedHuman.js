import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const StatusNotAppliedHuman = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const status_continueOption = {
    label: 'Continue',
    onClick: executeMove(dispatch, {
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
    message: `No status applied to your pal.`,
    options: [status_continueOption],
  }

  return <DialogTemplate {...statusNotAppliedProps} />
}
// go to dialogManager, and create a component for StatusNotLandHuman
// instead of below:
// state = createPopupVisibleState({
//   prevState: state,
//   message: `${move?.effect?.result} did not land.
// ${ourPal.name} failed to ${move?.effect?.result} your pal`,
//   options: statusNotLandOptions,
//   header: `oh no, status #fail`,
//   title: 'status not applied to your pal',
// })

export default StatusNotAppliedHuman
