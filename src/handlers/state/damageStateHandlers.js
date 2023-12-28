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
) => {
  // console.log(
  //   'createAIDamagedState:',
  //   ourState,
  //   'damagedHP:',
  //   damagedHP,
  //   'move:',
  //   move,
  //   'pal:',
  //   pal,
  // )
  console.log('ourState.opponent.monsters[0], damagedHP', ourState.opponent.monsters[0], damagedHP)
  
  let resultState = {
    ...ourState,
    opponent: {
      ...ourState.opponent,
      monsters: ourState.opponent.monsters.map((monster, index) =>
        index === 0
          ? {
              ...monster,
              stats: {
                ...monster.stats,
                hp: damagedHP,
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
) => {
  // console.log(
  //   'Entered createHumanDamagedState:',
  //   'ourState:',
  //   ourState,
  //   'damagedHP:',
  //   damagedHP,
  //   'move:',
  //   move,
  //   'pal:',
  //   pal,
  //   'contextualDispatch:',
  //   contextualDispatch,
  // )
  console.log('ourState.userParty[0]:', ourState.userParty[0], ourState)
  let resultState = {
    ...ourState,
    userParty: ourState.userParty.map((partyMember, index) =>
      index === 0
        ? {
            ...partyMember,
            stats: {
              ...partyMember.stats,
              hp: damagedHP,
            },
          }
        : partyMember,
    ),
  }
  console.log('resultState after damaged:', resultState)
  return resultState
}