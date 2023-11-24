import React from 'react'
import DialogTemplate from '../common/DialogTemplate'

const DamageDealtToHuman = ({ damagedHP, onConfirm }) => {
  const humanDamagedDialogProps = {
    title: 'Your pal Took Damage',
    header: 'Your pal took damage',
    message: `Your pal's HP reduced to ${damagedHP}`,
    options: [
      {
        label: 'Confirm',
        onClick: onConfirm,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
    ],
  }

  return <DialogTemplate {...humanDamagedDialogProps} />
}

export default DamageDealtToHuman
