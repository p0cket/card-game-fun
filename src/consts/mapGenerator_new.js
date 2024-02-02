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
export const gymLevels = [
  {
    id: 1,
    title: 'The Gym Entrance',
    options: [
      { id: '1a', description: 'Battle the first trainer', scene: SCENES.BATTLE, trainer: 'Rookie Trainer' },
    ],
  },
  {
    id: 2,
    title: 'The Training Hall',
    options: [
      { id: '2a', description: 'Face off against a seasoned fighter', scene: SCENES.BATTLE, trainer: 'Seasoned Fighter' },
      { id: '2b', description: 'Take a moment to strategize', scene: SCENES.REST },
    ],
  },
  {
    id: 3,
    title: 'The Strategy Room',
    options: [
      { id: '3a', description: 'Test your tactics against a tactical genius', scene: SCENES.BATTLE, trainer: 'Tactical Genius' },
      { id: '3b', description: 'Rest and recover', scene: SCENES.REST },
    ],
  },
  {
    id: 4,
    title: 'The Elemental Zone',
    options: [
      { id: '4a', description: 'Overcome an elemental challenge', scene: SCENES.BATTLE, trainer: 'Elemental Specialist' },
    ],
  },
  {
    id: 5,
    title: 'The Veteran\'s Court',
    options: [
      { id: '5a', description: 'Prove your worth against a gym veteran', scene: SCENES.BATTLE, trainer: 'Gym Veteran' },
      { id: '5b', description: 'Catch your breath', scene: SCENES.REST },
    ],
  },
  {
    id: 6,
    title: 'The Final Test',
    options: [
      { id: '6a', description: 'The ultimate challenge before the leader', scene: SCENES.BATTLE, trainer: 'The Gatekeeper' },
    ],
  },
  {
    id: 7,
    title: 'The Leader\'s Arena',
    options: [
      { id: '7a', description: 'Face the Gym Leader', scene: SCENES.BOSS, leader: 'Gym Leader' },
    ],
  },
];

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
