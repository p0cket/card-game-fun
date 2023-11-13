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
            executeMove(
              // move,
              // ourState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.DAMAGE,
              {
                state: ourState,
                dispatch: contextualDispatch,

                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.DAMAGE,
                userSlot: 0,

                targets: targets,
                // possessed: false,
              },
            )
          },
          backgroundColor: '#4b770e',
          color: '#fff',
        },
        {
          label: 'Enhance Pay',
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
              // move,
              // closedPopupState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.DAMAGE,
              {
                state: closedPopupState,
                dispatch: contextualDispatch,

                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.DAMAGE,
                userSlot: 0,

                targets: targets,
                // possessed: false,
              },
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
              // move,
              // // ourState,
              // closedPopupState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.DAMAGE,
              {
                state: closedPopupState,
                dispatch: contextualDispatch,

                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.DAMAGE,
                userSlot: 0,

                targets: targets,
                // possessed: false,
              },
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
  console.log(`createCostPaidDialogState returning:`, paidState)
  console.groupEnd()
  return paidState
}

export const createUserEnergyPaidState = (
  playerEnergyAfterPayment,
  ourState,
) => {
  console.groupCollapsed(
    `createUserEnergyPaidState called:`,
    playerEnergyAfterPayment,
    ourState,
  )
  const energyPaidState = {
    ...ourState,
    game: {
      ...ourState.game,
      player: {
        ...ourState.game.player,
        energy: playerEnergyAfterPayment,
      },
    },
  }
  console.log(`createUserEnergyPaidState returning:`, energyPaidState)
  console.groupEnd()
  return energyPaidState
}
