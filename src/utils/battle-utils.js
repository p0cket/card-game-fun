// Replace the other functions of the same name
// so you can use the functions in Battle.js

// import { enemies } from '../components/consts'
// import { startHandCount } from '../consts/consts'
import { updateStatusState } from '../handlers/state/statusStateHandlers'

export const decideEnemyATK = (enemyAttacks) => {
  if (enemyAttacks) {
    const randomizeATK = Math.floor(Math.random() * enemyAttacks.length)
    const nextATK = enemyAttacks[randomizeATK]
    return nextATK
  } else {
    console.log(`no enemyAttacks passed into decideEnemyATK`)
  }
}

// export const getBattlePayloadRandomized = () => {
//   return {
//     enemySeed: Math.random(),
//     atkSeed: Math.random(),
//     beginBattleSeed: Math.random(),
//     startingHandCount: startHandCount,
//   }
// }

//status helper. finish.
export function calculateDoesItLand(move) {
  return Math.random() <= parseFloat(move.effect.chance) / 100
}

export function applyStatusEffect(contextualState, player, move) {
  console.log('applyStatusEffect called')
  if (player === 'human') {
    console.log('player is human')
    console.log('calling updateStatusState with contextualState, player, and move.effect.result')
    return updateStatusState(contextualState, player, move.effect.result)
  } else if (player === 'AI') {
    console.log('player is AI')
    console.log('calling updateStatusState with contextualState, player, and move.effect.result')
    return updateStatusState(contextualState, player, move.effect.result)
  }
}
