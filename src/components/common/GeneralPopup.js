import React from 'react'
import RenderIndAttack from '../info/RenderIndAttack'
import { LightBeam } from '../../consts/allMoves'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'

const GeneralPopup = (props) => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  // Or use the actual trigger condition
  const { isOpen, popupType, attack, ourCurrentMon, canUse } = state.popup
  console.log(
    'GeneralPopup: isOpen, type, attack, ourCurrentMon',
    isOpen,
    popupType,
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

  const attackMenu = () => {
    return (
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
    )
  }

  const countersMenu = () => {
    console.log(`state`, state)
    const pal = state.userParty[0]
    console.log(`pal`, pal)
    const { moves } = pal
    console.log(`pal.moves`, moves)

    return (
      <div className="font-[silkscreen] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="relative p-1 bg-boy-green w-4/5 max-w-xl shadow">
          <div className="flex items-center mb-1">
            <div className="w-6 h-6 bg-boy-green mr-1">{'!'}</div>
            <div className="font-bold text-white flex justify-between w-full">
              <div></div> <div onClick={() => closeDialogPopup()}>x</div>
            </div>
          </div>
          <div>
            <div>TODO: Counters Form</div>
            <div className="text-sm">
              {/* {JSON.stringify(moves)} */}
              {moves.map((move) => {
                return (
                  // <div
                  //   key={move.name}
                  //   className="bg-white shadow rounded-lg p-4 mb-6"
                  // >
                  //   <h2 className="text-xl font-semibold text-gray-800">
                  //     {move.name}
                  //   </h2>
                  //   <div className="text-gray-600">
                  //     <p>
                  //       Type: <span className="text-gray-700">{move.type}</span>
                  //     </p>
                  //     <p>
                  //       Damage:{' '}
                  //       <span className="text-gray-700">{move.damage}</span>
                  //     </p>
                  //     <p>
                  //       Accuracy:{' '}
                  //       <span className="text-gray-700">{move.accuracy}%</span>
                  //     </p>
                  //     <p>
                  //       Speed: <span className="text-gray-700">{move.speed}</span>
                  //     </p>
                  //     <p>
                  //       Energy Cost:{' '}
                  //       <span className="text-gray-700">{move.energyCost}</span>
                  //     </p>
                  //     <p>
                  //       Effect:{' '}
                  //       <span className="text-gray-700">
                  //         {move.effect.description}
                  //       </span>
                  //     </p>
                  //   </div>
                  // </div>
                  <div key={move.name}>
                    {move.counter && (
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                          Counter Move
                        </h1>
                        <div className="bg-white shadow rounded-lg p-4 mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {move.counter.name || 'No counter'}
                          </h2>
                          <div className="text-gray-600">
                            <p>
                              Type:{' '}
                              <span className="text-gray-700">
                                {move.counter.type}
                              </span>
                            </p>
                            <p>
                              Accuracy:{' '}
                              <span className="text-gray-700">
                                {move.counter.accuracy}%
                              </span>
                            </p>
                            <p>
                              Effect:{' '}
                              <span className="text-gray-700">
                                {move.counter.effect.description}
                              </span>
                            </p>
                            {/* Additional counter move details can be added here */}
                            <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                              Use
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <h1 className="text-2xl font-bold text-gray-800">
                      Main Attack
                    </h1>
                    <details className="mb-4">
                      <summary className="cursor-pointer">
                        View Main Attack Details
                      </summary>
                      <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {move.name}
                        </h2>
                        <div className="text-gray-600">
                          <p>
                            Type:{' '}
                            <span className="text-gray-700">{move.type}</span>
                          </p>
                          <p>
                            Damage:{' '}
                            <span className="text-gray-700">{move.damage}</span>
                          </p>
                          <p>
                            Accuracy:{' '}
                            <span className="text-gray-700">
                              {move.accuracy}%
                            </span>
                          </p>
                          <p>
                            Speed:{' '}
                            <span className="text-gray-700">{move.speed}</span>
                          </p>
                          <p>
                            Energy Cost:{' '}
                            <span className="text-gray-700">
                              {move.energyCost}
                            </span>
                          </p>
                          <p>
                            Effect:{' '}
                            <span className="text-gray-700">
                              {move.effect.description}
                            </span>
                          </p>
                          {/* Additional main attack details can be added here */}
                        </div>
                      </div>
                    </details>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return trigger ? (
    <>
      {popupType === 'attack' && attackMenu()}
      {popupType === 'counters' && countersMenu()}
    </>
  ) : (
    <></>
  )
}
export default GeneralPopup
