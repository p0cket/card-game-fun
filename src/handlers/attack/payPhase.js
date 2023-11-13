import { ACTIONS } from '../../MainContext'
import { checkForUndefined } from '../../utils/debugging-utils'
import { createNotEnoughEnergyDialogState } from '../dialog/energyDialogHandler'
import {
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
  // 1. Pay cost. If you can't, return:
  playerEnergy = contextualState.game.player.energy
  moveCost = move.cost.energy
  console.log(`cost is ${moveCost} energy. ${player} has ${playerEnergy}`)

  if (playerEnergy < moveCost) {
    console.log(
      `${playerEnergy}<${moveCost} • Not enough energy to perform the move`,
    )
    // Dialogue: not enough energy
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
}
