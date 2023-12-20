import { EFFECTS } from '../../effects'

// applyPalPassive here, cleanupPhase's changing of state by running it through
// Here is some code to reference. We should make something
// that grabs the member from the party.
// then pass it through updating the party

// export const healAIPal = (state, healAmount) => {
//   console.log('healAIPal:', state, 'healAmount:', healAmount)

//   let resultState = {
//     ...state,
//     opponent: {
//       ...state.opponent,
//       monsters: state.opponent.monsters.map((monster, index) =>
//         index === 0
//           ? {
//               ...monster,
//               obj: {
//                 ...monster.obj,
//                 stats: {
//                   ...monster.obj.stats,
//                   hp: monster.obj.stats.hp + healAmount, // Increase HP by healAmount
//                 },
//               },
//             }
//           : monster,
//       ),
//     },
//   }
// -----
// // and here is the other one:
// export const addMoveToPalInState = (state, move, palIndex) => {
//   console.log(`add moveToPalInState: state, move, palIndex`, state, move, palIndex)
//   // add move to pal
//   const updatedPalWithNewMove = addMoveToPal(state.userParty[palIndex], move)
//   // add pal (update) to state in correct location
//   const updatedPartyWithPal = updatePartyWithPal(state, updatedPalWithNewMove, palIndex)
//   state = {
//     ...state,
//     userParty: updatedPartyWithPal,
//   }
//   return state
// }

// export const addMoveToPal = (pal, move) => {
//   console.log(`addMoveToPal: pal, move`, pal, move)
//   // #TODO: add move to pal
//   const palWithNewMove = {
//     ...pal,
//     moves: [...pal.moves, move],
//   }
//   console.log(`addMoveToPal: palWithNewMove`, palWithNewMove)
//   return palWithNewMove
// }
// export const updatePartyWithPal = (state, pal, palIndex) => {
//   console.log(`updatePartyWithPal: state,pal, palIndex`, state, pal, palIndex)
//   const updatedParty = [...state.userParty]
//   updatedParty[palIndex] = pal
//   console.log(`updatePartyWithPal: updatedParty`, updatedParty)
//   return updatedParty
// }
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
