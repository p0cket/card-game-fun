// Deprecated
export const addPalToUserParty = (pal, userParty) => {
  // Check if the party is not full
  if (userParty.length < 6) {
    // Add the pal to the party
    userParty.push(pal)
    console.log(`Added ${pal.name} to party.`)
    // Update the state or perform any necessary actions
    // For React, you would typically use setState or a state management library like Redux here
    return userParty
  } else {
    // Handle the case where all slots are occupied
    console.error('All party slots are occupied.')
    // You can display an error message to the user or take other actions as needed
  }
}

//new
export const addPalToPartyFront = (pal, party) => {
  // Check if the party is not full
  if (party.length < 6) {
    // Add the pal to the beginning of the party
    party.unshift(pal)
    console.log(`Added ${pal.name} to party at the beginning.`)
    // Update the state or perform any necessary actions
    // For React, you would typically use setState or a state management library like Redux here
    return party
  } else {
    // Handle the case where all slots are occupied
    console.error('All party slots are occupied.')
    // You can display an error message to the user or take other actions as needed
  }
}
// Add from the other end
export const addPalToParty = (pal, party) => {
  // Check if the party is not full
  if (party.length < 6) {
    // Add the pal to the party
    party.push(pal)
    console.log(`Added ${pal.name} to party.`)
    // Update the state or perform any necessary actions
    // For React, you would typically use setState or a state management library like Redux here
    return party
  } else {
    // Handle the case where all slots are occupied
    console.error('All party slots are occupied.')
    // You can display an error message to the user or take other actions as needed
  }
}
