import { uniqueId } from "../utils/reducer-utils"
import { EFFECTS } from "../effects"
const { DRAW, STUN, DOUBLEDAMAGE, SLEEP } = EFFECTS

export const startingDeck = [
  {
    type: "Psychic",
    name: "Hypnosis",
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: SLEEP,
  },
  {
    type: "Psychic",
    name: "Hypnosis",
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: SLEEP,
  },
  {
    type: "Psychic",
    name: "Hypnosis+",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: SLEEP,
  },
  {
    type: "Grass",
    name: "Leaf Storm",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Grass",
    name: "Leaf Storm",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Fire",
    name: "Flamethrower",
    num: 4,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Fire",
    name: "Flamethrower",
    num: 4,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Fire",
    name: "Flamethrower+",
    num: 8,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Water",
    name: "Gush",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Water",
    name: "Gush+",
    num: 6,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Poison",
    name: "Sting",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Poison",
    name: "Sting+",
    num: 5,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: "Physical",
    name: "Throw Fist",
    num: 3,
    cost: 2,
    id: uniqueId(),
    effect: STUN,
  },
  {
    type: "Physical",
    name: "Throw Fist+",
    num: 5,
    cost: 2,
    id: uniqueId(),
    effect: STUN,
  },
  {
    type: "Psychic",
    name: "Think",
    num: 0,
    cost: 0,
    id: uniqueId(),
    effect: DRAW,
    qty: 1,
  },
  {
    type: "Psychic",
    name: "Think+",
    num: 0,
    cost: 0,
    id: uniqueId(),
    effect: DRAW,
    qty: 2,
  },
  {
    type: "Psychic",
    name: "Recollect Mind",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DRAW,
    qty: 2,
  },
  {
    type: "Psychic",
    name: "Recollect Mind+",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DRAW,
    qty: 3,
  },
]

export const startingData = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 5,
    status: "Feeling Fine",
    effects: {
      buff: null,
      // poisoned: null,
      // stunned: null,
      // armor: null,
      // sheild: null,
      // having one status for an enemy right now should be fine
      // just check the player card played && end of turn.

      // when a card is played,
      // applyStatusHandler in reducer.js should apply poison, etc.
      // (This is where the buffs should be applied as well)
      // at end of turn (endTurnHandler), if enemy has poison, have it bleed.
      // if bleed makes health <= 0, run win condition
      // ---
      // when my turn start
    },
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
          status: STUN,
        },
        {
          name: "sample atk hitting again",
          type: "hit",
          damage: 40,
          status: null,
        },
      ],
    },
    runes: [],
    hand: [],
    discarded: [],
    beginning: false,
  },
  curScene: { scene: "intro", lvl: 1, act: 1 },
  availableRewards: [],
  alert: "",
}

export const sampleItems = [
  {
    name: "Wand of Gameleon",
    desc: "+50 to total health",
    boost: { health: 50 },
    flavortext: `"The Wand of Gameleon's power is has been spoken of 
          in historical texts to give life
          to the one who holds it" -Korvo, the missing link`,
    price: 50,
  },
  {
    name: "Kamuk's Brute Sword",
    desc: "-4 to total health, +3 to base damage",
    boost: { health: -50, baseDMG: 3 },
    flavortext: `Kamuk's prey never stood a chance.
     His rage radiated from him, 
     imbuing everything around with power,
      the grass, his clothes, and his blade.`,
    price: 25,
  },
  {
    name: "Isiaac's Lucky tooth",
    desc: "Every 3 turns, you get an extra energy",
    boost: { rune: "RUNE.LUCKYTOOTH (@TODO: add this)" },
    flavortext: `Isiaac only knew pain, so he didn't realized this was missing`,
    price: 40,
  },
]
export const fullEnergyAmount = 5
