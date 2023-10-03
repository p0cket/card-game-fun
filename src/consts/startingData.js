import { startingDeck } from "./consts";
import { EFFECTS } from "../effects";
const { DRAW, STUN, DOUBLEDAMAGE, SLEEP, POISON } = EFFECTS;

// export const newStartingData = {
//   // Party system for the player and enemy
//   playerParty: [
//     {
//       name: "Monster 1",
//       health: 100,
//       maxHP: 100,
//       energy: 5,
//       status: "Fine",
//       attacks: [
//         {
//           name: "Basic Attack",
//           type: "physical",
//           damage: 20,
//           speed: 7,
//           fuel: 2,
//           effect: { Desc: "chance to paralyze", chance: "50%", result: "stun" },
//           chance: 50,
//           descripition,
//         },
//         // Add more attacks as needed
//       ],
//       quirks: [
//         // Quirks that affect this monster's behavior or abilities
//         // Example: "Furious" - Increases damage output
//         "furious",
//         "pirate",
//       ],
//       stats: {
//         // Stats that influence the monster's performance
//         // Example: "Strength", "Agility", "Intelligence"
//       },
//       nature: "Friendly",
//       // Add more attributes as needed
//     },
//     // Add more party members as needed
//   ],

//   enemyParty: [
//     {
//       name: "Sample Guy",
//       health: 30,
//       maxHP: 30,
//       energy: 6,
//       status: "None",
//       attacks: [
//         {
//           name: "Sample Attack",
//           type: "magical",
//           damage: 10,
//         },
//         // Add more enemy attacks as needed
//       ],
//       quirks: {
//         // Quirks that affect this enemy's behavior or abilities
//       },
//       stats: {
//         // Stats that influence the enemy's performance
//       },
//       nature: "Neutral",
//       // Add more attributes as needed
//     },
//     // Add more enemy party members as needed
//   ],

//   // ...

//   // Game state for various variables
//   gameState: {
//     turn: 1, // Current turn number
//     currentPlayer: "player", // Current player's turn ("player" or "enemy")
//     // Add more game state variables as needed
//   },

//   // ...

//   // Event system (placeholder)
//   events: {
//     introEvent: {
//       text: "Welcome to the game!",
//       options: [
//         {
//           text: "Start the adventure",
//           action: () => {
//             // Handle action when this option is chosen
//             // For example, transition to the first map node
//           },
//         },
//         // Add more options as needed
//       ],
//     },
//     // Add more events as needed
//   },

//   // Error handling and alerts
//   alerts: [],

//   // ...

//   // Development mode flag
//   devMode: false,
// };

export const newStartingData = {
  // Party system for the player and enemy
  playerParty: [
    {
      name: "Pupcake",
      health: 100,
      maxHP: 100,
      energy: 5,
      status: "Fine",
      flaws: {
        weak: "poison",
        resist: "fire",
      },
      lvl: 3,
      exp: 168034502,
      Abilities: [
        {
          name: "Claw Slash",
          type: "physical",
          damage: 20,
          speed: 7,
          fuel: 2,
          effect: { Desc: "chance to paralyze", chance: "50%", result: "stun" },
          chance: 50,
          descripition: "chance to paralyze",
          priority: "fast",
          notSoFast: {
            name: "Claw counter",
            type: "physical",
            damage: 20,
            speed: 7,
            fuel: 2,
            Desc: "chance to paralyze on counter",
            chance: "50%",
            result: "stun",
            priority: "fast",
          },
          forceful: {
            name: "Claw Rage",
            type: "physical",
            damage: 20,
            speed: 7,
            fuel: 2,
            Desc: "chance to paralyze on counter",
            chance: "50%",
            result: "stun",
            priority: "fast",
          },
        },
        // Add more attacks as needed
      ],
      quirks: [
        // Quirks that affect this monster's behavior or abilities
        // Example: "Furious" - Increases damage output
        ["furious", ["damage buff", 20]],
        //Allows the user to dodge on his own.
        ["pirate", ["Illusive chance", "10%"]], //if dodged, "X's pirate wit caused him to evade the attack"
      ],
      stats: {
        // Stats that influence the monster's performance
        // Example: "Strength", "Agility", "Intelligence"
      },
      nature: "Friendly",
      // Add more attributes as needed
      uniqueness:
        "I don't know, any unique attributes we can add based on this individual instance of the monster",
    },
    // Add more party members as needed
  ],

  enemyParty: [
    {
      name: "Sample Guy",
      health: 30,
      maxHP: 30,
      energy: 6,
      status: "None",
      attacks: [
        {
          name: "Sample Attack",
          type: "magical",
          damage: 10,
        },
        // Add more enemy attacks as needed
      ],
      quirks: {
        // Quirks that affect this enemy's behavior or abilities
      },
      stats: {
        // Stats that influence the enemy's performance
      },
      nature: "Neutral",
      // Add more attributes as needed
    },
    // Add more enemy party members as needed
  ],

  // ...

  // Game state for various variables
  gameState: {
    turn: 1, // Current turn number
    currentPlayer: "player", // Current player's turn ("player" or "enemy")
    // Add more game state variables as needed
  },

  playerInfo: {
    gold: 50,
    credability: 3,
  },

  // ...

  // Event system (placeholder)
  events: {
    introEvent: {
      text: "Welcome to the game!",
      options: [
        {
          text: "Start the adventure",
          action: () => {
            // Handle action when this option is chosen
            // For example, transition to the first map node
          },
        },
        // Add more options as needed
      ],
    },
    // Add more events as needed
  },

  // Error handling and alerts
  alerts: [],
  // ...
  // Development mode flag
  devMode: false,
};

export const startingData = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 5,
    status: "Feeling Fine",
    effects: {
      buff: null,
      buildup: 1,
    },
    maxHP: 100,
    maxEnergy: 5,
    armor: 0,
    power: 0,
  },
  battle: {
    enemy: {
      name: "sample guy",
      bio: "just a standaard enemy",
      health: "30",
      maxHP: "30",
      energy: 6,
      status: "none",
      nextAttack: "none",
      attacks: [
        {
          name: "sample atk hitting you",
          type: "hit",
          damage: 20,
          status: STUN,
        },
        {
          name: "sample atk hitting again",
          type: "hit",
          damage: 40,
          status: null,
        },
      ],
    },
    runes: [],
    hand: [],
    discarded: [],
    beginning: false,
    dialog: null,
  },
  curScene: { scene: "intro", lvl: 1, act: 1 },
  curEvent: null,
  availableRewards: [],
  alert: "",

  // alert: "--- Cards PERMANENTLY go away. They can only be used once ---",
  eventResultObj: null,
  devMode: false,
};
