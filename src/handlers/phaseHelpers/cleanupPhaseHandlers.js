import { PASSIVE_TYPES } from '../../consts/keywords/passives'
import { EFFECTS } from '../../effects'
import { healHumanPal, healPal } from '../state/healthStateHandlers'
import {
  updateHumanPartyWithPal,
  updateHumanStateWithParty,
  updateOpponentPartyWithPal,
} from '../state/partyStateHandlers'

// applyPalPassive here, cleanupPhase's changing of state by running it through
// Here is some code to reference. We should make something
// that grabs the member from the party.
// then pass it through updating the party

export const cleanupAbilitiesHandler = (state) => {
  // Add opponent passives too
  // update the pal object, add it to the party, 
  // then update the state with it
  const updatedHumanPal = applyPalPassive(state.userParty[0], 0)
  const updatedParty = updateHumanPartyWithPal(state, updatedHumanPal, 0)
  state = updateHumanStateWithParty(state, updatedParty, 0)
  console.log(`cleanupAbilitiesHandler returning: state`, state)
  return state
}

export const applyPalPassive = (pal, palIndex) => {
  console.log(
    `pal, pal.passives.effects`,
    pal,
    pal.passives,
    pal.passives.effects,
  )
  const { passives } = pal // Assuming each pal has a single `passive` object, not an array
  const { effects } = passives
  const currentEffect = effects[0]
  switch (currentEffect.type) {
    case PASSIVE_TYPES.REGEN:
      console.log(`applyHumanPalPassive: pal, palIndex`, pal, palIndex)
      pal = healPal(pal, currentEffect.amt)
      console.log(`applyHumanPalPassive returning: pal`, pal)
      return pal
    default:
      // Handle unknown passiveUid or passives without effects
      break
  }
  return pal
}

export const applyOpponentPalPassive = (pal, palIndex) => {}

// export const cleanupStepHandler = (state, details) => {
//   let nextState = { ...state }

//   // All cleanup triggers are everything that should happen at the end of the turn
//   // status changes, status effects, item abilities, etc.
//   // enemy first, then player

//   const aiCleanupPals = nextState.opponent.monsters[0]
//   const humanCleanupPals = nextState.userParty.monsters[0]
//   // for all pals in an obj, apply whatever the status
//   // lets go through all of the keys of the objects of aiCleanupPals and if the

//   console.log(`cleanupStepHandler: nextState, details`, nextState, details)

//   // apply effects
//   const allCurrentEffects = []
//   for (let i = 0; i < allCurrentEffects.length; i++) {
//     switch (allCurrentEffects[i]) {
//       case EFFECTS.STUN:
//         // check if they should keep the stun
//         console.log(
//           `stun case met, lets see if they keep the stun or it goes away`,
//         )
//         return nextState
//       case EFFECTS.POISON:
//         // add poison effect to enemy.
//         return nextState
//       case EFFECTS.SLEEP:
//         // add sleep effect to enemy.
//         return nextState
//       case EFFECTS.SHEILD:
//         // add sheild effect to enemy.
//         return nextState
//       case EFFECTS.ENERGIZE:
//         // add energize effect to enemy.
//         return nextState
//       case EFFECTS.AURA:
//         // add aura effect to enemy.
//         return nextState

//       default:
//         console.log(`default case for no effects applied`)
//         return nextState
//     }
//   }
//   return nextState
// }

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
