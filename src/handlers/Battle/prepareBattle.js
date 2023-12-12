// const Trainer = {
//   name: "Trainer Name",
//   reward: {
//     experience: 100,
//     currency: 500,
//     items: [
//       { name: "Potion", quantity: 3 },
//       { name: "Revive", quantity: 1 },
//       // Add more items as needed
//     ],
//   },
//   monsterNames: [
//     { name: "Bunbun", level: 2 },
//     { name: "FireDrake", level: 3 },
//     { name: "WaterSplash", level: 4 },
//   ],
//   dialogue: {
//     enter: "I challenge you to a battle!",
//     win: "You're a strong trainer!",
//     lose: "Better luck next time!",
//     // Add more dialogue lines as needed
//   },
//   // Add other trainer properties like image, location, etc.
// };
import { basicTrainers } from '../../consts/party/trainers'
import { hikerBrak } from '../../consts/party/trainers'

// Add enemy pals to their party and add on the additional Details
// like level and what results from that
// add monster details to the monster. addDetailsToEnemyPal = (monsterName, monsterDetails) => {
// take monster and add like level and the magnified stats (magnified stats = monster level * monster stats)
// also at different levels they have more abilities, so give them those, or choose which ones if theres
// too many.
// give U-ID,  }

// Define a function to log colored messages
const logWithColor = (message, color) => {
  console.log(`%c${message}`, `color: ${color}; font-weight: bold;`)
}

// what this does is generate a new party for the enemy based on the trainer's monsters.
export const generateEnemyParty = (state, trainer) => {
  const newState = { ...state }

  // Initialize an empty array for the enemy party
  newState.opponent = []

  // Iterate through the trainer's monsters and push them to the enemyParty array
  trainer.monsters.forEach((monster) => {
    newState.opponent.push({ ...monster })

    // Log the assignment with color
    logWithColor(`Added ${monster.name} to the enemy party`, 'green')
  })

  return newState
}

export const startBattle = (trainer) => {
  const enemyParty = generateEnemyParty(trainer)

  // Perform other battle-related actions here
  // For example, you can set the state to trigger the battle screen
  // or perform any other logic you need for your game.

  // Log the start of the battle with color
  logWithColor(`Battle started with ${trainer.name}`, 'blue')
}

export const randomlySelectTrainer = (trainersToSelectFrom) => {
  const chosenTrainer =
    trainersToSelectFrom[
      Math.floor(Math.random() * trainersToSelectFrom.length)
    ]
    return chosenTrainer
}
