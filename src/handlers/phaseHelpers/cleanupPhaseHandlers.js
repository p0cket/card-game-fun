import { PASSIVE_TYPES } from '../../consts/keywords/passives'
import { EFFECTS } from '../../effects'
import { healHumanPal, healPal } from '../state/healthStateHandlers'
import {
  updateHumanPartyWithPal,
  updateHumanStateWithParty,
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
  if (
    !pal.passives ||
    !pal.passives.effects ||
    pal.passives.effects.length === 0
  ) {
    console.log(`No passives to apply for pal at index ${palIndex}`)
    return pal
  }

  console.log(
    `pal, pal.passives.effects`,
    pal,
    pal.passives,
    pal.passives.effects,
  )

  const { effects } = pal.passives
  const currentEffect = effects[0]

  switch (currentEffect.type) {
    case PASSIVE_TYPES.REGEN:
      console.log(`applyHumanPalPassive: pal, palIndex`, pal, palIndex)
      pal = healPal(pal, currentEffect.amt)
      console.log(`applyHumanPalPassive returning: pal`, pal)
      return pal
    default:
      console.log(`Unknown passive type: ${currentEffect.type}`)
      break
  }

  return pal
}

export const applyOpponentPalPassive = (pal, palIndex) => {}

export const applyStatusAtCleanup = (state) => {
  console.log(
    '[applyStatusAtCleanup] Checking for statuses to apply in cleanup phase.',
  )

  // Process user party
  console.log('[applyStatusAtCleanup] Processing userParty for status effects.')
  state.userParty.forEach((pal, index) => {
    console.log(
      `[applyStatusAtCleanup] Processing ${pal.name} at userParty index ${index}.`,
    )
    state.userParty[index] = applyPoisonDamage(pal)
  })

  // Process opponent monsters
  console.log(
    '[applyStatusAtCleanup] Processing opponent.monsters for status effects.',
  )
  state.opponent.monsters.forEach((monster, index) => {
    console.log(
      `[applyStatusAtCleanup] Processing ${monster.name} at opponent.monsters index ${index}.`,
    )
    state.opponent.monsters[index] = applyPoisonDamage(monster)
  })

  console.log(
    '[applyStatusAtCleanup] Status application completed for all characters.',
  )
  return state
}

export function applyPoisonDamage(pal) {
  // Log the initial status of the character to see if poison is applicable
  console.log(`[applyPoisonDamage] Initial status for ${pal.name}:`, pal.status)

  // Check if poison status is present and active
  if (pal.status?.poison?.active) {
    const poisonDamage = pal.status.poison.amt
    console.log(
      `[applyPoisonDamage] Applying ${poisonDamage} poison damage to ${pal.name}. Current HP: ${pal.stats.hp}`,
    )

    // Apply poison damage and prevent HP from going negative
    pal.stats.hp = Math.max(0, pal.stats.hp - poisonDamage)
    console.log(
      `[applyPoisonDamage] New HP for ${pal.name} after poison: ${pal.stats.hp}`,
    )
  } else {
    console.log(`[applyPoisonDamage] No active poison status for ${pal.name}.`)
  }

  return pal
}

export function checkForCleanup(state) {
  const hasActiveStatus =
    state.userParty.some((pal) => hasActiveStatusEffect(pal)) ||
    state.opponent.monsters.some((monster) => hasActiveStatusEffect(monster))

  const hasActivePassives =
    state.userParty.some((pal) => hasActivePassiveEffect(pal)) ||
    state.opponent.monsters.some((monster) => hasActivePassiveEffect(monster))

  return hasActiveStatus || hasActivePassives
}

function hasActiveStatusEffect(entity) {
  // This function checks if the entity (either player or AI) has any active status effects
  return (
    entity.status &&
    Object.values(entity.status).some((effect) => effect.active)
  )
}

function hasActivePassiveEffect(entity) {
  // This function checks if the entity has any passives that should trigger during cleanup
  return (
    entity.passives &&
    entity.passives.effects &&
    entity.passives.effects.length > 0
  )
}
// export function applyPoisonDamage(pal) {
//   if (pal.status && pal.status.poison && pal.status.poison.active) {
//     const poisonDamage = pal.status.poison.amt
//     pal.hp = Math.max(0, pal.hp - poisonDamage) // Prevent hp from going negative
//     console.log(`Applying poison damage of ${poisonDamage} to ${pal.name}`)
//   }
//   return pal
// }
// export function applyPoisonDamage(pal) {
//   // Log the initial status of the character to see if poison is applicable
//   console.log(`[applyPoisonDamage] Initial status for ${pal.name}:`, pal.status)

//   // Check if poison status is present and active
//   if (pal.status?.poison?.active) {
//     const poisonDamage = pal.status.poison.amt
//     console.log(
//       `[applyPoisonDamage] Applying ${poisonDamage} poison damage to ${pal.name}. Current HP: ${pal.hp}`,
//     )

//     // Apply poison damage and prevent HP from going negative
//     pal.hp = Math.max(0, pal.hp - poisonDamage)
//     console.log(
//       `[applyPoisonDamage] New HP for ${pal.name} after poison: ${pal.hp}`,
//     )
//   } else {
//     console.log(`[applyPoisonDamage] No active poison status for ${pal.name}.`)
//   }

//   return pal
// }
// export const applyStatusAtCleanup = (state) => {
//   // switch()
//   // case EFFECTS.POISON:
//   // check for poison. if poison, damage.
//   // go through the entire party and apply poison damage.
//   // if (state.userParty[0].status && state.userParty[0].status.poison) {
//   //   const poisonDamage = state.userParty[0].status.poison.amt
//   //   state.userParty[0].hp -= poisonDamage
//   //   console.log(`Applying poison damage of ${poisonDamage}`)
//   // }
//   console.log(`applyStatusAtCleanup: checking for poison state`, state)
//   // Note: This forEach loop is expected to modify each 'pal' in the 'userParty' array by applying poison damage.
//   // However, since we are assigning the result of 'applyPoisonDamage' back to 'pal',
//   // which is a local variable in the forEach callback,
//   // this does not directly modify the original array elements.
//   // To ensure the 'userParty' array elements are updated,
//   console.log(`applyStatusAtCleanup: Starting status application for userParty`)
//   state.userParty.forEach((pal, index) => {
//     console.log(
//       `applyStatusAtCleanup: Applying status to userParty member at index ${index}`,
//       pal,
//     )
//     state.userParty[index] = applyPoisonDamage(pal)
//     console.log(
//       `applyStatusAtCleanup: Updated userParty member at index ${index}`,
//       state.userParty[index],
//     )
//   })

//   console.log(
//     `applyStatusAtCleanup: Starting status application for opponent.monsters`,
//   )
//   state.opponent.monsters.forEach((monster, index) => {
//     console.log(
//       `applyStatusAtCleanup: Applying status to opponent's monster at index ${index}`,
//       monster,
//     )
//     state.opponent.monsters[index] = applyPoisonDamage(monster)
//     console.log(
//       `applyStatusAtCleanup: Updated opponent's monster at index ${index}`,
//       state.opponent.monsters[index],
//     )
//   })
//   // we should directly modify the elements within the 'applyPoisonDamage' function.
//   state.userParty.forEach((pal, index) => {
//     state.userParty[index] = applyPoisonDamage(pal)
//   })

//   // Apply poison damage to the opponent party
//   state.opponent.monsters.forEach((monster, index) => {
//     state.opponent.monsters[index] = applyPoisonDamage(monster)
//   })

//   return state
//   // state.userParty.forEach((pal) => {
//   //   if (pal.status && pal.status.poison && pal.status.poison.active) {
//   //     const poisonDamage = pal.status.poison.amt
//   //     pal.hp = Math.max(0, pal.hp - poisonDamage) // Prevent hp from going negative
//   //     console.log(`Applying poison damage of ${poisonDamage} to ${pal.name}`)
//   //   }
//   // })
// }
