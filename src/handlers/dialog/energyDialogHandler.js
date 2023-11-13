import { ACTIONS } from '../../MainContext'
import { createPopupRemovedState } from './basicDialogHandlers'

export const createNotEnoughEnergyDialogState = (ourState, ourDispatch) => {
  console.groupCollapsed(
    `👩🏼‍💻: createNotEnoughEnergyDialogState called:`,
    ourState,
    ourDispatch,
  )
  const dialogState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `Not enough energy. pal.name of pal's name does not have enough energy to perform the move.`,
      title: 'Pay Phase',
      header: 'Not enough energy to perform the move',
      options: [
        {
          label: 'Oh dear',
          onClick: () => {
            const closedPopupState = createPopupRemovedState(ourState)
            console.log(closedPopupState)
            return closedPopupState
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
      ],
    },
  }
  console.log(`dialogState:`, dialogState)
  console.groupEnd()
  return dialogState
}
