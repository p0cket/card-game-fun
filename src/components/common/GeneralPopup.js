import React, { useState } from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import AttackMenu from '../battle/menus/AttackMenu'
import CountersMenu from '../battle/menus/CountersMenu'
import { battleMenus } from '../../consts/battleConsts'

const GeneralPopup = (props) => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const [showCounter, setShowCounter] = useState(false)
  const inDebug = state.debug && state.debug.isOpen

  // Or use the actual trigger condition
  const { isOpen, popupType, attack, ourCurrentMon, canUse, previousDialog } =
    state.popup
  const trigger = isOpen
  const closeDialogPopup = () => {
    console.log('closeDialogPopup running a dispatch of CLOSE_POPUP')
    dispatch({
      type: ACTIONS.CLOSE_POPUP,
    })
  }
  const backToDialog = () => {
    console.log('backToDialog running a dispatch of SHOW_POPUP')
    dispatch({
      type: ACTIONS.CHANGE_DIALOG,
      payload: {
        dialog: previousDialog,
      },
    })
  }

  return trigger ? (
    <>
      {popupType === battleMenus.ATTACK && (
        <AttackMenu
          attack={attack}
          inDebug={inDebug}
          closeDialogPopup={closeDialogPopup}
          state={state}
          dispatch={dispatch}
          ourCurrentMon={ourCurrentMon}
          canUse={canUse}
        />
      )}
      {popupType === battleMenus.COUNTERS && (
        <CountersMenu
          backToDialog={backToDialog}
          closeDialogPopup={closeDialogPopup}
          state={state}
        />
      )}
    </>
  ) : (
    <></>
  )
}
export default GeneralPopup
