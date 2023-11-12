import { ACTIONS } from '../MainContext'
import { Party, opponent } from '../consts/party/parties'
import { cusLog } from '../utils/debugging-utils'
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

export const executeMove = (
  move,
  contextualState,
  contextualDispatch,
  user, // maybe change to add the other aspects like which slot the user is in, destructure after
  phase,
  player = 'human', // player: AI , you, them
  selectedTargets = [0], // target/s: AI, you, them
  details = {}, // ex: {pal: luminowl, palSlot: 3, trainerPlayer: AI,
  // targets: [0,1,2], origin: {pal: user, palSlot: 0, trainerPlayer: human}}
  // does each target obj need to have {pal, palSlot, trainerPlayer}?
    // origin = null, //ex:  {pal: user (replace user with pal?), palSlot: 0, trainerPlayer: human }
    // {
    //   user: user,
    //   userslot: 0,
    //   move: move,
    //   targets: [0],
    //   trainerType: 'human',
    // },
) => {
  console.log(
    `📢 executeMove called:
  move,
  contextualState,
  contextualDispatch,
  user,
  phase,
  player = 'human',
  selectedTargets = [0]`,move,contextualState,contextualDispatch,user, phase,player,selectedTargets)
  let targetMonster = null,moveCost,playerEnergy,ourDmg,damagedHP,
    doesItLand,payResult,dmgResult,statusResult,effectsResult,endResult
  // user is the user
  if (player === 'human') {
    targetMonster = contextualState.opponent.monsters[0].obj
  } else if (player === 'AI') {
    targetMonster = contextualState.userParty[0].obj
  } else {
    console.error('executeMove: Player of attack not recognized')
  }

  // this is a function that gets called many times.at each point, we need do a phase and then present to the player a dialog to decide what to do nextthe dialog has everything needed to run the function yet again, this continues until the full attack resolves

  /**
   * Check what phase the attack is in. For each phase, we call a dedicated function.
   * - payPhase: Manages the payment phase, determining if the player can afford the move.
   * - dmgPhase: Handles the damage calculation and application to the target.
   * - statusPhase: Manages the application of status effects from the move.
   * - cleanupPhase: Handles any cleanup or lingering effects post-attack.
   * - endPhase: Concludes the attack phase and prepares for the next game state.
   *
   *  checks if the target monster's HP is 0 or less, indicating it has fainted.
   *
   */
  switch (phase) {
    case ATK_PHASES.PAY:
      payResult = payPhase(contextualState, contextualDispatch, move, user)
      contextualDispatch({ payload: payResult, type: ACTIONS.UPDATEGAMEDATA })
      break
    case ATK_PHASES.DAMAGE:
      dmgResult = dmgPhase(
        contextualState,
        contextualDispatch,
        user,
        move,
        targetMonster,
        player,
      )
      contextualDispatch({ payload: dmgResult, type: ACTIONS.UPDATEGAMEDATA })
      break
    case ATK_PHASES.STATUSES:
      // Continue here with dispatching the Status too
      statusResult = statusPhase(
        contextualState,
        contextualDispatch,
        user,
        move,
      )
      contextualDispatch({
        payload: statusResult,
        type: ACTIONS.UPDATEGAMEDATA,
      })
      break
    case ATK_PHASES.EFFECTS:
      effectsResult = cleanupPhase(
        contextualState,
        contextualDispatch,
        user,
        move,
      )
      contextualDispatch({
        payload: effectsResult,
        type: ACTIONS.UPDATEGAMEDATA,
      })
      break
    case ATK_PHASES.END:
      console.log(`ATK: end phase`)
      endResult = endPhase(contextualState, contextualDispatch, user, move)
      contextualDispatch({ payload: endResult, type: ACTIONS.UPDATEGAMEDATA })
      break
    default:
      console.log(`ATK: default phase in switch reacted`)
      return contextualState
  }
  // Always. check death
  if (targetMonster.stats.hp <= 0) {
    // Implement logic for the target monster fainting (e.g., switch to the next monster)
    // Handle any other relevant logic like gaining experience, etc.
  }
  console.log('executeMove: end')
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

export const executeAITurn = (state, dispatch, user, deets = null) => {
  // Implement logic for the AI's turn
  // Your AI logic here to choose a move
  console.log(`executeAITurn: state, dispatch, user`, state, dispatch, user)
  const move = determineAIMove(user, state, deets)
  const result = executeMove(
    move,
    state,
    dispatch,
    user,
    ATK_PHASES.PAY,
    'AI',
    [0],
    null,
  )
  return result
  // return { ...state, opponent: { ...state.opponent, monsters: [monster, ...state.opponent.monsters] }
}

export const determineAIMove = (state, details, user, deets = null) => {
  console.log(`determineAIMove: user, state, details`, user, state, deets)
  const result = state.opponent.monsters[0].moves[0]

  // Implement AI logic to determine a move
  // Your AI logic here to choose a move rnadomly
  // but start with only the first move
  // const move = //state.opponent.monsters[0];
  return result
  // return move
}

// export const handlePlayerMoveSelection = (move, state, dispatch) => {
//   // Implement logic for selecting a move by the player
//   // const user = state.userParty[Party.SLOT_1] // Get the user's party
//   const user = state.userParty[0] // Get the user's party

//   const target = state.opponent.monsters[0] // Get the opponent's party
//   // const target = state.opponent; // Get the opponent's party
//   const result = executeMove(move, user, target) // Execute the selected move
//   // Handle the move's result (e.g., update UI, check for win/loss conditions)
//   return result
// }
// export const handlePlayerMoveSelection = (move, state, dispatch) => {
//   const user = state.userParty[0];
//   const target = state.opponent.monsters[0];
//   const result = executeMove(move, state, dispatch, user, null, 'human', [0], null);
//   return result;
// }

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
