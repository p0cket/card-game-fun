import React from 'react'
import RenderIndAttack from '../../info/RenderIndAttack'

const AttackMenu = ({
  attack,
  inDebug,
  closeDialogPopup,
  state,
  dispatch,
  ourCurrentMon,
  canUse,
}) => {
  return (
    <div className="font-[silkscreen] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="relative p-1 bg-boy-green w-4/5 max-w-xl shadow">
        <div className="flex items-center mb-1">
          <div className="w-6 h-6 bg-boy-green mr-1">{'!'}</div>
          <div className="font-bold text-white flex justify-between w-full">
            <div>
              {attack.name} {inDebug && attack.type}
            </div>
            <div onClick={closeDialogPopup}>x</div>
          </div>
        </div>
        <div>
          <RenderIndAttack
            attack={attack}
            contextualState={state}
            contextualDispatch={dispatch}
            togglePopup={closeDialogPopup}
            pal={ourCurrentMon}
            canUse={canUse}
          />
        </div>
      </div>
    </div>
  )
}

export default AttackMenu
