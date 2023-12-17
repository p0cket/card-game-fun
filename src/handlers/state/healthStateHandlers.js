export const healAIPal = (state, healAmount) => {
  console.log('healAIPal:', state, 'healAmount:', healAmount)

  let resultState = {
    ...state,
    opponent: {
      ...state.opponent,
      monsters: state.opponent.monsters.map((monster, index) =>
        index === 0
          ? {
              ...monster,
              obj: {
                ...monster.obj,
                stats: {
                  ...monster.obj.stats,
                  hp: monster.obj.stats.hp + healAmount, // Increase HP by healAmount
                },
              },
            }
          : monster,
      ),
    },
  }

  console.log('resultState after healing:', resultState)
  return resultState
}

export const healHumanPal = (ourState, healAmount) => {
  console.log(
    'Entered healHumanPal: ourState, healAmount',
    ourState,
    healAmount,
  )
  console.log('ourState.userParty[0]:', ourState.userParty[0])

  let resultState = {
    ...ourState,
    userParty: ourState.userParty.map((partyMember, index) =>
      index === 0
        ? {
            ...partyMember,
            stats: {
              ...partyMember.stats,
              hp: partyMember.stats.hp + healAmount, // Increase HP by healAmount
            },
          }
        : partyMember,
    ),
  }

  console.log('resultState after healing:', resultState)
  return resultState
}
// export const healAIPal = (
//     ourState,
//     damagedHP,
//     moveCost,
//     move,
//     pal,
//   ) => {
//     console.log(
//       'createAIDamagedState:',
//       ourState,
//       'damagedHP:',
//       damagedHP,
//       'moveCost:',
//       moveCost,
//       'move:',
//       move,
//       'pal:',
//       pal,
//     )
//     console.log('ourState.opponent.monsters[0], damagedHP', ourState.opponent.monsters[0], damagedHP)
//     let resultState = {
//       ...ourState,
//       opponent: {
//         ...ourState.opponent,
//         monsters: ourState.opponent.monsters.map((monster, index) =>
//           index === 0
//             ? {
//                 ...monster,
//                 obj: {
//                   ...monster.obj,
//                   stats: {
//                     ...monster.obj.stats,
//                     hp: damagedHP,
//                   },
//                 },
//               }
//             : monster,
//         ),
//       },
//     }
//     console.log('resultState after damaged:', resultState)
//     return resultState
//   }
//   export const healHumanPal = (
//     ourState,
//     damagedHP,
//     moveCost,
//     move,
//     pal,
//     contextualDispatch,
//   ) => {
//     console.log(
//       'Entered createHumanDamagedState:',
//       'ourState:',
//       ourState,
//       'damagedHP:',
//       damagedHP,
//       'moveCost:',
//       moveCost,
//       'move:',
//       move,
//       'pal:',
//       pal,
//       'contextualDispatch:',
//       contextualDispatch,
//     )
//     console.log('ourState.userParty[0]:', ourState.userParty[0], ourState)
//     let resultState = {
//       ...ourState,
//       userParty: ourState.userParty.map((partyMember, index) =>
//         index === 0
//           ? {
//               ...partyMember,
//               stats: {
//                 ...partyMember.stats,
//                 hp: damagedHP,
//               },
//             }
//           : partyMember,
//       ),
//     }
//     console.log('resultState after damaged:', resultState)
//     return resultState
//   }
