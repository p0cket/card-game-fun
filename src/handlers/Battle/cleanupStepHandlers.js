import { EFFECTS } from '../../effects'

export const cleanupStepHandler = (state, details) => {
  let nextState = { ...state }
  console.log(`cleanupStepHandler: nextState, details`, nextState, details)

  // apply effects
  const allCurrentEffects = []
  for (let i = 0; i < allCurrentEffects.length; i++) {
    switch (allCurrentEffects[i]) {
      case EFFECTS.STUN:
        console.log(
          `stun case met, lets see if they keep the stun or it goes away`,
        )
        return nextState
      case EFFECTS.POISON:
        // add poison effect to enemy.
        return nextState
      default:
        console.log(`default case for no effects applied`)
        return nextState
    }
  }
  return nextState
}
