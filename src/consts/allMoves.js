import { EFFECTS } from '../effects'
import { EvasiveTwirl, SolarBlast } from './allCounters'
import { Blind, Buff, Poison, Weak } from './keywords/allStatuses'

export const SolarSpiritBlast = {
  name: 'Solar Spirit Blast',
  type: 'elemental',
  damage: 45,
  accuracy: 90,
  speed: 8,
  energyCost: 7,
  // effect: {
  //   description: 'Requires charging, high damage',
  //   chance: 100,
  //   result: 'damage',
  //   // amt: 50, prob no amt for dmg
  // },
  priority: 'slow',
}
//lvl1, 2, 3,4. common uncommon rare, mythic
export const QuickStrike = {
  name: 'Quick Strike',
  type: 'physical',
  damage: 25,
  accuracy: 90,
  speed: 7,
  cost: { energy: 3 },
  // energyCost: 3,
  // effect: {
  //   description: 'High critical hit chance',
  //   chance: 50,
  //   result: 'critical_hit',
  //   amt: 10,
  // },
  priority: 'fast',
  targets: ['opponent', 'opponent_pals'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Nimble Dodge',
    type: 'buff',
    effect: {
      description: 'Increase evasion for the next turn',
      duration: '1 turn',
      evasion_boost: 30, // Increase evasion for the user
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Rapid Fury',
    type: 'physical',
    damage: 40, // Enhanced damage for the Forceful aspect
    accuracy: 90,
    speed: 9, // Slightly slower due to the added power
    cost: { energy: 4 },

    energyCost: 4, // Increased energyCost cost for the Forceful aspect
    effect: {
      description: 'Guaranteed critical hit and additional damage',
      chance: 100,
      result: 'critical_hit',
      amt: 20,
    },
    targets: ['opponent', 'opponent_pals'],
  },
}

export const WebTrap = {
  name: 'Web Trap',
  type: 'status',
  accuracy: 90,
  speed: 4,
  cost: { energy: 2 },
  energyCost: 2,
  effect: {
    description: 'Immobilizes target briefly',
    chance: 40,
    result: 'immobilize',
    duration: '1 turn',
    targets: ['opponent'],
  },
  priority: 'normal',
}

export const Teleport = {
  name: 'Teleport',
  type: 'utility',
  speed: 9,
  accuracy: 90,
  cost: { energy: 5 },
  energyCost: 5,
  // effect: {
  //   description: 'Instantly move to another location',
  //   chance: 100,
  //   result: 'teleport',
  //   location: 'opponent',
  // },
  priority: 'fast',
  targets: ['self'],
}

export const Mimicry = {
  name: 'Mimicry',
  type: 'utility',
  speed: 5,
  accuracy: 90,
  cost: { energy: 3 },
  energyCost: 3,
  effect: {
    description: "Copies the opponent's last move",
    chance: 100,
    result: 'copy_move',
  },
  priority: 'normal',
}
export const DoubleStrike = {
  name: 'Double Strike',
  type: 'physical',
  damage: 45,
  accuracy: 70,
  speed: 7,
  cost: { energy: 3 },
  energyCost: 3,
  effect: {
    description: 'Goes again if the first attack is successful',
    // chance: 100,
    // result: 'double_strike',
    targets: ['self'],
  },
  priority: 'fast',
  targets: ['opponent', 'opponent_pals'],
}

export const LifeSwap = {
  name: 'Life Swap',
  type: 'heal',
  speed: 7,
  accuracy: 90,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description: 'Exchanges HP with the target',
    chance: 100,
    result: 'life_swap',
    amt: 80,
    targets: ['opponent'],
  },
  priority: 'slow',
}

export const Thunderstorm = {
  name: 'Thunderstorm',
  type: 'elemental',
  damage: 40,
  accuracy: 90,
  speed: 8,
  cost: { energy: 6 },
  energyCost: 6,
  effect: {
    description: 'Chance to paralyze multiple targets',
    chance: 30,
    result: 'paralyze_multiple',
    duration: '1 turn',
    targets: ['opponent'],
  },
  priority: 'slow',
}

export const StealthyAmbush = {
  name: 'Stealthy Ambush',
  type: 'utility',
  accuracy: 90,
  speed: 6,
  cost: { energy: 4 },
  energyCost: 4,
  effect: {
    description: 'Hides for a turn and then appears. Good for poison.',
    chance: 100,
    result: 'stealthy_ambush',
    duration: '1 turn',
  },
  priority: 'fast',
}

export const MirrorImage = {
  name: 'Mirror Image',
  type: 'buff',
  accuracy: 90,
  speed: 6,
  cost: { energy: 3 },
  energyCost: 3,
  effect: {
    description: 'Creates illusion copies',
    chance: 100,
    result: 'mirror_image',
    duration: '1 turn',
  },
  priority: 'normal',
}

// export const IceWall = {
//   name: 'Ice Wall',
//   type: 'elemental',
//   speed: 7,
//   energyCost: 5,
//   effect: {
//     description: 'Forms a protective ice wall',
//     chance: 100,
//     result: 'ice_wall',
//   },
//   priority: 'slow',
// }
export const IceWall = {
  name: 'Ice Wall',
  type: 'elemental',
  damage: 0,
  accuracy: 90,
  speed: 7,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Forms a protective ice wall',
    chance: 100,
    result: 'ice_wall',
    amt: 40,
  },
  priority: 'slow',
  targets: ['arena'],
  notSoFast: {
    name: 'Chilled Defenses',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Enhance the defensive capabilities of the Ice Wall',
      duration: '1 turn',
      amt: 50,
    },
  },
  forceful: {
    name: 'Glacial Fortress',
    type: 'elemental',
    damage: 0,
    accuracy: 90,
    speed: 9,
    cost: { energy: 6 },
    energyCost: 6,
    effect: {
      description:
        'Strengthen the Ice Wall and provide a protective barrier for pals',
      chance: 100,
      result: 'ice_wall',
      amt: 80,
    },
    targets: ['arena'],
  },
}

// luminowl attacks
export const LightBeam = {
  name: 'Light Beam',
  type: 'elemental',
  damage: 40,
  accuracy: 90,
  speed: 12,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Fires a beam of blinding light at the opponent',
    chance: 95,
    result: 'blind',
    duration: '1 turn',
    amt: -20,
    type: Blind,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Evasive Twirl nsf',
    // isCounter: true,
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Perform an evasive twirl to dodge incoming attacks',
      duration: '1 turn',
      evasion_boost: 50, // Increase evasion for 1 turn
      chance: 100,
      result: 'evade',
      amt: 10,
    },
  },
  counter: EvasiveTwirl,
  forceful: SolarBlast,
}

export const WiseGaze = {
  name: 'Wise Gaze',
  type: 'elemental',
  damage: 30,
  accuracy: 90,
  speed: 10,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Pierces the opponent with a wise and penetrating gaze',
    chance: 90,
    // result: 'confuse',
    result: 'weak',
    // resutl: EFFECTS.WEAK,
    duration: '1 turn',
    amt: 8,
    type: Weak,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Clarity of Mind',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Calm your mind to resist confusion',
      duration: '1 turn',
      chance: 100,
      result: 'confuse',
      amt: 50,
      confusion_resist: 100, // Provides immunity to confusion for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Enlightened Stare',
    type: 'elemental',
    damage: 45,
    accuracy: 90,
    speed: 12,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description: 'Lock eyes with the opponent, ensuring confusion',
      chance: 100,
      result: 'confuse',
      duration: '1 turn',
      amt: 50,
    },
    targets: ['opponent'],
  },
}

export const FeatherGlide = {
  name: 'Feather Glide',
  type: 'physical',
  damage: 35,
  accuracy: 90,
  speed: 8,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description:
      'Glide gracefully to deliver a swift and graceful physical attack',
    // chance: 10,
    // result: 'stun',
    // duration: '1 turn', // Added duration
    amt: 12, // Added amt (assuming 20 as an example value)
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Aerial Agility',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Enhance your aerial agility to dodge incoming attacks',
      duration: '1 turn',
      evasion_boost: 40,
      // Assuming these fields are not required for buffs
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Celestial Dive',
    type: 'physical',
    damage: 50,
    accuracy: 90,
    speed: 10,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description:
        'Perform a celestial dive to guarantee stunning the opponent',
      chance: 100,
      result: 'stun',
      duration: '1 turn', // Added duration
      amt: 30, // Added amt (assuming 30 as an example value)
    },
    targets: ['opponent'],
  },
}

export const ShadowLash = {
  name: 'Shadow Lash',
  type: 'physical',
  damage: 40,
  accuracy: 85,
  speed: 11,
  cost: { energy: 4 },
  effect: {
    description: 'Strikes the opponent with a lash of dark energy',
    chance: 90,
    result: 'blind',
    duration: '1 turn',
    amt: -15,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Dark Veil',
    type: 'buff',
    accuracy: 95,
    effect: {
      description: 'Enshrouds in darkness, increasing evasion',
      duration: '1 turn',
      evasion_boost: 35,
    },
  },
  forceful: {
    name: 'Nightmare Swipe',
    type: 'physical',
    damage: 55,
    accuracy: 80,
    speed: 13,
    cost: { energy: 6 },
    effect: {
      description: 'Engulfs the opponent in a terrifying darkness',
      chance: 95,
      result: 'blind',
      duration: '1 turn',
      amt: -25,
    },
    targets: ['opponent'],
  },
}
export const CrystalShard = {
  name: 'Crystal Shard',
  type: 'elemental',
  damage: 45,
  accuracy: 92,
  speed: 10,
  cost: { energy: 5 },
  effect: {
    description: 'Launches sharp, crystalline shards at the opponent',
    chance: 88,
    result: 'none',
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Crystalline Guard',
    type: 'buff',
    accuracy: 100,
    effect: {
      description:
        'Forms a protective barrier of crystal, reducing damage taken',
      duration: '1 turn',
      damage_reduction: 25,
    },
  },
  forceful: {
    name: 'Gemstone Barrage',
    type: 'elemental',
    damage: 60,
    accuracy: 90,
    speed: 12,
    cost: { energy: 7 },
    effect: {
      description: 'Unleashes a barrage of gemstones, causing extensive damage',
      chance: 85,
      result: 'none',
    },
    targets: ['opponent'],
  },
}
export const Thunderclap = {
  name: 'Thunderclap',
  type: 'elemental',
  damage: 50,
  accuracy: 80,
  speed: 8,
  cost: { energy: 5 },
  effect: {
    description: 'Strikes the opponent with a loud, disorienting thunderclap',
    chance: 80,
    result: 'weak',
    duration: '1 turn',
    amt: 12,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Static Field',
    type: 'buff',
    accuracy: 85,
    effect: {
      description:
        'Generates a static field, reducing damage from physical attacks',
      duration: '1 turn',
      physical_damage_reduction: 20,
    },
  },
  forceful: {
    name: 'Lightning Strike',
    type: 'elemental',
    damage: 65,
    accuracy: 75,
    speed: 9,
    cost: { energy: 6 },
    effect: {
      description: 'Calls down a lightning strike for massive damage',
      chance: 75,
      result: 'weak',
      duration: '1 turn',
      amt: 18,
    },
    targets: ['opponent'],
  },
}
export const FrostBite = {
  name: 'Frost Bite',
  type: 'elemental',
  damage: 35,
  accuracy: 88,
  speed: 12,
  cost: { energy: 3 },
  effect: {
    description: 'Bites the opponent with chilling frost, slowing them down',
    chance: 80,
    result: 'none',
    targets: ['opponent'],
  },
  priority: 'high',
  targets: ['opponent'],
  notSoFast: {
    name: 'Ice Shield',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Encases in ice, significantly reducing incoming damage',
      duration: '1 turn',
      damage_reduction: 30,
    },
  },
  forceful: {
    name: 'Glacial Crash',
    type: 'elemental',
    damage: 55,
    accuracy: 80,
    speed: 14,
    cost: { energy: 5 },
    effect: {
      description: 'Summons a massive block of ice to crash onto the opponent',
      chance: 85,
      result: 'none',
    },
    targets: ['opponent'],
  },
}
export const EarthenGrasp = {
  name: 'Earthen Grasp',
  type: 'elemental',
  damage: 40,
  accuracy: 87,
  speed: 7,
  cost: { energy: 4 },
  effect: {
    description:
      'The ground beneath the opponent erupts, grasping and immobilizing them',
    chance: 82,
    result: 'weak',
    duration: '1 turn',
    amt: 10,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Rock Armor',
    type: 'buff',
    accuracy: 95,
    effect: {
      description: 'Covers the user in rock armor, drastically reducing damage',
      duration: '1 turn',
      damage_reduction: 35,
    },
  },
  forceful: {
    name: 'Boulder Smash',
    type: 'elemental',
    damage: 60,
    accuracy: 83,
    speed: 5,
    cost: { energy: 6 },
    effect: {
      description:
        'Drops a giant boulder on the opponent for significant damage',
      chance: 80,
      result: 'weak',
      duration: '1 turn',
      amt: 20,
      targets: ['opponent'],
    },
    targets: ['opponent'],
  },
}
export const DoubleJab = {
  name: 'Double Jab',
  type: 'physical',
  damage: 35,
  accuracy: 90,
  speed: 12,
  cost: { energy: 3 },
  effect: {
    description: 'Strikes the opponent with a double jab',
    chance: 85,
    result: 'weak',
    duration: '1 turn',
    amt: 10,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Toxic Mist',
    type: 'buff',
    accuracy: 95,
    effect: {
      description:
        'Releases a toxic mist, enhancing evasion by confusing attackers',
      duration: '1 turn',
      evasion_boost: 35,
    },
  },
  forceful: {
    name: 'Poison Strike',
    type: 'physical',
    damage: 50,
    accuracy: 85,
    speed: 10,
    cost: { energy: 5 },
    effect: {
      description:
        'Delivers a powerful strike infused with potent poison, guaranteeing weakness',
      chance: 100,
      result: 'weak',
      duration: '1 turn',
      amt: 20,
      targets: ['opponent'],
    },
    targets: ['opponent'],
  },
}

export const Smash = {
  name: 'Smash',
  type: 'physical',
  damage: 45,
  accuracy: 80,
  speed: 8,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description: 'Hit with the power of your body weight',
    // chance: 10,
    result: 'buff',
    duration: '1 turn', // Added duration
    amt: 2, // Added amt (assuming 20 as an example value)
    targets: ['opponent'],
  },
  // effect: {
  //   description: 'Pierces the opponent with a wise and penetrating gaze',
  //   chance: 90,
  //   // result: 'confuse',
  //   result: 'weak',
  //   // resutl: EFFECTS.WEAK,
  //   duration: '1 turn',
  //   amt: 8,
  //   type: Weak,
  // },

  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Aerial Agility',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Enhance your aerial agility to dodge incoming attacks',
      duration: '1 turn',
      evasion_boost: 40,
      // Assuming these fields are not required for buffs
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Celestial Dive',
    type: 'physical',
    damage: 50,
    accuracy: 90,
    speed: 10,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description:
        'Perform a celestial dive to guarantee stunning the opponent',
      chance: 100,
      result: 'stun',
      duration: '1 turn', // Added duration
      amt: 30, // Added amt (assuming 30 as an example value)
    },
    targets: ['opponent'],
  },
}

// all Glowbuggle moves
export const LuminousFlight = {
  name: 'Luminous Flight',
  type: 'elemental',
  damage: 40,
  accuracy: 90,
  speed: 11,
  cost: { energy: 4 },
  energyCost: 5,
  // effect: {
  //   description: 'Take flight and emit a radiant glow',
  //   chance: 20,
  //   result: 'illuminate',
  //   duration: '1 turn', // Added duration
  //   amt: 25, // Added amt (assuming 25 as an example value)
  // },
  priority: 'medium',
  targets: ['user_pals'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Luminous Shield',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Emit a protective shield of light for your pals',
      duration: '1 turn',
      shield_value: 40,
      // Assuming these fields are not required for buffs
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Dazzling Radiance',
    type: 'elemental',
    damage: 55,
    accuracy: 90,
    speed: 14,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description: 'Emit blinding radiance, guaranteeing illumination',
      chance: 100,
      result: 'illuminate',
      duration: '1 turn', // Added duration
      amt: 35, // Added amt (assuming 35 as an example value)
    },
    targets: ['user_pals'],
  },
}

export const GlowingCharm = {
  name: 'Glowing Charm',
  type: 'elemental',
  moveCategory: 'change',
  damage: 0, // Glowing Charm doesn't deal damage
  accuracy: 90,
  speed: 9,
  cost: { energy: 4 },
  energyCost: 5,
  // effect: {
  //   description: 'Emit a comforting and charming glow',
  //   chance: 100,
  //   result: 'charm',
  //   duration: '1 turn', // Added duration
  //   amt: 20, // Added amt (assuming 20 as an example value)
  // },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Radiant Resilience',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Enhance your resistance to charm',
      duration: '1 turn',
      charm_resist: 100, // Provides immunity to charm for 1 turn
      // Assuming these fields are not required for buffs
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Enchanting Aura',
    type: 'elemental',
    damage: 0, // Forceful aspect doesn't deal damage either
    accuracy: 90,
    speed: 10,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description: 'Radiate an enchanting aura to guarantee charm',
      chance: 100,
      result: 'charm',
      duration: '1 turn', // Added duration
      amt: 30, // Added amt (assuming 30 as an example value)
    },
    targets: ['opponent'],
  },
}

export const WarmEmbrace = {
  name: 'Warm Embrace',
  type: 'healing',
  healing: 50,
  accuracy: 90,
  speed: 8,
  cost: { energy: 4 },
  energyCost: 5,
  // effect: {
  //   description: 'Offer a warm and comforting embrace, healing pals',
  //   chance: 100,
  //   result: 'heal',
  //   duration: '1 turn',
  //   amt: 50,
  // },
  priority: 'medium',
  targets: ['user_pals'],
  notSoFast: {
    name: 'Caring Touch',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Strengthen the healing effect of Warm Embrace',
      duration: '1 turn',
      healing_boost: 30,
      chance: 100,
      result: 'heal',
      amt: 30,
    },
  },
  forceful: {
    name: 'Glowing Restoration',
    type: 'healing',
    healing: 70,
    accuracy: 90,
    speed: 10,
    cost: { energy: 8 },
    energyCost: 8,
    effect: {
      description: 'Channel a powerful healing glow to ensure maximum healing',
      chance: 100,
      result: 'heal',
      duration: '1 turn',
      amt: 70,
    },
    targets: ['user_pals'],
  },
}

// All Umbrabunny moves:
export const EmotionDrain = {
  name: 'Emotion Drain',
  type: 'dark',
  damage: 40,
  accuracy: 90,
  speed: 12,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Drain the opponents emotions to weaken them',
    chance: 20,
    result: 'weak',
    duration: '1 turn',
    amt: 20,
    type: Weak,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Resilient Spirit',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Enhance your emotional resilience to resist debuffs',
      duration: '1 turn',
      debuff_resist: 100,
      chance: 100,
      result: 'resist',
      amt: 100,
    },
  },
  forceful: {
    name: 'Soul Siphon',
    type: 'dark',
    damage: 60,
    accuracy: 90,
    speed: 14,
    cost: { energy: 7 },
    energyCost: 7,
    effect: {
      description: 'Drain the opponents soul, guaranteeing debuffs',
      chance: 100,
      result: 'debuff',
      duration: '1 turn',
      amt: 60,
    },
    targets: ['opponent'],
  },
}

export const CuteCharm = {
  name: 'Cute Charm',
  type: 'elemental',
  damage: 0, // Cute Charm doesn't deal damage
  accuracy: 90,
  speed: 9,
  cost: { energy: 4 },
  energyCost: 4,
  // effect: {
  //   description: 'Exude an adorable and charming presence',
  //   chance: 100,
  //   result: 'charm',
  //   duration: '1 turn',
  //   amt: 20,
  // },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Charming Aura',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Enhance your charm to guarantee success',
      duration: '1 turn',
      charm_resist: 100,
      chance: 100,
      result: 'charm',
      amt: 50,
    },
  },
  forceful: {
    name: 'Enchanting Presence',
    type: 'elemental',
    damage: 0,
    accuracy: 90,
    speed: 10,
    cost: { energy: 5 },
    energyCost: 5,
    effect: {
      description: 'Radiate an enchanting aura to guarantee charm',
      chance: 100,
      result: 'charm',
      duration: '1 turn',
      amt: 50,
    },
    targets: ['opponent'],
  },
}

export const ComfortingHug = {
  name: 'Comforting Hug',
  type: 'healing',
  healing: 50,
  accuracy: 90,
  speed: 8,
  cost: { energy: 6 },
  energyCost: 6,
  // effect: {
  //   description: 'Offer a comforting hug to heal pals',
  //   chance: 100,
  //   result: 'heal',
  //   duration: '1 turn',
  //   amt: 50,
  // },
  priority: 'medium',
  targets: ['user_pals'],
  notSoFast: {
    name: 'Reassuring Embrace',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Strengthen the healing effect of Comforting Hug',
      duration: '1 turn',
      healing_boost: 30,
      chance: 100,
      result: 'heal',
      amt: 30,
    },
  },
  forceful: {
    name: 'Soothing Embrace',
    type: 'healing',
    healing: 70,
    accuracy: 90,
    speed: 10,
    cost: { energy: 8 },
    energyCost: 8,
    effect: {
      description: 'Offer a profound and soothing embrace for maximum healing',
      chance: 100,
      result: 'heal',
      duration: '1 turn',
      amt: 70,
    },
    targets: ['user_pals'],
  },
}

// recycleroo attacks
export const RecycleRush = {
  name: 'Recycle Rush',
  type: 'physical',
  damage: 45,
  accuracy: 90,
  speed: 10,
  cost: { energy: 6 },
  energyCost: 6,
  // effect: {
  //   description: 'Charge at the opponent using recycled materials as armor',
  //   chance: 80,
  //   result: 'damage_boost',
  //   duration: '1 turn',
  //   amt: 20,
  // },
  priority: 'high',
  targets: ['opponent'],
  notSoFast: {
    name: 'Reinforced Armor',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Reinforce armor with extra recycled materials',
      duration: '2 turns',
      defense_boost: 30,
      chance: 100,
      result: 'defense',
      amt: 30,
    },
  },
  forceful: {
    name: 'Eco Smash',
    type: 'physical',
    damage: 60,
    accuracy: 90,
    speed: 12,
    cost: { energy: 5 },
    energyCost: 6,
    effect: {
      description: 'Unleash a powerful smash with hardened recycled materials',
      chance: 100,
      result: 'damage_boost',
      duration: '1 turn',
      amt: 40,
    },
    targets: ['opponent'],
  },
}

export const ProjectileToss = {
  name: 'Projectile Toss',
  type: 'physical',
  damage: 35,
  accuracy: 90,
  speed: 14,
  cost: { energy: 4 },
  energyCost: 4,
  // effect: {
  //   description: 'Toss recycled projectiles at the opponent',
  //   chance: 70,
  //   result: 'slow',
  //   duration: '1 turn',
  //   amt: 15,
  // },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Rapid Reload',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Quickly reload projectiles for a faster next attack',
      duration: '1 turn',
      speed_boost: 20,
      chance: 100,
      result: 'speed',
      amt: 20,
    },
  },
  forceful: {
    name: 'Debris Barrage',
    type: 'physical',
    damage: 50,
    accuracy: 90,
    speed: 16,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description:
        'Unleash a barrage of recycled debris, ensuring slowing the opponent',
      chance: 100,
      result: 'slow',
      duration: '1 turn',
      amt: 30,
    },
    targets: ['opponent'],
  },
}

export const LeafShield = {
  name: 'Leaf Shield',
  type: 'elemental',
  damage: 0,
  accuracy: 90,
  speed: 8,
  cost: { energy: 5 },
  energyCost: 5,
  // effect: {
  //   description:
  //     'Create a protective shield from leaves to reduce incoming damage',
  //   chance: 90,
  //   result: 'damage_reduction',
  //   duration: '1 turn',
  //   amt: 25,
  // },
  priority: 'medium',
  targets: ['self'],
  notSoFast: {
    name: 'Photosynthesis Boost',
    type: 'buff',
    accuracy: 90,
    effect: {
      description:
        'Enhance the leaf shield by photosynthesis, regenerating health',
      duration: '1 turn',
      health_regeneration: 20,
      chance: 100,
      result: 'regeneration',
      amt: 20,
    },
  },
  forceful: {
    name: 'Forest Guard',
    type: 'elemental',
    damage: 0,
    accuracy: 90,
    speed: 10,
    cost: { energy: 5 },
    energyCost: 6,
    effect: {
      description:
        'Fortify the leaf shield with the essence of the forest, ensuring damage reduction',
      chance: 100,
      result: 'damage_reduction',
      duration: '1 turn',
      amt: 30,
    },
    targets: ['self'],
  },
}

export const SolarFlare = {
  name: 'Solar Flare',
  type: 'elemental',
  damage: 40,
  accuracy: 60,
  speed: 15,
  cost: { energy: 8 },
  energyCost: 8,
  // effect: {
  //   description: 'Unleash a burst of intense solar energy',
  //   chance: '85%',
  //   result: 'burn',
  //   duration: '1 turn',
  //   amt: 40,
  // },
  priority: 'high',
  targets: ['opponent'],
  notSoFast: {
    name: 'Heat Wave',
    type: 'debuff',
    accuracy: 90,
    effect: {
      description: 'Generate a wave of heat to reduce the opponent’s defense',
      duration: '2 turns',
      defense_reduction: 20,
      chance: 100,
      result: 'defense',
      amt: 20,
    },
  },
  forceful: {
    name: 'Supernova Blast',
    type: 'elemental',
    damage: 100,
    accuracy: 90,
    speed: 18,
    cost: { energy: 10 },
    energyCost: 10,
    effect: {
      description:
        'Erupt in a powerful supernova, ensuring a burn on the opponent',
      chance: 100,
      result: 'burn',
      duration: '1 turn',
      amt: 50,
    },
    targets: ['opponent'],
  },
}

export const RadiantBeam = {
  name: 'Radiant Beam',
  type: 'elemental',
  damage: 70,
  accuracy: 20,
  speed: 12,
  cost: { energy: 7 },
  energyCost: 7,
  effect: {
    description: 'Emit a concentrated beam of radiant energy',
    chance: 90,
    result: 'blind',
    duration: '1 turn',
    amt: -35,
    type: Blind,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Blinding Light',
    type: 'debuff',
    accuracy: 90,
    effect: {
      description: 'Blind the opponent, reducing their accuracy',
      duration: '1 turn',
      accuracy_reduction: 30,
      chance: 100,
      result: 'accuracy',
      amt: -30,
      type: Blind,
    },
  },
  forceful: {
    name: 'Solar Lance',
    type: 'elemental',
    damage: 85,
    accuracy: 90,
    speed: 14,
    cost: { energy: 7 },
    energyCost: 8,
    effect: {
      description:
        'Concentrate solar energy into a lance, ensuring blinding the opponent',
      chance: 100,
      result: 'blind',
      duration: '1 turn',
      amt: -45,
      type: Blind,
      targets: ['opponent'],
    },
    targets: ['opponent'],
  },
}

export const InfernoWing = {
  name: 'Inferno Wing',
  type: 'elemental',
  damage: 50,
  accuracy: 70,
  speed: 10,
  cost: { energy: 9 },
  energyCost: 9,
  // effect: {
  //   description: 'Sweep the battlefield with fiery wings',
  //   chance: '75%',
  //   result: 'burn',
  //   duration: '2 turns',
  //   amt: 30,
  // },
  priority: 'medium',
  targets: ['all opponents'],
  notSoFast: {
    name: 'Scorching Gust',
    type: 'debuff',
    accuracy: 85,
    effect: {
      description:
        'Create a gust of scorching wind, reducing the opponents’ attack power',
      duration: '2 turns',
      attack_reduction: 15,
      chance: 100,
      result: 'attack',
      amt: -15,
    },
  },
  forceful: {
    name: 'Phoenix Dive',
    type: 'elemental',
    damage: 75,
    accuracy: 80,
    speed: 20,
    cost: { energy: 12 },
    energyCost: 12,
    effect: {
      description:
        'Dive onto the opponent with the force of a phoenix, ensuring a burn',
      chance: 100,
      result: 'burn',
      duration: '2 turns',
      amt: 40,
    },
    targets: ['single opponent'],
  },
}
export const SunstoneSmash = {
  name: 'Sunstone Smash',
  type: 'elemental',
  damage: 60,
  accuracy: 65,
  speed: 12,
  cost: { energy: 10 },
  energyCost: 10,
  // effect: {
  //   description: 'Unleash the power of sunstones upon the opponent',
  //   chance: '80%',
  //   result: 'daze',
  //   duration: '1 turn',
  //   amt: -20,
  // },
  priority: 'high',
  targets: ['opponent'],
  notSoFast: {
    name: 'Solar Quake',
    type: 'debuff',
    accuracy: 80,
    effect: {
      description:
        'Generate a quake of solar energy, reducing the opponent’s speed',
      duration: '1 turn',
      speed_reduction: 25,
      chance: 100,
      result: 'speed',
      amt: -25,
    },
  },
  forceful: {
    name: 'Corona Crush',
    type: 'elemental',
    damage: 90,
    accuracy: 75,
    speed: 15,
    cost: { energy: 12 },
    energyCost: 12,
    effect: {
      description:
        'Crush the opponent with a corona of solar energy, ensuring a daze',
      chance: 100,
      result: 'daze',
      duration: '2 turns',
      amt: -30,
    },
    targets: ['opponent'],
  },
}

export const SunShield = {
  name: 'Sun Shield',
  type: 'elemental',
  damage: 0,
  accuracy: 90,
  speed: 10,
  cost: { energy: 6 },
  energyCost: 6,
  effect: {
    description: 'Create a shield of solar energy to mitigate incoming damage',
    chance: 95,
    result: 'damage_reduction',
    duration: '1 turn',
    amt: 30,
    targets: ['self'],
  },
  priority: 'medium',
  targets: ['self'],
  notSoFast: {
    name: 'Solar Rejuvenation',
    type: 'buff',
    accuracy: 90,
    effect: {
      description: 'Use solar energy to gradually restore health',
      duration: '2 turns',
      health_regeneration: 25,
      chance: 100,
      result: 'regeneration',
      amt: 25,
    },
  },
  forceful: {
    name: 'Radiant Barrier',
    type: 'elemental',
    damage: 0,
    accuracy: 90,
    speed: 12,
    cost: { energy: 6 },
    energyCost: 7,
    effect: {
      description:
        'Fortify the shield with intense solar energy, ensuring damage reduction',
      chance: 100,
      result: 'damage_reduction',
      duration: '1 turn',
      amt: 40,
    },
    targets: ['self'],
  },
}

export const ThunderousRoar = {
  name: 'Thunderous Roar',
  type: 'elemental',
  damage: 60,
  accuracy: 85,
  speed: 7,
  cost: { energy: 6 },
  effect: {
    description: 'Unleashes a deafening roar causing elemental damage',
    chance: 30,
    result: 'disorient',
    duration: '1 turn',
    amt: 30,
    targets: ['opponent'],
  },
  priority: 'high',
  targets: ['opponent'],
  notSoFast: {
    name: "Roar's Resilience",
    type: 'buff',
    effect: {
      description: 'Boosts resistance against elemental attacks',
      duration: '2 turns',
      resistance_increase: 20,
    },
  },
  forceful: {
    name: 'Deafening Roar',
    type: 'elemental',
    damage: 80,
    accuracy: 85,
    speed: 9,
    cost: { energy: 8 },
    effect: {
      description: 'A louder roar that guarantees disorientation',
      chance: 100,
      result: 'disorient',
      duration: '2 turns',
      amt: 40,
    },
    targets: ['opponent'],
  },
}

export const ColossalSlam = {
  name: 'Colossal Slam',
  type: 'physical',
  damage: 50,
  accuracy: 80,
  speed: 5,
  cost: { energy: 5 },
  effect: {
    description: 'Slams the ground, causing physical damage',
    chance: 25,
    result: 'stun',
    duration: '1 turn',
    amt: 20,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
  notSoFast: {
    name: 'Focused Impact',
    type: 'buff',
    effect: {
      description: 'Increases accuracy for the next attack',
      duration: 'next attack',
      accuracy_boost: 15,
    },
  },
  forceful: {
    name: 'Earthquake Slam',
    type: 'physical',
    damage: 70,
    accuracy: 80,
    speed: 6,
    cost: { energy: 7 },
    effect: {
      description: 'A more powerful slam with a guaranteed stun effect',
      chance: 100,
      result: 'stun',
      duration: '1 turn',
      amt: 30,
    },
    targets: ['opponent'],
  },
}

export const ProtectiveBarrier = {
  name: 'Protective Barrier',
  type: 'defensive',
  accuracy: 100,
  speed: 10,
  cost: { energy: 4 },
  effect: {
    description: 'Creates a barrier to protect allies',
    chance: 100,
    result: 'shield',
    duration: '2 turns',
    shield_value: 40,
    targets: ['self'],
  },
  priority: 'high',
  targets: ['user_pals'],
  notSoFast: {
    name: 'Healing Barrier',
    type: 'healing',
    effect: {
      description: 'Barrier also heals allies for a small amount',
      duration: '2 turns',
      healing: 20,
    },
  },
  forceful: {
    name: 'Fortified Barrier',
    type: 'defensive',
    effect: {
      description: 'An enhanced barrier that provides more protection',
      duration: '3 turns',
      shield_value: 60,
    },
    targets: ['user_pals'],
  },
}

export const MeteorStrike = {
  name: 'Meteor Strike',
  type: 'elemental/physical',
  damage: 190,
  accuracy: 75,
  speed: 4,
  cost: { energy: 5 },
  effect: {
    description: 'Calls down a meteor causing massive area damage',
    chance: 40,
    result: 'burn',
    duration: '2 turns',
    burn_damage: 15,
    targets: ['opponent'],
  },
  priority: 'ultimate',
  targets: ['all_opponents'],
  notSoFast: {
    name: 'Meteor Shockwave',
    type: 'debuff',
    effect: {
      description: 'Reduces speed of all opponents',
      duration: '2 turns',
      speed_reduction: 10,
    },
  },
  forceful: {
    name: 'Apocalyptic Meteor',
    type: 'elemental/physical',
    damage: 120,
    accuracy: 75,
    speed: 5,
    cost: { energy: 12 },
    effect: {
      description: 'Increases the area and damage of the meteor strike',
      chance: 50,
      result: 'burn',
      duration: '3 turns',
      burn_damage: 20,
    },
    targets: ['all_opponents'],
  },
}

// Poison Effects
export const VenomousBite = {
  name: 'Venomous Bite',
  type: 'poison',
  damage: 35,
  accuracy: 90,
  speed: 12,
  cost: { energy: 4 },
  effect: {
    type: Poison,
    description: 'Bites the opponent with venomous fangs to inflict poison.',
    chance: 80,
    result: 'poison',
    duration: '3 turns',
    amt: 3,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
}

export const AcidSpray = {
  name: 'Acid Spray',
  type: 'poison',
  damage: 30,
  accuracy: 85,
  speed: 8,
  cost: { energy: 5 },
  effect: {
    type: Poison,

    description: 'Sprays corrosive acid to lower the opponent’s defense.',
    chance: 70,
    result: 'defense_down',
    duration: '1 turn',
    amt: 7,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
}

export const PoisonousCloud = {
  name: 'Poisonous Cloud',
  type: 'poison',
  damage: 0,
  accuracy: 100,
  speed: 9,
  cost: { energy: 6 },
  effect: {
    type: Poison,

    description: 'Creates a poisonous cloud to poison multiple opponents.',
    chance: 85,
    result: 'poison',
    duration: '2 turns',
    amt: 7,
    targets: ['opponent'],
  },
  priority: 'high',
  targets: ['all opponents'],
}

export const NecroticSludge = {
  name: 'Necrotic Sludge',
  type: 'poison',
  damage: 45,
  accuracy: 80,
  speed: 7,
  cost: { energy: 7 },
  effect: {
    type: Poison,

    description:
      'Covers the opponent in necrotic sludge, severely poisoning them.',
    chance: 60,
    result: 'poison',
    duration: '3 turns',
    amt: 6,
    targets: ['opponent'],
  },
  priority: 'low',
  targets: ['opponent'],
}

export const VenomShock = {
  name: 'Venom Shock',
  type: 'poison',
  damage: 40,
  accuracy: 88,
  speed: 11,
  cost: { energy: 5 },
  effect: {
    type: Poison,

    description:
      'Shocks the opponent with a venomous charge, potentially poisoning them.',
    chance: 85,
    result: 'poison',
    duration: '2 turns',
    amt: 5,
    targets: ['opponent'],
  },
  priority: 'medium',
  targets: ['opponent'],
}

//Status Moves / Change Moves
export const Inspire = {
  name: 'Inspire',
  type: 'mental',
  moveCategory: 'change',
  accuracy: 100,
  cost: { energy: 4 },
  effect: {
    type: Buff,


    description:
      'Motivates the user, boosting both attack and morale for better performance in battle.',
    result: 'buff',
    chance: 90,
    duration: '3 turns',
    amt: '7',
    morale_boost: true, // Assuming morale affects critical hit rate or evasion
    targets: ['self'],
  },
  priority: 'medium',
  targets: ['self'],
}

export const FocusMind = {
  name: 'Focus Mind',
  type: 'psychic',
  moveCategory: 'change',
  accuracy: 100,
  cost: { energy: 2 },
  effect: {
    type: Buff,

    description:
      'Sharpens mental acuity, increasing special attack for more powerful ability usage.',
    result: 'buff',
    chance: 70,
    duration: '3 turns',
    amt: '10',
    special_attack_boost: 20,
    targets: ['self'],
  },
  priority: 'medium',
  targets: ['self'],
}
