//choose between 3 in the beginning to be added to your deck
//packs can have variable rarity of cards that are better, like loot in diablo
import { uniqueId } from "../utils/reducer-utils"
import { EFFECTS } from "../effects"
const { STUN, DOUBLEDAMAGE, SLEEP, POISON } = EFFECTS

export const poisonPackBasic = {
  title: "Poison",
  desc: `These attacks will Poison the enemy for the amount it says. 
  Poison stacks with each one used.`,
  buttonText: "Professor, inject me",
  img: "/packImages/Poison.png",
  id: 1,
  pack: [
    {
      type: "Poison",
      name: "Toxic Gas",
      num: 0,
      cost: 2,
      id: uniqueId(),
      effect: POISON,
      qty: 3,
    },
    {
      type: "Poison",
      name: "Acid Spray",
      num: 0,
      cost: 2,
      id: uniqueId(),
      effect: POISON,
      qty: 6,
    },
    {
      type: "Poison",
      name: "Toxic Spores",
      num: 0,
      cost: 2,
      id: uniqueId(),
      effect: POISON,
      qty: 6,
    },
    {
      type: "Poison",
      name: "Poisonous Touch",
      num: 0,
      cost: 1,
      id: uniqueId(),
      effect: POISON,
      qty: 6,
    },
    {
      type: "Poison",
      name: "Toxic Ooze",
      num: 0,
      cost: 2,
      id: uniqueId(),
      effect: POISON,
      qty: 6,
    },
    {
      type: "Poison",
      name: "Poisonous Cloud",
      num: 0,
      cost: 2,
      id: uniqueId(),
      effect: POISON,
      qty: 6,
    },
  ],
}

export const doubledamagePackBasic = {
  title: "DoubleDamage",
  desc: `These attacks will apply a buff that doubles your damage 
  for the full turn`,
  buttonText: "Lets get buff!",
  img: "/packImages/DoubleDamage.png",
  id: 2,
  pack: [
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
  ],
}

export const stunPackBasic = {
  title: "Stun",
  desc: `Stun will disable an enemy from attacking for coming attack`,
  buttonText: "Show me how you stunned them",
  img: "/packImages/Stun.png",
  id: 3,
  pack: [
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
  ],
}

export const sleepPackBasic = {
  title: "Sleep",
  desc: `Puts enemies to sleep, disabling them from attacking.
   They chance to wake up at the end of the turn`,
  buttonText: "Teach me hypnosis",
  img: "/packImages/Sleep.png",
  id: 4,
  pack: [
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
  ],
}

export const allBasicPacks = [
  poisonPackBasic,
  doubledamagePackBasic,
  stunPackBasic,
  sleepPackBasic,
]
// export const startingPack = []