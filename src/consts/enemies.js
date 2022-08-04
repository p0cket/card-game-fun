export const actOneEnemies = [
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