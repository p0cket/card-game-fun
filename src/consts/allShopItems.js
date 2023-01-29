import { uniqueId } from "../utils/reducer-utils"
import { EFFECTS } from "../effects"
import { poisonCards } from "./allCards"
const { POISON } = EFFECTS

export const allShopItems = [
  // {
  //   type: "poison",
  //   name: "s_syphon life",
  //   num: 4,
  //   cost: 2,
  //   id: uniqueId(),
  //   effect: POISON,
  //   price: 12,
  // },
  poisonCards.ToxicGas,
  poisonCards.AcidSpray,
  {
    type: "electric",
    name: "s_electric symphonies",
    num: 8,
    cost: 1,
    id: uniqueId(),
    price: 40,
  },
  {
    type: "normal",
    name: "s_backstab",
    num: 4,
    cost: 1,
    id: uniqueId(),
    price: 30,
  },
  // {
  //   type: "ice",
  //   name: "s_freeze blast",
  //   num: 6,
  //   cost: 1,
  //   id: uniqueId(),
  //   price: 60,
  // },
  // {
  //   type: "mind",
  //   name: "s_hypnotic distress",
  //   num: 5,
  //   cost: 1,
  //   id: uniqueId(),
  //   price: 20,
  // },
  {
    type: "pioson",
    name: "s_black ooze",
    num: 9,
    cost: 1,
    id: uniqueId(),
    price: 35,
  },
  {
    type: "Poison",
    name: "Super Acid Spray",
    num: 5,
    cost: 2,
    id: uniqueId(),
    effect: POISON,
    qty: 9,
  },
  {
    type: "electric",
    name: "s_overload",
    num: 11,
    cost: 1,
    id: uniqueId(),
    price: 55,
  },
]
