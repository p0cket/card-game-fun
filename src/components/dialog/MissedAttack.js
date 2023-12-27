import React from 'react'
import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

function MissedAttack({ player }) {
  //or pass in payload
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const missedAttackContinueOption = {
    label: 'Continue',
    onClick: () => {
      console.warn(
        'missedAttackContinueOption onClick:state,  state.attack',
        state,
        state.attack,
      )
      executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.CLEANUP,

        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      })
    },
  }
  const missedAttackDialogProps = {
    title: 'Missed Attack',
    header: 'Missed Attack: ',
    message: `${player}'s ${state.attack.pal.name} missed his attack. No dmg dealt.`,
    options: [missedAttackContinueOption],
  }

  return <DialogTemplate {...missedAttackDialogProps} />
}

export default MissedAttack
