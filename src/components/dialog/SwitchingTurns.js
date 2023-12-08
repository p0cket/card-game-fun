import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import {
  ATK_PHASES,
  executeAITurn,
  executeMove,
} from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'
const SwitchingTurns = ({whosTurn}) => {
  console.log(`SwitchingTurns: whosTurn`, whosTurn)
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const switchingTurns_continueOption = {
    label: 'Continue',
    onClick: () => {
      executeAITurn(state, dispatch)
    },
  }

  //   const endTurnOptions = [
  //     {
  //       label: `Enemy gets to go now`,
  //       onClick: () => {
  //         console.log(`Enemy gets to attack`)
  //         //doesn't need to return anything because it runs again
  //         executeAITurn(newState, contextualDispatch)
  //       },
  //       backgroundColor: '#4b770e',
  //       color: '#fff',
  //     },
  //   ]

  const switchingTurnsProps = {
    title: ` switchingTurns to ${whosTurn}`,
    header: ` switchingTurns to ${whosTurn}`,
    message: `switchingTurns to ${whosTurn}`,
    options: [switchingTurns_continueOption],
  }
  //   newState = createPopupVisibleState({
  //     prevState: newState,
  //     message: `We are switching turns, the opponent can go now.`,
  //     options: endTurnOptions,
  //     header: 'End of Your Turn',
  //     title: 'Opponent gets to go now',
  //     color: '#000',
  //     background: '#fff',
  //   })

  return <DialogTemplate {...switchingTurnsProps} />
}
export default SwitchingTurns
