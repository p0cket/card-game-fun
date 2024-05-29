import {
  getLuminowl,
  getMoltenScale,
  getPal,
  getRecycleroo,
  getTicklefairy,
  getUmbrabunny,
} from '../pals/pals'

export const getTrainer = (trainerName, trainer) => {
  // maybe trainer name?
  switch (trainerName) {
    case 'HIKER_BRAK':
      return getHikerBrak()
    default:
      console.log('no trainer')
  }
  return ''
}

export const getHikerBrak = () => ({
  name: 'Hiker Brak',
  reward: {
    experience: 150,
    currency: 300,
    items: [{ name: 'Rock Candy', quantity: 2 }],
  },
  monsters: [getUmbrabunny(), getTicklefairy()],
  dialogue: {
    enter: 'Prepare to be crushed under the weight of my mighty rocks!',
    win: "You're no match for my boulders!",
    lose: "You've chipped away at my confidence. Well done.",
  },
})

export const getMysticWillow = () => ({
  name: 'Mystic Willow',
  reward: {
    experience: 200,
    currency: 400,
    items: [{ name: 'Enchanted Orb', quantity: 1 }],
  },
  monsters: [getRecycleroo(), getTicklefairy()],
  dialogue: {
    enter: 'Let the magic of nature guide our battle!',
    win: "Nature's power flows through you as well. Impressive!",
    lose: "You've proven that the balance of nature is unpredictable.",
  },
})

export const getAcePilotSkyler = () => ({
  name: 'Ace Pilot Skyler',
  reward: {
    experience: 250,
    currency: 600,
    items: [{ name: 'Jet Fuel', quantity: 3 }],
  },
  monsters: [getLuminowl(), getTicklefairy()],
  dialogue: {
    enter: "Fasten your seatbelts! We're in for a turbulent battle!",
    win: 'You soared to new heights in this battle! Excellent!',
    lose: 'My victory was as fleeting as the wind. Well fought.',
  },
})

export const getScientistTesla = () => ({
  name: 'Scientist Tesla',
  reward: {
    experience: 180,
    currency: 500,
    items: [{ name: 'Tesla Coil', quantity: 1 }],
  },
  monsters: [getTicklefairy(), getTicklefairy()],
  dialogue: {
    enter: 'Witness the power of electricity, harnessed for battle!',
    win: 'Your energy is electrifying! Impressive!',
    lose: "You've caused a short circuit in my plans. Well done.",
  },
})

// Repeat the pattern for other trainers, such as placeholderTrainer, bossBarry, bossSebastian
export const getPlaceholderTrainer = () => ({
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

    getTicklefairy(),    // { name: "Sillyslime", level: 1 }, // A slime that tells dad jokes
    getTicklefairy(),    // { name: "Pillowpet", level: 2 }, // Literally a fluffy pillow brought to life
    getTicklefairy(),
    getTicklefairy(),
  ],
  dialogue: {
    enter: 'I challenge you to a tickle fight! Oops, I mean a battle!',
    win: "You're a slightly stronger trainer than me!",
    lose: "Better luck next time! I'm off to tell more dad jokes!",
  },
  spirit: 'The Ghost of Bad Puns', // Commander ability: Increases the likelihood of eye-rolls
  // Other properties like image, location, etc. are intentionally left blank because Mr. Placeholder is all about being generic!
})

export const getBossBarry = () => ({
  name: 'Gym Leader Barry',
  reward: {
    experience: 150,
    currency: 300,
    items: [{ name: 'dragon Candy', quantity: 2 }],
  },
  monsters: [getMoltenScale()],
  dialogue: {
    enter: 'Prepare to be crushed under the weight of my mighty dragon!',
    win: "You're no match for my boulders!",
    lose: "You've chipped away at my confidence. Well done.",
  },
})

export const getBossSebastian = () => ({
  name: 'Gym Leader Sebastian',
  reward: {
    experience: 150,
    currency: 300,
    items: [{ name: 'dragon Candy', quantity: 2 }],
  },
  monsters: [getMoltenScale()],
  dialogue: {
    enter: 'Prepare to be crushed under the weight of my mighty dragon!',
    win: "You're no match for my boulders!",
    lose: "You've chipped away at my confidence. Well done.",
  },
})
//fix getTrainer
export const getBasicTrainers = () => [
  // getTrainer(),
  getHikerBrak(),
  getMysticWillow(),
  getAcePilotSkyler(),
  getScientistTesla(),
  // Add more basic trainers as needed
]
export const basicTrainers = (getBasicTrainers) => getBasicTrainers()

export const getAllTrainers = () => [ 
  ...getBasicTrainers(),
  // Add more advanced trainers as needed
  // ...getAdvancedTrainers(),
  // ...getSpecialTrainers(),
  // ...getOtherTrainers(),
  // ...etc.
]

// For trainer names, you can adapt to this new pattern:
export const getTrainerNames = () =>
  getAllTrainers().map((trainer) => trainer().name)

// export const basicTrainers = [
//   // ...
//   getHikerBrak(),
//   getMysticWillow(),
//   getAcePilotSkyler(),
//   getScientistTesla(),
//   // Add more basic trainers as needed
// ]
// This approach ensures all trainer data is dynamically generated and inherently non-serializable due to the use of functions, matching the pattern seen with your pal entities.
