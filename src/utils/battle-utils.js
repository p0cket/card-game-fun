// Replace the other functions of the same name
// so you can use the functions in Battle.js
import { ATK_PHASES } from '../handlers/moveHandlers'
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

export function calculateDoesEffectLand(move) {
  const randomNum = Math.random() * 100
  const hasEffectChance = move.effect && typeof move.effect.chance === 'number'
  let rollResult =
    hasEffectChance && parseFloat(move.effect.chance) >= randomNum
  let result
  if (hasEffectChance) {
    console.log(
      `math: ${parseFloat(move.effect.chance)}(chance of ${
        move.effect.chance
      }) >= rN ${randomNum}? ${rollResult}`,
      move,
    )
    result = rollResult
    // result = true
  } else {
    console.log('No effect chance to calculate.', move)
    result = false
  }
  return result
}

export function applyStatusEffect(contextualState, player, move) {
  console.log(
    'applyStatusEffect: contextualState, player, move',
    contextualState,
    player,
    move,
  )
  if (player === 'human') {
    console.log(
      `DUCK: contextualState, player, move`,
      contextualState,
      player,
      move,
    )
    console.log(
      `'player === human', calling updateStatusState with contextualState, player, and move.effect.result of ${move.effect.result}, and move.effect.type`,
      contextualState,
      player,
      move.effect.result,
      move.effect.type,
    )
    console.log(`move`, move)
    console.log(`move.effect.type`, move.effect.type)
    const updatedStatusState = updateStatusState(
      contextualState,
      player,
      move.effect.result,
      move.effect.amt,
      move.effect.type,
    )
    console.log(
      `DUCK: after updatedStatusState - contextualState, player, move`,
      contextualState,
      player,
      move,
    )

    console.log('updatedStatusState', updatedStatusState)
    return updatedStatusState
  } else if (player === 'AI') {
    console.log(
      `'player === AI' ,calling updateStatusState with contextualState, player, and move.effect.result of ${move.effect.result}, and move.effect.type'`,
      player,
      move.effect.result,
      move.effect.type,
    )
    console.log(`move`, move)
    console.log(`move.effect.type`, move.effect.type)
    const updatedStatusState = updateStatusState(
      contextualState,
      player,
      move.effect.result,
      move.effect.amt,
      move.effect.type,
    )
    console.log('updatedStatusState', updatedStatusState)
    return updatedStatusState
  }
}

/**
 * Determines the next attack phase based on the current phase.
 * @param {string} phase - The current phase.
 * @returns {string} The next phase.
 */
export function nextPhase(phase) {
  switch (phase) {
    case ATK_PHASES.PAY:
      return ATK_PHASES.DAMAGE
    case ATK_PHASES.DAMAGE:
      return ATK_PHASES.STATUSES
    case ATK_PHASES.STATUSES:
      return ATK_PHASES.CLEANUP
    case ATK_PHASES.CLEANUP:
      return ATK_PHASES.END
    case ATK_PHASES.END:
      // Assuming there is no phase after END, return null or start over as per game logic
      return null
    default:
      throw new Error('Unknown phase')
  }
}
