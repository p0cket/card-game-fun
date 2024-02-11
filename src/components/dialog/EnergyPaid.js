import DialogTemplate from '../common/DialogTemplate'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { useDispatchContext, useStateContext } from '../../MainContext'

const EnergyPaid = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const paid_continueOption = {
    label: 'Continue',
    onClick: () => {
      console.log(`EnergyPaid: Clicked Continue, state`, state)
console.log(`m`, state.attack.move, state.attack.move.moveCategory)
      const moveCategory = state.attack.move.moveCategory
      const movePayload = {
        pal: state.attack.pal,
        move: state.attack.move,
        phase:
          moveCategory === 'change' ? ATK_PHASES.STATUSES : ATK_PHASES.DAMAGE,
        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
        // possessed: false,
      }

      executeMove(dispatch, movePayload)
    },
  }

  console.log(`EnergyPaid: state, player`, state, state.game.player)
  const dialogProps = {
    title: 'Energy Paid',
    message: `Your new energy level is ${state.game.player.energy}.`,
    options: [paid_continueOption],
  }

  return <DialogTemplate {...dialogProps} />
}

export default EnergyPaid
