import React from 'react'
import DialogTemplate from '../../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../../MainContext'
// import DialogTemplate from '../common/DialogTemplate'

const AICostPaid = ({ move, pal, onOkay, onCounter, onOtherAction }) => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const costPaidContinue = {
    label: 'Continue',
    onClick: () => {
      // console.warn(`Clicked Continue`, state)
      console.log(`AICostPaid state, check state.attack`, state)
      executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.DAMAGE,

        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      })
    },
  }
  //#TODO: Apparently move and pal are undefined
  console.log(`AICostPaid move, pal`, move, pal)
  const aiPaidDialogProps = {
    title: 'AI Pay Phase',
    header: 'AI Paid!',
    // message: `${move.cost.energy} Energy paid. AI's ${pal.name} uses ${move.name}`,
    // message: `AI's ${pal.name} paid for ${move.name}`,
    message: `AI's paid for thier move`,
    options: [costPaidContinue],
  }
  return <DialogTemplate {...aiPaidDialogProps} />
}

export default AICostPaid
