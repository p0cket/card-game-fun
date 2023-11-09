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
  origin = null, //ex:  {pal: user (replace user with pal?), palSlot: 0, trainerPlayer: human }
  //or ex: {pal: luminowl, palSlot: 3, trainerPlayer: AI }
) => {
  console.log(
    `📢 executeMove called:
  move,
  contextualState,
  contextualDispatch,
  user,
  phase,
  player = 'human',
  selectedTargets = [0]`,
    move,
    contextualState,
    contextualDispatch,
    user,
    phase,
    player,
    selectedTargets,
  )
  let targetMonster = null,
    moveCost,
    playerEnergy,
    ourDmg,
    damagedHP,
    doesItLand,
    payResult,
    dmgResult,
    statusResult,
    effectsResult,
    endResult
  // user is the user
  if (player === 'human') {
    targetMonster = contextualState.opponent.monsters[0].obj
  } else if (player === 'AI') {
    targetMonster = contextualState.userParty[0].obj
  } else {
    console.error('executeMove: Player of attack not recognized')
  }
  // this is a function that gets called many times.at each point, we need do a phase and then present to the player a dialog to decide what to do nextthe dialog has everything needed to run the function yet again, this continues until the full attack resolves

  // TODO: Finish this function
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

  // Check for target's fainting (if HP drops to 0 or below)
  //this kinda happens all the time.
  // Always. check death
  if (targetMonster.stats.hp <= 0) {
    // Implement logic for the target monster fainting (e.g., switch to the next monster)
    // Handle any other relevant logic like gaining experience, etc.
  }

  // 7. Change turns (Probably happens after this function)
  // inititeOpponentTurn()

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
  // const user = state.userParty[Party.SLOT_1] // Get the user's party
  const user = state.userParty[0] // Get the user's party

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
