import {
  createPopupRemovedState,
} from '../dialog/basicDialogHandlers'
import { ATK_PHASES } from '../moveHandlers'
// allTargets.allyTargets.forEach((target, index) => {
//   // ...damage calculation...
//   newState = createHumanDamagedState(newState, damagedHP, index);
// });

// allTargets.enemyTargets.forEach((target, index) => {
//   // ...damage calculation...
//   newState = createEnemyDamagedState(newState, damagedHP, index); // Assuming you have a similar function for enemies
// });
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
  console.log('ourState.opponent.monsters[0]:', ourState.opponent.monsters[0])
  let resultState = {
    ...ourState,
    opponent: {
      ...ourState.opponent,
      monsters: ourState.opponent.monsters.map((monster, index) =>
        index === 0
          ? {
              ...monster,
              obj: {
                ...monster.obj,
                stats: {
                  ...monster.obj.stats,
                  hp: damagedHP,
                },
              },
            }
          : monster,
      ),
    },
  }
  console.log('resultState after damaged:', resultState)
  return resultState
}
export const createHumanDamagedState = (
  ourState,
  damagedHP,
  moveCost,
  move,
  user,
  contextualDispatch,
) => {
  console.log(
    'Entered createHumanDamagedState:',
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
  console.log('ourState.userParty[0]:', ourState.userParty[0])
  let resultState = {
    ...ourState,
    userParty: ourState.userParty.map((partyMember, index) =>
      index === 0
        ? {
            ...partyMember,
            obj: {
              ...partyMember.obj,
              stats: {
                ...partyMember.obj.stats,
                hp: damagedHP,
              },
            },
          }
        : partyMember,
    ),
  }
  console.log('resultState after damaged:', resultState)
  return resultState
}
// export const createHumanDamagedState = (contextualState, damagedHP) => {
//   console.log(`createHumanDamagedState:`, damagedHP)
//   const damagedState = {
//     ...contextualState,
//     userParty: [
//       {
//         ...contextualState.userParty[0],
//         stats: {
//           ...contextualState.userParty[0].stats,
//           hp: damagedHP,
//         },
//       },
//       ...contextualState.userParty.slice(1),
//     ],
//   }
//   return damagedState
// }
