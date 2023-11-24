import React from 'react'
import DialogTemplate from '../common/DialogTemplate'

const NotEnoughEnergy = (props) => {

  // export const createPayOption = (pal, move, player, targets, attackPhase) => {

  // Prepare the specific props for the NotEnoughEnergy scenario
  const notEnoughEnergyProps = {
    // isOpen: true,
    title: 'Not Enough Energy',
    message:
      'Your character does not have enough energy to perform this action.',
    options: [
      {
        label: 'Okay',
        onClick: () => console.log('Dialog closed'), // Replace with actual close logic
        backgroundColor: '#4b770e',
        color: '#fff',
      },
    ],
    // Include any other props specific to the NotEnoughEnergy situation
  }
  // Render the DialoguePopup with these specific props
  return <DialogTemplate {...notEnoughEnergyProps} />
}

export default NotEnoughEnergy