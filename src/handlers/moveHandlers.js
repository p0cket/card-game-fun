import { ACTIONS } from '../MainContext'
import { PLAYERS } from '../consts/consts'
import { Party, opponent } from '../consts/party/parties'
import { checkForUndefined, cusLog } from '../utils/debugging-utils'
import { dmgPhase } from './attack/dmgPhase'
import { cleanupPhase } from './attack/effectsPhase'
import { endPhase } from './attack/endPhase'
import { payPhase } from './attack/payPhase'
import { statusPhase } from './attack/statusPhase'
// import { customLog } from '../utils/debugging-utils'
export const ATK_PHASES = {
  PAY: 'pay',
  DAMAGE: 'damage',
  // DAMAGE: 'calcDamage',
  STATUSES: 'apply',
  EFFECTS: 'effect',
  // APPLY_DAMAGE: 'damage',
  END: 'end',
}

export const calculateTargets = (targets, allyPals, enemyPals) => {
  // const allyTargets = targets.ally.map(  (index) => state.opponent.monsters[index].obj )
  // const enemyTargets = targets.enemy.map( (index) => state.userParty[index].obj )
  // const allTargets = [allyTargets, enemyTargets]
  const allyTargets = targets.ally.map((index) => allyPals[index].obj)
  const enemyTargets = targets.enemy.map((index) => enemyPals[index].obj)
  const allTargets = [allyTargets, enemyTargets]
  return allTargets
}
/**
 * Executes a game move. This function manages the different phases of a move, including pay, damage, statuses, effects, and end.
 * At each phase, it calls a dedicated function to handle that phase.
 * It also checks if the target monster's HP is 0 or less, indicating it has fainted.
 *
 * @param {Object} payload - The payload object.
 * @param {Object} payload.state - The state context.
 * @param {Function} payload.dispatch - The dispatch function from the state context.
 * @param {Object} payload.pal - The object representing the player's character.
 * @param {Object} payload.move - The move object representing the move to be executed.
 * @param {string} payload.phase - The current phase of the move execution.
 * @param {number} payload.userSlot - The index of the user's character in the party.
 * @param {Object} payload.targets - An object representing the targets of the move.
 * @param {Array} payload.targets.ally - An array of indices of ally targets.
 * @param {Array} payload.targets.enemy - An array of indices of enemy targets.
 * @param {string} payload.player - The player type ('human' or 'AI').
 * @param {boolean} payload.possessed - A boolean indicating whether the player's character is possessed.
 *
 * @returns {Object} The updated state after the move execution.
 */
export const executeMove = (dispatch, payload) => {
  console.log(`📢 executeMove called: Payload`, payload)
  const { pal, move, player, phase, userSlot, targets } = payload
  checkForUndefined({
    dispatch,
    pal,
    move,
    player,
    phase,
    userSlot,
    targets,
  })
  // Calculate targets
  let targetMonster = null,
    payResult,
    dmgResult,
    statusResult,
    effectsResult,
    endResult
  // this is a function that gets called many times.at each point, we need do a phase and then present to the player a dialog to decide what to do nextthe dialog has everything needed to run the function yet again, this continues until the full attack resolves
  /** Check what phase the attack is in. For each phase, we call a dedicated function.
   * - payPhase: Manages the payment phase, determining if the player can afford the move.
   * - dmgPhase: Handles the damage calculation and application to the target.
   * - statusPhase: Manages the application of status effects from the move.
   * - cleanupPhase: Handles any cleanup or lingering effects post-attack.
   * - endPhase: Concludes the attack phase and prepares for the next game state.
   *  checks if the target monster's HP is 0 or less, indicating it has fainted. */
  switch (phase) {
    case ATK_PHASES.PAY:
      dispatch({
        type: ACTIONS.PAY_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.DAMAGE:
      dispatch({
        type: ACTIONS.DMG_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.STATUSES:
      dispatch({
        type: ACTIONS.STATUS_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.EFFECTS:
      dispatch({
        type: ACTIONS.EFFECTS_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.END:
      dispatch({
        type: ACTIONS.END_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    default:
      console.log(`ATK: default phase in switch reacted`)
  }
  // Always. check death
  // if (targetMonster.stats.hp <= 0) {
  // }
  console.log('executeMove: end (If you hit here, something prob went wrong)')
}

export const executeAITurn = (state, dispatch, details = null) => {
  // Implement logic for the AI's turn
  // Your AI logic here to choose a move
  const pal = state.opponent.monsters[0] // probably just userSlot?
  console.log(
    `AI executeAITurn: state, dispatch, pal`,
    state,
    dispatch,
    details,
    pal,
  )
  const move = determineAIMove(state, pal, details)
  console.log(`AI executeAITurn: determined move`, move)
  const result = executeMove({
    state: state,
    dispatch: dispatch,
    pal: pal,
    move: move,
    phase: ATK_PHASES.PAY,
    userSlot: 0,
    targets: { ally: [0], enemy: null },
    player: PLAYERS.AI,
    //possessed: false,
  })
  return result
}

export const determineAIMove = (state, pal, details = null) => {
  console.log(`determineAIMove: state, pal, details`, state, pal, details)
  // const result = pal.moves[Math.floor(Math.random() * pal.moves.length)]
  const result = pal.obj.moves[0]
  console.log(`determineAIMove: resulting move - `, result)
  // Implement AI logic to determine a move
  // Your AI logic here to choose a move rnadomly
  // but start with only the first move
  // const move = //state.opponent.monsters[0];
  return result
  // return move
}

// export const handleOpponentMoveSelection = (state, dispatch) => {
//   // Implement logic for selecting a move by the opponent
//   const pal = state.opponent.monster[0] // Get the opponent's party
//   const target = state.userParty // Get the user's party
//   // Implement AI logic to select a move
//   // Your AI logic here to choose a move
//   const selectedMove = //state.opponent.moves[0]; // Get the selected move
//     pal.moves[Math.floor(Math.random() * state.opponent.moves.length)] // Get the selected move
//   console.log(`opponent selected move: ${selectedMove.name}`)
//   // const result = executeMove(selectedMove, pal, target, ) // Execute the selected move
//   // Handle the move's result (e.g., update UI, check for win/loss conditions)
// }

// export const executeMoveDeprecated = (
//   //id prefer pal, move, then the rest
//   move,
//   state,
//   dispatch,
//   pal, // maybe change to add the other aspects like which slot the pal is in, destructure after
//   phase,
//   player = 'human', // player: AI , you, them
//   selectedTargets = [0], // target/s: AI, you, them
//   details = null, //  {pal: pal,move: move,userSlot: 0,
//   //   targets: { ally: null, enemy: [0] },
//   //   player: 'human', possessed: false, },
// ) => {
//   console.log(
//     `📢 executeMove called:
//       move,
//       state,
//       dispatch,
//       pal,
//       phase,
//       player = 'human',
//       selectedTargets = [0]`,
//     move,
//     state,
//     dispatch,
//     pal,
//     phase,
//     player,
//     selectedTargets,
//   )
//   let targetMonster = null,
//     payResult,
//     dmgResult,
//     statusResult,
//     effectsResult,
//     endResult

//   // check if player is human or AI
//   // if (details.player === 'human') {
//   //   targetMonster = state.opponent.monsters[0].obj
//   // } else if (details.player === 'AI') {
//   //   targetMonster = state.userParty[0].obj
//   // } else {
//   //   console.error('executeMove: Player of attack not recognized')
//   // }
//   const allyTargets = details.targets.ally.map(
//     (index) => state.opponent.monsters[index].obj,
//   )
//   const enemyTargets = details.targets.enemy.map(
//     (index) => state.userParty[index].obj,
//   )
//   const allTargets = [allyTargets, enemyTargets]
//   // this is a function that gets called many times.at each point, we need do a phase and then present to the player a dialog to decide what to do nextthe dialog has everything needed to run the function yet again, this continues until the full attack resolves
//   /** Check what phase the attack is in. For each phase, we call a dedicated function.
//    * - payPhase: Manages the payment phase, determining if the player can afford the move.
//    * - dmgPhase: Handles the damage calculation and application to the target.
//    * - statusPhase: Manages the application of status effects from the move.
//    * - cleanupPhase: Handles any cleanup or lingering effects post-attack.
//    * - endPhase: Concludes the attack phase and prepares for the next game state.
//    *  checks if the target monster's HP is 0 or less, indicating it has fainted. */
//   switch (phase) {
//     case ATK_PHASES.PAY:
//       payResult = payPhase(
//         state,
//         dispatch,
//         move,
//         pal,
//         details.player,
//       )
//       dispatch({ payload: payResult, type: ACTIONS.UPDATEGAMEDATA })
//       break
//     case ATK_PHASES.DAMAGE:
//       dmgResult = dmgPhase(
//         state,
//         dispatch,
//         pal,
//         move,
//         allTargets,
//         // details.targets,
//         // targetMonster,
//         player,
//       )
//       dispatch({ payload: dmgResult, type: ACTIONS.UPDATEGAMEDATA })
//       break
//     case ATK_PHASES.STATUSES:
//       // Continue here with dispatching the Status too
//       statusResult = statusPhase(state, dispatch, pal, move)
//       dispatch({
//         payload: statusResult,
//         type: ACTIONS.UPDATEGAMEDATA,
//       })
//       break
//     case ATK_PHASES.EFFECTS:
//       effectsResult = cleanupPhase(
//         state,
//         dispatch,
//         pal,
//         move,
//       )
//       dispatch({
//         payload: effectsResult,
//         type: ACTIONS.UPDATEGAMEDATA,
//       })
//       break
//     case ATK_PHASES.END:
//       console.log(`ATK: end phase`)
//       endResult = endPhase(
//         state,
//         dispatch,
//         pal,
//         move,
//         details,
//       )
//       dispatch({ payload: endResult, type: ACTIONS.UPDATEGAMEDATA })
//       break
//     default:
//       console.log(`ATK: default phase in switch reacted`)
//       return state
//   }
//   // Always. check death
//   if (targetMonster.stats.hp <= 0) {
//     // Implement logic for the target monster fainting (e.g., switch to the next monster)
//     // Handle any other relevant logic like gaining experience, etc.
//   }
//   console.log('executeMove: end')
//   return {
//     ...state,
//     opponent: {
//       ...state.opponent,
//       monsters: [targetMonster, ...state.opponent.monsters.slice(1)],
//       // damageDealt: damage,
//       // statusEffect: move.effect ? move.effect.result : null,
//       // You can add more data as needed for your game
//     },
//   }
// }
