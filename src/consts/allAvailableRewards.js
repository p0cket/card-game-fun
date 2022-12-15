import { uniqueId } from "../utils/reducer-utils"

export const allAvailableRewards = [
    { type: "poison", name: "drain syphon life", num: 4, cost: 2, id: uniqueId() },
    {
      type: "electric",
      name: "electric symphonies",
      num: 8,
      cost: 1,
      id: uniqueId(),
    },
    {
      type: "normal",
      name: "backstab",
      num: 4,
      cost: 1,
      id: uniqueId(),
    },
    {
      type: "Ice",
      name: "Freeze Blast",
      num: 6,
      cost: 1,
      id: uniqueId(),
    },
    {
      type: "mind",
      name: "hypnotic distress",
      num: 5,
      cost: 1,
      id: uniqueId(),
    },
    {
      type: "pioson",
      name: "Black Ooze",
      num: 9,
      cost: 1,
      id: uniqueId(),
    },
    {
      type: "electric",
      name: "overload",
      num: 11,
      cost: 1,
      id: uniqueId(),
    },
]