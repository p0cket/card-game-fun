export const startingDeck = [
  {type: "Fire", name: "Flamethrower", num: 2, cost: 1},
  {type: "Water", name: "Gush", num: 2, cost: 1},
  {type: "Poison", name: "Sting", num: 2, cost: 1},
  {type: "Fire", name: "Flamethrower", num: 2, cost: 1},
  {type: "Physical", name: "Throw Fist", num: 3, cost: 2},
  {type: "Physical", name: "Throw Fist", num: 3, cost: 2},
  {type: "Fire", name: "Flamethrower", num: 2, cost: 1},
  {type: "Water", name: "Gush", num: 2, cost: 1},
  {type: "Poison", name: "Sting", num: 2, cost: 1},
  {type: "Fire", name: "Flamethrower", num: 2, cost: 1},
  {type: "Physical", name: "Throw Fist", num: 3, cost: 2},
  {type: "Physical", name: "Throw Fist", num: 3, cost: 2},
];

export const startingData = {
  deck: startingDeck,
  gold: 50,
  hero: {
    health: 100,
    energy: 10,
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
          name: "hitting you",
          type: "hit",
          damage: 20,
          status: "dizzy",
        },
        {
          name: "hitting again",
          type: "hit",
          damage: 40,
          status: "none",
        },
      ],
    },

    hand: [],
    discarded: [],
    beginning: false,
  },
  curScene: { scene: "intro", lvl: 0 },
  alert: "",
};

export const enemies = [
  {
    name: "EvilMan",
    health: 30,
    passive: "none",
    bio: "A bad dude",
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
    health: 15,
    passive: "heal",
    bio: "A bad dude's smaller dude",
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
