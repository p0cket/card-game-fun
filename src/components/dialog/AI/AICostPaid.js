import React from 'react'
import DialogTemplate from '../../common/DialogTemplate'
// import DialogTemplate from '../common/DialogTemplate'

const AICostPaid = ({ move, pal, onOkay, onCounter, onOtherAction }) => {
  const aiPaidDialogProps = {
    title: 'AI Pay Phase',
    header: 'AI Paid!',
    message: `${move.cost.energy} Energy paid. AI's ${pal.obj.name} uses ${move.name}`,
    options: [
      {
        label: 'Okay',
        onClick: onOkay,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
      {
        label: 'Counter',
        onClick: onCounter,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
      {
        label: 'Something else',
        onClick: onOtherAction,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
    ],
  }

  return <DialogTemplate {...aiPaidDialogProps} />
}

export default AICostPaid
