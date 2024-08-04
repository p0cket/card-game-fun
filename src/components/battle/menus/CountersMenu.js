import React from 'react'
import { useDispatchContext } from '../../../MainContext'
import { dispatchDisplayAttackDetails } from '../../../handlers/popup/attackPopupHandlers'

const CountersMenu = ({ backToDialog, closeDialogPopup, state }) => {
  const dispatch = useDispatchContext()
  const pal = state.userParty[0]
  const { moves } = pal

  return (
    <div className="font-[silkscreen] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="relative p-1 bg-boy-green w-4/5 max-w-xl shadow">
        <div className="flex items-center mb-1">
          <div className="w-6 h-6 bg-boy-green mr-1">{'!'}</div>
          <div className="font-bold text-white flex justify-between w-full">
            <div></div>
            <div
              onClick={() => {
                backToDialog()
                closeDialogPopup()
              }}
            >
              x
            </div>
          </div>
        </div>
        <div className="text-sm bg">
          {moves.map((move, index) =>
            move.counter ? (
              <div
                className="cursor-pointer text-sm text-white"
                key={index}
                onClick={() => {
                  dispatchDisplayAttackDetails(
                    move.counter,
                    dispatch,
                    true,
                    state.userParty[0],
                  )
                }}
              >
                {move.name}
              </div>
            ) : (
              <div key={index}>No Counter</div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default CountersMenu
