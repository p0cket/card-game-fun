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
import { basicTrainers } from "../../consts/party/trainers";
import { hikerBrak } from "../../consts/party/trainers";


// what this does is generate a new party for the enemy based on the trainer's monsters.
export const generateEnemyParty = (state, trainer) => {
  // const enemyParty = { ...opponentParty };
  const newState = { ...state };


  // Iterate through the trainer's monsters and assign them to enemyParty slots
  trainer.monsters.forEach((monster, index) => {
    const slot = Object.keys(newState.opponentParty)[index]; // Get the slot name (e.g., Party.SLOT_1)
    newState.opponentParty[slot] = { ...monster };
  });

  return newState;
};

export const startBattle = (trainer) => {
  const enemyParty = generateEnemyParty(trainer);

  // Perform other battle-related actions here
  // For example, you can set the state to trigger the battle screen
  // or perform any other logic you need for your game.
};
