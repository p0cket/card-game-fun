// export const EmotionDrain = {
//   name: 'Emotion Drain',
//   type: 'dark',
//   damage: 40,
//   speed: 12,
//   fuel: 5,
//   effect: {
//     description: 'Drain the opponents emotions to weaken them',
//     chance: '20%',
//     result: 'debuff',
//   },
//   priority: 'medium',
//   targets: ['opponent'],
//   // "NotSoFast" aspect:
//   notSoFast: {
//     name: 'Resilient Spirit',
//     type: 'buff',
//     effect: {
//       description: 'Enhance your emotional resilience to resist debuffs',
//       duration: '1 turn',
//       debuff_resist: 100, // Provides immunity to debuffs for 1 turn
//     },
//   },
//   // "Forceful" aspect:
//   forceful: {
//     name: 'Soul Siphon',
//     type: 'dark',
//     damage: 60,
//     speed: 14,
//     fuel: 7,
//     effect: {
//       description: 'Drain the opponents soul, guaranteeing debuffs',
//       chance: '100%',
//       result: 'debuff',
//     },
//     targets: ['opponent'],
//   },
// }

import { Party } from '../consts/party/parties'

export const executeMove = (
  move,
  contextualState,
  contextualDispatch,
  user,
) => {
  const userMonster = contextualState.userParty[Party.SLOT_1]
  const targetMonster = contextualState.opponent.monsters[0].obj

  console.log(
    `userMonster and targetMonster are ${userMonster} and ${targetMonster} respectively`,
    userMonster,
    targetMonster,
  )

  // Calculate the damage based on move and user's stats
  // also apply the enemy abilities and effects with this as well
  const damage = (userMonster.stats.attack * move.damage) / 100
  console.log(
    `The damage dealt is ${damage}. from ${userMonster.stats.attack} * ${
      move.damage
    } / 100. 
    This will result in targetMonster.stats.hp (${targetMonster.stats.hp})
     at: ${targetMonster.stats.hp - damage}`,
  )
  console.log(`move.effect is ${move.effect.result}`, `move`, move)
  // Check if the move has a status effect

  const doesItLand = Math.random() <= parseFloat(move.effect.chance) / 100
  console.log(`doesItLand is ${doesItLand}`)
  if (move.effect && doesItLand) {
    const effect = move.effect.result
    // Implement logic to apply the status effect (e.g., set 'blind' status)
    // if it has an effect, run it through the effects switch case
    // abstract the logic out into its' own file
    // For example:
    switch (effect) {
      case 'blind':
        // apply blind
        console.log(`applying blind to ${targetMonster.name}`)
        //applyEffect("blind", targetMonster)
        //evasion less
        // acuracy less
        // note the effect is applied to the target
        targetMonster.status.blind = true
        break
      case 'buff':
        // apply buff
        targetMonster.stats.attack += 2
      default:
        console.log(`default case for hero buffs applied`)
    }
  }

  // Apply damage to the target
  targetMonster.stats.hp -= damage

  // Check for target's fainting (if HP drops to 0 or below)
  if (targetMonster.stats.hp <= 0) {
    // Implement logic for the target monster fainting (e.g., switch to the next monster)
    // Handle any other relevant logic like gaining experience, etc.
  }

  // apply end of attack effects.
  // if theres poison, apply damage. it theres sleep, see if it wakes, etc.

  // Return relevant data about the move's execution
  return {
    ...contextualState,
    opponent: {
      ...contextualState.opponent,
      monsters: [targetMonster, ...contextualState.opponent.monsters.slice(1)],
      // damageDealt: damage,
      // statusEffect: move.effect ? move.effect.result : null,
      // You can add more data as needed for your game
    },
  }
}
export const handlePlayerMoveSelection = (move, state, dispatch) => {
  // Implement logic for selecting a move by the player
  const user = state.userParty[Party.SLOT_1] // Get the user's party
  const target = state.opponent.monsters[0] // Get the opponent's party
  // const target = state.opponent; // Get the opponent's party
  const result = executeMove(move, user, target) // Execute the selected move
  // Handle the move's result (e.g., update UI, check for win/loss conditions)
  return result
}
export const handleOpponentMoveSelection = (state, dispatch) => {
  // Implement logic for selecting a move by the opponent
  const user = state.opponent // Get the opponent's party
  const target = state.userParty // Get the user's party
  // Implement AI logic to select a move
  // Your AI logic here to choose a move
  const selectedMove = //state.opponent.moves[0]; // Get the selected move
    state.opponent.moves[
      Math.floor(Math.random() * state.opponent.moves.length)
    ] // Get the selected move
  console.log(`opponent selected move: ${selectedMove.name}`)
  const result = executeMove(selectedMove, user, target) // Execute the selected move
  // Handle the move's result (e.g., update UI, check for win/loss conditions)
}
// const handleSelect = (selectedMonster) => {
//   console.log(
//     `you selected monster: ${selectedMonster.name}`,
//     selectedMonster,
//   )
//   // #TODO: This is the code that breaks things but I need to make it work:
//   setShowDetails(false)
//   // this is just the party obj, not the full state
//   const partyWithMonsterAdded = addMonsterToParty(
//     selectedMonster,
//     contextualState.userParty,
//   )
//   const stateWithParty = {
//     ...contextualState,
//     userParty: partyWithMonsterAdded,
//   }
//   const nextSceneState = updateScene(stateWithParty, {
//     screen: SCENES.MAP,
//     details: null,
//   })
//   const nextLevelState = updateLevel(nextSceneState, 0)

//   //
//   // Define a function to log colored messages
//   const logWithColor = (message, color) => {
//     console.log(`%c${message}`, `color: ${color}; font-weight: bold;`)
//   }
