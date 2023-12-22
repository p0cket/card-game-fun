import { ATK_PHASES, executeMove } from '../moveHandlers'

export const createCostPaidDialogState = (
  ourState,
  contextualDispatch,
  move,
  pal,
  player,
  targets,
) => {
  console.groupCollapsed(
    `createCostPaidDialogState called:`,
    ourState,
    contextualDispatch,
    move,
    pal,
    player,
    targets,
  )
  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move.cost.energy} Energy paid.
      ${pal.name} uses ${move.name}`,
      options: [
        {
          label: 'Confirm Pay',
          onClick: () => {
            console.log(`Clicked confirm pay`)
            executeMove({
              state: ourState,
              dispatch: contextualDispatch,

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
        },
        {
          label: 'Enhance Pay',
          onClick: () => {
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            executeMove({
              state: closedPopupState,
              dispatch: contextualDispatch,

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
        },
        {
          label: 'Enhance',
          onClick: () => {
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            executeMove({
              state: closedPopupState,
              dispatch: contextualDispatch,

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
        },
      ],
      title: 'Pay Phase',
      header: 'You can pay!',
    },
  }
  console.log(`createCostPaidDialogState returning:`, paidState)
  console.groupEnd()
  return paidState
}

export const createUserEnergyPaidState = (state, playerEnergyAfterPayment) => {
  console.groupCollapsed(
    `createUserEnergyPaidState called:`,
    playerEnergyAfterPayment,
    state,
  )
  const energyPaidState = {
    ...state,
    game: {
      ...state.game,
      player: {
        ...state.game.player,
        energy: playerEnergyAfterPayment,
      },
    },
  }
  console.log(`createUserEnergyPaidState returning:`, energyPaidState)
  console.groupEnd()
  return energyPaidState
}

export const createAIPaidState = (
  ourState,
  contextualDispatch,
  move,
  pal,
  player,
  targets,
) => {
  console.groupCollapsed(
    `createCostPaidDialogState called:`,
    ourState,
    contextualDispatch,
    move,
    pal,
    player,
    targets,
  )
  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move.cost.energy} Energy paid.
      AI's ${pal.name} uses ${move.name}`,
      options: [
        {
          label: 'Okay',
          onClick: () => {
            console.log(`Clicked Okay`)
            executeMove({
              state: ourState,
              dispatch: contextualDispatch,

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
        },
        {
          label: 'Counter',
          onClick: () => {
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            executeMove({
              state: closedPopupState,
              dispatch: contextualDispatch,

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
        },
        {
          label: 'something else',
          onClick: () => {
            const closedPopupState = {
              ...ourState,
              dialog: {
                ...ourState.dialog,
                isOpen: false,
              },
            }
            executeMove({
              state: closedPopupState,
              dispatch: contextualDispatch,

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
        },
      ],
      title: 'AI Pay Phase',
      header: 'AI Paid!',
    },
  }
  console.log(`createAICostPaidDialogState returning:`, paidState)
  console.groupEnd()
  return paidState
}
