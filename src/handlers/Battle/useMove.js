/**
 * Perform a move in a battle.
 *
 * @param {Object} moveInfo - Information about the move to be performed.
 * @param {Object} user - The user's party member performing the move.
 * @param {Object} target - The opponent's party member being targeted.
 * @returns {Object} An object containing the updated user and target parties after performing the move.
 */
export const useMove = (moveInfo, user, target) => {
  // Extract move parameters from moveInfo
  const { energyCost, newHealthValue } = moveInfo

  // Check if the user's party member has enough energy to perform the move
  if (user.energy >= energyCost) {
    // Deduct the energy cost from the user
    user.energy -= energyCost

    // Apply the move's effect on the target's health
    target.health = Math.max(0, target.health - newHealthValue)

    // Return an object containing the updated user and target parties
    return {
      user,
      target,
    }
  } else {
    // Not enough energy to perform the move, return the original user and target
    return {
      user,
      target,
    }
  }
}
