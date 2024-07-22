import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ACTIONS, useDispatchContext } from '../../MainContext'

const NotEnoughEnergy = (props) => {
  const dispatch = useDispatchContext()
  const closeButton = {
    label: 'Okay',
    onClick: () => {
      console.log('Dialog closed')
      dispatch({ type: ACTIONS.CLOSE_DIALOG })
    }, // Replace with actual close logic
    backgroundColor: '#4b770e',
    color: '#fff',
  }
  const endTurnButton = {
    label: 'End Turn',
    onClick: () => {
      console.log('End Turn clicked')
      // dispatch({ type: ACTIONS.END_TURN })
    },
  }
  // export const createPayOption = (pal, move, player, targets, attackPhase) => {

  // Prepare the specific props for the NotEnoughEnergy scenario
  const notEnoughEnergyProps = {
    // isOpen: true,
    title: 'Not Enough Energy',
    message:
      'User does not have enough energy to perform this action.',
    options: [closeButton, endTurnButton],
    // Include any other props specific to the NotEnoughEnergy situation
  }
  // Render the DialoguePopup with these specific props
  return <DialogTemplate {...notEnoughEnergyProps} />
}

export default NotEnoughEnergy
