import { ACTIONS, useDispatchContext } from '../MainContext'
import { PLAYERS } from '../consts/consts'
import { Party, opponent } from '../consts/party/parties'
import { checkForUndefined, cusLog } from '../utils/debugging-utils'
import { dmgPhase } from './attack/dmgPhase'
import { cleanupPhase } from './attack/cleanupPhase'
import { endPhase } from './attack/endPhase'
import { payPhase } from './attack/payPhase'
import { statusPhase } from './attack/statusPhase'
// import { customLog } from '../utils/debugging-utils'
// const dispatchCon = useDispatchContext()
export const ATK_PHASES = {
  PAY: 'pay',
  DAMAGE: 'damage',
  // DAMAGE: 'calcDamage',
  STATUSES: 'apply',
  EFFECTS: 'effect',
  CLEANUP: 'cleanup',
  // APPLY_DAMAGE: 'damage',
  END: 'end',
}

export const calculateTargets = (targets, allyPals, enemyPals) => {
  // const allyTargets = targets.ally.map(  (index) => state.opponent.monsters[index] )
  // const enemyTargets = targets.enemy.map( (index) => state.userParty[index] )
  // const allTargets = [allyTargets, enemyTargets]
  const allyTargets = targets.ally.map((index) => allyPals[index])
  const enemyTargets = targets.enemy.map((index) => enemyPals[index])
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
  let targetMonster = null
  // this is a function that gets called many times.at each point, we need do a phase and then present to the player a dialog to decide what to do nextthe dialog has everything needed to run the function yet again, this continues until the full attack resolves
  /** Check what phase the attack is in. For each phase, we call a dedicated function.
   * - payPhase: Manages the payment phase, determining if the player can afford the move.
   * - dmgPhase: Handles the damage calculation and application to the target.
   * - statusPhase: Manages the application of status effects from the move.
   * - cleanupPhase: Handles any cleanup or lingering effects post-attack.
   * - endPhase: Concludes the attack phase and prepares for the next game state.
   *  checks if the target monster's HP is 0 or less, indicating it has fainted. */
  console.log(`Payload is: `, payload)
  switch (phase) {
    case ATK_PHASES.PAY:
      dispatch({
        type: ACTIONS.PAY_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.DAMAGE:
      console.log(`ATK_PHASES.DAMAGE reached in switch`)
      dispatch({
        type: ACTIONS.DAMAGE_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.STATUSES:
      console.log(`ATK_PHASES.STATUSES reached in switch`)
      dispatch({
        type: ACTIONS.STATUS_PHASE,
        payload: { pal, move, phase, player, userSlot, targets },
      })
      break
    case ATK_PHASES.CLEANUP:
      dispatch({
        type: ACTIONS.CLEANUP_PHASE,
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
  console.log('executeMove: end. (If you hit here, something prob went wrong)')
}

export const executeAITurn = (state, dispatch, details = null) => {
  // Implement logic for the AI's turn
  // Your AI logic here to choose a move
  console.log(
    `opponent monster!`,
    state.opponent,
    state.opponent.monsters,
    state.opponent.monsters[0],
  )
  const pal = state.opponent.monsters[0] // probably just userSlot?
  console.log(`AI executeAITurn: state, pal`, state, details, pal)
  const move = determineAIMove(state, pal, details)
  console.log(`AI executeAITurn: determined move`, move)
  const result = {
    pal: pal,
    move: move,
    phase: ATK_PHASES.PAY,
    userSlot: 0,
    targets: { ally: [0], enemy: null },
    player: PLAYERS.AI,
    //possessed: false,
  }

console.log(`payload bfore executing AI move`, result)
  executeMove(dispatch, result)
}

export const determineAIMove = (state, pal, details = null) => {
  console.log(`determineAIMove: state, pal, details`, state, pal, details)
  // const result = pal.moves[Math.floor(Math.random() * pal.moves.length)]
  const result = pal.moves[0]
  console.log(`determineAIMove: resulting move - `, result)
  // Implement AI logic to determine a move
  // Your AI logic here to choose a move rnadomly
  // but start with only the first move
  // const move = //state.opponent.monsters[0];
  return result
  // return move
}

export function createPayloadState(
  state,
  { move, pal, phase, player, userSlot, targets },
) {
  console.log(`createPayloadState: state, payload`, state, {
    move,
    pal,
    phase,
    player,
    userSlot,
    targets,
  })
  return {
    ...state,
    attack: {
      move,
      pal,
      phase,

      player,
      userSlot,
      targets,
    },
  }
}
