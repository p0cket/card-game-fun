export const allEnemies = {
  1: {
    regular: [
      {
        name: "EvilMan",
        health: 10,
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
        health: 30,
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
      {
        name: "Grunt",
        health: 20,
        passive: "boost",
        bio: "A crazy guy, don't make him angry",
        status: "none",
        attacks: [
          {
            name: "Big ol' slash",
            type: "hit",
            damage: 20,
            status: "dizzy",
          },
          {
            name: "comically bad swipe",
            type: "hit",
            damage: 3,
            status: "none",
          },
        ],
      },
    ],
    mini: [      {
      name: "EvilMINIBOSSMan",
      health: 60,
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
        {
          name: "too tired to attack",
          type: "hit",
          damage: 0,
          status: "none",
        },
        {
          name: "distracted movement",
          type: "hit",
          damage: 0,
          status: "none",
        },
      ],
    },],
    boss: [      {
      name: "EvilACT1BOSSMan",
      health: 120,
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
          name: "flails fist REALLY HARD",
          type: "hit",
          damage: 40,
          status: "none",
        },
      ],
    },],
  },
  2: { regular: [], mini: [], boss: [] },
  3: { regular: [], mini: [], boss: [] },
};

// export const enemyTypes = {
//   actOne: [],
//   actOneMini: [],
//   actOneBoss: [],
//   actTwo: [],
//   actTwoMini: [],
//   actTwoBoss: [],
//   actThree: [],
//   actThreeMini: [],
//   actThreeBoss: [],
//   finalBoss: [],
//   enemies: [
//     {
//       name: "EvilMan",
//       health: 15,
//       passive: "none",
//       bio: "A bad dude",
//       status: "none",
//       attacks: [
//         {
//           name: "flails fist at you",
//           type: "hit",
//           damage: 20,
//           status: "dizzy",
//         },
//         {
//           name: "flails fist HARDER",
//           type: "hit",
//           damage: 40,
//           status: "none",
//         },
//       ],
//     },
//     {
//       name: "Lackey",
//       health: 10,
//       passive: "heal",
//       bio: "A bad dude's smaller dude",
//       status: "none",
//       attacks: [
//         {
//           name: "flails fist weakly",
//           type: "hit",
//           damage: 11,
//           status: "dizzy",
//         },
//         {
//           name: "teeny punch",
//           type: "hit",
//           damage: 5,
//           status: "none",
//         },
//       ],
//     },
//   ],
// };
