export const SolarSpiritBlast = {
  name: 'Solar Spirit Blast',
  type: 'elemental',
  damage: 45,
  speed: 8,
  energyCost: 7,
  effect: {
    description: 'Requires charging, high damage',
    chance: '100%',
    result: 'damage',
  },
  priority: 'slow',
}

// export const QuickStrike = {
//   name: 'Quick Strike',
//   type: 'physical',
//   damage: 25,
//   speed: 7,
//   energyCost: 3,
//   effect: {
//     description: 'High critical hit chance',
//     chance: '50%',
//     result: 'critical_hit',
//   },
//   priority: 'fast',
// }
export const QuickStrike = {
  name: 'Quick Strike',
  type: 'physical',
  damage: 25,
  speed: 7,
  cost: { energy: 3 },
  // energyCost: 3,
  effect: {
    description: 'High critical hit chance',
    chance: '50%',
    result: 'critical_hit',
  },
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
    speed: 9, // Slightly slower due to the added power
    cost: { energy: 4 },

    energyCost: 4, // Increased energyCost cost for the Forceful aspect
    effect: {
      description: 'Guaranteed critical hit and additional damage',
      chance: '100%',
      result: 'critical_hit',
    },
    targets: ['opponent', 'opponent_pals'],
  },
}

export const WebTrap = {
  name: 'Web Trap',
  type: 'status',
  speed: 4,
  cost: { energy: 2 },
  energyCost: 2,
  effect: {
    description: 'Immobilizes target briefly',
    chance: '40%',
    result: 'immobilize',
  },
  priority: 'normal',
}

export const Teleport = {
  name: 'Teleport',
  type: 'utility',
  speed: 9,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Instantly move to another location',
    chance: '100%',
    result: 'teleport',
  },
  priority: 'fast',
}

export const Mimicry = {
  name: 'Mimicry',
  type: 'utility',
  speed: 5,
  cost: { energy: 3 },
  energyCost: 3,
  effect: {
    description: "Copies the opponent's last move",
    chance: '100%',
    result: 'copy_move',
  },
  priority: 'normal',
}
export const DoubleStrike = {
  name: 'Double Strike',
  type: 'physical',
  damage: 15,
  speed: 7,
  cost: { energy: 3 },
  energyCost: 3,
  effect: {
    description: 'Goes again if the first attack is successful',
    chance: '100%',
    result: 'double_strike',
  },
  priority: 'fast',
}

export const LifeSwap = {
  name: 'Life Swap',
  type: 'heal',
  speed: 7,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description: 'Exchanges HP with the target',
    chance: '100%',
    result: 'life_swap',
  },
  priority: 'slow',
}

export const Thunderstorm = {
  name: 'Thunderstorm',
  type: 'elemental',
  damage: 40,
  speed: 8,
  cost: { energy: 6 },
  energyCost: 6,
  effect: {
    description: 'Chance to paralyze multiple targets',
    chance: '30%',
    result: 'paralyze_multiple',
  },
  priority: 'slow',
}

export const StealthyAmbush = {
  name: 'Stealthy Ambush',
  type: 'utility',
  speed: 6,
  cost: { energy: 4 },
  energyCost: 4,
  effect: {
    description: 'Hides for a turn and then appears. Good for poison.',
    chance: '100%',
    result: 'stealthy_ambush',
  },
  priority: 'fast',
}

export const MirrorImage = {
  name: 'Mirror Image',
  type: 'buff',
  speed: 6,
  cost: { energy: 3 },
  energyCost: 3,
  effect: {
    description: 'Creates illusion copies',
    chance: '100%',
    result: 'mirror_image',
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
//     chance: '100%',
//     result: 'ice_wall',
//   },
//   priority: 'slow',
// }
export const IceWall = {
  name: 'Ice Wall',
  type: 'elemental',
  damage: 0,
  speed: 7,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Forms a protective ice wall',
    chance: '100%',
    result: 'ice_wall',
  },
  priority: 'slow',
  targets: ['arena'],
  notSoFast: {
    name: 'Chilled Defenses',
    type: 'buff',
    effect: {
      description: 'Enhance the defensive capabilities of the Ice Wall',
      duration: '1 turn',
      defense_boost: 30,
    },
  },
  forceful: {
    name: 'Glacial Fortress',
    type: 'elemental',
    damage: 0,
    speed: 9,
    cost: { energy: 6 },
    energyCost: 6,
    effect: {
      description:
        'Strengthen the Ice Wall and provide a protective barrier for pals',
      chance: '100%',
      result: 'ice_wall',
    },
    targets: ['arena'],
  },
}

// luminowl attacks
export const LightBeam = {
  name: 'Light Beam',
  type: 'elemental',
  damage: 40,
  speed: 12,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Fires a beam of blinding light at the opponent',
    chance: '30%',
    result: 'blind',
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Evasive Twirl',
    type: 'buff',
    effect: {
      description: 'Perform an evasive twirl to dodge incoming attacks',
      duration: '1 turn',
      evasion_boost: 50, // Increase evasion for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Solar Flare',
    type: 'elemental',
    damage: 60,
    speed: 15,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description:
        'Unleash a blinding solar flare to guarantee blinding the opponent',
      chance: '100%',
      result: 'blind',
    },
    targets: ['opponent'],
  },
}

export const WiseGaze = {
  name: 'Wise Gaze',
  type: 'elemental',
  damage: 30,
  speed: 10,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Pierces the opponent with a wise and penetrating gaze',
    chance: '20%',
    result: 'confuse',
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Clarity of Mind',
    type: 'buff',
    effect: {
      description: 'Calm your mind to resist confusion',
      duration: '1 turn',
      confusion_resist: 100, // Provides immunity to confusion for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Enlightened Stare',
    type: 'elemental',
    damage: 45,
    speed: 12,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description: 'Lock eyes with the opponent, ensuring confusion',
      chance: '100%',
      result: 'confuse',
    },
    targets: ['opponent'],
  },
}

export const FeatherGlide = {
  name: 'Feather Glide',
  type: 'physical',
  damage: 35,
  speed: 8,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description:
      'Glide gracefully to deliver a swift and graceful physical attack',
    chance: '10%',
    result: 'stun',
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Aerial Agility',
    type: 'buff',
    effect: {
      description: 'Enhance your aerial agility to dodge incoming attacks',
      duration: '1 turn',
      evasion_boost: 40, // Increase evasion for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Celestial Dive',
    type: 'physical',
    damage: 50,
    speed: 10,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description:
        'Perform a celestial dive to guarantee stunning the opponent',
      chance: '100%',
      result: 'stun',
    },
    targets: ['opponent'],
  },
}

// all Glowbuggle moves
export const LuminousFlight = {
  name: 'Luminous Flight',
  type: 'elemental',
  damage: 40,
  speed: 11,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description: 'Take flight and emit a radiant glow',
    chance: '20%',
    result: 'illuminate',
  },
  priority: 'medium',
  targets: ['user_pals'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Luminous Shield',
    type: 'buff',
    effect: {
      description: 'Emit a protective shield of light for your pals',
      duration: '1 turn',
      shield_value: 40, // Create a protective shield
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Dazzling Radiance',
    type: 'elemental',
    damage: 55,
    speed: 14,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description: 'Emit blinding radiance, guaranteeing illumination',
      chance: '100%',
      result: 'illuminate',
    },
    targets: ['user_pals'],
  },
}

export const GlowingCharm = {
  name: 'Glowing Charm',
  type: 'elemental',
  damage: 0, // Glowing Charm doesn't deal damage
  speed: 9,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description: 'Emit a comforting and charming glow',
    chance: '100%',
    result: 'charm',
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Radiant Resilience',
    type: 'buff',
    effect: {
      description: 'Enhance your resistance to charm',
      duration: '1 turn',
      charm_resist: 100, // Provides immunity to charm for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Enchanting Aura',
    type: 'elemental',
    damage: 0, // Forceful aspect doesn't deal damage either
    speed: 10,
    cost: { energy: 4 },
    energyCost: 5,
    effect: {
      description: 'Radiate an enchanting aura to guarantee charm',
      chance: '100%',
      result: 'charm',
    },
    targets: ['opponent'],
  },
}

export const WarmEmbrace = {
  name: 'Warm Embrace',
  type: 'healing',
  healing: 50, // Healing value
  speed: 8,
  cost: { energy: 4 },
  energyCost: 5,
  effect: {
    description: 'Offer a warm and comforting embrace, healing pals',
    chance: '100%',
    result: 'heal',
  },
  priority: 'medium',
  targets: ['user_pals'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Caring Touch',
    type: 'buff',
    effect: {
      description: 'Strengthen the healing effect of Warm Embrace',
      duration: '1 turn',
      healing_boost: 30, // Increase the healing effect
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Glowing Restoration',
    type: 'healing',
    healing: 70, // Increased healing value
    speed: 10,
    cost: { energy: 8 },
    energyCost: 8,
    effect: {
      description: 'Channel a powerful healing glow to ensure maximum healing',
      chance: '100%',
      result: 'heal',
    },
    targets: ['user_pals'],
  },
}

// All Umbrabunny moves:
export const EmotionDrain = {
  name: 'Emotion Drain',
  type: 'dark',
  damage: 40,
  speed: 12,
  cost: { energy: 5 },
  energyCost: 5,
  effect: {
    description: 'Drain the opponents emotions to weaken them',
    chance: '20%',
    result: 'debuff',
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Resilient Spirit',
    type: 'buff',
    effect: {
      description: 'Enhance your emotional resilience to resist debuffs',
      duration: '1 turn',
      debuff_resist: 100, // Provides immunity to debuffs for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Soul Siphon',
    type: 'dark',
    damage: 60,
    speed: 14,
    cost: { energy: 7 },
    energyCost: 7,
    effect: {
      description: 'Drain the opponents soul, guaranteeing debuffs',
      chance: '100%',
      result: 'debuff',
    },
    targets: ['opponent'],
  },
}

export const CuteCharm = {
  name: 'Cute Charm',
  type: 'elemental',
  damage: 0, // Cute Charm doesn't deal damage
  speed: 9,
  cost: { energy: 4 },
  energyCost: 4,
  effect: {
    description: 'Exude an adorable and charming presence',
    chance: '100%',
    result: 'charm',
  },
  priority: 'medium',
  targets: ['opponent'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Charming Aura',
    type: 'buff',
    effect: {
      description: 'Enhance your charm to guarantee success',
      duration: '1 turn',
      charm_resist: 100, // Provides immunity to charm for 1 turn
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Enchanting Presence',
    type: 'elemental',
    damage: 0, // Forceful aspect doesn't deal damage either
    speed: 10,
    cost: { energy: 5 },
    energyCost: 5,
    effect: {
      description: 'Radiate an enchanting aura to guarantee charm',
      chance: '100%',
      result: 'charm',
    },
    targets: ['opponent'],
  },
}

export const ComfortingHug = {
  name: 'Comforting Hug',
  type: 'healing',
  healing: 50, // Healing value
  speed: 8,
  cost: { energy: 6 },
  energyCost: 6,
  effect: {
    description: 'Offer a comforting hug to heal pals',
    chance: '100%',
    result: 'heal',
  },
  priority: 'medium',
  targets: ['user_pals'],
  // "NotSoFast" aspect:
  notSoFast: {
    name: 'Reassuring Embrace',
    type: 'buff',
    effect: {
      description: 'Strengthen the healing effect of Comforting Hug',
      duration: '1 turn',
      healing_boost: 30, // Increase the healing effect
    },
  },
  // "Forceful" aspect:
  forceful: {
    name: 'Soothing Embrace',
    type: 'healing',
    healing: 70, // Increased healing value
    speed: 10,
    cost: { energy: 8 },
    energyCost: 8,
    effect: {
      description: 'Offer a profound and soothing embrace for maximum healing',
      chance: '100%',
      result: 'heal',
    },
    targets: ['user_pals'],
  },
}
