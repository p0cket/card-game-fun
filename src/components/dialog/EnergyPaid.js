import React, { useEffect, useState } from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const EnergyPaid = ({ playerEnergyAfterPayment }) => {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  // Provide an initial state for dialogProps
  const [dialogProps, setDialogProps] = useState({
    title: '',
    message: '',
    options: []
  });

  useEffect(() => {
    const paid_continueOption = {
      label: 'Continue',
      onClick: executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.DAMAGE,

        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      }),
    }

    setDialogProps({
      title: 'Energy Paid',
      message: `Your new energy level is ${playerEnergyAfterPayment}.`,
      options: [paid_continueOption],
    });

  }, [playerEnergyAfterPayment, state, dispatch]); // Add other dependencies if needed

  return <DialogTemplate {...dialogProps} />
}

export default EnergyPaid