import { ACTIONS } from '../../MainContext'
import { DIALOGS } from '../../components/dialog/DialogManager'
import { createPopupRemovedState } from './basicDialogHandlers'
// may have to set the payload data
export const switchDialog = (ourState, dialogToShow) => {
  console.log(`switchDialog: ourState, dialogToShow`, ourState, dialogToShow)
  return {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      type: dialogToShow,
    },
  }
}
// export const createNotEnoughEnergyDialogState = (ourState, ourDispatch) => {
//   console.groupCollapsed(
//     `👩🏼‍💻: createNotEnoughEnergyDialogState called:`,
//     ourState,
//     ourDispatch,
//   )
//   const dialogState = {
//     ...ourState,
//     dialog: {
//       ...ourState.dialog,
//       isOpen: true,
//       message: `Not enough energy. pal.name of pal's name does not have enough energy to perform the move.`,
//       title: 'Pay Phase',
//       header: 'Not enough energy to perform the move',
//       options: [
//         {
//           label: 'Oh dear',
//           onClick: () => {
//             const closedPopupState = createPopupRemovedState(ourState)
//             console.log(`closedPopupState after createPopupRemovedState: `,closedPopupState)
//             // ourDispatch({ type: ACTIONS.CLOSE_POPUP })
//             // ourDispatch({ type: ACTIONS.CLOSE_DIALOG})
//             // return closedPopupState
//           },
//           backgroundColor: '#4b770e',
//           color: '#fff',
//         },
//       ],
//     },
//   }
//   console.log(`dialogState:`, dialogState)
//   console.groupEnd()
//   return dialogState
// }

// export const createNotEnoughEnergyDialogState = (ourState) => {
//   return {
//     ...ourState,
//     dialog: {
//       ...ourState.dialog,
//       isOpen: true,
//       type: DIALOGS.NOT_ENOUGH_ENERGY,
//     },
//   }
// }
