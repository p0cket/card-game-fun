import { ACTIONS } from '../constants'
import { ATK_PHASES } from './moveHandlers'
import { executeMove } from './moveHandlers'

const exampleOptions = [
  {
    label: 'Oh dear',
    onClick: () => {
      //commented out but you do need the right state passed in and applied
      // const closedPopupState = createPopupRemovedState(contextualState)
      // console.log(closedPopupState)
      // return contextualDispatch({
      //   payload: closedPopupState,
      //   type: ACTIONS.UPDATEGAMEDATA,
      // })
    },
    backgroundColor: '#4b770e',
    color: '#fff',
  },
]
export const createPopupRemovedState = (prevState) => {
  return {
    ...prevState,
    dialog: {
      ...prevState.dialog,
      isOpen: false,
    },
  }
}

export const createOption = (label, onClick, backgroundColor, color) => {
  return {
    label: label,
    onClick: onClick,
    backgroundColor: backgroundColor,
    color: color,
  }
}

export const closeOption = (ourState) => {
  createOption(
    'Close',
    () => createPopupRemovedState(ourState),
    '#4b770e',
    '#fff',
  )
}

export const createPopupVisibleState = ({
  prevState,
  message = 'default message',
  options = exampleOptions,
  header = 'Default Header',
  title = 'default title',
  color = '#000',
  background = '#fff',
}) => {
  return {
    ...prevState,
    dialog: {
      ...prevState.dialog,
      isOpen: true,
      options: options,
      message: message,
      title: title,
      header: header,
      color: color,
      background: background,
    },
  }
}

export const createUserEnergyPaidState = (resultingEnergy, ourState) => {
  const energyPaidState = {
    ...ourState,
    game: {
      ...ourState.game,
      player: {
        ...ourState.game.player,
        energy: resultingEnergy,
      },
    },
  }
  return energyPaidState
}

export const createNotEnoughEnergyDialogState = (ourState, ourDispatch) => {
  const dialogState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `Not enough energy. user.name of user's name does not have enough energy to perform the move.`,
      title: 'Pay Phase',
      header: 'Not enough energy to perform the move',
      options: [
        {
          label: 'Oh dear',
          onClick: () => {
            const closedPopupState = createPopupRemovedState(ourState)
            console.log(closedPopupState)
            return ourDispatch({
              payload: closedPopupState,
              type: ACTIONS.UPDATEGAMEDATA,
            })
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
      ],
    },
  }
  return dialogState
}

export const createCostPaidDialogState = (
  ourState,
  contextualDispatch,
  move,
  user,
) => {
  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move.cost.energy} Energy paid.
      ${user.name} uses ${move.name}`,
      options: [
        {
          label: 'Confirm',
          onClick: () => {
            //replace here with our function create
            // const closedPopupState = createRemovedState(whateverMakesSenseHere)
            // handle onClick logic here
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            executeMove(
              move,
              closedPopupState,
              contextualDispatch,
              user,
              ATK_PHASES.DAMAGE, // phase,
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
        {
          label: 'Enhance',
          onClick: () => {
            //replace here with our function create
            // const closedPopupState = createRemovedState(whateverMakesSenseHere)
            // handle onClick logic here
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            // -maybe just use the same executeMove
            // the button should change phase
            executeMove(
              move,
              closedPopupState,
              contextualDispatch,
              user,
              ATK_PHASES.DAMAGE, // phase,
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
        {
          label: 'Enhance',
          onClick: () => {
            //replace here with our function create
            // const closedPopupState = createRemovedState(whateverMakesSenseHere)
            // handle onClick logic here
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            // -maybe just use the same executeMove
            // the button should change phase
            executeMove(
              move, // move,
              // ourState, // contextualState,
              closedPopupState,
              contextualDispatch, // contextualDispatch,
              user, // user,
              ATK_PHASES.DAMAGE, // phase,
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
      ],
      title: 'Pay Phase',
      header: 'You can pay!',
    },
    // Dialogue: Paid x energy
  }
  return paidState
}

export const createAIDamagedState = (
  ourState,
  damagedHP,
  moveCost,
  move,
  user,
  contextualDispatch,
) => {
  console.log(
    `ourState, damagedHP, moveCost, move, user, contextualDispatch`,
    ourState,
    damagedHP,
    moveCost,
    move,
    user,
    contextualDispatch,
  )

  const resultState = {
    ...ourState,
    opponent: {
      ...ourState.opponent,
      monsters: [
        {
          ...ourState.opponent.monsters[0],
          stats: {
            ...ourState.opponent.monsters[0].stats,
            hp: damagedHP,
          },
        },
        ...ourState.opponent.monsters.slice(1),
      ],
    },
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${moveCost} Damage Dealt.
      ${user.name} uses ${move.name}`,
      options: [
        {
          label: 'Confirm',
          onClick: () => {
            //replace here with our function create
            // const closedPopupState = createRemovedState(whateverMakesSenseHere)
            // handle onClick logic here
            const closedPopupState = createPopupRemovedState(ourState)
            executeMove(
              move,
              closedPopupState,
              contextualDispatch,
              user,
              ATK_PHASES.STATUSES, // phase,
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
        {
          label: 'Enhance',
          onClick: () => {
            //replace here with our function create
            // const closedPopupState = createRemovedState(whateverMakesSenseHere)
            // handle onClick logic here
            const closedPopupState = createPopupRemovedState(ourState)

            // const closedPopupState = {
            //   ...ourState,
            //   dialog: {
            //     ...ourState.dialog,
            //     isOpen: false,
            //   },
            // }
            // -maybe just use the same executeMove
            // the button should change phase
            executeMove(
              move,
              closedPopupState,
              contextualDispatch,
              user,
              ATK_PHASES.STATUSES, // phase,
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
        {
          label: 'Enhance2',
          onClick: () => {
            const closedPopupState = createPopupRemovedState(ourState)
            // const closedPopupState = {
            //   ...ourState,
            //   dialog: {
            //     ...ourState.dialog,
            //     isOpen: false,
            //   },
            // }
            executeMove(
              move,
              closedPopupState,
              contextualDispatch,
              user, // user,
              ATK_PHASES.STATUSES, // phase,
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
      ],
      title: 'Pay Phase',
      header: 'You can pay!',
    },
  }

  return resultState
}

export const createHumanDamagedState = (contextualState, damagedHP) => {
  const damagedState = {
    ...contextualState,
    userParty: [
      {
        ...contextualState.userParty[0],
        stats: {
          ...contextualState.userParty[0].stats,
          hp: damagedHP,
        },
      },
      ...contextualState.userParty.slice(1),
    ],
  }
  return damagedState
}