export const allEnemies = {
  1: {
    regular: [
      {
        name: "Chipwing",
        health: 10,
        maxHP: 10,
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
        maxHP: 32,
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
        maxHP: 17,
        passive: "none",
        bio: "'The experiment went wrong, and then it started to hop' -Professor Blue",
        status: null,
        img: "/creatures/Bunster.png",
        attacks: [
          { name: "Hop hop crush", type: "hit", damage: 9, status: "dizzy" },
          { name: "Roll Over", type: "hit", damage: 4, status: null },
        ],
      },
      {
        name: "Squidull",
        health: 26,
        maxHP: 26,
        passive: "none",
        bio: "Not the sharpest squid in the squad",
        status: null,
        img: "/creatures/Squidull.png",
        attacks: [
          { name: "Squirt", type: "hit", damage: 10, status: "dizzy" },
          { name: "Jet Stream", type: "hit", damage: 15, status: null },
        ],
      },
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
        name: "FrostFang (MiniBoss)",
        health: 70,
        maxHP: 70,
        passive: null,
        bio: "A dragon made of ice that can freeze its enemies with a single touch. It's piercing blue eyes and shimmering crystalline scales are near hypnotic",
        img: "/creatures/bosses/Frostfang.png",
        status: null,
        attacks: [
          {
            name: "Frostbite",
            type: "hit",
            damage: 20,
            status: "stun",
          },
          {
            name: "Ice Storm",
            type: "hit",
            damage: 40,
            status: null,
          },
          {
            name: "Frost Wing",
            type: "hit",
            damage: 25,
            status: null,
          },
          {
            name: "Distracted Movement",
            type: "hit",
            damage: 0,
            status: null,
          },
          {
            name: "Too Tired",
            type: "hit",
            damage: 0,
            status: null,
          },
          {
            name: "Absolute Zero",
            type: "hit",
            damage: 45,
            status: null,
          },
          /*Frostbite - a biting attack that infuses the enemy's bloodstream with ice, causing severe frostbite and slowing their movement. Damage: 20-30. Status effect: Slow (reduces speed and agility).
          Glacial Spike - the dragon summons a shard of ice and impales the enemy with it, causing massive damage. Damage: 50-70. Status effect: None.
          Ice Storm - the dragon creates a storm of ice and snow that rains down on the battlefield, freezing enemies and reducing their visibility. Damage: 10-20 per turn for 3 turns. Status effect: Freeze (prevents movement and action).
          Frost Nova - the dragon releases a burst of icy energy that explodes outwards, freezing all enemies in a radius around it. Damage: 30-50. Status effect: Freeze (prevents movement and action).
          Absolute Zero - the dragon focuses its power and lowers the temperature around it to absolute zero, causing the enemy's fluids to freeze and shatter their body. Damage: 90-100. Status effect: None. */
        ],
      },
      {
        name: "Moltenscale (MiniBoss)",
        health: 72,
        maxHP: 72,
        passive: null,
        bio: "A fiery dragon dragon with bright red scales, a smoldering gaze, volcanic breath, and an ash-covered body.",
        img: "/creatures/bosses/Moltenscale.png",
        status: null,
        attacks: [
          {
            name: "Flame Breath",
            type: "hit",
            damage: 15,
            status: "stun",
          },
          {
            name: "Inferno Tail",
            type: "hit",
            damage: 20,
            status: null,
          },
          {
            name: "Lava Blast",
            type: "hit",
            damage: 25,
            status: null,
          },
          {
            name: "Emberstrom",
            type: "hit",
            damage: 18,
            status: null,
          },
          {
            name: "Incinerate",
            type: "hit",
            damage: 40,
            status: null,
          },
          {
            name: "Distracted Movement",
            type: "hit",
            damage: 0,
            status: null,
          },
          {
            name: "Too Tired",
            type: "hit",
            damage: 0,
            status: null,
          },
          /*Flame Breath - a stream of flames that engulfs the enemies and causes severe burns. Damage: 30-50. Status effect: Burn (causes ongoing damage each turn).
          Inferno Wings - the dragon beats its wings, creating a whirlwind of flames that engulfs the battlefield. Damage: 45-65. Status effect: Burn (causes ongoing damage each turn).
          Lava Blast - the dragon summons a ball of molten lava and hurls it at the enemies, causing massive damage. Damage: 70-90. Status effect: Burn (causes ongoing damage each turn).
          Emberstorm - the dragon generates a storm of embers and ashes that rains down on the enemies, obscuring their vision and causing ongoing burn damage. Damage: 20-40 per turn for 3 turns. Status effect: Burn (causes ongoing damage each turn).
          Incinerate - the dragon focuses its flame control and incinerates a single enemy, leaving them nothing but ashes. Damage: 90-100. Status effect: None. */
        ],
      },
      // {
      //   name: "EvilMINIBOSSMan",
      //   health: 60,
      //   passive: null,
      //   bio: "A bad dude",
      //   status: null,
      //   img: null,
      //   attacks: [
      //     {
      //       name: "flails fist at you",
      //       type: "hit",
      //       damage: 20,
      //       status: "stun",
      //     },
      //     {
      //       name: "flails fist HARDER",
      //       type: "hit",
      //       damage: 40,
      //       status: null,
      //     },
      //     {
      //       name: "too tired to attack",
      //       type: "hit",
      //       damage: 0,
      //       status: null,
      //     },
      //     {
      //       name: "distracted movement",
      //       type: "hit",
      //       damage: 0,
      //       status: null,
      //     },
      //   ],
      // },
    ],
    boss: [
      {
        name: "Collos",
        health: 120,
        maxHP: 120,
        passive: null,
        bio: "The Gelatinous Behemoth is a fearsome predator that roams the swamps and marshes, devouring anything in its path. Its massive size and powerful, slimy tentacles make it almost unstoppable.",
        img: "/creatures/bosses/BossColoss.png",
        status: null,
        attacks: [
          {
            name: "Slime Volley",
            type: "hit",
            damage: 20,
            status: "stun",
          },
          {
            name: "Goop Geyser",
            type: "hit",
            damage: 12,
            status: null,
          },
          {
            name: "Corrosive Ooze",
            type: "hit",
            damage: 40,
            status: null,
          },
          {
            name: "Distracted Movement",
            type: "hit",
            damage: 0,
            status: null,
          },
          {
            name: "Too Tired",
            type: "hit",
            damage: 0,
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
