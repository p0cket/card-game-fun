import { uniqueId } from "../utils/reducer-utils"

export const startingDeck = [
  { type: "Fire", name: "Flamethrower", num: 4, cost: 1, id: uniqueId(), effect: null },
  { type: "Fire", name: "Flamethrower+", num: 8, cost: 1, id: uniqueId(), effect: null },
  { type: "Water", name: "Gush", num: 2, cost: 1, id: uniqueId(), effect: null },
  { type: "Water", name: "Gush+", num: 6, cost: 1, id: uniqueId(), effect: null },
  { type: "Poison", name: "Sting", num: 2, cost: 1, id: uniqueId(), effect: null },
  { type: "Poison", name: "Sting+", num: 5, cost: 1, id: uniqueId(), effect: null },
  { type: "Physical", name: "Throw Fist", num: 3, cost: 2, id: uniqueId(), effect: "stun" },
  { type: "Physical", name: "Throw Fist+", num: 5, cost: 2, id: uniqueId(), effect: "stun" },
  { type: "Psychic", name: "Think", num: 0, cost: 0, id: uniqueId(), effect: "draw", qty: 1 },
  { type: "Psychic", name: "Think+", num: 0, cost: 0, id: uniqueId(), effect: "draw", qty: 2 },
  { type: "Psychic", name: "Recollect Mind", num: 0, cost: 1, id: uniqueId(), effect: "draw", qty: 2 },
  { type: "Psychic", name: "Recollect Mind+", num: 0, cost: 1, id: uniqueId(), effect: "draw", qty: 3 },
];

export const startingData = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 5,
    status: "Feeling Fine",
    // max health
  },
  battle: {
    enemy: {
      name: "sample guy",
      bio: "just a standaard enemi",
      health: "30",
      energy: 6,
      status: "none",
      nextAttack: "none",
      attacks: [
        {
          name: "sample atk hitting you",
          type: "hit",
          damage: 20,
          status: "stun",
        },
        {
          name: "sample atk hitting again",
          type: "hit",
          damage: 40,
          status: null,
        },
      ],
    },
    runes:[],
    hand: [],
    discarded: [],
    beginning: false,
  },
  curScene: { scene: "intro", lvl: 1, act: 1 },
  availableRewards: [],
  alert: "",
};

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
