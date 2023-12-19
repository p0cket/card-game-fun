import { EFFECTS } from '../../effects'

export const cleanupPassivesHandler = (state, pal) => {
   state = {

    ...state,
    // userParty: 
  }
  return state
}

export const applyPalPassive = (pal) => {
  const passive = pal.passive // Assuming each pal has a single `passive` object, not an array
  switch (
    passive.uid // We're using uid instead of id
  ) {
    // case 'mystic-regeneration-uid':
    //   // Apply health regeneration effect
    //   pal.hp += passive.effects.find((effect) => effect.type === 'Regen').amt
    //   break
    // // case 'shadow-camouflage-uid':
    // //   // Apply evasion and stealth effect
    // //   const evasionEffect = passive.effects.find(
    // //     (effect) => effect.type === 'Evasion',
    // //   )
    // //   if (evasionEffect) pal.evasion += evasionEffect.amt
    // //   const stealthEffect = passive.effects.find(
    // //     (effect) => effect.type === 'Stealth',
    // //   )
    // //   if (stealthEffect) pal.stealth += stealthEffect.amt
    // //   break
    // case 'mana-echo-uid':
    //   // Implement mana cost reduction effect
    //   // Logic for the chance to cast a spell without using mana
    //   break
    // case 'critical-insight-uid':
    //   // Apply critical hit chance effect
    //   pal.critChance += passive.effects.find(
    //     (effect) => effect.type === 'Crit Chance',
    //   ).amt
    //   break
    // Add cases for other passives as needed
    default:
      // Handle unknown passiveUid or passives without effects
      break
  }

  return pal
}

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
