export const PASSIVE_TYPES = {
  EVASION: 'Evasion',
  STEALTH: 'Stealth',
  REGEN: 'Regen',
  MANA: 'Mana',
  COST_REDUCTION: 'Cost Reduction',
  HEALTH: 'Health',
  MANA_REGEN: 'Mana Regen',
  CRIT: 'Crit',
  CRIT_CHANCE: 'Crit Chance',
  CRIT_DAMAGE: 'Crit Damage',
  MANA_COST: 'Mana Cost',
  MANA_COST_REDUCTION: 'Mana Cost Reduction',
  DAMAGE: 'Damage',
  DAMAGE_REDUCTION: 'Damage Reduction',
  DAMAGE_MULTIPLIER: 'Damage Multiplier',
  SPEED: 'Speed',
  HEALTH_REGEN_MULTIPLIER: 'Health Regen Multiplier',
  MANA_REGEN_MULTIPLIER: 'Mana Regen Multiplier',
  HEALTH_REDUCTION: 'Health Reduction',
  MANA_REDUCTION: 'Mana Reduction',
  EVADE: 'Evade',
}

export const mysticRegeneration = {
  id: 101,
  name: 'Mystic Regeneration',
  effects: [{ type: PASSIVE_TYPES.REGEN, amt: 4 }],
  // effects: [{ type: 'health regeneration', amt: '2% per turn' }],
  details: 'Restores a small amount of health each turn.',
  reasoning: 'Encourages sustained battles and enhances survivability.',
}
export const shadowCamouflage = {
  id: 103,
  name: 'Shadow Camouflage',
  effects: [
    { type: PASSIVE_TYPES.EVADE, amt: 20 },
    { type: PASSIVE_TYPES.STEALTH, amt: 10 },
    // { type: 'evasion', amt: '20%' }, { type: 'stealth', amt: '10%' },
  ],
  details: 'Increases evasion by adapting to environments.',
  reasoning: 'Useful for stealth-based strategies.',
}
export const manaEcho = {
  id: 105,

  name: 'Mana Echo',
  effects: [{ type: PASSIVE_TYPES.COST_REDUCTION, amt: '5% chance' }],
  details: 'Slight chance to cast a spell without using mana.',
  reasoning: 'Promotes frequent use of magic.',
}
export const criticalInsight = {
  id: 108,
  name: 'Critical Insight',
  effects: [{ type: PASSIVE_TYPES.CRIT, amt: 5 }],
  details: 'Increases critical hit chance.',
  reasoning: 'Boosts damage output for luck-based strategies.',
}
// -----------
// ------
// ---
export const mysticRegenerationDeprecated = {
  id: 1,
  name: 'Mystic Regeneration',
  effects: [{ type: 'health regeneration', amt: '2% per turn' }],
  details: 'Restores a small amount of health each turn.',
  reasoning: 'Encourages sustained battles and enhances survivability.',
}

export const elementalAdaptation = {
  id: 2,
  name: 'Elemental Adaptation',
  effects: [{ type: 'elemental resistance', amt: '15%' }],
  details: 'Reduces damage from elemental attacks (fire, water, etc.).',
  reasoning: 'Rewards strategic planning against elemental opponents.',
}

export const shadowCamouflageDeprecated = {
  id: 3,
  name: 'Shadow Camouflage',
  effects: [
    { type: 'evasion', amt: '20%' },
    { type: 'stealth', amt: '10%' },
  ],
  details: 'Increases evasion in dark environments.',
  reasoning: 'Useful for stealth-based strategies.',
}

export const sturdyFrame = {
  id: 4,
  name: 'Sturdy Frame',
  effects: [{ type: 'physical damage reduction', amt: '10%' }],
  details: 'Reduces physical damage taken.',
  reasoning: 'Benefits tank-type characters.',
}

export const manaEchoDeprecated = {
  id: 5,
  name: 'Mana Echo',
  effects: [{ type: 'mana cost reduction', amt: '5% chance' }],
  details: 'Slight chance to cast a spell without using mana.',
  reasoning: 'Promotes frequent use of magic.',
}

export const quickReflexes = {
  id: 6,
  name: 'Quick Reflexes',
  effects: [{ type: 'dodge chance', amt: '15%' }],
  details: 'Increases chance of dodging attacks.',
  reasoning: 'Favors agility-based characters.',
}

export const harvestBounty = {
  id: 7,
  name: 'Harvest Bounty',
  effects: [{ type: 'loot drop rate', amt: '10%' }],
  details: 'Increases loot drop rate.',
  reasoning: 'Encourages exploration and enemy engagements.',
}

export const criticalInsightDeprecated = {
  id: 8,
  name: 'Critical Insight',
  effects: [{ type: 'critical hit chance', amt: '5%' }],
  details: 'Increases critical hit chance.',
  reasoning: 'Boosts damage output for luck-based strategies.',
}

export const soothingAura = {
  id: 9,
  name: 'Soothing Aura',
  effects: [{ type: 'ailment recovery', amt: '10% faster' }],
  details: 'Gradually reduces status ailments over time.',
  reasoning: 'Helps in long-term ailment management.',
}

export const elementalFury = {
  id: 10,
  name: 'Elemental Fury',
  effects: [{ type: 'elemental effect chance', amt: '10% chance' }],
  details:
    'Elemental attacks have a chance to apply a secondary effect (burn, freeze, etc.).',
  reasoning: 'Adds depth to elemental combat.',
}

export const fortunesFavor = {
  id: 11,
  name: "Fortune's Favor",
  effects: [{ type: 'rare item find rate', amt: '15%' }],
  details: 'Increases the chance of finding rare items.',
  reasoning: 'Enhances the reward for exploration.',
}

export const thornArmor = {
  id: 12,
  name: 'Thorn Armor',
  effects: [{ type: 'damage reflection', amt: '5% of damage taken' }],
  details: 'Reflects a portion of physical damage back to the attacker.',
  reasoning: 'Deters enemies from attacking.',
}

export const manaFlow = {
  id: 13,
  name: 'Mana Flow',
  effects: [{ type: 'mana regeneration', amt: '3% per turn' }],
  details: 'Slowly regenerates mana over time.',
  reasoning: 'Supports consistent use of magic.',
}

export const battleWisdom = {
  id: 14,
  name: 'Battle Wisdom',
  effects: [{ type: 'experience gain', amt: '10%' }],
  details: 'Gain more experience from battles.',
  reasoning: 'Accelerates character progression.',
}

export const naturesGift = {
  id: 15,
  name: "Nature's Gift",
  effects: [{ type: 'healing effectiveness', amt: '20%' }],
  details: 'Healing items are more effective.',
  reasoning: 'Improves survivability through item usage.',
}

export const blindingSpeed = {
  id: 16,
  name: 'Blinding Speed',
  effects: [{ type: 'hit chance', amt: 'First attack +15%' }],
  details: 'First attack in battle has increased hit chance.',
  reasoning: 'Gives an edge at the start of combat.',
}

export const poisonMastery = {
  id: 17,
  name: 'Poison Mastery',
  effects: [
    { type: 'poison potency', amt: '25%' },
    { type: 'poison duration', amt: '20% longer' },
  ],
  details: 'Poison attacks are more potent.',
  reasoning: 'Specializes in poison-based strategies.',
}

export const deepBreath = {
  id: 18,
  name: 'Deep Breath',
  effects: [{ type: 'stamina regeneration', amt: '5% per turn' }],
  details: 'Restores a small amount of stamina each turn.',
  reasoning: 'Allows for more frequent use of special abilities.',
}

export const guardianSpirit = {
  id: 19,
  name: 'Guardian Spirit',
  effects: [{ type: 'damage negation', amt: '5% chance' }],
  details: 'Occasionally blocks an attack completely.',
  reasoning: 'Provides a chance-based defensive benefit.',
}

export const echoingRoar = {
  id: 20,
  name: 'Echoing Roar',
  effects: [{ type: 'intimidation', amt: 'Reduces enemy attack power by 10%' }],
  details: 'Attacks have a chance to intimidate, lowering enemy attack power.',
  reasoning: 'Adds a psychological aspect to combat.',
}

export const ancientWisdom = {
  id: 21,
  name: 'Ancient Wisdom',
  effects: [{ type: 'cooldown reduction', amt: '15%' }],
  details: 'Reduces cooldowns of abilities.',
  reasoning: 'Encourages more active use of abilities.',
}

export const mysticLink = {
  id: 22,
  name: 'Mystic Link',
  effects: [{ type: 'support ability boost', amt: '20%' }],
  details: 'Boosts effectiveness of allied support abilities.',
  reasoning: 'Promotes team-based strategies.',
}

export const celestialBlessing = {
  id: 23,
  name: 'Celestial Blessing',
  effects: [{ type: 'revival chance', amt: '2% chance upon defeat' }],
  details: 'Slight chance to revive upon defeat.',
  reasoning: 'Offers a rare chance at a second life in battle.',
}

export const spectralDodge = {
  id: 24,
  name: 'Spectral Dodge',
  effects: [{ type: 'initial dodge chance', amt: '25% for the first attack' }],
  details: 'Phases through the first attack in battle.',
  reasoning: 'Provides an early advantage in avoiding damage.',
}

export const ragingInferno = {
  id: 25,
  name: 'Raging Inferno',
  effects: [
    { type: 'spread chance', amt: '15% chance for fire attacks to spread' },
  ],
  details: 'Fire attacks have a chance to spread, hitting adjacent enemies.',
  reasoning: 'Enhances area-of-effect strategies.',
}

export const enduringSoul = {
  id: 26,
  name: 'Enduring Soul',
  effects: [{ type: 'debuff duration reduction', amt: '20% shorter' }],
  details: 'Reduces the duration of negative status effects.',
  reasoning: 'Mitigates the impact of debuffs.',
}

export const shockwave = {
  id: 27,
  name: 'Shockwave',
  effects: [
    { type: 'stun chance', amt: '10% chance to stun with physical attacks' },
  ],
  details: 'Physical attacks have a chance to stun the enemy.',
  reasoning: 'Adds crowd-control possibilities to physical combat.',
}

export const bountyHunter = {
  id: 28,
  name: 'Bounty Hunter',
  effects: [{ type: 'extra currency', amt: '20% more currency from battles' }],
  details: 'Gains extra currency from battles.',
  reasoning: 'Useful for players focused on in-game economy.',
}

export const iceVeins = {
  id: 29,
  name: 'Ice Veins',
  effects: [
    {
      type: 'freeze immunity',
      amt: '100% resistance to freeze and chill effects',
    },
  ],
  details: 'Immunity to freeze and chill effects.',
  reasoning: 'Specialized defensive trait against cold-based attacks.',
}

export const lightfoot = {
  id: 30,
  name: 'Lightfoot',
  effects: [{ type: 'stealth', amt: 'Decreases noise by 20%' }],
  details: 'Reduces noise generated, making it harder for enemies to detect.',
  reasoning: 'Supports a stealthy approach to encounters.',
}

export const arcaneResilience = {
  id: 31,
  name: 'Arcane Resilience',
  effects: [{ type: 'magical damage reduction', amt: '15%' }],
  details: 'Reduces magical damage taken.',
  reasoning: 'Strengthens defense against magic users.',
}

export const berserkersRage = {
  id: 32,
  name: "Berserker's Rage",
  effects: [
    { type: 'attack power boost', amt: '25% when health is below 30%' },
  ],
  details: 'Increases attack power when health is low.',
  reasoning: 'Encourages risky, high-reward play.',
}

export const windWalker = {
  id: 33,
  name: 'Wind Walker',
  effects: [{ type: 'movement speed', amt: '15% increase' }],
  details: 'Increases movement speed.',
  reasoning: 'Enhances mobility and map exploration.',
}

export const sunBlessing = {
  id: 34,
  name: 'Sun Blessing',
  effects: [{ type: 'health regeneration', amt: '1% per turn in sunlight' }],
  details: 'Slow health regeneration in bright areas.',
  reasoning: 'Rewards environmental awareness.',
}

export const moonsGrace = {
  id: 35,
  name: "Moon's Grace",
  effects: [{ type: 'stat increase', amt: '10% during night cycles' }],
  details: 'Increases stats during night cycles.',
  reasoning: 'Adds time-based strategy elements.',
}

export const galeForce = {
  id: 36,
  name: 'Gale Force',
  effects: [{ type: 'wind attack power', amt: '20% increase' }],
  details: 'Wind-based attacks have increased power.',
  reasoning: 'Specializes in wind-element strategies.',
}

export const earthsEmbrace = {
  id: 37,
  name: "Earth's Embrace",
  effects: [{ type: 'defense boost', amt: '15% on natural terrain' }],
  details: 'Increases defense when standing on natural terrain.',
  reasoning: 'Encourages positional tactics.',
}

export const waterAffinity = {
  id: 38,
  name: 'Water Affinity',
  effects: [{ type: 'buffs in water', amt: '10% stat boost in or near water' }],
  details: 'Gains buffs when in or near water.',
  reasoning: 'Enhances abilities in specific environments.',
}

export const fireResistance = {
  id: 39,
  name: 'Fire Resistance',
  effects: [{ type: 'fire damage reduction', amt: '20%' }],
  details: 'Reduces damage from fire-based attacks.',
  reasoning: 'Tailored for volcanic or fiery areas.',
}

export const soulSiphon = {
  id: 40,
  name: 'Soul Siphon',
  effects: [
    {
      type: 'health absorption',
      amt: 'Absorb 3% health from defeated enemies',
    },
  ],
  details: 'Absorbs a small amount of health from defeated enemies.',
  reasoning: 'Promotes aggressive play.',
}

export const stoneSkin = {
  id: 41,
  name: 'Stone Skin',
  effects: [{ type: 'stun resistance', amt: '30% chance to resist stuns' }],
  details: 'Reduces chance of being stunned or immobilized.',
  reasoning: 'Ideal for maintaining combat momentum.',
}

export const nimbleFingers = {
  id: 42,
  name: 'Nimble Fingers',
  effects: [
    {
      type: 'skill proficiency',
      amt: '20% increase in lock-picking and trap disarming',
    },
  ],
  details: 'Increases lock-picking and trap disarming skills.',
  reasoning: 'Benefits exploratory and cunning play.',
}

export const echoLocation = {
  id: 43,
  name: 'Echo Location',
  effects: [
    {
      type: 'detection',
      amt: 'Reveals hidden objects within a 10-meter radius',
    },
  ],
  details: 'Reveals hidden doors and passages.',
  reasoning: 'Encourages thorough exploration.',
}

export const starlightsGuidance = {
  id: 44,
  name: "Starlight's Guidance",
  effects: [
    {
      type: 'nighttime accuracy',
      amt: '15% increased accuracy under the stars',
    },
  ],
  details: 'Increases accuracy under starry skies.',
  reasoning: 'Links combat efficiency with in-game time.',
}

export const stormRider = {
  id: 45,
  name: 'Storm Rider',
  effects: [
    { type: 'storm power boost', amt: '20% ability enhancement during storms' },
  ],
  details: 'Enhanced abilities during stormy weather.',
  reasoning: 'Adds dynamic interaction with weather.',
}

export const beastWhisperer = {
  id: 46,
  name: 'Beast Whisperer',
  effects: [
    {
      type: 'wildlife affinity',
      amt: '30% reduced aggression from wild creatures',
    },
  ],
  details: 'Reduces aggression from wild creatures.',
  reasoning: 'Facilitates a more peaceful approach.',
}

export const terraform = {
  id: 47,
  name: 'Terraform',
  effects: [
    {
      type: 'terrain alteration',
      amt: 'Subtle terrain changes over extended periods',
    },
  ],
  details: 'Slightly alters terrain over time.',
  reasoning: 'Influences battlefield conditions.',
}

export const etherealStep = {
  id: 48,
  name: 'Ethereal Step',
  effects: [
    {
      type: 'obstacle passing',
      amt: 'Can pass through obstacles up to 1 meter thick',
    },
  ],
  details: 'Can pass through certain obstacles.',
  reasoning: 'Offers unique movement options.',
}

export const frostborn = {
  id: 49,
  name: 'Frostborn',
  effects: [{ type: 'ice immunity', amt: '100% immunity to slipping on ice' }],
  details: 'Immunity to slipping on ice.',
  reasoning: 'Specific advantage in icy terrains.',
}

export const masterTactician = {
  id: 50,
  name: 'Master Tactician',
  effects: [
    {
      type: 'critical against stronger foes',
      amt: '5% increased critical chance against higher-level enemies',
    },
  ],
  details:
    'Slight increase in critical hit chance against higher-level enemies.',
  reasoning: 'Rewards challenges against tough opponents.',
}

export const lavaWalker = {
  id: 51,
  name: 'Lava Walker',
  effects: [{ type: 'lava immunity', amt: '100% immunity to lava damage' }],
  details: 'Can walk on lava without damage.',
  reasoning: 'Unique environmental interaction.',
}

export const spectralWhisper = {
  id: 52,
  name: 'Spectral Whisper',
  effects: [
    { type: 'enemy detection', amt: 'Reveals the weakest enemy in a group' },
  ],
  details: 'Reveals the weakest enemy in a group.',
  reasoning: 'Assists in strategic targeting.',
}

export const bountifulHarvest = {
  id: 53,
  name: 'Bountiful Harvest',
  effects: [
    { type: 'gathering yield', amt: '25% increased yield from gathering' },
  ],
  details: 'Increases yield from gathering activities.',
  reasoning: 'Enhances resource collection.',
}

export const phoenixRebirth = {
  id: 54,
  name: 'Phoenix Rebirth',
  effects: [
    {
      type: 'revival',
      amt: '5% chance to resurrect with full health on defeat',
    },
  ],
  details: 'Very rare chance of resurrecting with full health on defeat.',
  reasoning: 'Provides a rare but game-changing comeback potential.',
}

export const ironStomach = {
  id: 55,
  name: 'Iron Stomach',
  effects: [
    {
      type: 'consumption resistance',
      amt: 'Can consume a wider range of items without negative effects',
    },
  ],
  details: 'Can consume various items without negative effects.',
  reasoning: 'Expands usable items in gameplay.',
}

export const shadowStrike = {
  id: 56,
  name: 'Shadow Strike',
  effects: [
    {
      type: 'stealth damage',
      amt: '25% increased damage when attacking from stealth',
    },
  ],
  details: 'Increased damage when attacking from stealth.',
  reasoning: 'Rewards sneaky attack strategies.',
}

export const invisibleAura = {
  id: 57,
  name: 'Invisible Aura',
  effects: [
    {
      type: 'detection reduction',
      amt: '15% decrease in enemy detection range',
    },
  ],
  details: 'Slightly decreases enemy detection range.',
  reasoning: 'Enhances stealth gameplay.',
}

export const elementalHarmony = {
  id: 58,
  name: 'Elemental Harmony',
  effects: [
    {
      type: 'cooldown synergy',
      amt: 'Using an elemental skill reduces cooldown of other elemental skills by 10%',
    },
  ],
  details:
    'Using an elemental skill reduces the cooldown of other elemental skills.',
  reasoning: 'Encourages diverse elemental skill usage.',
}

export const astralProjection = {
  id: 59,
  name: 'Astral Projection',
  effects: [
    {
      type: 'damage avoidance',
      amt: '10% chance to avoid all damage from an attack',
    },
  ],
  details: 'Occasionally avoids all damage from an attack.',
  reasoning: 'Offers a mystical defensive strategy.',
}

export const unseenPredator = {
  id: 60,
  name: 'Unseen Predator',
  effects: [
    {
      type: 'ambush damage',
      amt: '30% increased attack power when undetected',
    },
  ],
  details: 'Increased attack power when undetected.',
  reasoning: 'Benefits ambush tactics.',
}

export const toxicResistance = {
  id: 61,
  name: 'Toxic Resistance',
  effects: [
    { type: 'poison resistance', amt: '50% reduction in poison damage' },
  ],
  details: 'Reduces damage from poison.',
  reasoning: 'Protective against certain environmental hazards.',
}

export const dragonsBreath = {
  id: 62,
  name: "Dragon's Breath",
  effects: [
    {
      type: 'burning damage',
      amt: '20% chance to cause lingering burning damage with fire attacks',
    },
  ],
  details: 'Fire attacks may cause lingering burning damage.',
  reasoning: 'Adds a damage-over-time component to attacks.',
}

export const herbalKnowledge = {
  id: 63,
  name: 'Herbal Knowledge',
  effects: [
    {
      type: 'potion effectiveness',
      amt: '30% increased effectiveness of herbs and potions',
    },
  ],
  details: 'Increases effectiveness of herbs and potions.',
  reasoning: 'Enhances healing and buff items.',
}

export const magneticPersonality = {
  id: 64,
  name: 'Magnetic Personality',
  effects: [
    {
      type: 'item attraction',
      amt: 'Attracts items or coins from a 5-meter radius',
    },
  ],
  details: 'Attracts items or coins from a distance.',
  reasoning: 'Simplifies item collection.',
}

export const electricSurge = {
  id: 65,
  name: 'Electric Surge',
  effects: [
    {
      type: 'chain lightning',
      amt: '15% chance for electric attacks to chain to nearby enemies',
    },
  ],
  details: 'Electric attacks may chain to nearby enemies.',
  reasoning: 'Useful for crowd control.',
}

export const frostShield = {
  id: 66,
  name: 'Frost Shield',
  effects: [
    {
      type: 'freeze on contact',
      amt: '10% chance to freeze attackers on contact',
    },
  ],
  details: 'Chance to freeze attackers on contact.',
  reasoning: 'Adds a defensive mechanism.',
}

export const arcaneMastery = {
  id: 67,
  name: 'Arcane Mastery',
  effects: [
    {
      type: 'mana cost reduction',
      amt: '20% reduction in mana cost of spells',
    },
  ],
  details: 'Reduces mana cost of spells.',
  reasoning: 'Allows for more frequent use of spells.',
}

export const spectralGuard = {
  id: 68,
  name: 'Spectral Guard',
  effects: [
    {
      type: 'intangibility',
      amt: '10% chance to become intangible, avoiding physical attacks',
    },
  ],
  details: 'Occasionally becomes intangible, avoiding physical attacks.',
  reasoning: 'Provides periodic immunity to physical damage.',
}

export const flameHeart = {
  id: 69,
  name: 'Flame Heart',
  effects: [
    {
      type: 'cold resistance',
      amt: 'Increases resistance to cold environments and attacks',
    },
  ],
  details: 'Increases resistance to cold environments and attacks.',
  reasoning: 'Useful in cold areas and against cold-based enemies.',
}

export const natureFury = {
  id: 70,
  name: 'Nature Fury',
  effects: [
    {
      type: 'nature attack boost',
      amt: '25% increase in nature-based attack power',
    },
  ],
  details: 'Nature-based attacks have increased power.',
  reasoning: 'Enhances nature-element strategies.',
}
export const aqueousVeil = {
  id: 71,
  name: 'Aqueous Veil',
  effects: [
    { type: 'water defense', amt: '20% increased defense while in water' },
  ],
  details: 'Provides increased defense while in water.',
  reasoning: 'Enhances defense in aquatic environments.',
}

export const geomancer = {
  id: 72,
  name: 'Geomancer',
  effects: [
    {
      type: 'trap detection',
      amt: '25% increased ability to detect and avoid natural traps',
    },
  ],
  details: 'Can detect and avoid natural traps more easily.',
  reasoning: 'Benefits navigation in nature-based areas.',
}

export const stormborn = {
  id: 73,
  name: 'Stormborn',
  effects: [
    { type: 'storm power', amt: '30% power boost during rain or storms' },
  ],
  details: 'Gains a power boost during rain or storms.',
  reasoning: 'Links ability power to weather conditions.',
}

export const sunWarrior = {
  id: 74,
  name: 'Sun Warrior',
  effects: [
    {
      type: 'sunlight attack power',
      amt: '20% increased attack power in sunny conditions',
    },
  ],
  details: 'Gains attack power in sunny conditions.',
  reasoning: 'Strengthens combat abilities in daylight.',
}

export const moonGuardian = {
  id: 75,
  name: 'Moon Guardian',
  effects: [
    { type: 'night defense', amt: '20% increased defense during night cycles' },
  ],
  details: 'Increased defense during night cycles.',
  reasoning: 'Provides nocturnal defensive benefits.',
}

export const animaSiphon = {
  id: 76,
  name: 'Anima Siphon',
  effects: [
    { type: 'energy steal', amt: 'Steal 5% energy from enemies on hit' },
  ],
  details: 'Steals a small amount of energy from enemies on hit.',
  reasoning: 'Augments energy management during combat.',
}

export const terraGuard = {
  id: 77,
  name: 'Terra Guard',
  effects: [
    {
      type: 'earth resistance',
      amt: '30% increased resistance to earth-based attacks',
    },
  ],
  details: 'Increases resistance to earth-based attacks.',
  reasoning: 'Defensive trait against earth-element attacks.',
}

export const frostbite = {
  id: 78,
  name: 'Frostbite',
  effects: [
    {
      type: 'slowing effect',
      amt: '15% chance to apply a slowing effect with ice attacks',
    },
  ],
  details: 'Chance to apply a slowing effect with ice attacks.',
  reasoning: 'Adds utility to ice-based attacks.',
}

export const celestialAegis = {
  id: 79,
  name: 'Celestial Aegis',
  effects: [
    {
      type: 'magic nullification',
      amt: '10% chance to nullify magical damage',
    },
  ],
  details: 'Random chance to nullify magical damage.',
  reasoning: 'Chance-based magic defense.',
}

export const shadowMeld = {
  id: 80,
  name: 'Shadow Meld',
  effects: [
    {
      type: 'stealth enhancement',
      amt: '25% increased stealth effectiveness in shadows',
    },
  ],
  details: 'Increases stealth effectiveness in shadows.',
  reasoning: 'Enhances hiding and surprise attack capabilities.',
}

export const emberSpirit = {
  id: 81,
  name: 'Ember Spirit',
  effects: [
    { type: 'fire affinity', amt: 'Absorbs 10% of fire damage as health' },
  ],
  details: 'Gains health from fire-based damage.',
  reasoning: 'Turns a potential weakness into a strength.',
}

export const crystalSkin = {
  id: 82,
  name: 'Crystal Skin',
  effects: [
    { type: 'reflective defense', amt: 'Reflects 5% of all ranged attacks' },
  ],
  details: 'Reflects a small percentage of ranged attacks.',
  reasoning: 'Offers a unique form of defense against ranged foes.',
}

export const zephyrWings = {
  id: 83,
  name: 'Zephyr Wings',
  effects: [
    {
      type: 'aerial agility',
      amt: 'Increases jump height and reduces fall damage by 50%',
    },
  ],
  details: 'Enhances jumping ability and reduces fall damage.',
  reasoning: 'Provides greater mobility and safety from heights.',
}

export const terraForce = {
  id: 84,
  name: 'Terra Force',
  effects: [
    {
      type: 'terrain power',
      amt: '25% increased power when standing on rock or soil',
    },
  ],
  details: 'Boosts power when standing on natural terrain.',
  reasoning: 'Leverages the environment to enhance strength.',
}

export const lunarBlessing = {
  id: 85,
  name: 'Lunar Blessing',
  effects: [
    {
      type: 'lunar empowerment',
      amt: '20% ability enhancement under the moonlight',
    },
  ],
  details: 'Abilities are enhanced under the moonlight.',
  reasoning: 'Harnesses the power of the moon for enhanced abilities.',
}

export const solarFlare = {
  id: 86,
  name: 'Solar Flare',
  effects: [
    {
      type: 'solar empowerment',
      amt: 'Blinds enemies for 2 seconds in bright light once per battle',
    },
  ],
  details: 'Can blind enemies in bright light conditions.',
  reasoning: 'Utilizes the sun to disorient opponents.',
}

export const heartOfStone = {
  id: 87,
  name: 'Heart of Stone',
  effects: [
    {
      type: 'damage reduction',
      amt: 'Reduces all physical damage taken by 15%',
    },
  ],
  details: 'Reduces physical damage taken.',
  reasoning: 'Solidifies defenses against physical attacks.',
}

export const windSprint = {
  id: 88,
  name: 'Wind Sprint',
  effects: [
    {
      type: 'speed burst',
      amt: '20% speed increase for the first 5 seconds of battle',
    },
  ],
  details: 'Temporarily increases speed at the start of battle.',
  reasoning: 'Provides an initial advantage in mobility.',
}

export const mirage = {
  id: 89,
  name: 'Mirage',
  effects: [
    {
      type: 'illusion creation',
      amt: 'Creates a decoy once per battle, lasting for 10 seconds',
    },
  ],
  details: 'Creates an illusion to distract enemies.',
  reasoning: 'Adds a tactical element to combat with decoys.',
}

export const venomousTouch = {
  id: 90,
  name: 'Venomous Touch',
  effects: [
    {
      type: 'poison application',
      amt: '10% chance to apply poison on physical contact',
    },
  ],
  details: 'Physical attacks have a chance to poison the enemy.',
  reasoning: 'Enhances physical combat with poison effects.',
}

/**
 * @typedef {object} PassiveAbility
 * @property {string} description - A detailed description of the passive ability.
 * @property {string} type - The type of passive ability (e.g., "Defensive", "Offensive", "Utility").
 * @property {Function} [effect] - A function defining the specific effect of the passive ability.
 */

/**
 * Passive abilities for the React RPG game with Pokémon and Magic: The Gathering mechanics.
 * @type {Object<string, PassiveAbility>}
 */
const passiveAbilities = {
  // Defensive Abilities
  Armor: {
    description:
      'Reduces incoming damage by a fixed amount. Provides additional protection against physical attacks.',
    type: 'Defensive',
    effect: (character) => {
      // Define the armor effect here
    },
  },
  Regeneration: {
    description:
      'Gradually restores health over time, allowing the character to recover from wounds.',
    type: 'Defensive',
    effect: (character) => {
      // Define the regeneration effect here
    },
  },
  Evasion: {
    description:
      'Has a chance to evade incoming attacks or spells, making the character harder to hit.',
    type: 'Defensive',
    effect: (character) => {
      // Define the evasion effect here
    },
  },
  Counterattack: {
    description:
      'Automatically counterattacks when hit by a melee attack, dealing damage to the attacker.',
    type: 'Defensive',
    effect: (character, attacker) => {
      // Define the counterattack effect here
    },
  },

  // Offensive Abilities
  CriticalStrike: {
    description:
      'Has a chance to deal extra damage on successful hits. Critical hits can turn the tide of battle.',
    type: 'Offensive',
    effect: (character) => {
      // Define the critical strike effect here
    },
  },
  Piercing: {
    description:
      "Ignores a portion of the target's armor or defenses, making attacks more effective.",
    type: 'Offensive',
    effect: (character) => {
      // Define the piercing effect here
    },
  },
  Poisonous: {
    description:
      'Applies poison to the target, dealing damage over time. Poison weakens and wears down foes.',
    type: 'Offensive',
    effect: (target) => {
      // Define the poisonous effect here
    },
  },
  Lifesteal: {
    description:
      'Steals a percentage of damage dealt as health, allowing the character to sustain themselves in battle.',
    type: 'Offensive',
    effect: (character, damageDealt) => {
      // Define the lifesteal effect here
    },
  },

  // Utility Abilities
  Camouflage: {
    description:
      'Can hide and become untargetable for a short duration, granting invisibility.',
    type: 'Utility',
    effect: (character) => {
      // Define the camouflage effect here
    },
  },
  Tracking: {
    description:
      'Can detect hidden or invisible creatures or objects, revealing concealed threats.',
    type: 'Utility',
    effect: (character) => {
      // Define the tracking effect here
    },
  },
  Teleportation: {
    description:
      'Can instantly move to a target location on the battlefield, gaining tactical advantage.',
    type: 'Utility',
    effect: (character, targetLocation) => {
      // Define the teleportation effect here
    },
  },
  Aura: {
    description:
      'Emits a beneficial aura that grants nearby allies a bonus, enhancing their abilities and attributes.',
    type: 'Utility',
    effect: (character, allies) => {
      // Define the aura effect here
    },
  },
}

//  undying like kenny
export default passiveAbilities
