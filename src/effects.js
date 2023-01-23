export const EFFECTS = {
  DOUBLEDAMAGE: "doubledamage",
  STUN: "stun",
  DRAW: "draw",
  SLEEP: "sleep",
  POISON: "poison",
  // Applies damage every turn, stacks with additional poison attacks
  HEALING: "healing",
  // Heal a player for amt
  SHEILD: "sheild",
  // Apply temporary effect that takes away some damage player will recieve
  ARMOR: "armor",
  // Apply Battle-long effect that takes away some damage player will recieve
  EVADE: "evade",
  // Apply percentage chance that player does not receive damage
  WEAKENED: "weakened",
  // Apply a amt of damage that is weakens the enemy
  STACKING: "stacking",
  // For each card used this turn, add more damage this card will apply
  VAMPIRIC: "vampiric",
  // Heal player for the amt of dmg the attack does
  ENERGIZE: "energize",
  // Gain more energy
  AURA: "aura"
  // If this card is in hand, apply effect on it to other cards in hand
}
