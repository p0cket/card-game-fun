import PropTypes from 'prop-types'
import {
  ComfortingHug,
  CuteCharm,
  EmotionDrain,
  FeatherGlide,
  GlowingCharm,
  LightBeam,
  LuminousFlight,
  QuickStrike,
  SolarSpiritBlast,
  Teleport,
  WarmEmbrace,
  WiseGaze,
} from '../allMoves'

// Energy/Mana (MP): Resource used for monster abilities.
// Level: The monster's level.
// Attack Power: Base damage dealt by the monster's attacks.
// Defense: Reduces incoming damage for the monster.
// Speed: Determines turn order for monsters.
// Affinity/Type: Elemental or creature type.
// Experience Points (XP): To track monster progression and leveling.

export const monsterPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  elemental_type: PropTypes.string.isRequired,
  creature_type: PropTypes.string.isRequired,
  specialty_group: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  quirks: PropTypes.arrayOf(PropTypes.string).isRequired,
  stats: PropTypes.shape({
    hp: PropTypes.number.isRequired,
    max_hp: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    special_attack: PropTypes.number.isRequired,
    special_defense: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  strengths: PropTypes.arrayOf(PropTypes.string).isRequired,
  weaknesses: PropTypes.arrayOf(PropTypes.string).isRequired,
  cost: PropTypes.number.isRequired,
  lvl: PropTypes.number.isRequired,
  experience: PropTypes.number.isRequired,
  moves: PropTypes.arrayOf(PropTypes.string).isRequired,
  possible_moves: PropTypes.arrayOf(PropTypes.string).isRequired,
  passive_ability: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  lore: PropTypes.string.isRequired,
})
export const Luminowl = {
  id: 1,
  name: 'Luminowl',
  elemental_type: 'Light',
  creature_type: 'Owl',
  specialty_group: 'Mystic',
  nature: 'Wise',
  quirks: ['Guiding Light', 'Soothing Feathers'],
  stats: {
    hp: 91,
    max_hp: 111,
    attack: 80,
    defense: 60,
    special_attack: 120,
    special_defense: 90,
    speed: 110,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Dark'],
  weaknesses: ['Fire'],
  cost: 500,
  lvl: 50,
  experience: 5000,
  status: { test: true },
  // moves: ['Light Beam', 'Wise Gaze', 'Feather Glide'],
  moves: [LightBeam, WiseGaze, FeatherGlide],
  possible_moves: ['Luminous Aura', 'Mystic Sight', 'Soothing Melody'],
  passive_ability: 'Guiding Wisdom',
  commander_ability: {
    name: 'Luminous Nova',
    description:
      "Creates a blinding explosion of light, damaging all enemies and boosting the team's accuracy and evasion.",
  },
  image: 'pals/Luminowl_pxl.png',
  description:
    'A wise owl with feathers that emit a soothing light, guiding lost travelers.',
  size: 'Medium',
  weight: 'Light',
  lore: "Legends speak of Luminowl's ability to bring light and wisdom to those in need.",
}

export const Shadowstalker = {
  id: 2,
  name: 'Shadowstalker',
  elemental_type: 'Dark',
  creature_type: 'Panther',
  specialty_group: 'Stealth',
  nature: 'Stealthy',
  quirks: ['Ambush Predator', 'Shadow Cloak'],
  stats: {
    hp: 100,
    max_hp: 190,
    attack: 110,
    defense: 70,
    special_attack: 80,
    special_defense: 60,
    speed: 120,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Nature'],
  weaknesses: ['Light'],
  cost: 500,
  lvl: 50,
  experience: 5000,
  status: {},

  moves: ['Shadow Pounce', 'Stealth Strike', 'Dark Cloak'],
  possible_moves: ['Shadowmeld', 'Nightmare Slash', 'Ambush'],
  passive_ability: 'Cloaked in Shadows',
  commander_ability: {
    name: 'Shadow Assault',
    description:
      "Launches a surprise attack from the shadows, dealing massive damage and inflicting the 'Shadowed' status on the target, reducing their accuracy and evasion.",
  },
  image: 'creatures/Chibipal.png',
  description:
    'A stealthy panther-like creature that lurks in the dark, ambushing foes with precision.',
  size: 'Medium',
  weight: 'Light',
  lore: "Legends speak of Shadowstalker's ability to strike from the shadows with unmatched precision.",
}

export const Infernodragon = {
  id: 3,
  name: 'Infernodragon',
  elemental_type: 'Fire',
  creature_type: 'Dragon',
  specialty_group: 'Mystic',
  nature: 'Destructive',
  quirks: ['Flame Breather', 'Inferno Creator'],
  stats: {
    hp: 120,
    max_hp: 190,
    attack: 140,
    defense: 90,
    special_attack: 160,
    special_defense: 110,
    speed: 100,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Grass', 'Bug'],
  weaknesses: ['Water', 'Ice'],
  cost: 600,
  lvl: 55,
  experience: 5500,
  status: {},

  moves: ['Inferno Roar', 'Dragon Blaze', 'Firestorm'],
  possible_moves: ['Magma Eruption', 'Dragon Rage', 'Heat Wave'],
  passive_ability: 'Scorching Scales',
  commander_ability: {
    name: 'Inferno Apocalypse',
    description:
      "Unleashes an apocalyptic firestorm, dealing massive area damage over time to all enemies and leaving them with the 'Burned' status effect.",
  },
  image: 'creatures/Chibipal.png',
  description:
    'A fearsome dragon that embodies the destructive power of fire, capable of causing infernos.',
  size: 'Large',
  weight: 'Heavy',
  lore: "Legends speak of Infernodragon's ability to bring devastation with its fiery breath.",
}

export const Aquaphoenix = {
  id: 4,
  name: 'Aquaphoenix',
  elemental_type: 'Water',
  creature_type: 'Phoenix',
  specialty_group: 'Mystic',
  nature: 'Majestic',
  quirks: ['Water Manipulator', 'Rainmaker'],
  stats: {
    hp: 110,
    max_hp: 190,
    attack: 80,
    defense: 70,
    special_attack: 130,
    special_defense: 100,
    speed: 120,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Fire'],
  weaknesses: ['Electric', 'Ice'],
  cost: 550,
  lvl: 52,
  experience: 5200,
  status: {},

  moves: ['Aqua Torrent', 'Phoenix Glide', 'Rain Dance'],
  possible_moves: ['Tidal Wave', 'Hydroburst', 'Aqua Healing'],
  passive_ability: 'Aqua Resurrection',
  commander_ability: {
    name: 'Deluge of Renewal',
    description:
      'Summons a massive tidal wave, healing the team to full health and removing all negative status effects while damaging enemies.',
  },
  image: 'creatures/Chibipal.png',
  description:
    'A majestic bird with the ability to control water, summoning rainstorms and quenching fires.',
  size: 'Large',
  weight: 'Light',
  lore: "Legends speak of Aquaphoenix's ability to bring life-giving rains to drought-stricken lands.",
}

export const Verdantshifter = {
  id: 5,
  name: 'Verdantshifter',
  elemental_type: 'Nature',
  creature_type: 'Shapeshifter',
  specialty_group: 'Mystic',
  nature: 'Adaptive',
  quirks: ['Morphing Mastery', 'Environmental Guardian'],
  stats: {
    hp: 90,
    max_hp: 90,
    attack: 70,
    defense: 80,
    special_attack: 100,
    special_defense: 120,
    speed: 110,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Water', 'Ground'],
  weaknesses: ['Fire', 'Ice'],
  cost: 450,
  lvl: 48,
  experience: 4800,
  status: {},

  moves: ["Nature's Transformation", 'Shapeshift', 'Eco Restoration'],
  possible_moves: ['Plant Manipulation', 'Camouflage', 'Adaptive Form'],
  passive_ability: "Nature's Harmony",
  commander_ability: {
    name: "Nature's Blessing",
    description:
      'Calls upon the spirits of nature to bless the team, increasing their stats and granting temporary immunity to status effects.',
  },
  image: 'pals/Luminowl_pxl.png',
  description:
    'A creature that can transform into various plant forms, aiding in environmental restoration.',
  size: 'Medium',
  weight: 'Medium',
  lore: "Legends speak of Verdantshifter's ability to restore balance to nature with its morphing skills.",
}

export const Technotitan = {
  id: 6,
  name: 'Technotitan',
  elemental_type: 'Tech',
  creature_type: 'Giant',
  specialty_group: 'Mechanical',
  nature: 'Protective',
  quirks: ['Mechanical Guardian', 'Advanced Arsenal'],
  stats: {
    hp: 150,
    max_hp: 190,
    attack: 130,
    defense: 140,
    special_attack: 80,
    special_defense: 100,
    speed: 60,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Electric', 'Steel'],
  weaknesses: ['Water', 'Nature'],
  cost: 750,
  lvl: 60,
  experience: 6000,
  status: {},

  moves: ['Mechanical Slam', 'Energy Beam', 'Defense Protocol'],
  possible_moves: ['Rocket Punch', 'Repair Mode', 'Techno Shield'],
  passive_ability: 'Guardian Armor',
  commander_ability: {
    name: 'Techno Overload',
    description:
      'Overloads its advanced systems, releasing a powerful shockwave that damages all enemies and paralyzes them.',
  },
  image: 'creatures/Chibipal.png',
  description:
    'A colossal, mechanical giant armed with advanced weaponry, created to protect civilization.',
  size: 'Giant',
  weight: 'Heavy',
  lore: "Legends speak of Technotitan's ability to defend cities and civilizations from threats with its advanced technology.",
}

export const Glowbuggle = {
  id: 7,
  name: 'Glowbuggle',
  elemental_type: 'Light',
  creature_type: 'Firefly',
  specialty_group: 'Bioluminescent',
  nature: 'Illuminating',
  quirks: ['Warm Light Emission', 'Comforting Glow'],
  stats: {
    hp: 80,
    max_hp: 90,
    attack: 50,
    defense: 40,
    special_attack: 100,
    special_defense: 70,
    speed: 120,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Dark'],
  weaknesses: ['Electric', 'Ice'],
  cost: 400,
  lvl: 40,
  experience: 4000,
  status: {},

  // moves: ['Luminous Flight', 'Glowing Charm', 'Warm Embrace'],
  moves: [LuminousFlight, GlowingCharm, WarmEmbrace],
  possible_moves: [
    'Bioluminescent Burst',
    'Soothing Radiance',
    'Glowing Trail',
  ],
  passive_ability: 'Radiant Aura',
  commander_ability: {
    name: 'Radiant Infusion',
    description:
      'Radiates an intense aura of warmth and comfort, healing the team and increasing their resistance to status effects.',
  },
  image: 'creatures/Chibipal.png',
  description:
    'Small, firefly-like creatures with bioluminescent wings that emit a warm, comforting light.',
  size: 'Tiny',
  weight: 'Light',
  lore: "Legends speak of Glowbuggle's ability to bring comfort and light to those in the darkest of nights.",
}

export const Umbrabunny = {
  id: 8,
  name: 'Umbrabunny',
  elemental_type: 'Dark',
  creature_type: 'Bunny',
  specialty_group: 'Emotion Absorber',
  nature: 'Adorable',
  quirks: ['Emotion Sponge', 'Reassuring Presence'],
  stats: {
    hp: 90,
    max_hp: 90,
    attack: 60,
    defense: 70,
    special_attack: 80,
    special_defense: 110,
    speed: 120,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Light'],
  weaknesses: ['Fighting', 'Psychic'],
  cost: 450,
  lvl: 48,
  experience: 4800,
  status: {},

  // moves: ['Emotion Drain', 'Cute Charm', 'Comforting Hug'],
  moves: [EmotionDrain, CuteCharm, ComfortingHug],
  possible_moves: ['Dark Aura', 'Empathy Wave', 'Peaceful Presence'],
  passive_ability: 'Emotion Balance',
  commander_ability: {
    name: 'Harmony Embrace',
    description:
      'Radiates an aura of emotional harmony, calming all foes and allies. Reduces the power of enemy attacks and status effects.',
  },
  image: 'pals/Umbrabunny_pxl.png',
  description:
    'Adorable, bunny-like creatures with the ability to absorb and dispel negative emotions.',
  size: 'Small',
  weight: 'Light',
  lore: "Legends speak of Umbrabunny's ability to bring comfort and emotional balance to troubled hearts.",
}

export const Recycleroo = {
  id: 9,
  name: 'Recycleroo',
  elemental_type: 'Nature',
  creature_type: 'Kangaroo',
  specialty_group: 'Eco-Protector',
  nature: 'Environmentally Conscious',
  quirks: ['Recycling Expert', 'Projectile Thrower'],
  stats: {
    hp: 110,
    max_hp: 190,
    attack: 100,
    defense: 80,
    special_attack: 60,
    special_defense: 80,
    speed: 90,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Electric', 'Ground'],
  weaknesses: ['Fire', 'Ice'],
  cost: 550,
  lvl: 55,
  experience: 5500,
  status: {},

  moves: ['Recycle Rush', 'Projectile Toss', 'Leaf Shield'],
  possible_moves: ['Trash Bash', "Nature's Wrath", 'Sorting Cyclone'],
  passive_ability: 'Eco-Warrior',
  commander_ability: {
    name: 'Eco Barrage',
    description:
      'Launches a barrage of eco-friendly projectiles, dealing damage to all enemies and reducing their attack power.',
  },
  image: 'recycleroo_image.png',
  description:
    'A kangaroo that collects and sorts recyclables but throws them as projectiles.',
  size: 'Medium',
  weight: 'Moderate',
  lore: 'Recycleroo is known for its dedication to environmental protection, using recycled materials to defend nature.',
}

//this doesn't have and above and for shoe
export const Shoe = {
  name: 'Shoe',
  lore: "A lost shoe that somehow became a commander. It doesn't have any special abilities or moves.",
  image: '/shoe_image.png',
  elemental_type: 'None',
  creature_type: 'Lost Item',
  specialty_group: 'Ordinary',
  nature: 'Inanimate',
  quirks: ['Lost and Found'],
  status: {},

  stats: {
    hp: 10,
    max_hp: 10,
    attack: 1,
    defense: 1,
    special_attack: 1,
    special_defense: 1,
    speed: 1,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: [],
  weaknesses: [],
  cost: 1,
  lvl: 1,
  experience: 0,
  moves: ['Tread Lightly'],
  possible_moves: [],
  passive_ability: 'Forgotten',
}

export const Wolfjobb = {
  name: 'Wolfjobb',
  lore: "A wolf with an amazing work ethic. It leads by example but doesn't have any special commander abilities or moves.",
  image: '/wolfjobb_image.png',
  elemental_type: 'Nature',
  creature_type: 'Wolf',
  specialty_group: 'Industrious',
  nature: 'Diligent',
  quirks: ['Workaholic', 'Pack Leader'],
  status: {},

  stats: {
    hp: 80,
    max_hp: 80,
    attack: 90,
    defense: 70,
    special_attack: 50,
    special_defense: 60,
    speed: 100,
  },
  enterAbility:
    'on enter, does something cool. Otherwise no ability and have it stick around',
  strengths: ['Water', 'Ground'],
  weaknesses: ['Fire', 'Ice'],
  cost: 400,
  lvl: 40,
  experience: 4000,
  moves: ['Workaholic Bite', 'Diligent Howl', 'Teamwork'],
  possible_moves: ['Overtime Strike', 'Efficiency Boost', 'Persistence'],
  passive_ability: 'Leadership',
}

export const Ticklefairy = {
  name: 'Ticklefairy',
  lore: 'Ticklefairy is a mischievous fairy that spreads laughter and joy wherever it goes.',
  image: 'pals/Ticklefairy_pxl.png',
  elemental_type: 'Light',
  creature_type: 'Fairy',
  specialty_group: 'Joybringer',
  nature: 'Playful',
  quirks: ['Tickle Magician', 'Laughter Enchanter'],
  stats: {
    hp: 80,
    max_hp: 80,
    attack: 40,
    defense: 50,
    special_attack: 120,
    special_defense: 100,
    speed: 150,
  },
  enterAbility:
    'Ticklefairy enters with a burst of laughter, raising the spirits of its allies.',
  strengths: ['Dark'],
  weaknesses: ['Electric', 'Poison'],
  cost: 400,
  lvl: 40,
  experience: 4000,
  status: { test: true },
  moves: [QuickStrike, SolarSpiritBlast, Teleport],
  // moves: ["Tickle Whirlwind", "Giggle Spark", "Joyful Charm"],
  possible_moves: ['Laughter Explosion', 'Tickle Dance', 'Happy Hug'],
  passive_ability: 'Joyful Aura',
}

//types: Foodbased, Water, Earth, Fire, Air,
// Light, Dark, None, Physical, Magical, Nature
//

export const testPals = [
  Luminowl,
  Glowbuggle,
  Umbrabunny,
  Infernodragon,
  Aquaphoenix,
  Verdantshifter,
  Technotitan,
]

// export const Luminowl = {
//   id: 1,
//   name: "Luminowl",
//   elemental_type: "Light",
//   creature_type: "Owl",
//   specialty_group: "Mystic",
//   nature: "Wise",
//   quirks: ["Guiding Light", "Soothing Feathers"],
//   stats: {
//     hp: 100,
//     max_hp: 190,

//     attack: 80,
//     defense: 60,
//     special_attack: 120,
//     special_defense: 90,
//     speed: 110,
//   },
//   strengths: ["Dark"],
//   weaknesses: ["Fire"],
//   cost: 500,
//   lvl: 50,
//   experience: 5000,
//   moves: ["Light Beam", "Wise Gaze", "Feather Glide"],
//   possible_moves: ["Luminous Aura", "Mystic Sight", "Soothing Melody"],
//   passive_ability: "Guiding Wisdom",
//   image: "/pals/Luminowl_pxl.png",
//   description:
//     "A wise owl with feathers that emit a soothing light, guiding lost travelers.",
//   size: "Medium",
//   weight: "Light",
//   lore: "Legends speak of Luminowl's ability to bring light and wisdom to those in need.",
// };

// export const Shadowstalker = {
//   id: 2,

//   name: "Shadowstalker",
//   elemental_type: "Dark",
//   creature_type: "Panther",
//   specialty_group: "Stealth",
//   nature: "Stealthy",
//   quirks: ["Ambush Predator", "Shadow Cloak"],
//   stats: {
//     hp: 100,
//     max_hp: 190,

//     attack: 110,
//     defense: 70,
//     special_attack: 80,
//     special_defense: 60,
//     speed: 120,
//   },
//   strengths: ["Nature"],
//   weaknesses: ["Light"],
//   cost: 500,
//   lvl: 50,
//   experience: 5000,
//   moves: ["Shadow Pounce", "Stealth Strike", "Dark Cloak"],
//   possible_moves: ["Shadowmeld", "Nightmare Slash", "Ambush"],
//   passive_ability: "Cloaked in Shadows",
//   image: "/creatures/Chibipal.png",
//   description:
//     "A stealthy panther-like creature that lurks in the dark, ambushing foes with precision.",
//   size: "Medium",
//   weight: "Light",
//   lore: "Legends speak of Shadowstalker's ability to strike from the shadows with unmatched precision.",
// };

// export const Infernodragon = {
//   id: 3,

//   name: "Infernodragon",
//   elemental_type: "Fire",
//   creature_type: "Dragon",
//   specialty_group: "Mystic",
//   nature: "Destructive",
//   quirks: ["Flame Breather", "Inferno Creator"],
//   stats: {
//     hp: 120,
//     max_hp: 190,

//     attack: 140,
//     defense: 90,
//     special_attack: 160,
//     special_defense: 110,
//     speed: 100,
//   },
//   strengths: ["Grass", "Bug"],
//   weaknesses: ["Water", "Ice"],
//   cost: 600,
//   lvl: 55,
//   experience: 5500,
//   moves: ["Inferno Roar", "Dragon Blaze", "Firestorm"],
//   possible_moves: ["Magma Eruption", "Dragon Rage", "Heat Wave"],
//   passive_ability: "Scorching Scales",
//   image: "/creatures/Chibipal.png",
//   description:
//     "A fearsome dragon that embodies the destructive power of fire, capable of causing infernos.",
//   size: "Large",
//   weight: "Heavy",
//   lore: "Legends speak of Infernodragon's ability to bring devastation with its fiery breath.",
// };

// export const Aquaphoenix = {
//   id: 4,

//   name: "Aquaphoenix",
//   elemental_type: "Water",
//   creature_type: "Phoenix",
//   specialty_group: "Mystic",
//   nature: "Majestic",
//   quirks: ["Water Manipulator", "Rainmaker"],
//   stats: {
//     hp: 110,
//     max_hp: 190,

//     attack: 80,
//     defense: 70,
//     special_attack: 130,
//     special_defense: 100,
//     speed: 120,
//   },
//   strengths: ["Fire"],
//   weaknesses: ["Electric", "Ice"],
//   cost: 550,
//   lvl: 52,
//   experience: 5200,
//   moves: ["Aqua Torrent", "Phoenix Glide", "Rain Dance"],
//   possible_moves: ["Tidal Wave", "Hydroburst", "Aqua Healing"],
//   passive_ability: "Aqua Resurrection",
//   image: "/creatures/Chibipal.png",
//   description:
//     "A majestic bird with the ability to control water, summoning rainstorms and quenching fires.",
//   size: "Large",
//   weight: "Light",
//   lore: "Legends speak of Aquaphoenix's ability to bring life-giving rains to drought-stricken lands.",
// };

// export const Verdantshifter = {
//   id: 5,

//   name: "Verdantshifter",
//   elemental_type: "Nature",
//   creature_type: "Shapeshifter",
//   specialty_group: "Mystic",
//   nature: "Adaptive",
//   quirks: ["Morphing Mastery", "Environmental Guardian"],
//   stats: {
//     hp: 90,
//     max_hp: 90,

//     attack: 70,
//     defense: 80,
//     special_attack: 100,
//     special_defense: 120,
//     speed: 110,
//   },
//   strengths: ["Water", "Ground"],
//   weaknesses: ["Fire", "Ice"],
//   cost: 450,
//   lvl: 48,
//   experience: 4800,
//   moves: ["Nature's Transformation", "Shapeshift", "Eco Restoration"],
//   possible_moves: ["Plant Manipulation", "Camouflage", "Adaptive Form"],
//   passive_ability: "Nature's Harmony",
//   image: "/pals/Luminowl_pxl.png",
//   description:
//     "A creature that can transform into various plant forms, aiding in environmental restoration.",
//   size: "Medium",
//   weight: "Medium",
//   lore: "Legends speak of Verdantshifter's ability to restore balance to nature with its morphing skills.",
// };

// export const Technotitan = {
//   id: 6,

//   name: "Technotitan",
//   elemental_type: "Tech",
//   creature_type: "Giant",
//   specialty_group: "Mechanical",
//   nature: "Protective",
//   quirks: ["Mechanical Guardian", "Advanced Arsenal"],
//   stats: {
//     hp: 150,
//     max_hp: 190,

//     attack: 130,
//     defense: 140,
//     special_attack: 80,
//     special_defense: 100,
//     speed: 60,
//   },
//   strengths: ["Electric", "Steel"],
//   weaknesses: ["Water", "Nature"],
//   cost: 750,
//   lvl: 60,
//   experience: 6000,
//   moves: ["Mechanical Slam", "Energy Beam", "Defense Protocol"],
//   possible_moves: ["Rocket Punch", "Repair Mode", "Techno Shield"],
//   passive_ability: "Guardian Armor",
//   image: "/creatures/Chibipal.png",
//   description:
//     "A colossal, mechanical giant armed with advanced weaponry, created to protect civilization.",
//   size: "Giant",
//   weight: "Heavy",
//   lore: "Legends speak of Technotitan's ability to defend cities and civilizations from threats with its advanced technology.",
// };

// export const Glowbuggle = {
//   id: 7,
//   name: "Glowbuggle",
//   elemental_type: "Light",
//   creature_type: "Firefly",
//   specialty_group: "Bioluminescent",
//   nature: "Illuminating",
//   quirks: ["Warm Light Emission", "Comforting Glow"],
//   stats: {
//     hp: 80,
//     max_hp: 90,
//     attack: 50,
//     defense: 40,
//     special_attack: 100,
//     special_defense: 70,
//     speed: 120,
//   },
//   strengths: ["Dark"],
//   weaknesses: ["Electric", "Ice"],
//   cost: 400,
//   lvl: 40,
//   experience: 4000,
//   moves: ["Luminous Flight", "Glowing Charm", "Warm Embrace"],
//   possible_moves: [
//     "Bioluminescent Burst",
//     "Soothing Radiance",
//     "Glowing Trail",
//   ],
//   passive_ability: "Radiant Aura",
//   image: "/creatures/Chibipal.png",
//   description:
//     "Small, firefly-like creatures with bioluminescent wings that emit a warm, comforting light.",
//   size: "Tiny",
//   weight: "Light",
//   lore: "Legends speak of Glowbuggle's ability to bring comfort and light to those in the darkest of nights.",
// };

// export const Umbrabunny = {
//   id: 8,
//   name: "Umbrabunny",
//   elemental_type: "Dark",
//   creature_type: "Bunny",
//   specialty_group: "Emotion Absorber",
//   nature: "Adorable",
//   quirks: ["Emotion Sponge", "Reassuring Presence"],
//   stats: {
//     hp: 90,
//     max_hp: 90,
//     attack: 60,
//     defense: 70,
//     special_attack: 80,
//     special_defense: 110,
//     speed: 120,
//   },
//   strengths: ["Light"],
//   weaknesses: ["Fighting", "Psychic"],
//   cost: 450,
//   lvl: 48,
//   experience: 4800,
//   moves: ["Emotion Drain", "Cute Charm", "Comforting Hug"],
//   possible_moves: ["Dark Aura", "Empathy Wave", "Peaceful Presence"],
//   passive_ability: "Emotion Balance",
//   image: "/pals/Umbrabunny_pxl.png",
//   description:
//     "Adorable, bunny-like creatures with the ability to absorb and dispel negative emotions.",
//   size: "Small",
//   weight: "Light",
//   lore: "Legends speak of Umbrabunny's ability to bring comfort and emotional balance to troubled hearts.",
// };

// export const Recycleroo = {
//   id: 9,
//   "name": "Recycleroo",
//   "elemental_type": "Nature",
//   "creature_type": "Kangaroo",
//   "specialty_group": "Eco-Protector",
//   "nature": "Environmentally Conscious",
//   "quirks": ["Recycling Expert", "Projectile Thrower"],
//   "stats": {
//     "hp": 110,
//     "attack": 100,
//     "defense": 80,
//     "special_attack": 60,
//     "special_defense": 80,
//     "speed": 90
//   },
//   "strengths": ["Electric", "Ground"],
//   "weaknesses": ["Fire", "Ice"],
//   "cost": 550,
//   "lvl": 55,
//   "experience": 5500,
//   "moves": ["Recycle Rush", "Projectile Toss", "Leaf Shield"],
//   "possible_moves": ["Trash Bash", "Nature's Wrath", "Sorting Cyclone"],
//   "passive_ability": "Eco-Warrior",
//   "image": "recycleroo_image.png",
//   "description": "A kangaroo that collects and sorts recyclables but throws them as projectiles.",
//   "size": "Medium",
//   "weight": "Moderate",
//   "lore": "Recycleroo is known for its dedication to environmental protection, using recycled materials to defend nature."
// };

// export const shoe = {
//   lore: "Really? A shoe?",
// };

// export const wolfjobb = {
//   lore: "A wolf with a amazing work ethic",
// };

// export const testPals = [
//   Luminowl,
//   Glowbuggle,
//   Umbrabunny,
//   Infernodragon,
//   Aquaphoenix,
//   Verdantshifter,
//   Technotitan,
// ];
