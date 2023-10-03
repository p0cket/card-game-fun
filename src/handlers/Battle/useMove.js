// import { updateHealth, updateEnergy } from './yourHelperFunctionsFile'; // Import the necessary helper functions
import { updateHealth, updateEnergy } from './battleHandlers_context'


export const useMove = (moveInfo, party, partyIndex, targetIndex) => {
  // Extract move parameters from moveInfo
  const { energyCost, newHealthValue } = moveInfo;

  // Check if the party member has enough energy to perform the move
  if (party[partyIndex].energy >= energyCost) {
    // Deduct the energy cost from the party member
    const updatedParty = updateEnergy(party, partyIndex, party[partyIndex].energy - energyCost);

    // Apply the move's effect on the target party member's health
    const updatedTargetParty = updateHealth(updatedParty, targetIndex, newHealthValue);

    // Return the updated party with energy and health changes
    return updatedTargetParty;
  } else {
    // Not enough energy to perform the move, return the original party
    return party;
  }
};
