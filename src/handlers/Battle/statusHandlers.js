export function handleSleepStatus(character, turnsAsleep) {
  const updatedCharacter = { ...character }

  // Character is asleep and cannot take any actions
  updatedCharacter.status = 'Sleep'

  // Reduce the number of turns the character will be asleep
  updatedCharacter.turnsAsleep = turnsAsleep

  return updatedCharacter
}

// Handle the "Poisoned" status effect
export function handlePoisonStatus(character, damageAmount) {
  const updatedCharacter = { ...character }

  // Apply damage to the character due to poison
  updatedCharacter.health -= damageAmount

  // Check if the character's health has reached 0 or below
  if (updatedCharacter.health <= 0) {
    updatedCharacter.status = 'Fainted' // Update the status if the character faints
  } else {
    updatedCharacter.status = 'Poisoned' // Update the status to "Poisoned"
  }

  return updatedCharacter
}

// Handle the "Burned" status effect
export function handleBurnStatus(character, damageAmount) {
  const updatedCharacter = { ...character }

  // Apply damage to the character due to burn
  updatedCharacter.health -= damageAmount

  // Check if the character's health has reached 0 or below
  if (updatedCharacter.health <= 0) {
    updatedCharacter.status = 'Fainted' // Update the status if the character faints
  } else {
    updatedCharacter.status = 'Burned' // Update the status to "Burned"
  }

  return updatedCharacter
}
