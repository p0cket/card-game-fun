//choose between 3 in the beginning to be added to your deck
//packs can have variable rarity of cards that are better, like loot in diablo
import { uniqueId } from "../utils/reducer-utils"
import { EFFECTS } from "../effects"
const { DRAW, STUN, DOUBLEDAMAGE, SLEEP, POISON } = EFFECTS

export const poisonPackBasic = []

export const doubledamagePackBasic = [
  {
    type: "Physical",
    name: "Focus",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Physical",
    name: "Focus",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Physical",
    name: "Focus",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Physical",
    name: "Focus Punch",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Physical",
    name: "Focus Punch",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  {
    type: "Physical",
    name: "Focus Punch",
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
]

export const stunPackBasic = []

export const sleepPackBasic = [
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
    type: "Psychic",
    name: "Hypnosis+",
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: SLEEP,
  },
]

export const startingPack = []
