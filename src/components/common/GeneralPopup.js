import React, { useState } from 'react'
import RenderIndAttack from '../info/RenderIndAttack'
import { LightBeam } from '../../consts/allMoves'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { executeMove } from '../../handlers/moveHandlers'
import RenderCounter from './RenderCounter'
import { showTheAttack } from '../../handlers/popup/attackPopupHandlers'

const GeneralPopup = (props) => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const [showCounter, setShowCounter] = useState(false)

  // Or use the actual trigger condition
  const { isOpen, popupType, attack, ourCurrentMon, canUse, previousDialog } =
    state.popup
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

  const backToDialog = () => {
    console.log('backToDialog running a dispatch of SHOW_POPUP')
    dispatch({
      type: ACTIONS.CHANGE_DIALOG,
      payload: {
        dialog: previousDialog,
      },
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
  //

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
              {/* <div onClick={() => closeDialogPopup()}>x</div> */}
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
          <div>
            <div className="text-sm bg">
              {/* {ourCurrentMon.moves.map((move, index) => (
          <div
            className="cursor-pointer text-sm text-white"
            key={index}
            onClick={() => showTheAttack(move, contextualDispatch, true, ourCurrentMon)}
          >
            {move.name}
          </div>
        ))} */}

              {/* 
                      {moves.map((move, index) => (
  move.counter ? (
    <div
      className="cursor-pointer text-sm text-white"
      key={index}
      onClick={() => {
        showTheAttack(move.counter, dispatch, true, ourCurrentMon);
        dispatch({
          type: ACTIONS.SHOW_COUNTERS,
          payload: {
            previousPayload: {
              pal: state.attack.pal,
              move: state.attack.move,
              phase: ATK_PHASES.STATUSES,
              userSlot: state.attack.userSlot,
              targets: state.attack.targets,
              player: state.attack.player,
            },
            previousDialog: DIALOGS.DAMAGED_PAL_HUMAN,
            popupType: 'counters',
          },
        });
        dispatch({ type: ACTIONS.CLOSE_DIALOG });
      }}
    >
      {move.name}
    </div>
  ) : (
    <div key={index}>No Counter</div>
  )
))} */}

              {moves.map((move, index) =>
                move.counter ? (
                  <div
                    className="cursor-pointer text-sm text-white"
                    key={index}
                    onClick={() =>
                      showTheAttack(move.counter, dispatch, true, ourCurrentMon)
                    }
                  >
                    {move.name}
                  </div>
                ) : (
                  <div key={index}>No Counter</div>
                ),
                //null
              )}
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

// //
// {moves.map((move, index) => {
//   // move.counter ?
//   <div
//     className="cursor-pointer text-sm text-white"
//     key={index}
//     onClick={
//       () =>
//         showTheAttack(move.counter, dispatch, true, ourCurrentMon)
//       // SHOW_COUNTERS
//     }
//   >
//     {move.name}
//   </div>
//   // <RenderCounter move={move} pal={pal} key={move.name} />
// })}
{
  /*    
                   onClick: () => {
                    dispatch({
                      type: ACTIONS.SHOW_COUNTERS,
                      //add the way to show which dialog it came from,
                      // and what the dialog needs to show
                      // this is the dialog we were at:
                      // newState = switchDialog(newState, DIALOGS.DAMAGED_PAL_HUMAN)
                      payload: {
                        previousPayload: {
                          pal: state.attack.pal,
                          move: state.attack.move,
                          phase: ATK_PHASES.STATUSES,

                          userSlot: state.attack.userSlot,
                          targets: state.attack.targets,
                          player: state.attack.player,
                        },
                        previousDialog: DIALOGS.DAMAGED_PAL_HUMAN,
                        popupType: 'counters',
                      },
                    })
                    dispatch({ type: ACTIONS.CLOSE_DIALOG })
                  },
                }
                */
}
