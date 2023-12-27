// Replace the other functions of the same name
// so you can use the functions in Battle.js
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

export function calculateDoesItLand(move) {
  const randomNum = Math.random() * 100
  const result = parseFloat(move.effect.chance) >= randomNum
  console.log(`math: ${parseFloat(move.effect.chance)}(chance of ${move.effect.chance}) >= rN ${randomNum}? ${result}`, move)  
  return result
}

export function applyStatusEffect(contextualState, player, move) {
  console.log('applyStatusEffect: contextualState, player, move', contextualState, player, move)
  if (player === 'human') {
    console.log(`'player === human', calling updateStatusState with contextualState, player, and move.effect.result of ${move.effect.result}`,contextualState, player, move.effect.result)
    const updatedStatusState = updateStatusState(contextualState, player, move.effect.result, move.effect.amt)
    console.log('updatedStatusState', updatedStatusState)
    return updatedStatusState
  } else if (player === 'AI') {
    console.log(`'player === AI' ,calling updateStatusState with contextualState, player, and move.effect.result of ${move.effect.result}'`, player)
    const updatedStatusState =  updateStatusState(contextualState, player, move.effect.result,move.effect.amt)
    console.log('updatedStatusState', updatedStatusState)
    return updatedStatusState
  }
}
