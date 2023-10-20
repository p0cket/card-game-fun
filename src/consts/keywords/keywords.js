/**
 * @typedef {object} Keyword
 * @property {string} description - A brief description of the keyword.
 * @property {string} type - The type of keyword (e.g., "Creature", "Spell", "Element", "Status").
 * @property {Function} [effect] - A function defining the specific effect of the keyword when activated.
 * @property {object} [cost] - The cost associated with activating the keyword.
 * @property {number} cost.mana - The amount of mana required to activate the keyword.
 * @property {number} cost.health - The amount of health sacrifice required to activate the keyword.
 * @property {boolean} stackable - Indicates whether the keyword can stack with multiple instances.
 * @property {number} [duration] - The duration of the keyword's effect (for status keywords).
 */

/**
 * Keywords for the React RPG game.
 * @type {Object<string, Keyword>}
 */
export const keywords = {
  // Creature Keywords
  Flying: {
    description: "This creature can fly over obstacles and other creatures.",
    type: "Creature",
    effect: (creature) => {
      // Define the flying effect here
    },
    cost: {
      mana: 2, // Example: Requires 2 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Trample: {
    description:
      "When this creature attacks, it can deal excess damage to the opponent.",
    type: "Creature",
    effect: (creature) => {
      // Define the trample effect here
    },
    cost: {
      mana: 3, // Example: Requires 3 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Lifelink: {
    description: "When this creature deals damage, you gain that much life.",
    type: "Creature",
    effect: (creature) => {
      // Define the lifelink effect here
    },
    cost: {
      mana: 0, // Example: Requires no mana
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: true, // Can stack with multiple instances
  },
  // Other creature keywords...

  // Spell Keywords
  Instantanteous: {
    description: "Can be cast at any time, even during your opponent's turn.",
    type: "Spell",
    cost: {
      mana: 2, // Example: Requires 2 mana to cast
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: true, // Can stack with multiple instances
  },
  SlowSpell: {
    description: "Can only be cast during your main phase.",
    type: "Spell",
    cost: {
      mana: 3, // Example: Requires 3 mana to cast
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: true, // Can stack with multiple instances
  },
  // Other spell keywords...

  // Elemental Keywords
  Fire: {
    description: "Deals fire damage and can ignite targets.",
    type: "Element",
    cost: {
      mana: 1, // Example: Requires 1 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Water: {
    description:
      "Associated with water, often used for healing and protection.",
    type: "Element",
    cost: {
      mana: 2, // Example: Requires 2 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  // Other elemental keywords...

  // Status Keywords
  Poisoned: {
    description: "A poisoned creature takes damage over time.",
    type: "Status",
    duration: 3, // Example: Lasts for 3 turns
  },
  Paralyzed: {
    description:
      "A paralyzed creature may skip its turn or have reduced actions.",
    type: "Status",
    duration: 2, // Example: Lasts for 2 turns
  },
  // Other status keywords...

  // Creature Keywords
  Deathtouch: {
    description:
      "Any amount of damage this creature deals to a creature is enough to destroy it.",
    type: "Creature",
    effect: (creature) => {
      // Define the deathtouch effect here
    },
    cost: {
      mana: 0, // Example: Requires no mana
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Hexproof: {
    description:
      "This creature cannot be the target of your opponent's spells or abilities.",
    type: "Creature",
    effect: (creature) => {
      // Define the hexproof effect here
    },
    cost: {
      mana: 0, // Example: Requires no mana
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Haste: {
    description:
      "This creature can attack or use abilities the turn it enters the battlefield.",
    type: "Creature",
    effect: (creature) => {
      // Define the haste effect here
    },
    cost: {
      mana: 0, // Example: Requires no mana
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Menace: {
    description:
      "This creature can't be blocked except by two or more creatures.",
    type: "Creature",
    effect: (creature) => {
      // Define the menace effect here
    },
    cost: {
      mana: 0, // Example: Requires no mana
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },

  // Spell Keywords
  Counter: {
    description: "Can be used to counter an opponent's spell or ability.",
    type: "Spell",
    effect: (spell) => {
      // Define the counter effect here
    },
    cost: {
      mana: 2, // Example: Requires 2 mana to cast
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: true, // Can stack with multiple instances
  },
  Burn: {
    description: "Deals direct damage to a target creature or player.",
    type: "Spell",
    effect: (spell) => {
      // Define the burn effect here
    },
    cost: {
      mana: 1, // Example: Requires 1 mana to cast
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: true, // Can stack with multiple instances
  },
  Heal: {
    description: "Restores health to a target creature or player.",
    type: "Spell",
    effect: (spell) => {
      // Define the heal effect here
    },
    cost: {
      mana: 2, // Example: Requires 2 mana to cast
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: true, // Can stack with multiple instances
  },

  // Elemental Keywords
  Ice: {
    description: "Freezes targets, reducing their movement and actions.",
    type: "Element",
    effect: (element) => {
      // Define the ice effect here
    },
    cost: {
      mana: 1, // Example: Requires 1 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Shadow: {
    description: "Dark and mysterious magic that can weaken or curse enemies.",
    type: "Element",
    effect: (element) => {
      // Define the shadow effect here
    },
    cost: {
      mana: 2, // Example: Requires 2 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },

  // Status Keywords
  Regenerate: {
    description: "Allows a creature to heal and recover from damage over time.",
    type: "Status",
    effect: (status) => {
      // Define the regenerate effect here
    },
    cost: {
      mana: 0, // Example: Requires no mana
      health: 1, // Example: Requires 1 health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
  Invisible: {
    description:
      "Makes a creature or player invisible, making them immune to attacks.",
    type: "Status",
    effect: (status) => {
      // Define the invisible effect here
    },
    cost: {
      mana: 3, // Example: Requires 3 mana to activate
      health: 0, // Example: Requires no health sacrifice
    },
    stackable: false, // Cannot stack with multiple instances
  },
};


//  reanimate

export default keywords;
