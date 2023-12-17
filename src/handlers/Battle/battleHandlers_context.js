import { useState } from 'react'

/**
 * Update the health of a party member (character or monster).
 *
 * @param {Array} party - The array representing the party (e.g., playerParty or enemyParty).
 * @param {number} partyIndex - The index of the party member to update.
 * @param {number} health - The new health value.
 * @returns {Array} - A copy of the party with the health updated for the specified member.
 */
// function updateHealth(party, partyIndex, health) {
//   const updatedParty = [...party];
//   updatedParty[partyIndex].health = health;
//   return updatedParty;
// }
export const updateHealth = (party, partyIndex, changeAmt) => {
  const updatedParty = [...party]
  updatedParty[partyIndex].health += changeAmt
  return updatedParty
}

/**
 * Update the energy of a party member (character or monster).
 *
 * @param {Array} party - The array representing the party (e.g., playerParty or enemyParty).
 * @param {number} partyIndex - The index of the party member to update.
 * @param {number} energy - The new energy value.
 * @returns {Array} - A copy of the party with the energy updated for the specified member.
 */
function updateEnergy(party, partyIndex, energy) {
  const updatedParty = [...party]
  updatedParty[partyIndex].energy = energy
  return updatedParty
}

/**
 * Update the status of a party member (character or monster).
 *
 * @param {Array} party - The array representing the party (e.g., playerParty or enemyParty).
 * @param {number} partyIndex - The index of the party member to update.
 * @param {string} status - The new status value.
 * @returns {Array} - A copy of the party with the status updated for the specified member.
 */
function updateStatus(party, partyIndex, status) {
  const updatedParty = [...party]
  updatedParty[partyIndex].status = status
  return updatedParty
}

/**
 * Inflict a status effect on a party member (character or monster).
 *
 * @param {Array} party - The array representing the party (e.g., playerParty or enemyParty).
 * @param {number} partyIndex - The index of the party member to update.
 * @param {string} effectType - The type of status effect to inflict.
 * @returns {Array} - A copy of the party with the status effect applied to the specified member.
 */
function inflictStatusEffect(party, partyIndex, effectType) {
  const updatedParty = [...party]

  // Check if the effectType matches a weakness or resistance
  if (effectType === updatedParty[partyIndex].flaws.weak) {
    // Apply the effect based on the weakness
    // Example: Reduce health for a poison weakness
    updatedParty[partyIndex].health -= 10
  } else if (effectType === updatedParty[partyIndex].flaws.resist) {
    // Apply the effect based on the resistance
    // Example: Reduce energy for a fire resistance
    updatedParty[partyIndex].energy -= 2
  }

  return updatedParty
}
