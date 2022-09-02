export const startingDeck = [
  { type: "Fire", name: "Flamethrower+", num: 8, cost: 1, id: 1 },
  { type: "Water", name: "Gush+", num: 6, cost: 1, id: 2 },
  { type: "Poison", name: "Sting+", num: 5, cost: 1, id: 3 },
  { type: "Fire", name: "Flamethrower", num: 4, cost: 1, id: 4 },
  { type: "Physical", name: "Throw Fist", num: 3, cost: 2, id: 5 },
  { type: "Physical", name: "Throw Fist", num: 3, cost: 2, id: 6 },
  { type: "Fire", name: "Flamethrower", num: 4, cost: 1, id: 7 },
  { type: "Water", name: "Gush", num: 2, cost: 1, id: 8 },
  { type: "Poison", name: "Sting", num: 2, cost: 1, id: 9 },
  { type: "Fire", name: "Flamethrower", num: 5, cost: 1, id: 10 },
  { type: "Physical", name: "Throw Fist", num: 5, cost: 2, id: 11 },
  { type: "Physical", name: "Throw Fist", num: 5, cost: 2, id: 12 },
];

export const startingData = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 5,
    status: "Feeling Fine",
  },
  battle: {
    enemy: {
      name: "sample guy",
      bio: "just a standaard enemi",
      health: "30",
      energy: 6,
      status: "Feelin great",
      nextAttack: "none",
      attacks: [
        {
          name: "sample atk hitting you",
          type: "hit",
          damage: 20,
          status: "dizzy",
        },
        {
          name: "sample atk hitting again",
          type: "hit",
          damage: 40,
          status: "none",
        },
      ],
    },
    runes:[],
    hand: [],
    discarded: [],
    beginning: false,
  },
  curScene: { scene: "intro", lvl: 1 },
  alert: "",
};

export const enemies = [
  {
    name: "EvilMan",
    health: 15,
    passive: "none",
    bio: "A bad dude",
    status: "none",
    attacks: [
      {
        name: "flails fist at you",
        type: "hit",
        damage: 20,
        status: "dizzy",
      },
      {
        name: "flails fist HARDER",
        type: "hit",
        damage: 40,
        status: "none",
      },
    ],
  },
  {
    name: "Lackey",
    health: 10,
    passive: "heal",
    bio: "A bad dude's smaller dude",
    status: "none",
    attacks: [
      {
        name: "flails fist weakly",
        type: "hit",
        damage: 11,
        status: "dizzy",
      },
      {
        name: "teeny punch",
        type: "hit",
        damage: 5,
        status: "none",
      },
    ],
  },
];

export const sampleItems = [
  {
    name: "Wand of Gameleon",
    desc: "+50 to total health",
    boost: {health: 50},
    flavortext: `"The Wand of Gameleon's power is has been spoken of 
          in historical texts to give life
          to the one who holds it" -Korvo, the missing link`,
    price: 50,
  },
  {
    name: "Kamuk's Brute Sword",
    desc: "-4 to total health, +3 to base damage",
    boost: {health: -50, baseDMG: 3},
    flavortext: `Kamuk's prey never stood a chance.
     His rage radiated from him, 
     imbuing everything around with power,
      the grass, his clothes, and his blade.`,
    price: 25,
  },
  {
    name: "Isiaac's Lucky tooth",
    desc: "Every 3 turns, you get an extra energy",
    boost: {rune: 'RUNE.LUCKYTOOTH (@TODO: add this)'},
    flavortext: `Isiaac only knew pain, so he didn't realized this was missing`,
    price: 40,
  },
];
export const fullEnergyAmount = 5;
