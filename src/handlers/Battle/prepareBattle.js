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
import { hikerBrak } from "../../consts/party/trainers";
// mix up the trainers and choose one.

export const generateEnemyParty = (trainer) => {
  const enemyParty = { ...opponentParty };

  // Iterate through the trainer's monsters and assign them to enemyParty slots
  hikerBrak.monsters.forEach((monster, index) => {
    const slot = Object.keys(enemyParty)[index]; // Get the slot name (e.g., Party.SLOT_1)
    enemyParty[slot] = { ...monster };
  });

  return enemyParty;
};

export const startBattle = (trainer) => {
  const enemyParty = generateEnemyParty(trainer);

  // Perform other battle-related actions here
  // For example, you can set the state to trigger the battle screen
  // or perform any other logic you need for your game.
};
