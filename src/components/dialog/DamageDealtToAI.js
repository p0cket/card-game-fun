import React from 'react'
import DialogTemplate from '../common/DialogTemplate'

const DamageDealtToAI = ({ damagedHP, onConfirm }) => {
  const aiDamagedDialogProps = {
    title: 'AI Damaged',
    header: 'AI took damage',
    message: `AI's HP reduced to ${damagedHP}`,
    options: [
      {
        label: 'Confirm',
        onClick: onConfirm,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
    ],
  }

  return <DialogTemplate {...aiDamagedDialogProps} />
}

export default DamageDealtToAI
