import React from 'react'
import RenderIndAttack from '../info/RenderIndAttack'
import { LightBeam } from '../../consts/allMoves'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'

const GeneralPopup = (props) => {
  console.log('Before useStateContext in GeneralPopup')
  const state = useStateContext()
  console.log('Before useDispatchContext in GeneralPopup')
  const dispatch = useDispatchContext()
  // Or use the actual trigger condition
  const { isOpen, type, attack, ourCurrentMon, canUse } = state.popup
  console.log(
    'GeneralPopup: isOpen, type, attack, ourCurrentMon',
    isOpen,
    type,
    attack,
    ourCurrentMon,
  )

  const trigger = isOpen
  const closeDialogPopup = () => {
    console.log('closeDialogPopup running a dispatch of CLOSE_POPUP')
    dispatch({
      type: ACTIONS.CLOSE_POPUP,
    })
  }
  return trigger ? (
    <div className="font-[silkscreen] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="relative p-1 bg-boy-green w-4/5 max-w-xl shadow">
        <div className="flex items-center mb-1">
          <div className="w-6 h-6 bg-boy-green mr-1">{'!'}</div>
          <div className="font-bold text-white flex justify-between w-full">
            <div>
              {attack.name} ({attack.type})
            </div>{' '}
            <div onClick={() => closeDialogPopup()}>x</div>
          </div>
        </div>
        <div>
          <RenderIndAttack
            attack={attack}
            contextualState={state}
            contextualDispatch={dispatch}
            togglePopup={() => closeDialogPopup()}
            pal={ourCurrentMon}
            canUse={canUse}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
export default GeneralPopup
