// Function to add a monster to the party
export const addMonsterToParty = (monster, userParty) => {
  // Check if the party is not full
  if (userParty.length < 6) {
    // Add the monster to the party
    userParty.push(monster)
    console.log(`Added ${monster.name} to party.`)
    // Update the state or perform any necessary actions
    // For React, you would typically use setState or a state management library like Redux here
    return userParty
  } else {
    // Handle the case where all slots are occupied
    console.error('All party slots are occupied.')
    // You can display an error message to the user or take other actions as needed
  }
}
