// statusHandlers.js
import STATUS from "../constants/status";

const { SLEEP, STUN, PARALYZED, ANGRY, FINE } = STATUS;

/**
 * Apply a status effect to a character.
 *
 * @param {object} character - The character object to apply the status effect to.
 * @param {string} statusType - The type of status effect to apply (e.g., "Sleep", "Stun", "Paralyzed", "Angry").
 * @param {number} turns - The number of turns the status effect will last.
 * @returns {object} - The character object with the applied status effect.
 */
export function applyStatus(character, statusType, turns) {
  const updatedCharacter = { ...character };

  // Apply the specified status effect based on the statusType
  switch (statusType) {
    case SLEEP:
      updatedCharacter.status = SLEEP;
      updatedCharacter.turnsAsleep = turns;
      break;
    case STUN:
      updatedCharacter.status = STUN;
      updatedCharacter.turnsStunned = turns;
      break;
    case PARALYZED:
      updatedCharacter.status = PARALYZED;
      updatedCharacter.turnsParalyzed = turns;
      break;
    case ANGRY:
      updatedCharacter.status = ANGRY;
      updatedCharacter.turnsAngry = turns;
      break;
    default:
      break;
  }

  return updatedCharacter;
}
