import {
  Luminowl,
  MoltenScale,
  Recycleroo,
  Ticklefairy,
  Umbrabunny,
} from '../pals/pals'

export const Trainer = {
  name: 'Trainer Name',
  reward: {
    experience: 100,
    currency: 500,
    items: [
      { obj: 'Potion', quantity: 3 },
      { obj: 'Revive', quantity: 1 },
      // Add more items as needed
    ],
  },
  monsters: [
    // { name: "Bunbun", level: 2 },
    // { name: "FireDrake",
    // { name: "WaterSplash", level: 4 },
    Ticklefairy,
    Ticklefairy,
  ],
  dialogue: {
    enter: 'I challenge you to a battle!',
    win: "You're a strong trainer!",
    lose: 'Better luck next time!',
    // Add more dialogue lines as needed
  },
  // Maybe spirit. Spirit would be a powerful buff from a dead monster. This could be the
  // commander ability
  // Add other trainer properties like image, location, etc.
}

export const hikerBrak = {
  name: 'Hiker Brak',
  reward: {
    experience: 150,
    currency: 300,
    items: [{ name: 'Rock Candy', quantity: 2 }],
  },
  monsters: [
    Umbrabunny,
    Ticklefairy,
  ],
  dialogue: {
    enter: 'Prepare to be crushed under the weight of my mighty rocks!',
    win: "You're no match for my boulders!",
    lose: "You've chipped away at my confidence. Well done.",
  },
}

export const mysticWillow = {
  name: 'Mystic Willow',
  reward: {
    experience: 200,
    currency: 400,
    items: [{ name: 'Enchanted Orb', quantity: 1 }],
  },
  monsters: [
    // { name: "Sparklefox", level: 10 },
    // { name: "Moonshadow", level: 12 },
    Recycleroo,
    Ticklefairy,
  ],
  dialogue: {
    enter: 'Let the magic of nature guide our battle!',
    win: "Nature's power flows through you as well. Impressive!",
    lose: "You've proven that the balance of nature is unpredictable.",
  },
}

export const acePilotSkyler = {
  name: 'Ace Pilot Skyler',
  reward: {
    experience: 250,
    currency: 600,
    items: [{ name: 'Jet Fuel', quantity: 3 }],
  },
  monsters: [
    // { name: "Thunderhawk", level: 15 },
    // { name: "Cyclonejet", level: 17 },
    Luminowl,
    Ticklefairy,
  ],
  dialogue: {
    enter: "Fasten your seatbelts! We're in for a turbulent battle!",
    win: 'You soared to new heights in this battle! Excellent!',
    lose: 'My victory was as fleeting as the wind. Well fought.',
  },
}

export const scientistTesla = {
  name: 'Scientist Tesla',
  reward: {
    experience: 180,
    currency: 500,
    items: [{ name: 'Tesla Coil', quantity: 1 }],
  },
  monsters: [
    // { name: "Electroray", level: 9 },
    // { name: "Voltorbolt", level: 11 },
    Ticklefairy,
    Ticklefairy,
  ],
  dialogue: {
    enter: 'Witness the power of electricity, harnessed for battle!',
    win: 'Your energy is electrifying! Impressive!',
    lose: "You've caused a short circuit in my plans. Well done.",
  },
}

export const placeholderTrainer = {
  name: 'Mr. Placeholder',
  reward: {
    experience: 1, // He's not very experienced
    currency: 10, // He's not rich either
    items: [
      { name: 'Duct Tape', quantity: 1 }, // Just one roll of duct tape
      { name: 'Expired Banana', quantity: 3 }, // Watch out, they're expired
    ],
  },
  monsters: [
    // { name: "Sillyslime", level: 1 }, // A slime that tells dad jokes
    // { name: "Pillowpet", level: 2 }, // Literally a fluffy pillow brought to life
    Ticklefairy, // Special move: Tickle Attack!
    Ticklefairy,
    Ticklefairy,
  ],
  dialogue: {
    enter: 'I challenge you to a tickle fight! Oops, I mean a battle!',
    win: "You're a slightly stronger trainer than me!",
    lose: "Better luck next time! I'm off to tell more dad jokes!",
  },
  spirit: 'The Ghost of Bad Puns', // Commander ability: Increases the likelihood of eye-rolls
  // Other properties like image, location, etc. are intentionally left blank because Mr. Placeholder is all about being generic!
}

export const bossBarry = {
  name: 'Boss Barry',
  reward: {
    experience: 150,
    currency: 300,
    items: [{ name: 'dragon Candy', quantity: 2 }],
  },
  monsters: [
    MoltenScale,
  ],
  dialogue: {
    enter: 'Prepare to be crushed under the weight of my mighty dragon!',
    win: "You're no match for my boulders!",
    lose: "You've chipped away at my confidence. Well done.",
  },
}

export const basicTrainers = [
  Trainer,
  hikerBrak,
  mysticWillow,
  acePilotSkyler,
  scientistTesla,
  // Add more basic trainers as needed
]

export const allTrainers = [
  ...basicTrainers,
  // Add more advanced trainers as needed
  // ...advancedTrainers,
  // ...specialTrainers,
  // ...otherTrainers,
  // ...etc.
]

// What trainerNames does is it returns an array of trainer names.
export const trainerNames = allTrainers.map((trainer) => trainer.name)

// trainerNamesAndLevels returns an array of objects with the trainer name and level.
// This is useful for displaying trainer names and levels in a table or list.
// Example usage:
// const trainerNamesAndLevels = trainerNamesAndLevels();
// console.log(trainerNamesAndLevels); // [{ name: "Trainer Name", level: 2 }
export const trainerNamesAndLevels = allTrainers.map((trainer) => ({
  name: trainer.name,
  level: trainer.monsters[0].level,
}))
