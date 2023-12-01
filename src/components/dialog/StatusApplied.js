import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const StatusApplied = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const dmg_continueOption = {
    label: 'Continue',
    onClick: executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.EFFECTS,

      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
      // possessed: false,
    }),
  }
  const status_ok = {
    label: `ok, status lands`,
    onClick: () => {
      console.log('statusOptions onClick')
      executeMove({
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.EFFECTS,

        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      })
    },
  }
  const statusNotLand = {
    label: `status not land. ok`,
    onClick: () => {
      console.log('statusNotLandOptions onClick: start')
      executeMove({
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.EFFECTS,

        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      })
    },
  }
  const statusAppliedProps = {
    title: `Status Applied`,
    header: `Status Applied!`,
    message: `Status applied. Pal's statuses are now reduced to ${JSON.stringify(
      state.attack.pal.status,
    )}`,
    options: [status_ok],
  }
  return <DialogTemplate {...statusAppliedProps} />
}

export default StatusApplied
