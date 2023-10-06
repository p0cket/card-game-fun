/**
 * @typedef {object} PassiveAbility
 * @property {string} description - A detailed description of the passive ability.
 * @property {string} type - The type of passive ability (e.g., "Defensive", "Offensive", "Utility").
 * @property {Function} [effect] - A function defining the specific effect of the passive ability.
 */

/**
 * Passive abilities for the React RPG game with Pokémon and Magic: The Gathering mechanics.
 * @type {Object<string, PassiveAbility>}
 */
const passiveAbilities = {
    // Defensive Abilities
    Armor: {
      description: "Reduces incoming damage by a fixed amount. Provides additional protection against physical attacks.",
      type: "Defensive",
      effect: (character) => {
        // Define the armor effect here
      },
    },
    Regeneration: {
      description: "Gradually restores health over time, allowing the character to recover from wounds.",
      type: "Defensive",
      effect: (character) => {
        // Define the regeneration effect here
      },
    },
    Evasion: {
      description: "Has a chance to evade incoming attacks or spells, making the character harder to hit.",
      type: "Defensive",
      effect: (character) => {
        // Define the evasion effect here
      },
    },
    Counterattack: {
      description: "Automatically counterattacks when hit by a melee attack, dealing damage to the attacker.",
      type: "Defensive",
      effect: (character, attacker) => {
        // Define the counterattack effect here
      },
    },
  
    // Offensive Abilities
    CriticalStrike: {
      description: "Has a chance to deal extra damage on successful hits. Critical hits can turn the tide of battle.",
      type: "Offensive",
      effect: (character) => {
        // Define the critical strike effect here
      },
    },
    Piercing: {
      description: "Ignores a portion of the target's armor or defenses, making attacks more effective.",
      type: "Offensive",
      effect: (character) => {
        // Define the piercing effect here
      },
    },
    Poisonous: {
      description: "Applies poison to the target, dealing damage over time. Poison weakens and wears down foes.",
      type: "Offensive",
      effect: (target) => {
        // Define the poisonous effect here
      },
    },
    Lifesteal: {
      description: "Steals a percentage of damage dealt as health, allowing the character to sustain themselves in battle.",
      type: "Offensive",
      effect: (character, damageDealt) => {
        // Define the lifesteal effect here
      },
    },
  
    // Utility Abilities
    Camouflage: {
      description: "Can hide and become untargetable for a short duration, granting invisibility.",
      type: "Utility",
      effect: (character) => {
        // Define the camouflage effect here
      },
    },
    Tracking: {
      description: "Can detect hidden or invisible creatures or objects, revealing concealed threats.",
      type: "Utility",
      effect: (character) => {
        // Define the tracking effect here
      },
    },
    Teleportation: {
      description: "Can instantly move to a target location on the battlefield, gaining tactical advantage.",
      type: "Utility",
      effect: (character, targetLocation) => {
        // Define the teleportation effect here
      },
    },
    Aura: {
      description: "Emits a beneficial aura that grants nearby allies a bonus, enhancing their abilities and attributes.",
      type: "Utility",
      effect: (character, allies) => {
        // Define the aura effect here
      },
    },
  };
  
  //  undying like kenny
  export default passiveAbilities;
  