import { SCENES } from '../scenes'
import { cusLog } from '../utils/debugging-utils'
import { basicTrainers } from './party/trainers'

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
