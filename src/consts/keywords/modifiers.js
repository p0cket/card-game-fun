// Lifelink: {
//   description: "When this creature deals damage, you gain that much life.",
//   type: "Creature",
//   effect: (creature) => {
//     // Define the lifelink effect here
//   },
//   cost: {
//     mana: 0, // Example: Requires no mana
//     health: 0, // Example: Requires no health sacrifice
//   },
//   stackable: true, // Can stack with multiple instances
// },

//
// General Modifiers

// dodge 20% , 

export const Armor = {
  description: 'Provides additional protection against incoming damage.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the armor effect here
    // "target" represents the affected creature or player
    // "source" represents the source of the modifier (if applicable)
  },
  stackable: true, // Can stack with multiple instances
  targets: 'self', // You can specify "self," "creature," "player," or other relevant targets
  duration: 0, // Set to 0 for modifiers that have a permanent effect
}

export const Heal = {
  description: 'Restores health to a target creature or player.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the heal effect here
  },
  stackable: true, // Can stack with multiple instances
  targets: 'creature', // You can specify "self," "creature," "player," or other relevant targets
  duration: 0, // Set to 0 for modifiers that have a permanent effect
}

export const Revive = {
  description: 'Can revive a creature from the graveyard to the battlefield.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the revive effect here
  },
  stackable: false, // Cannot stack with multiple instances
  targets: 'creature', // You can specify "self," "creature," "player," or other relevant targets
  duration: 0, // Set to 0 for modifiers that have a permanent effect
}

export const Shock = {
  description:
    'Deals electrical damage to a target, stunning and disrupting it.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the shock effect here
  },
  stackable: false, // Cannot stack with multiple instances
  targets: 'creature', // You can specify "self," "creature," "player," or other relevant targets
  duration: 0, // Set to 0 for modifiers that have a permanent effect
}

// Additional JRPG Modifiers
export const Reflect = {
  description:
    'Reflects a percentage of incoming damage or spells back to the attacker.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the reflect effect here
  },
  stackable: false,
  targets: 'self',
  duration: 0,
  reflectPercentage: 25, // The percentage of damage/spells reflected
}

export const Berserk = {
  description:
    "Increases the character's attack power but reduces their ability to defend or use abilities strategically.",
  type: 'Modifier',
  effect: (target, source) => {
    // Define the berserk effect here
  },
  stackable: false,
  targets: 'self',
  duration: 3, // Lasts for 3 turns
  attackBoost: 50, // Percentage increase in attack power
  defenseReduction: 30, // Percentage reduction in defense
}

export const Stealth = {
  description:
    'Makes the character invisible and harder to detect by enemies, allowing for surprise attacks or avoiding combat.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the stealth effect here
  },
  stackable: false,
  targets: 'self',
  duration: 0, // Until detected or action taken
  detectionDifficulty: 75, // The difficulty level for enemies to detect the character
}

// More modifiers...
export const Stun = {
  description:
    'Stuns the target for a duration, preventing them from taking actions during that time.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the stun effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 2, // Stunned for 2 turns
}

export const Fear = {
  description:
    'Inflicts fear on the target, causing them to flee from battle or act unpredictably.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the fear effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 3, // Fear lasts for 3 turns
}

export const CounterAttack = {
  description:
    'Allows the character to automatically counter-attack when struck by an enemy.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the counter-attack effect here
  },
  stackable: false,
  targets: 'self',
  duration: 0, // Permanent effect
}

export const ManaLeech = {
  description:
    "Drains a percentage of the target's mana and adds it to the character's mana pool.",
  type: 'Modifier',
  effect: (target, source) => {
    // Define the mana leech effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 0, // Permanent effect
  leechPercentage: 20, // Percentage of target's mana leeched
}

export const Evasion = {
  description: "Increases the character's chance to dodge or evade attacks.",
  type: 'Modifier',
  effect: (target, source) => {
    // Define the evasion effect here
  },
  stackable: false,
  targets: 'self',
  duration: 0, // Permanent effect
  evasionBoost: 15, // Percentage increase in evasion chance
}

export const Petrify = {
  description:
    'Transforms the target into stone, rendering them immobile for a duration.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the petrify effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 3, // Petrified for 3 turns
}

export const Regeneration = {
  description: "Gradually restores the character's health over time.",
  type: 'Modifier',
  effect: (target, source) => {
    // Define the regeneration effect here
  },
  stackable: false,
  targets: 'self',
  duration: 5, // Regenerates for 5 turns
  regenerationRate: 10, // Amount of health regenerated per turn
}

export const Confusion = {
  description:
    'Causes the target to randomly target allies or enemies, creating chaos in battle.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the confusion effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 3, // Confused for 3 turns
}

export const Blessing = {
  description:
    "Provides a temporary buff to the character's abilities or attributes.",
  type: 'Modifier',
  effect: (target, source) => {
    // Define the blessing effect here
  },
  stackable: false,
  targets: 'self',
  duration: 4, // Blessing lasts for 4 turns
  attributeBoost: {
    strength: 10, // Boost to strength attribute
    agility: 5, // Boost to agility attribute
  },
}

export const Cursed = {
  description:
    'Imposes a negative effect on the target, making them vulnerable to additional damage or debuffs.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the curse effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 3, // Cursed for 3 turns
  additionalDamage: 15, // Additional damage received while cursed
}

export const Silence = {
  description: 'Prevents the target from using abilities or spells.',
  type: 'Modifier',
  effect: (target, source) => {
    // Define the silence effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 2, // Silenced for 2 turns
}

export const Slow = {
  description: "Reduces the target's speed and makes them act less frequently.",
  type: 'Modifier',
  effect: (target, source) => {
    // Define the slow effect here
  },
  stackable: false,
  targets: 'creature',
  duration: 4, // Slowed for 4 turns
  speedReduction: 30, // Percentage reduction in speed
}

// More modifiers...
