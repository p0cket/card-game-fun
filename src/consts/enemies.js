export const allEnemies = {
  1: {
    regular: [
      {
        name: "Chipwing",
        health: 10,
        passive: "none",
        bio: "A furry eye in the sky",
        img: "/creatures/Chipwing2.png",
        status: null,
        attacks: [
          {
            name: "flails tail at you",
            type: "hit",
            damage: 20,
            status: "dizzy",
          },
          { name: "flails tail HARDER", type: "hit", damage: 40, status: null },
        ],
      },
      {
        name: "Zappydillo",
        health: 32,
        passive: "none",
        bio: "An Armadillo with an electric attitude",
        img: "/creatures/Zappydillo.png",
        status: null,
        attacks: [
          {
            name: "Spike Shock",
            type: "hit",
            damage: 12,
            status: "dizzy",
          },
          { name: "Ground Tremble", type: "hit", damage: 3, status: null },
        ],
      },
      // {
      //   name: "EvilMan",
      //   health: 10,
      //   passive: "none",
      //   bio: "A bad dude",
      //   img: null,
      //   status: null,
      //   attacks: [
      //     {
      //       name: "flails fist at you",
      //       type: "hit",
      //       damage: 20,
      //       status: "dizzy",
      //     },
      //     { name: "flails fist HARDER", type: "hit", damage: 40, status: null },
      //   ],
      // },
      {
        name: "Bunster",
        health: 17,
        passive: "none",
        bio: "'The experiment went wrong, and then it started to hop' -Professor Blue",
        status: null,
        img: "/creatures/Bunster.png",
        attacks: [
          { name: "Hop hop crush", type: "hit", damage: 9, status: "dizzy" },
          { name: "Roll Over", type: "hit", damage: 4, status: null },
        ],
      },
      // {
      //   name: "Squidull",
      //   health: 26,
      //   passive: "none",
      //   bio: "Not the sharpest squid in the squad",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Squirt", type: "hit", damage: 10, status: "dizzy" },
      //     { name: "Jet Stream", type: "hit", damage: 15, status: null },
      //   ],
      // },
      // {
      //   name: "Goobie",
      //   health: 15,
      //   passive: "none",
      //   bio: "Slick, slimy, and oozing too much for my taste",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Sliiiime Slap", type: "hit", damage: 6, status: "dizzy" },
      //     { name: "Goo Throw", type: "hit", damage: 4, status: null },
      //   ],
      // },
      // {
      //   name: "PigFi",
      //   health: 30,
      //   passive: "none",
      //   bio: "A blazing pig. This breed is much more happy when not on fire",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Pig Roll", type: "hit", damage: 8, status: "dizzy" },
      //     { name: "Blazing Oink", type: "hit", damage: 12, status: null },
      //   ],
      // },
      // {
      //   name: "Karprocket",
      //   health: 20,
      //   passive: "none",
      //   bio: "A Karp breed that has 6 rocket launchers attached to it",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Rocket Barrage", type: "hit", damage: 14, status: "dizzy" },
      //     { name: "Intense Splash", type: "hit", damage: 5, status: null },
      //   ],
      // },
      // {
      //   name: "Shroomdizz",
      //   health: 18,
      //   passive: "none",
      //   bio: "A mushroom that has spores that make anything dizzy. Even itself.",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Rocket Barrage", type: "hit", damage: 14, status: "dizzy" },
      //     { name: "Intense Splash", type: "hit", damage: 5, status: null },
      //   ],
      // },
      // {
      //   name: "Lackey",
      //   health: 30,
      //   passive: "heal",
      //   bio: "A bad dude's smaller dude",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     {
      //       name: "flails fist weakly",
      //       type: "hit",
      //       damage: 11,
      //       status: "dizzy",
      //     },
      //     { name: "teeny punch", type: "hit", damage: 5, status: null },
      //   ],
      // },
      // {
      //   name: "Grunt",
      //   health: 20,
      //   passive: "boost",
      //   bio: "A crazy guy, don't make him angry",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Big ol' slash", type: "hit", damage: 20, status: "weak" },
      //     { name: "comically bad swipe", type: "hit", damage: 3, status: null },
      //   ],
      // },
      // {
      //   name: "Grunt",
      //   health: 20,
      //   passive: "boost",
      //   bio: "A crazy guy, don't make him angry",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     { name: "Big ol' slash", type: "hit", damage: 20, status: "weak" },
      //     { name: "comically bad swipe", type: "hit", damage: 3, status: null },
      //   ],
      // },
    ],
    mini: [
      {
        name: "EvilMINIBOSSMan",
        health: 60,
        passive: null,
        bio: "A bad dude",
        status: null,
        img: null,
        attacks: [
          {
            name: "flails fist at you",
            type: "hit",
            damage: 20,
            status: "stun",
          },
          {
            name: "flails fist HARDER",
            type: "hit",
            damage: 40,
            status: null,
          },
          {
            name: "too tired to attack",
            type: "hit",
            damage: 0,
            status: null,
          },
          {
            name: "distracted movement",
            type: "hit",
            damage: 0,
            status: null,
          },
        ],
      },
    ],
    boss: [
      {
        name: "EvilACT1BOSSMan",
        health: 120,
        passive: null,
        bio: "A bad dude",
        status: null,
        img: null,
        attacks: [
          {
            name: "flails fist at you",
            type: "hit",
            damage: 20,
            status: "stun",
          },
          {
            name: "flails fist REALLY HARD",
            type: "hit",
            damage: 40,
            status: null,
          },
        ],
      },
    ],
  },
  2: { regular: [], mini: [], boss: [] },
  3: { regular: [], mini: [], boss: [] },
}

// import data from './enemies.json';
// let enemySet = JSON.parse(data)
// console.log("enemySet",enemySet)
// ---
// let data = {}

// fetch("./enemies.json")
//   .then((response) => response.json())
//   .then((json) => {
//     data = json
//     // json is now a JavaScript
//     console.log("our json data", data)
//   })

// export const allEnemies = data
