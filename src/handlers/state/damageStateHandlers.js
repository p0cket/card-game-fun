import { executeMove } from "../moveHandlers"

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
          label: 'Confirm D',
          onClick: () => {
            console.log(`confirm clicked:`)
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
          label: 'Enhance D',
          onClick: () => {
            console.log(`enhance clicked:`)
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