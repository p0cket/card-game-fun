import { ACTIONS } from "../../MainContext"
import { createNotEnoughEnergyDialogState } from "../dialog/energyDialogHandler"
import { createCostPaidDialogState, createUserEnergyPaidState } from "../state/costStateHandlers"
// import { createCostPaidDialogState, createNotEnoughEnergyDialogState, createUserEnergyPaidState } from "../moveHandlers"

let playerEnergy
let moveCost

export const payPhase = (contextualState, contextualDispatch, move, user) => {
  console.groupCollapsed(`💵 PAY: starting`)
  // 1. Pay cost. If you can't, return:
  playerEnergy = contextualState.game.player.energy
  moveCost = move.cost.energy
  console.log(`cost is ${moveCost} energy. Player has ${playerEnergy}`)

  if (playerEnergy < moveCost) {
    console.log(
      `${playerEnergy}<${moveCost} • Not enough energy to perform the move`,
    )
    // Dialogue: not enough energy
    const dialogState = createNotEnoughEnergyDialogState(
      contextualState,
      contextualDispatch,
    )
    console.groupEnd()
    return contextualDispatch({
      payload: dialogState,
      type: ACTIONS.UPDATEGAMEDATA,
    })
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
    const costPaidDialogState = createCostPaidDialogState(
      energyPaidState,
      contextualDispatch,
      move,
      user,
    )
    console.log('Pay: PAID, resulting state:', costPaidDialogState)
    console.groupEnd()
    return contextualDispatch({
      payload: costPaidDialogState,
      type: ACTIONS.UPDATEGAMEDATA,
    })
  }
}