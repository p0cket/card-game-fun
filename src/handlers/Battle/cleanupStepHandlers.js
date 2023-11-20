import { EFFECTS } from '../../effects'

export const cleanupStepHandler = (state, details) => {
  let nextState = { ...state }

  // All cleanup triggers are everything that should happen at the end of the turn
  // status changes, status effects, item abilities, etc.
  // enemy first, then player

  const aiCleanupPals = nextState.opponent.monsters[0].obj
  const humanCleanupPals = nextState.userParty.monsters[0].obj
  // for all pals in an obj, apply whatever the status
// lets go through all of the keys of the objects of aiCleanupPals and if the 


  console.log(`cleanupStepHandler: nextState, details`, nextState, details)

  // apply effects
  const allCurrentEffects = []
  for (let i = 0; i < allCurrentEffects.length; i++) {
    switch (allCurrentEffects[i]) {
      case EFFECTS.STUN:
        // check if they should keep the stun
        console.log(
          `stun case met, lets see if they keep the stun or it goes away`,
        )
        return nextState
      case EFFECTS.POISON:
        // add poison effect to enemy.
        return nextState
      case EFFECTS.SLEEP:
        // add sleep effect to enemy.
        return nextState
      case EFFECTS.SHEILD:
        // add sheild effect to enemy.
        return nextState
      case EFFECTS.ENERGIZE:
        // add energize effect to enemy.
        return nextState
      case EFFECTS.AURA:
        // add aura effect to enemy.
        return nextState

      default:
        console.log(`default case for no effects applied`)
        return nextState
    }
  }
  return nextState
}
