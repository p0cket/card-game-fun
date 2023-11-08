import {
  createPopupRemovedState,
  createPopupVisibleState,
} from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'

// export const createAIDamagedState = (
//   ourState,
//   damagedHP,
//   moveCost,
//   move,
//   user,
//   contextualDispatch,
// ) => {
//   console.log(
//     `entered createAIDamagedState:🙀 ourState, damagedHP, moveCost, move, user, contextualDispatch`,
//     ourState,
//     damagedHP,
//     moveCost,
//     move,
//     user,
//     contextualDispatch,
//   )

//   let resultState = {
//     ...ourState,
//     opponent: {
//       ...ourState.opponent,
//       monsters: [
//         {
//           ...ourState.opponent.monsters[0],
//           stats: {
//             ...ourState.opponent.monsters[0].stats,
//             hp: damagedHP,
//           },
//         },
//         ...ourState.opponent.monsters.slice(1),
//       ],
//     },
//   }
//   console.log(`resultState after damaged - is this undefined?:`, resultState)
//   const otherState = createPopupVisibleState(
//     resultState,
//     `${moveCost} Damage Dealt.`,
//     [
//       {
//         label: 'Confirm',
//         onClick: () => {
//           console.log(`confirm clicked:`)
//           executeMove(
//             move,
//             resultState,
//             contextualDispatch,
//             user,
//             ATK_PHASES.STATUSES, // phase,
//           )
//         },
//       },
//     ],
//   )
//   console.log(`resultState after createPopupVisibleState:`, otherState)

//   contextualDispatch({
//     payload: otherState,
//     type: 'UPDATEGAMEDATA',
//   })

//   return otherState
// }
export const createAIDamagedState = (
  ourState,
  damagedHP,
  moveCost,
  move,
  user,
  contextualDispatch,
) => {
  console.log(
    'Entered createAIDamagedState:',
    'ourState:',
    ourState,
    'damagedHP:',
    damagedHP,
    'moveCost:',
    moveCost,
    'move:',
    move,
    'user:',
    user,
    'contextualDispatch:',
    contextualDispatch,
  )

  let resultState = {
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
  }
  console.log('resultState after damaged:', resultState)

  // const otherState = createPopupVisibleState({
  //   prevState: resultState,
  //   message: `${moveCost} Damage Dealt.`,
  //   options: [
  //     {
  //       label: 'Confirm',
  //       onClick: () => {
  //         console.log('Confirm clicked')
  //         executeMove(
  //           move,
  //           resultState,
  //           contextualDispatch,
  //           user,
  //           ATK_PHASES.STATUSES,
  //         )

  //       },
  //     },
  //   ],
  // })
  console.log('resultState after createPopupVisibleState:', resultState)
  return resultState
}

export const createHumanDamagedState = (contextualState, damagedHP) => {
  console.log(`createHumanDamagedState:`, damagedHP)
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
