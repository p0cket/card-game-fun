import React from 'react'
import DialogTemplate from '../common/DialogTemplate'

const CostPaid = ({ move, pal, onConfirmPay, onEnhancePay }) => {
  const costPaidDialogProps = {
    title: 'Pay Phase',
    header: 'You can pay!',
    message: `${move.cost.energy} Energy paid. ${pal.name} uses ${move.name}`,
    options: [
      {
        label: 'Confirm Pay',
        onClick: onConfirmPay,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
      {
        label: 'Enhance Pay',
        onClick: onEnhancePay,
        backgroundColor: '#4b770e',
        color: '#fff',
      },
      // Include any other options as needed
    ],
  }

  return <DialogTemplate {...costPaidDialogProps} />
}

export default CostPaid
