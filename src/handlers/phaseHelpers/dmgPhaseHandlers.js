import { PASSIVE_TYPES } from '../../consts/keywords/passives'
import { healPal } from '../state/healthStateHandlers'
import {
  updateHumanPartyWithPal,
  updateHumanStateWithParty,
} from '../state/partyStateHandlers'

export const dmgEffectsHandler = (state, pal, palIndex) => {
  // Add opponent passives too
  // update the pal object, add it to the party,
  // then update the state with it
  const updatedHumanPal = applyPalDmgPassive(state.userParty[0], 0)
  const updatedParty = updateHumanPartyWithPal(state, updatedHumanPal, 0)
  state = updateHumanStateWithParty(state, updatedParty, 0)
  console.log(`cleanupAbilitiesHandler returning: state`, state)
  return state
}

export const applyPalDmgPassive = (pal, palIndex) => {
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
    case PASSIVE_TYPES.CRIT_CHANCE:
      console.log(`applyHumanPalPassive: pal, palIndex`, pal, palIndex)

      // pal = healPal(pal, currentEffect.amt)
      console.log(`applyHumanPalPassive returning: pal`, pal)
      return pal
    default:
      // Handle unknown passiveUid or passives without effects
      break
  }
  return pal
}

export const dmgStatusesHandler = (state, pal, palIndex) => {
  // const pal = state.userParty[0]
  // grab the current pal

  // Iterate over each status effect on the pal and apply its effect
  for (const statusEffect in pal.status) {
    switch (statusEffect) {
      case 'test':
        // Handle 'test' status effect
        console.log('Handling test status effect.')
        break
      case 'poison':
        // Handle 'poison' status effect
        console.log('Handling poison status effect.')
        break
      case 'dodge':
        // Handle 'dodge' status effect
        console.log('Handling dodge status effect.')
        break
      case 'critChance':
        // Handle 'critChance' status effect
        console.log('Handling crit chance status effect.')
        break
      // Add cases for other status effects here
      default:
        console.log(`Unknown status effect: ${statusEffect}`)
        break
    }
  }
}
