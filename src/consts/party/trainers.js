export const Trainer = {
  name: "Trainer Name",
  reward: {
    experience: 100,
    currency: 500,
    items: [
      { name: "Potion", quantity: 3 },
      { name: "Revive", quantity: 1 },
      // Add more items as needed
    ],
  },
  monsterNames: [
    { name: "Bunbun", level: 2 },
    { name: "FireDrake", level: 3 },
    { name: "WaterSplash", level: 4 },
  ],
  dialogue: {
    enter: "I challenge you to a battle!",
    win: "You're a strong trainer!",
    lose: "Better luck next time!",
    // Add more dialogue lines as needed
  },
  // Add other trainer properties like image, location, etc.
};

export const hikerBrak = {
  name: "Hiker Brak",
  reward: {
    experience: 150,
    currency: 300,
    items: [{ name: "Rock Candy", quantity: 2 }],
  },
  monsterNames: [
    { name: "Bunbun", level: 6 },
    { name: "Rockzilla", level: 8 },
  ],
  dialogue: {
    enter: "Prepare to be crushed under the weight of my mighty rocks!",
    win: "You're no match for my boulders!",
    lose: "You've chipped away at my confidence. Well done.",
  },
};

export const mysticWillow = {
  name: "Mystic Willow",
  reward: {
    experience: 200,
    currency: 400,
    items: [{ name: "Enchanted Orb", quantity: 1 }],
  },
  monsterNames: [
    { name: "Sparklefox", level: 10 },
    { name: "Moonshadow", level: 12 },
  ],
  dialogue: {
    enter: "Let the magic of nature guide our battle!",
    win: "Nature's power flows through you as well. Impressive!",
    lose: "You've proven that the balance of nature is unpredictable.",
  },
};

export const acePilotSkyler = {
  name: "Ace Pilot Skyler",
  reward: {
    experience: 250,
    currency: 600,
    items: [{ name: "Jet Fuel", quantity: 3 }],
  },
  monsterNames: [
    { name: "Thunderhawk", level: 15 },
    { name: "Cyclonejet", level: 17 },
  ],
  dialogue: {
    enter: "Fasten your seatbelts! We're in for a turbulent battle!",
    win: "You soared to new heights in this battle! Excellent!",
    lose: "My victory was as fleeting as the wind. Well fought.",
  },
};

export const scientistTesla = {
  name: "Scientist Tesla",
  reward: {
    experience: 180,
    currency: 500,
    items: [{ name: "Tesla Coil", quantity: 1 }],
  },
  monsterNames: [
    { name: "Electroray", level: 9 },
    { name: "Voltorbolt", level: 11 },
  ],
  dialogue: {
    enter: "Witness the power of electricity, harnessed for battle!",
    win: "Your energy is electrifying! Impressive!",
    lose: "You've caused a short circuit in my plans. Well done.",
  },
};
