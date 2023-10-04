// Energy/Mana (MP): Resource used for monster abilities.
// Level: The monster's level.
// Attack Power: Base damage dealt by the monster's attacks.
// Defense: Reduces incoming damage for the monster.
// Speed: Determines turn order for monsters.
// Affinity/Type: Elemental or creature type.
// Experience Points (XP): To track monster progression and leveling.

const Luminowl = {
  id: 1,
  name: "Luminowl",
  elemental_type: "Light",
  creature_type: "Owl",
  specialty_group: "Mystic",
  nature: "Wise",
  quirks: ["Guiding Light", "Soothing Feathers"],
  stats: {
    hp: 100,
    max_hp: 190,

    attack: 80,
    defense: 60,
    special_attack: 120,
    special_defense: 90,
    speed: 110,
  },
  strengths: ["Dark"],
  weaknesses: ["Fire"],
  cost: 500,
  level: 50,
  experience: 5000,
  moves: ["Light Beam", "Wise Gaze", "Feather Glide"],
  possible_moves: ["Luminous Aura", "Mystic Sight", "Soothing Melody"],
  passive_ability: "Guiding Wisdom",
  image: "/pals/Luminowl_pxl.png",
  description:
    "A wise owl with feathers that emit a soothing light, guiding lost travelers.",
  size: "Medium",
  weight: "Light",
  lore: "Legends speak of Luminowl's ability to bring light and wisdom to those in need.",
};

const Shadowstalker = {
  id: 2,

  name: "Shadowstalker",
  elemental_type: "Dark",
  creature_type: "Panther",
  specialty_group: "Stealth",
  nature: "Stealthy",
  quirks: ["Ambush Predator", "Shadow Cloak"],
  stats: {
    hp: 100,
    max_hp: 190,

    attack: 110,
    defense: 70,
    special_attack: 80,
    special_defense: 60,
    speed: 120,
  },
  strengths: ["Nature"],
  weaknesses: ["Light"],
  cost: 500,
  level: 50,
  experience: 5000,
  moves: ["Shadow Pounce", "Stealth Strike", "Dark Cloak"],
  possible_moves: ["Shadowmeld", "Nightmare Slash", "Ambush"],
  passive_ability: "Cloaked in Shadows",
  image: "/creatures/Chibipal.png",
  description:
    "A stealthy panther-like creature that lurks in the dark, ambushing foes with precision.",
  size: "Medium",
  weight: "Light",
  lore: "Legends speak of Shadowstalker's ability to strike from the shadows with unmatched precision.",
};

const Infernodragon = {
  id: 3,

  name: "Infernodragon",
  elemental_type: "Fire",
  creature_type: "Dragon",
  specialty_group: "Mystic",
  nature: "Destructive",
  quirks: ["Flame Breather", "Inferno Creator"],
  stats: {
    hp: 120,
    max_hp: 190,

    attack: 140,
    defense: 90,
    special_attack: 160,
    special_defense: 110,
    speed: 100,
  },
  strengths: ["Grass", "Bug"],
  weaknesses: ["Water", "Ice"],
  cost: 600,
  level: 55,
  experience: 5500,
  moves: ["Inferno Roar", "Dragon Blaze", "Firestorm"],
  possible_moves: ["Magma Eruption", "Dragon Rage", "Heat Wave"],
  passive_ability: "Scorching Scales",
  image: "/creatures/Chibipal.png",
  description:
    "A fearsome dragon that embodies the destructive power of fire, capable of causing infernos.",
  size: "Large",
  weight: "Heavy",
  lore: "Legends speak of Infernodragon's ability to bring devastation with its fiery breath.",
};

const Aquaphoenix = {
  id: 4,

  name: "Aquaphoenix",
  elemental_type: "Water",
  creature_type: "Phoenix",
  specialty_group: "Mystic",
  nature: "Majestic",
  quirks: ["Water Manipulator", "Rainmaker"],
  stats: {
    hp: 110,
    max_hp: 190,

    attack: 80,
    defense: 70,
    special_attack: 130,
    special_defense: 100,
    speed: 120,
  },
  strengths: ["Fire"],
  weaknesses: ["Electric", "Ice"],
  cost: 550,
  level: 52,
  experience: 5200,
  moves: ["Aqua Torrent", "Phoenix Glide", "Rain Dance"],
  possible_moves: ["Tidal Wave", "Hydroburst", "Aqua Healing"],
  passive_ability: "Aqua Resurrection",
  image: "/creatures/Chibipal.png",
  description:
    "A majestic bird with the ability to control water, summoning rainstorms and quenching fires.",
  size: "Large",
  weight: "Light",
  lore: "Legends speak of Aquaphoenix's ability to bring life-giving rains to drought-stricken lands.",
};

const Verdantshifter = {
  id: 5,

  name: "Verdantshifter",
  elemental_type: "Nature",
  creature_type: "Shapeshifter",
  specialty_group: "Mystic",
  nature: "Adaptive",
  quirks: ["Morphing Mastery", "Environmental Guardian"],
  stats: {
    hp: 90,
    max_hp: 90,

    attack: 70,
    defense: 80,
    special_attack: 100,
    special_defense: 120,
    speed: 110,
  },
  strengths: ["Water", "Ground"],
  weaknesses: ["Fire", "Ice"],
  cost: 450,
  level: 48,
  experience: 4800,
  moves: ["Nature's Transformation", "Shapeshift", "Eco Restoration"],
  possible_moves: ["Plant Manipulation", "Camouflage", "Adaptive Form"],
  passive_ability: "Nature's Harmony",
  image: "/pals/Luminowl_pxl.png",
  description:
    "A creature that can transform into various plant forms, aiding in environmental restoration.",
  size: "Medium",
  weight: "Medium",
  lore: "Legends speak of Verdantshifter's ability to restore balance to nature with its morphing skills.",
};

const Technotitan = {
  id: 6,

  name: "Technotitan",
  elemental_type: "Tech",
  creature_type: "Giant",
  specialty_group: "Mechanical",
  nature: "Protective",
  quirks: ["Mechanical Guardian", "Advanced Arsenal"],
  stats: {
    hp: 150,
    max_hp: 190,

    attack: 130,
    defense: 140,
    special_attack: 80,
    special_defense: 100,
    speed: 60,
  },
  strengths: ["Electric", "Steel"],
  weaknesses: ["Water", "Nature"],
  cost: 750,
  level: 60,
  experience: 6000,
  moves: ["Mechanical Slam", "Energy Beam", "Defense Protocol"],
  possible_moves: ["Rocket Punch", "Repair Mode", "Techno Shield"],
  passive_ability: "Guardian Armor",
  image: "/creatures/Chibipal.png",
  description:
    "A colossal, mechanical giant armed with advanced weaponry, created to protect civilization.",
  size: "Giant",
  weight: "Heavy",
  lore: "Legends speak of Technotitan's ability to defend cities and civilizations from threats with its advanced technology.",
};

const Glowbuggle = {
  id: 7,

  name: "Glowbuggle",
  elemental_type: "Light",
  creature_type: "Firefly",
  specialty_group: "Bioluminescent",
  nature: "Illuminating",
  quirks: ["Warm Light Emission", "Comforting Glow"],
  stats: {
    hp: 80,
    max_hp: 90,
    attack: 50,
    defense: 40,
    special_attack: 100,
    special_defense: 70,
    speed: 120,
  },
  strengths: ["Dark"],
  weaknesses: ["Electric", "Ice"],
  cost: 400,
  level: 40,
  experience: 4000,
  moves: ["Luminous Flight", "Glowing Charm", "Warm Embrace"],
  possible_moves: [
    "Bioluminescent Burst",
    "Soothing Radiance",
    "Glowing Trail",
  ],
  passive_ability: "Radiant Aura",
  image: "/creatures/Chibipal.png",
  description:
    "Small, firefly-like creatures with bioluminescent wings that emit a warm, comforting light.",
  size: "Tiny",
  weight: "Light",
  lore: "Legends speak of Glowbuggle's ability to bring comfort and light to those in the darkest of nights.",
};

const Umbrabunny = {
  id: 8,
  name: "Umbrabunny",
  elemental_type: "Dark",
  creature_type: "Bunny",
  specialty_group: "Emotion Absorber",
  nature: "Adorable",
  quirks: ["Emotion Sponge", "Reassuring Presence"],
  stats: {
    hp: 90,
    max_hp: 90,
    attack: 60,
    defense: 70,
    special_attack: 80,
    special_defense: 110,
    speed: 120,
  },
  strengths: ["Light"],
  weaknesses: ["Fighting", "Psychic"],
  cost: 450,
  level: 48,
  experience: 4800,
  moves: ["Emotion Drain", "Cute Charm", "Comforting Hug"],
  possible_moves: ["Dark Aura", "Empathy Wave", "Peaceful Presence"],
  passive_ability: "Emotion Balance",
  image: "/pals/Umbrabunny_pxl.png",
  description:
    "Adorable, bunny-like creatures with the ability to absorb and dispel negative emotions.",
  size: "Small",
  weight: "Light",
  lore: "Legends speak of Umbrabunny's ability to bring comfort and emotional balance to troubled hearts.",
};

export const testPals = [
  Luminowl,
  Glowbuggle,
  Umbrabunny,
  Infernodragon,
  Aquaphoenix,
  Verdantshifter,
  Technotitan,

];
