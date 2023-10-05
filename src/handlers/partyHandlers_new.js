// Function to add a monster to the party
export const addMonsterToParty = (monster, userParty, slot) => {
  // If slot is not specified, find the next available slot
  if (!slot) {
    for (const [partySlot, partyMonster] of Object.entries(userParty)) {
      if (partyMonster === null) {
        // Add the monster to the first available slot
        userParty[partySlot] = monster;
        console.log(`Added ${monster.name} to party slot ${partySlot}.`);
        // Update the state or perform any necessary actions
        // For React, you would typically use setState or a state management library like Redux here
        return userParty;

        
        // return;
         // Exit the loop once a slot is found
      }
    }

    // Handle the case where all slots are occupied
    console.error("All party slots are occupied.");
    // You can display an error message to the user or take other actions as needed
  } else {
    // Check if the slot is valid and not already occupied
    if (userParty[slot] === null) {
      // Add the monster to the specified slot
      userParty[slot] = monster;

      return userParty;
      // Update the state or perform any necessary actions
      // For React, you would typically use setState or a state management library like Redux here
    } else {
      // Handle the case where the slot is already occupied
      console.error(`Slot ${slot} is already occupied.`);
      // You can display an error message to the user or take other actions as needed
    }
  }
};
