const emojis = {
  primary: '🌟',
  secondary: '🌙',
  debug: '🐛',
  info: '📢',
  warn: '⚠️',
  error: '❌',
  success: '✅',
  link: '🔗',
  change: '🔄',
  creature: '🐉', // Emoji for creature data
  move: '💨', // Emoji for move data
  pay: '💰', // New emoji for pay cost phase
  calcDamage: '💥', // New emoji for calculate damage phase
  effect: '✨', // New emoji for resolve effect phase
  apply: '🎯', // New emoji for apply statuses phase
  damage: '💔', // New emoji for apply damage phase
  end: '🏁', // New emoji for end phase
  level: '📈', // New emoji for level-related logs
}

const logTypes = {
  primary: { color: 'white', background: 'blue', style: 'bold' },
  secondary: { color: 'black', background: 'gray', style: 'normal' },
  error: { color: 'white', background: 'red', style: 'bold' },
  info: { color: 'black', background: 'cyan', style: 'italic' },
  creature: { color: 'white', background: 'green', style: 'bold' }, // LogType for creature data
  move: { color: 'white', background: 'purple', style: 'italic' }, // LogType for move data
  pay: {
    color: 'black',
    background: 'yellow',
    style: 'bold; font-family:cursive;',
  }, // New logType for pay cost phase with cursive font
  calcDamage: {
    color: 'white',
    background: 'orange',
    style: 'italic; font-family:fantasy;',
  }, // New logType for calculate damage phase with fantasy font
  effect: {
    color: 'black',
    background: 'pink',
    style: 'bold; font-family:sans-serif;',
  }, // New logType for resolve effect phase with sans-serif font
  apply: {
    color: 'white',
    background: 'brown',
    style: 'italic; font-family:courier;',
  }, // New logType for apply statuses phase with courier font
  damage: {
    color: 'black',
    background: 'red',
    style: 'bold; font-family:"Times New Roman";',
  }, // New logType for apply damage phase with Times New Roman font
  end: {
    color: 'white',
    background: 'black',
    style: 'italic; font-family:"Comic Sans MS";',
  }, // New logType for end phase with Comic Sans MS font,
  level: {
    // New logType for level-related logs
    color: 'black',
    background: 'yellow',
    style: 'bold; font-family:cursive;',
  },
}

function format(message, type) {
  // check if the type is valid
  if (logTypes[type]) {
    // get the color, background and style of the type
    let { color, background, style } = logTypes[type]
    // return a formatted string that uses the CSS properties
    return `%c${message}` // use %c to indicate CSS styling
  } else {
    // return the message as it is if the type is invalid
    return message
  }
}

export function cusLog(message, type, group, ...objects) {
  // Get the stack trace
  let stack = new Error().stack
  // Parse the stack trace to get the file name and line number
  let source = stack.split('\n')[2].trim()

  // call the format function to get the formatted string
  let formatted = format(message, type)

  // Add the source information to the formatted message
  formatted = `${formatted} (${source})`

  // check if the type is valid
  if (logTypes[type]) {
    // get the color, background and style of the type
    let { color, background, style } = logTypes[type]
    // create a CSS string that uses the color, background and style
    let css = `color: ${color}; background: ${background}; font-weight: ${style};`
    // get the emoji of the type
    let emoji = emojis[type]
    // prepend the emoji to the formatted string
    formatted = emoji + ' ' + formatted
    // check if the group option is valid
    if (group === 'start') {
      // start a new group with the formatted string and the CSS string
      console.group(formatted, css)
    } else if (group === 'end') {
      // end the current group with the formatted string and the CSS string
      console.groupEnd(formatted, css)
    } else if (group === 'collapsed') {
      // start a new collapsed group with the formatted string and the CSS string
      console.groupCollapsed(formatted, css)
    } else {
      // log the message normally with the formatted string and the CSS string
      console.log(formatted, css, ...objects)
    }
  } else {
    // log the message normally with the formatted string only
    console.log(formatted, ...objects)
  }
}

// // EXAMPLES:
// // Example 1: Logging a simple message
// // This is useful for logging general information or status updates.
// cusLog('App started', 'info')
// // Output: 📢 App started
// // This will log a cyan colored message saying "App started" with an info emoji at the start.

// // Example 2: Logging an error message
// // This is useful for logging errors or exceptions that occur in your code.
// cusLog('Failed to load data', 'error')
// // Output: ❌ Failed to load data
// // This will log a red colored error message saying "Failed to load data" with an error emoji at the start.

// // Example 3: Logging a group of related messages
// // This is useful for grouping related logs together, making it easier to read and understand the logs.
// cusLog('Loading data', 'info', 'start')
// cusLog('Data loaded successfully', 'success')
// cusLog('Rendering data', 'info')
// cusLog('Data rendered successfully', 'success')
// cusLog('End of data loading and rendering', 'info', 'end')
// // Output:
// // 📢 Loading data
// //     ✅ Data loaded successfully
// //     📢 Rendering data
// //     ✅ Data rendered successfully
// // 📢 End of data loading and rendering
// // This will log a group of messages related to data loading and rendering, each with their own color and emoji.

// // Example 4: Logging an object
// // This is useful for logging objects or data structures.
// let data = { name: 'John', age: 30, city: 'New York' }
// cusLog('User Data:', 'primary', null, data)
// // Output:
// // 🌟 User Data:
// // { name: "John", age: 30, city: "New York" }
// // This will log a blue colored message saying "User Data:" with a primary emoji at the start, followed by the contents of the `data` object.

// // Example 1: Logging a creature's attack
// // This is useful for logging when a creature attacks another creature.
// let attacker = { name: 'Dragon', attack: 50 }
// let defender = { name: 'Knight', defense: 40 }
// cusLog(
//   `${attacker.name} attacks ${defender.name} with ${attacker.attack} power`,
//   'creature',
// )
// // Output: 🐉 Dragon attacks Knight with 50 power
// // This will log a green colored message saying "Dragon attacks Knight with 50 power" with a creature emoji at the start.

// // Example 2: Logging a creature's defense
// // This is useful for logging when a creature defends against an attack.
// cusLog(`${defender.name} defends with ${defender.defense} defense`, 'creature')
// // Output: 🐉 Knight defends with 40 defense
// // This will log a green colored message saying "Knight defends with 40 defense" with a creature emoji at the start.

// // Example 3: Logging a creature's move
// // This is useful for logging when a creature uses a move.
// let move = { name: 'Flame Thrower', power: 90 }
// cusLog(`${attacker.name} uses ${move.name} with ${move.power} power`, 'move')
// // Output: 💨 Dragon uses Flame Thrower with 90 power
// // This will log a purple colored message saying "Dragon uses Flame Thrower with 90 power" with a move emoji at the start.

// // Example 4: Logging a group of related messages
// // This is useful for grouping related logs together, making it easier to read and understand the logs.
// cusLog('Battle Start', 'info', 'start')
// cusLog(
//   `${attacker.name} attacks ${defender.name} with ${attacker.attack} power`,
//   'creature',
// )
// cusLog(`${defender.name} defends with ${defender.defense} defense`, 'creature')
// cusLog(`${attacker.name} uses ${move.name} with ${move.power} power`, 'move')
// cusLog('Battle End', 'info', 'end')
// // Output:
// // 📢 Battle Start
// //     🐉 Dragon attacks Knight with 50 power
// //     🐉 Knight defends with 40 defense
// //     💨 Dragon uses Flame Thrower with 90 power
// // 📢 Battle End
// // This will log a group of messages related to a battle, each with their own color and emoji.
// // Page Start
// cusLog('Page Start', 'primary')

// // Game Start
// cusLog('Attack Start', 'primary', 'start')

// // Pay Cost Phase
// cusLog('Pay Cost Phase Start', 'pay')
// let cost = { energy: 10 }
// cusLog('Logging a cost...', 'pay', null, cost)
// cusLog('Pay Cost Phase End', 'pay')

// // Calculate Damage Phase
// cusLog('Calculate Damage Phase Start', 'calcDamage')
// let damage = { total: 50 }
// cusLog('Logging damage...', 'calcDamage', null, damage)
// cusLog('Calculate Damage Phase End', 'calcDamage')

// // Resolve Effect Phase
// cusLog('Resolve Effect Phase Start', 'effect')
// let effect = { type: 'Burn', duration: 3 }
// cusLog('Logging an effect...', 'effect', null, effect)
// cusLog('Resolve Effect Phase End', 'effect')

// // Apply Statuses Phase
// cusLog('Apply Statuses Phase Start', 'apply')
// let status = { type: 'Burn', remaining: 3 }
// cusLog('Logging a status...', 'apply', null, status)
// cusLog('Apply Statuses Phase End', 'apply')

// // Apply Damage Phase
// cusLog('Apply Damage Phase Start', 'damage')
// let health = { current: 50, max: 100 }
// cusLog('Logging health...', 'damage', null, health)
// cusLog('Apply Damage Phase End', 'damage')

// // End Phase
// cusLog('End Phase Start', 'end')
// let result = { winner: 'Dragon' }
// cusLog('Logging result...', 'end', null, result)
// cusLog('End Phase End', 'end')

// // // Game End
// cusLog('Game End', 'primary', 'end')

/**
 * Checks if any of the parameters are undefined and logs an error message if so.
 *
 * @param {object} params - An object where the keys are the parameter names and the values are the parameter values.
 */
export const checkForUndefined = (params) => {
  let undefinedParams = []
  for (let param in params) {
    if (params[param] === undefined) {
      undefinedParams.push(param)
    }
  }
  if (undefinedParams.length > 0) {
    console.error('😿:Undefined parameters:', undefinedParams.join(', '))
  }
}
