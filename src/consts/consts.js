import { uniqueId } from '../utils/reducer-utils'
import { EFFECTS } from '../effects'
import { basicCards, stunCards } from './allCards'
const { DRAW, STUN, DOUBLEDAMAGE, SLEEP, POISON } = EFFECTS

export const gameVersion = 'Rebirth: v0.42-p - The bare essentials'

// deprecated: previous iteration consts.
export const startingDeck = [
  { ...basicCards.flame, id: 1 },
  { ...basicCards.flame, id: 2 },
  { ...basicCards.flame, id: 3 },
  { ...basicCards.flame, id: 4 },
  { ...basicCards.flame, id: 5 },
  { ...basicCards.flame, id: 6 },
  { ...basicCards.flame, id: 7 },
  { ...basicCards.flame, id: 8 },
  { ...basicCards.flamethrower, id: 9 },
  { ...basicCards.flamethrower, id: 10 },
  { ...basicCards.flamethrower, id: 11 },
  // { ...stunCards.chaoticBolt, id: 12},
  // { ...stunCards.chaoticBolt, id: 13},
  { ...stunCards.chaoticBolt, id: 14 },
  { ...stunCards.chaoticBolt, id: 15 },
  { ...stunCards.throwFist, id: 12 },
  { ...stunCards.throwFistPlus, id: 13 },
  // { ...buildupCards.channel, id: 14 },
  // { ...buildupCards.channel, id: 15 },
  // {...ddamageCards.focus, id: 18},
  // {...ddamageCards.focusPunch, id: 19},
]

//Needs to be functions anyways so the deck format below won't work
export const startingTestDeck = [
  {
    type: 'Psychic',
    name: 'Hypnosis',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: SLEEP,
  },
  {
    type: 'Psychic',
    name: 'Hypnosis',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: SLEEP,
  },
  {
    type: 'Psychic',
    name: 'Hypnosis+',
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: SLEEP,
  },
  {
    type: 'Grass',
    name: 'Leaf Storm',
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: DOUBLEDAMAGE,
  },
  // {
  //   type: "Grass",
  //   name: "Leaf Storm",
  //   num: 2,
  //   cost: 1,
  //   id: uniqueId(),
  //   effect: DOUBLEDAMAGE,
  // },
  {
    type: 'Fire',
    name: 'Flamethrower',
    num: 4,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: 'Fire',
    name: 'Flamethrower',
    num: 4,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: 'Fire',
    name: 'Flamethrower+',
    num: 8,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: 'Water',
    name: 'Gush',
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: 'Water',
    name: 'Gush+',
    num: 6,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: 'Poison',
    name: 'Sting',
    num: 2,
    cost: 1,
    id: uniqueId(),
    effect: POISON,
  },
  {
    type: 'Poison',
    name: 'Sting+',
    num: 5,
    cost: 1,
    id: uniqueId(),
    effect: null,
  },
  {
    type: 'Physical',
    name: 'Throw Fist',
    num: 3,
    cost: 2,
    id: uniqueId(),
    effect: STUN,
  },
  {
    type: 'Physical',
    name: 'Throw Fist+',
    num: 5,
    cost: 2,
    id: uniqueId(),
    effect: STUN,
  },
  {
    type: 'Psychic',
    name: 'Think',
    num: 0,
    cost: 0,
    id: uniqueId(),
    effect: DRAW,
    qty: 1,
  },
  {
    type: 'Psychic',
    name: 'Think+',
    num: 0,
    cost: 0,
    id: uniqueId(),
    effect: DRAW,
    qty: 2,
  },
  {
    type: 'Psychic',
    name: 'Recollect Mind',
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DRAW,
    qty: 2,
  },
  {
    type: 'Psychic',
    name: 'Recollect Mind+',
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: DRAW,
    qty: 3,
  },
  //
  {
    type: 'Poison',
    name: 'Toxic Gas',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 3,
  },
  {
    type: 'Poison',
    name: 'Venomous Bite',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
  {
    type: 'Poison',
    name: 'Poison Needle',
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
  {
    type: 'Poison',
    name: 'Acid Spray',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
  {
    type: 'Poison',
    name: 'Toxic Spores',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
  {
    type: 'Poison',
    name: 'Poisonous Touch',
    num: 0,
    cost: 1,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
  {
    type: 'Poison',
    name: 'Toxic Ooze',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
  {
    type: 'Poison',
    name: 'Poisonous Cloud',
    num: 0,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 6,
  },
]

export const startingData = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 5,
    status: 'Feeling Fine',
    effects: {
      buff: null,
      buildup: 1,
    },
    maxHP: 100,
    maxEnergy: 5,
    armor: 0,
    power: 0,
  },
  battle: {
    enemy: {
      name: 'sample guy',
      bio: 'just a standaard enemy',
      health: '30',
      maxHP: '30',
      energy: 6,
      status: 'none',
      nextAttack: 'none',
      attacks: [
        {
          name: 'sample atk hitting you',
          type: 'hit',
          damage: 20,
          status: STUN,
        },
        {
          name: 'sample atk hitting again',
          type: 'hit',
          damage: 40,
          status: null,
        },
      ],
    },
    runes: [],
    hand: [],
    discarded: [],
    beginning: false,
    dialog: null,
  },
  curScene: { scene: 'intro', lvl: 1, act: 1 },
  curEvent: null,
  availableRewards: [],
  alert: '',

  // alert: "--- Cards PERMANENTLY go away. They can only be used once ---",
  eventResultObj: null,
  devMode: false,
}

export const sampleItems = [
  {
    name: 'Wand of Gameleon',
    desc: '+50 to total health',
    boost: { health: 50 },
    flavortext: `"The Wand of Gameleon's power is has been spoken of 
          in historical texts to give life
          to the one who holds it" -Korvo, the missing link`,
    price: 50,
  },
  {
    name: "Kamuk's Brute Sword",
    desc: '-4 to total health, +3 to base damage',
    boost: { health: -50, baseDMG: 3 },
    flavortext: `Kamuk's prey never stood a chance.
     His rage radiated from him, 
     imbuing everything around with power,
      the grass, his clothes, and his blade.`,
    price: 25,
  },
  {
    name: "Isiaac's Lucky tooth",
    desc: 'Every 3 turns, you get an extra energy',
    boost: { rune: 'RUNE.LUCKYTOOTH (@TODO: add this)' },
    flavortext: `Isiaac only knew pain, so he didn't realized this was missing`,
    price: 40,
  },
]
export const fullEnergyAmount = 5
export const startHandCount = 8
export const poisonDamage = 5

export const energyEmoji = '🧪'
export const goldEmoji = '💰'
export const dmgEmoji = '👊'
export const clockEmoji = '⏰'

export const PLAYERS = {
  HUMAN: 'human',
  AI: 'AI',
}
