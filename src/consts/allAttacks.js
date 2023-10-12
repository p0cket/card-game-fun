export const SolarSpiritBlast = {
  name: "Solar Spirit Blast",
  type: "elemental",
  damage: 45,
  speed: 8,
  fuel: 7,
  effect: {
    description: "Requires charging, high damage",
    chance: "100%",
    result: "damage",
  },
  priority: "slow",
};

export const QuickStrike = {
  name: "Quick Strike",
  type: "physical",
  damage: 25,
  speed: 7,
  fuel: 3,
  effect: {
    description: "High critical hit chance",
    chance: "50%",
    result: "critical_hit",
  },
  priority: "fast",
};

export const WebTrap = {
  name: "Web Trap",
  type: "status",
  speed: 4,
  fuel: 2,
  effect: {
    description: "Immobilizes target briefly",
    chance: "40%",
    result: "immobilize",
  },
  priority: "normal",
};

export const Teleport = {
  name: "Teleport",
  type: "utility",
  speed: 9,
  fuel: 5,
  effect: {
    description: "Instantly move to another location",
    chance: "100%",
    result: "teleport",
  },
  priority: "fast",
};

export const Mimicry = {
  name: "Mimicry",
  type: "utility",
  speed: 5,
  fuel: 3,
  effect: {
    description: "Copies the opponent's last move",
    chance: "100%",
    result: "copy_move",
  },
  priority: "normal",
};
export const DoubleStrike = {
  name: "Double Strike",
  type: "physical",
  damage: 15,
  speed: 7,
  fuel: 3,
  effect: {
    description: "Goes again if the first attack is successful",
    chance: "100%",
    result: "double_strike",
  },
  priority: "fast",
};

export const LifeSwap = {
  name: "Life Swap",
  type: "heal",
  speed: 7,
  fuel: 5,
  effect: {
    description: "Exchanges HP with the target",
    chance: "100%",
    result: "life_swap",
  },
  priority: "slow",
};

export const Thunderstorm = {
  name: "Thunderstorm",
  type: "elemental",
  damage: 40,
  speed: 8,
  fuel: 6,
  effect: {
    description: "Chance to paralyze multiple targets",
    chance: "30%",
    result: "paralyze_multiple",
  },
  priority: "slow",
};

export const StealthyAmbush = {
  name: "Stealthy Ambush",
  type: "utility",
  speed: 6,
  fuel: 4,
  effect: {
    description: "Hides for a turn and then appears. Good for poison.",
    chance: "100%",
    result: "stealthy_ambush",
  },
  priority: "fast",
};

export const MirrorImage = {
  name: "Mirror Image",
  type: "buff",
  speed: 6,
  fuel: 3,
  effect: {
    description: "Creates illusion copies",
    chance: "100%",
    result: "mirror_image",
  },
  priority: "normal",
};

export const IceWall = {
  name: "Ice Wall",
  type: "elemental",
  speed: 7,
  fuel: 5,
  effect: {
    description: "Forms a protective ice wall",
    chance: "100%",
    result: "ice_wall",
  },
  priority: "slow",
};
