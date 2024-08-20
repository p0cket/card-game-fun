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