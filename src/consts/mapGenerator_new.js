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
      { id: '1c', description: 'Rest', scene: SCENES.REST },
      // { id: '1c', description: 'boss', scene: SCENES.BOSS }, // You may want to specify a different scene here.
    ],
  },
  {
    id: 2,
    title: 'But you need more',
    options: [
      { id: '2a', description: 'Fight a harder monster', scene: SCENES.BATTLE },
      // { id: '2b', description: 'Find a treasure', scene: SCENES.TREASURE },
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
