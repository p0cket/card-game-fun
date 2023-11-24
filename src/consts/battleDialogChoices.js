import { useDispatchContext, useStateContext } from '../MainContext'
import { ATK_PHASES, executeMove } from '../handlers/moveHandlers'

const state = useStateContext()
const dispatch = useDispatchContext()
// export const confirmPayOption = {
//   label: 'Confirm Pay',
//   onClick: () => {
//     console.log(`Clicked confirm pay`)
//     executeMove(
//       {
//         state: state,
//         dispatch: dispatch,

//         pal: pal,
//         move: move,
//         player: player,
//         phase: ATK_PHASES.DAMAGE,
//         userSlot: 0,

//         targets: targets,
//         // possessed: false,
//       },
//     )
//   },
//   backgroundColor: '#4b770e',
//   color: '#fff',
// };

const createOption = ({
  label,
  onClick,
  backgroundColor = '#4b770e',
  color = '#fff',
}) => ({
  label,
  onClick,
  backgroundColor,
  color,
})

const generateOptionParams = ({ pal, move, player, targets, attackPhase }) => {
  return {
    pal,
    move,
    player,
    phase: attackPhase,
    userSlot: 0,
    targets,
  }
}
/**
 * Creates a pay option for the game.
 *
 * @param {Object} pal - The player's PAL object.
 * @param {Object} move - The move object.
 * @param {Object} player - Whether the player is human or AI.
 * @param {Array} targets - The object of targets.
 * @param {boolean} attackPhase - The flag indicating which phase of the attack.
 * @return {Object} The created pay option.
 */
export const createPayOption = (pal, move, player, targets, attackPhase) => {
  return createOption({
    label: 'Confirm Pay',
    onClick: () => {
      executeMove({
        state: state, //imported at the top
        dispatch: dispatch, //imported at the top
        ...generateOptionParams({ pal, move, player, targets, attackPhase }),
      })
    },
  })
}
// How does this look?
// const generateOptionParams = ({ pal, move, player, targets, attackPhase }) => {
//   return {
//     pal: pal,
//     move: move,
//     player: player,
//     phase: attackPhase, //ATK_PHASES.DAMAGE,
//     userSlot: 0,
//     targets: targets,
//   }
// }

// export const confirmPayOption = {
//   label: 'Confirm Pay',
//   onClick: () => {
//     executeMove({
//       state: state,
//       dispatch: dispatch,
//       ...optionParams,
//     })
//   },
//   backgroundColor: '#4b770e',
//   color: '#fff',
// }

export const enhancePayOption = {
  label: 'Enhance Pay',
  onClick: () => {
    const state = {
      ...state,
      dialog: {
        ...state.dialog,
        isOpen: false,
      },
    }
    executeMove({
      state: state,
      dispatch: dispatch,

      pal: pal,
      move: move,
      player: player,
      phase: ATK_PHASES.DAMAGE,
      userSlot: 0,

      targets: targets,
      // possessed: false,
    })
  },
  backgroundColor: '#4b770e',
  color: '#fff',
}

export const enhanceOption = {
  label: 'Enhance',
  onClick: () => {
    const state = {
      ...state,
      dialog: {
        ...state.dialog,
        isOpen: false,
      },
    }
    executeMove({
      state: state,
      dispatch: dispatch,

      pal: pal,
      move: move,
      player: player,
      phase: ATK_PHASES.DAMAGE,
      userSlot: 0,

      targets: targets,
      // possessed: false,
    })
  },
  backgroundColor: '#4b770e',
  color: '#fff',
}
