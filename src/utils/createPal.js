export function createPal(palTemplate, level, seed, difficulty = 0) {
  const statModifier = (seed % 10) / 100 + difficultyAdjustments[difficulty]

  const newStats = Object.keys(palTemplate.baseStats).reduce(
    (newStats, stat) => {
      const baseStat = palTemplate.baseStats[stat]
      const growthRate = palTemplate.statBonuses[stat]?.rate || 1 // Default growth rate to 1 if not specified
      const statIncrease = Math.floor(
        baseStat * ((level - 1) * growthRate + statModifier),
      )
      newStats[stat] = baseStat + statIncrease
      return newStats
    },
    {},
  )

  const newPal = {
    ...palTemplate,
    id: Math.random().toString(36).substr(2, 9),
    level,
    stats: newStats,
    experience: 0,
    moves: palTemplate.moveSet
      .filter((move) => move.level <= level)
      .map((move) => move.move),
  }

  return newPal
}

export function levelUpPal(pal, levelsGained) {
  let newLevel = pal.level + levelsGained
  let newMoves = [...pal.moves] // Clone the current moves to avoid mutating the original array

  // Apply stat bonuses based on level intervals
  Object.keys(pal.statBonuses).forEach((stat) => {
    const bonus = pal.statBonuses[stat]
    for (let level = 1; level <= newLevel; level++) {
      if (level % bonus.every === 0) {
        pal.baseStats[stat] += bonus.amount
      }
    }
  })

  // Unlock new moves based on level
  pal.moveSet.forEach((move) => {
    if (move.level <= newLevel && !newMoves.includes(move.move)) {
      newMoves.push(move.move)
    }
  })

  // Handle evolution if applicable
  if (newLevel >= pal.evolveAt) {
    console.log(`${pal.name} is evolving into ${pal.evolveTo}!`)
    // Evolve pal logic here
  }

  return { ...pal, level: newLevel, moves: newMoves, baseStats: pal.baseStats }
}

//------------------------------------------------------------------------------
export const initializePalStats = (pal, level, difficultyModifier = 1) => {
  // Assume a function to calculate stat increases based on level and difficulty
  const stats = calculateStatsWithLevelAndDifficulty(
    pal.baseStats,
    level,
    difficultyModifier,
  )
  return {
    ...pal,
    stats,
    level,
  }
}
export const unlockNewMovesForPal = (
  state,
  palId,
  level,
  isOpponent = false,
) => {
  const key = isOpponent ? 'opponent' : 'userParty'
  state = {
    ...state,
    [key]: state[key].map((pal) => {
      if (pal.id === palId) {
        const newMoves = pal.moveSet
          .filter((move) => move.level <= level)
          .map((move) => move.move)
        return { ...pal, moves: [...new Set([...pal.moves, ...newMoves])] }
      }
      return pal
    }),
  }
  return state
}

export const setupNewBattle = (
  state,
  playerLevel,
  opponentLevel,
  difficulty,
) => {
  //handle user pals
  state = healAllPalsToMax(state)
  state.userParty.forEach((pal) => {
    state = resetPalStatuses(state, pal.id)
    state = resetPalEnergyToMax(state, pal.id)
    state = unlockNewMovesForPal(state, pal.id, pal.level)
  })

  //handle opponent pals
  state.opponent.monsters.forEach((monster) => {
    const initializedMonster = initializePalStats(
      monster,
      opponentLevel,
      difficulty,
    )
    state = resetPalStatuses(state, initializedMonster.id, true)
    state = resetPalEnergyToMax(state, initializedMonster.id, true)
    // heal enemy pal?
    state = unlockNewMovesForPal(
      state,
      initializedMonster.id,
      initializedMonster.level,
      true,
    )
  })

  return state
}
/**
 * Calculate stats for a pal based on its level and the game's difficulty.
 *
 * @param {Object} baseStats - The base stats of the pal.
 * @param {number} level - The current level of the pal.
 * @param {number} difficultyModifier - A multiplier based on game difficulty.
 * @returns {Object} The adjusted stats object.
 */
export const calculateStatsWithLevelAndDifficulty = (
  baseStats,
  level,
  difficultyModifier,
) => {
    
//   const statGrowthRates = {
//     hp: { base: 10, rate: 2 }, // Example: +10 HP base per level, with a growth rate of 2%
//     attack: { base: 1, rate: 1.5 },
//     defense: { base: 1, rate: 1.5 },
//     specialAttack: { base: 1, rate: 1.5 },
//     specialDefense: { base: 1, rate: 1.5 },
//     speed: { base: 1, rate: 1.5 },
//     // Add any other stats here
//   }

// I presume the only base stats we need here to modify are hp, attack, defense
// maybe evasion?
// in that case, i'll probably have a specific rate for each on each pal.

  let adjustedStats = {}
  Object.keys(baseStats).forEach((statKey) => {
    const { base, rate } = statGrowthRates[statKey]
    const levelAdjustment =
      base * level + baseStats[statKey] * (rate / 100) * level
    const difficultyAdjustment = levelAdjustment * difficultyModifier
    adjustedStats[statKey] = Math.round(
      baseStats[statKey] + difficultyAdjustment,
    )
  })

  return adjustedStats
}
