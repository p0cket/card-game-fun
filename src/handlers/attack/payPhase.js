import { ACTIONS } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createNotEnoughEnergyDialogState } from '../dialog/energyDialogHandler'
import {
  createAIPaidState,
  createCostPaidDialogState,
  createUserEnergyPaidState,
} from '../state/costStateHandlers'

let playerEnergy
let moveCost

export const payPhase = (
  contextualState,
  contextualDispatch,
  // move data
  move,
  pal,
  player,
  userSlot,
  // target data
  targets,
) => {
  console.groupCollapsed(
    `💵 PAY: starting`,
    contextualState,
    contextualDispatch,
    move,
    pal,
    player,
  )
  checkForUndefined({
    contextualState,
    contextualDispatch,
    move,
    pal,
    player,
  })
  if (player === PLAYERS.HUMAN) {
    console.log(
      `Pay: move, pal, player, userSlot, targets:`,
      move,
      pal,
      player,
      userSlot,
      targets,
    )
    // 1. Pay cost. If you can't, return:
    playerEnergy = contextualState.game.player.energy
    moveCost = move.cost.energy
    console.log(`cost is ${moveCost} energy. ${player} has ${playerEnergy}`)

    if (playerEnergy < moveCost) {
      console.log(
        `${playerEnergy}<${moveCost} • Not enough energy to perform the move`,
      )
      // Dialogue: not enough energy
      // #TODO: remove dialoge state changes and turn them into react components
      // switch which ones you are displaying based on context
      const dialogState = createNotEnoughEnergyDialogState(
        contextualState,
        contextualDispatch,
      )
      console.log(`dialogState: not enough dialog`, dialogState)
      console.groupEnd()
      return dialogState
    } else {
      const playerEnergyAfterPayment = playerEnergy - moveCost
      console.log(
        `Enough energy :), ${playerEnergy}-${moveCost}=${playerEnergyAfterPayment}`,
      )
      const energyPaidState = createUserEnergyPaidState(
        playerEnergyAfterPayment,
        contextualState,
      )
      // newEnergy = playerEnergy < moveCost ? playerEnergy : playerEnergy - moveCost
      console.log('Pay: energyPaidState, resulting state:', energyPaidState)

      // ------
      const costPaidDialogState = createCostPaidDialogState(
        energyPaidState,
        contextualDispatch,
        move,
        pal,
        player,
        targets,
      )
      //-----

      console.log('Pay: PAID, resulting state:', costPaidDialogState)
      console.groupEnd()
      return costPaidDialogState
    }
  } else if (player === PLAYERS.AI) {
    // 2. Execute  AI move.
    // aiEnergy =
    // const result =
    moveCost = move.cost.energy
    console.warn(`cost is ${moveCost} energy. ${player} has ${playerEnergy}. The pal is:`, pal)
    const paidDialogState = createAIPaidState(
      contextualState,
      contextualDispatch,
      move,
      pal,
      player,
      targets,
    )
    console.groupEnd()
    return paidDialogState
    // create AIEnergyPaidState func
    // const energyPaidState = createUserEnergyPaidState(
    //   playerEnergyAfterPayment,
    //   contextualState,
    // )
    // console.log('Pay: energyPaidState, resulting state:', energyPaidState)
    // -----
    // const costPaidDialogState = createCostPaidDialogState(
    //   energyPaidState,
    //   contextualDispatch,
    //   move,
    //   pal,
    //   player,
    //   targets,
    // )
  }
}
      // newEnergy = playerEnergy < moveCost ? playerEnergy : playerEnergy - moveCost
//  GAMEPLAN:
// move handlers actually  into reducer, and create dialogue component switch statement
// with different versions for each type of dialog
/*
function reducer(state, action) {
  if (state.player === PLAYER.HUMAN && state.playerEnergy >= action.moveCost) {
    state.playerEnergy = state.playerEnergy = action.moveCost;
    state.dialog = 'GREAT_ATTACK_DIALOG';
  } else {
    state.dialog = 'NO_BUENO_DIALOG';
  }
  return state;
}
*/