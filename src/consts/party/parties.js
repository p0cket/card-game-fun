/**
 * Enum representing named slots in a party.
 * @readonly
 * @enum {string}
 */
export const Party = {
  SLOT_1: 'Slot 1',
  SLOT_2: 'Slot 2',
  SLOT_3: 'Slot 3',
  SLOT_4: 'Slot 4',
  SLOT_5: 'Slot 5',
  SLOT_6: 'Slot 6',
}

/**
 * Represents the user's party with named slots.
 * @type {Object.<string, (null|any)>}
 */
export const userParty = {
  [Party.SLOT_1]: null, // Initially empty slot
  [Party.SLOT_2]: null,
  [Party.SLOT_3]: null,
  [Party.SLOT_4]: null,
  [Party.SLOT_5]: null,
  [Party.SLOT_6]: null,
}

/**
 * Represents the opponent's party with named slots.
 * @type {Object.<string, (null|any)>}
 */
export const opponent = {
  [Party.SLOT_1]: null, // Initially empty slot
  [Party.SLOT_2]: null,
  [Party.SLOT_3]: null,
  [Party.SLOT_4]: null,
  [Party.SLOT_5]: null,
  [Party.SLOT_6]: null,
}

/**
 * Adds a party member to a specified slot.
 * @param {Object.<string, (null|any)>} party - The party object.
 * @param {string} slotName - The name of the slot to add the member to.
 * @param {any} member - The party member to add to the slot.
 */
export const addPartyMemberToSlot = (party, slotName, member) => {
  if (party.hasOwnProperty(slotName)) {
    party[slotName] = member
  }
}

//   const userPartyMember = {
//     name: "Player1Monster",
//     level: 10,
// Other properties of the party member...
//   };
// Example usage:
//   addPartyMemberToSlot(userParty, Party.SLOT_1, userPartyMember); // Add a member to Slot 1
