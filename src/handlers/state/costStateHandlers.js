import { ATK_PHASES, executeMove } from "../moveHandlers"

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
          label: 'Confirm Pay',
          onClick: () => {
            console.log(`Clicked confirm pay`)
            //replace here with our function create
            // const closedPopupState = createRemovedState(whateverMakesSenseHere)
            // handle onClick logic here

            //close dialog maybe. add it in the other  side of the code,  not here
            // const closedPopupState = {
            //   ...ourState,
            //   dialog: {
            //     ...ourState.dialog,
            //     isOpen: false,
            //   },
            // }

            executeMove(
              move,
              ourState,
              contextualDispatch,
              user,
              ATK_PHASES.DAMAGE, // phase,
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
  }
  return paidState
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