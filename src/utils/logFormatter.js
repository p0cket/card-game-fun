export function gameLog({
  context,
  phase,
  message,
  data = null,
  group = null,
}) {
  const styles = {
    attack: 'color: red; font-weight: bold;',
    defense: 'color: blue; font-weight: bold;',
    status: 'color: green; font-weight: bold;',
    system: 'color: purple; font-weight: bold;',
    creature: 'color: orange; font-weight: bold;',
    error: 'color: red; font-weight: bold;',
    // Add more contexts as needed
  }

  const style = styles[context] || 'color: black;' // Default style if context not found
  const emoji = context in styles ? '' : 'ℹ️' // Default emoji if context not found

  let formattedMessage = `%c${emoji} [${phase}]: ${message}`

  if (data) {
    formattedMessage += ` | Data: ${JSON.stringify(data, null, 2)}`
  }

  if (group) {
    console.groupCollapsed(group)
  }

  console.log(formattedMessage, style)

  if (data && typeof data === 'object') {
    console.table(data)
  }

  if (group) {
    console.groupEnd()
  }
}

// // Usage Examples
// gameLog({
//   context: 'attack',
//   phase: 'Damage Calculation',
//   message: 'Player attacks enemy',
//   data: { player: 'Hero', attack: 'Fireball', damage: 30 },
//   group: 'Battle Sequence',
// })

// gameLog({
//   context: 'status',
//   phase: 'Status Effect',
//   message: 'Enemy is poisoned',
//   data: { enemy: 'Dragon', status: 'Poison', duration: '3 turns' },
// })

// gameLog({
//   context: 'error',
//   phase: 'Loading Game',
//   message: 'Failed to load character data',
//   data: { error: 'Network Error', errorCode: 500 },
// })

// gameLog({
//   context: 'system',
//   phase: 'Game Initialization',
//   message: 'Game settings loaded',
//   data: { difficulty: 'Hard', players: ['Player 1', 'Player 2'] },
// })

// gameLog({
//   context: 'creature',
//   phase: 'Encounter',
//   message: 'A dragon appears',
//   data: { enemy: 'Dragon', health: 100 },
// })

// gameLog({
//   context: 'defense',
//   phase: 'Damage Calculation',
//   message: 'Player defends against enemy attack',
//   data: { player: 'Hero', defense: 'Shield', damageReduced: 10 },
// })

// gameLog({
//   context: 'status',
//   phase: 'Status Effect',
//   message: 'Player is paralyzed',
//   data: { player: 'Hero', status: 'Paralysis', duration: '2 turns' },
// })

// gameLog({
//   context: 'error',
//   phase: 'Saving Game',
//   message: 'Failed to save game progress',
//   data: { error: 'Disk Full', errorCode: 503 },
// })