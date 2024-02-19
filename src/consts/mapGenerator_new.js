import { SCENES } from '../handlers/sceneHandlers_new'
import { cusLog } from '../utils/debugging-utils'
import { basicTrainers } from './party/trainers'

export const levels = [
  {
    id: 1,
    title: 'The Path Begins',
    options: [
      { id: '1a', description: 'Fight a monster', scene: SCENES.BATTLE },
      // { id: '1b', description: 'Visit a shop', scene: SCENES.SHOP },

      // { id: '1c', description: 'boss', scene: SCENES.BOSS }, // You may want to specify a different scene here.
    ],
  },
  {
    id: 2,
    title: 'But you need more',
    options: [
      { id: '2a', description: 'Fight a harder monster', scene: SCENES.BATTLE },
      // { id: '2b', description: 'Find a treasure', scene: SCENES.TREASURE },
      { id: '2c', description: 'Rest', scene: SCENES.REST },
    ],
  },
  {
    id: 3,
    title: 'You venture deep',
    options: [
      {
        id: '3a',
        description: 'Fight an even harder monster',
        scene: SCENES.BATTLE,
      },
      // {
      //   id: '3b',
      //   description: 'Find another treasure',
      //   scene: SCENES.TREASURE,
      // },
      { id: '3c', description: 'Rest', scene: SCENES.REST },
    ],
  },
  {
    id: 4,
    title: 'You have found the treasure',
    options: [
      { id: '4a', description: 'Fight a thug', scene: SCENES.BATTLE },
      // { id: '4b', description: 'Enter a shop', scene: SCENES.SHOP },
      // {
      //   id: '4c',
      //   description: 'Find another treasure',
      //   scene: SCENES.TREASURE,
      // },
    ],
  },
  {
    id: 5,
    title: 'You pay a great price',
    options: [
      // { id: '5a', description: '???', scene: SCENES.MYSTERY }, // You may want to specify a different scene here.
      { id: '5a', description: 'Fight a monster', scene: SCENES.BATTLE },
      { id: '5c', description: 'Rest', scene: SCENES.REST },

      // { id: '5b', description: 'Enter a shop', scene: SCENES.SHOP },
      // {
      //   id: '5c',
      //   description: 'Find another treasure',
      //   scene: SCENES.TREASURE,
      // },
    ],
  },
  {
    id: 6,
    title: 'You return',
    options: [
      { id: '6a', description: 'Fight a thug', scene: SCENES.BATTLE },
      { id: '1c', description: 'Rest', scene: SCENES.REST },
      // { id: '6b', description: '???', scene: SCENES.MYSTERY }, // You may want to specify a different scene here.
      // {
      //   id: '6c',
      //   description: 'Find another treasure',
      //   scene: SCENES.TREASURE,
      // },
    ],
  },
  {
    id: 7,
    title: 'Having changed',
    options: [
      { id: '7a', description: 'Fight a thug', scene: SCENES.BATTLE },
      // { id: '7b', description: 'Enter a shop', scene: SCENES.SHOP },
      // {
      //   id: '7c',
      //   description: 'Find another treasure',
      //   scene: SCENES.TREASURE,
      // },
    ],
  },
  {
    id: 8,
    title: 'The Path Ends',
    options: [
      { id: '8a', description: 'boss', scene: SCENES.BOSS }, // You may want to specify a different scene here.
    ],
  },
]

//Maybe small early battles to get moves from small mons?
// choices of path - go to poison mon to learn that one from a TM or Buff?

export const gymLevelsTwo = [
  {
    id: 1,
    title: "Rookie's Welcome",
    description:
      'The gateway to your adventure, where the path of challenges begins under the watchful eyes of the Rookie Trainer.',
    options: [
      {
        id: '1a',
        shortDesc: 'Battle a Rookie Trainer',
        longDesc: `Engage in your first test of strength against the 
        welcoming Rookie Trainer, a crucial step on your journey. 
        He might know who how to get to the gym boss`,
        scene: SCENES.BATTLE,
        // trainerArr: 'Rookies'
      },
    ],
    mapFeatures: ['Welcoming Arch', 'Symbolic Statues', 'Path of Trials'],
  },
  {
    id: 2,
    title: "Seasoned Fighter's Arena",
    description: `A robust hall echoing the spirit of countless battles, 
      where seasoned warriors share their prowess. 
     `,
    options: [
      {
        id: '2a',
        shortDesc: 'Challenge the Seasoned Fighter',
        longDesc: ` Test your skills in combat against a seasoned fighter.  One of them knows the path for you to take.`,
        scene: SCENES.BATTLE,
      },
      {
        id: '2b',
        shortDesc: 'Rest and Strategize',
        longDesc: 'Take a well-earned rest to heal.',
        scene: SCENES.REST,
      },
    ],
    mapFeatures: ['Training Dummies', 'Weapon Racks', 'Resting Quarters'],
  },
  {
    id: 3,
    title: 'A surprising challenger',
    description: 'A menacing challenger blocks your way.',
    options: [
      {
        id: '3a',
        shortDesc: 'Face the Tactical Genius',
        longDesc:
          'Engage in a battle of wits against a menacing challenger that ambushed you and wont let you pass.',
        scene: SCENES.BATTLE,
      },
      {
        id: '3b',
        shortDesc: 'Recover and Reflect',
        longDesc: 'Use this time to recover your strength.',
        scene: SCENES.REST,
      },
    ],
    mapFeatures: ['Strategy Tables', 'Ancient Maps', 'Puzzle Locks'],
  },
  {
    id: 4,
    title: "The wise one's domain",
    description:
      'You see a elegant domain, and a shadowy figure within it. The figure knows the path for you to take.',
    options: [
      {
        id: '4a',
        shortDesc: 'Prove yourself',
        longDesc:
          'To consult the wise one, you must prove yourselfProve your mastery over the elements by facing the Elemental Specialist in a trial by fire, water, earth, and air.',
        scene: SCENES.BATTLE,
      },
    ],
    mapFeatures: ['Elemental Altars', 'Natural Obstacles', 'Mystic Fountains'],
  },
  {
    id: 5,
    title: "Veteran's Court",
    description:
      'The arena where legends are made, challenging you to rise above and prove your worth.',
    options: [
      {
        id: '5a',
        shortDesc: 'Battle the Gym Veteran',
        longDesc:
          'Engage in a decisive battle against a seasoned veteran, testing your mettle against their years of experience.',
        scene: SCENES.BATTLE,
      },
      {
        id: '5b',
        shortDesc: 'Rest and Reflect',
        longDesc: 'Catch your breath and gather your strength.',
        scene: SCENES.REST,
      },
    ],
    mapFeatures: ['Hall of Heroes', 'Victory Statues', 'Reflection Pool'],
  },
  {
    id: 6,
    title: "The Gatekeeper's Trial",
    description:
      'The ultimate test of your skills before the final showdown, where only the worthy may pass.',
    options: [
      {
        id: '6a',
        shortDesc: 'Face The Gatekeeper',
        longDesc:
          'Confront The Gatekeeper in a battle that will decide your fate and prove if you are ready to face the Gym Leader.',
        scene: SCENES.BATTLE,
      },
    ],
    mapFeatures: ['Mystical Gates', 'Runic Circles', 'Trial Grounds'],
  },
  {
    id: 7,
    title: "Gym Leader's Challenge",
    description:
      'The pinnacle of your journey, facing the Gym Leader in a battle for glory and honor.',
    options: [
      {
        id: '7a',
        shortDesc: 'Challenge the Gym Leader',
        longDesc:
          'Engage in an epic showdown with the Gym Leader, the ultimate test of your abilities and the final step to becoming a champion.',
        scene: SCENES.BOSS,
      },
    ],
    mapFeatures: [
      "Leader's Throne",
      'Arena of Champions',
      'Crowd of Spectators',
    ],
  },
]

export const testLevels = [
  {
    "id": 1,
    "title": "Rookie's Welcome",
    "description": "The gateway to your adventure, where the path of challenges begins under the watchful eyes of the Rookie Trainer.",
    "options": [
      {
        "id": "1a",
        "shortDesc": "Battle a Rookie Trainer",
        "longDesc": "Engage in your first test of strength against the welcoming Rookie Trainer, a crucial step on your journey. He might know how to get to the gym boss.",
        "scene": "BATTLE"
      }
    ],
    "mapFeatures": ["Welcoming Arch", "Symbolic Statues", "Path of Trials"]
  },
  {
    "id": 2,
    "title": "The Wild Thickets: Voltage Surge",
    "description": "An electrifying energy pervades this part of the Wild Thickets, attracting powerful electric-type monsters.",
    "options": [
      {
        "id": "2a",
        "shortDesc": "Face Zapling, the Electric Whisker",
        "longDesc": "A swift electric-type monster that tests your precision and timing with its blinding speed and electric shocks.",
        "scene": "BATTLE",
        "rewards": ["Electric Pace", "Static Coat"]
      }
    ],
    "mapFeatures": ["Crackling Air", "Sparking Ground", "Electric Arcs"]
  },
  {
    "id": 3,
    "title": "The Wild Thickets: Misty Veil",
    "description": "A dense mist limits visibility, home to ghostly figures and water-type monsters lurking in the obscured conditions.",
    "options": [
      {
        "id": "3a",
        "shortDesc": "Confront Fogshade, the Mist Wanderer",
        "longDesc": "Challenge a ghostly figure that moves silently through the mist, attacking with chilling, spectral moves.",
        "scene": "BATTLE",
        "rewards": ["Spectral Dodge", "Ghostly Essence"]
      }
    ],
    "mapFeatures": ["Thick Mist", "Limited Visibility", "Eerie Silence"]
  },
  {
    "id": 4,
    "title": "The Wild Thickets: Scorched Trails",
    "description": "Recent fires have scorched this area, attracting fire-type monsters to its warmth.",
    "options": [
      {
        "id": "4a",
        "shortDesc": "Battle Emberclaw, the Flame Prowler",
        "longDesc": "Face a creature of flame and ash, capable of igniting fierce flames with its claws.",
        "scene": "BATTLE",
        "rewards": ["Flame Heart", "Ashen Hide"]
      }
    ],
    "mapFeatures": ["Scorched Earth", "Warmth", "Regenerating Flora"]
  },
  {
    "id": 5,
    "title": "Seasoned Fighter's Arena",
    "description": "A robust hall echoing the spirit of countless battles, where seasoned warriors share their prowess.",
    "options": [
      {
        "id": "5a",
        "shortDesc": "Challenge the Seasoned Fighter",
        "longDesc": "Test your skills in combat against a seasoned fighter. One of them knows the path for you to take.",
        "scene": "BATTLE"
      },
      {
        "id": "5b",
        "shortDesc": "Rest and Strategize",
        "longDesc": "Take a well-earned rest to heal.",
        "scene": "REST"
      }
    ],
    "mapFeatures": ["Training Dummies", "Weapon Racks", "Resting Quarters"]
  }
  // Additional levels can be added following this pattern.
]


// Assuming SCENES.BATTLE and SCENES.BOSS are predefined to handle battles and the final boss encounter
// "trainer" and "leader" would be references to specific trainer and leader objects defined elsewhere

// const trainerTiers = {
//   beginner: [hikerBrak, gardenerFern],
//   intermediate: [mysticWillow, chefGumbo, pirateCoral],
//   advanced: [acePilotSkyler, knightGallant],
//   elite: [scientistTesla, wizardMerlin],
// };

// // Optionally, categorize by themes if your game progression is more thematic than linear
// const trainerThemes = {
//   forest: [gardenerFern, mysticWillow],
//   sky: [acePilotSkyler, wizardMerlin],
//   ocean: [pirateCoral, chefGumbo],
//   technology: [scientistTesla, hikerBrak],
// };

// function selectTrainerForCurrentTier(playerTier) {
//   const availableTrainers = trainerTiers[playerTier];
//   return availableTrainers[Math.floor(Math.random() * availableTrainers.length)];
// }
// function selectTrainerForCurrentTheme(currentTheme) {
//   const availableTrainers = trainerThemes[currentTheme];
//   return availableTrainers[Math.floor(Math.random() * availableTrainers.length)];
// }
// function advancePlayerTier(player) {
//   // Conceptual function to advance player tier based on in-game logic
//   if (player.hasDefeatedCurrentTierBoss) {
//     player.currentTier = getNextTier(player.currentTier);
//     // Potentially reset or modify game state to reflect new challenges
//   }
// }
// const progressionTiers = ['beginner', 'intermediate', 'advanced', 'elite'];
// function getNextTier(currentTier) {
//   const currentIndex = progressionTiers.indexOf(currentTier);
//   // Ensure there is a next tier to progress to
//   if (currentIndex >= 0 && currentIndex < progressionTiers.length - 1) {
//     return progressionTiers[currentIndex + 1];
//   }
//   // Return the current tier if already at the last tier
//   return currentTier;
// }

export function generateNextLevelOptions() {
  const options = []

  const { BATTLE, EVENT, REST } = SCENES

  // Generate 3 options
  for (let i = 0; i < 3; i++) {
    const randomValue = Math.random() // Generate a random number between 0 and 1

    if (randomValue < 0.5) {
      // would be better with {screen: "battle", details: null}
      const randomTrainer =
        basicTrainers[Math.floor(Math.random() * basicTrainers.length)]
      options.push({
        screen: BATTLE,
        details: {
          type: 'trainer',
          trainer: randomTrainer,
          area: 'tranquil forest',
          difficulty: 'easy',
        },
      }) // 50% chance for Battle encounter
      // options.push({screen: BATTLE, details: null});
    } else if (randomValue < 0.7) {
      options.push({ screen: EVENT, details: null }) // 20% chance for Event
      // }
      //  else if (randomValue < 0.8) {
      //   options.push("Mystery"); // 10% chance for Mystery
    } else {
      options.push({ screen: REST, details: null }) // 20% chance for Rest
    }
  }

  return options
}

//it would be cool to have an in-game thing result in the board changing.
// a monster dies before it becomes a boss,
// a place catching fire so a fire battle is up ahead
// a place freezing over because of so much ice moves so ice battle up ahead
// theives steal from you so you fight them later on to get your stuff back

export function generateMap() {
  const results = []

  for (let i = 0; i < 8; i++) {
    const options = generateNextLevelOptions() // Generate options using the previous function
    results.push(options) // Store the generated options in the results array
  }

  return results
}

// Run the function
const multipleResults = generateMap()
// console.log(''multipleResults)
cusLog('Loading data', 'info', undefined, multipleResults)
