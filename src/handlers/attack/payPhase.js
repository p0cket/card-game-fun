import { ACTIONS } from '../../MainContext'
import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import {
  createNotEnoughEnergyDialogState,
  switchDialog,
} from '../dialog/energyDialogHandler'
import { createPayloadState } from '../moveHandlers'
import {
  createAIPaidState,
  createCostPaidDialogState,
  createUserEnergyPaidState,
} from '../state/costStateHandlers'

let playerEnergy
let moveCost

export const payPhase = (state, attackPayload) => {  
  let newState = createPayloadState(state, attackPayload)
  const { move, pal, phase, player, userSlot, targets } = attackPayload
  console.groupCollapsed(
    `💵 payPhase: starting`,
    newState,
    move,
    pal,
    phase,
    player,
    userSlot,
    targets,
  )
  checkForUndefined({
    newState,
    move,
    pal,
    phase,

    player,
    userSlot,
    targets,
  })
  console.log(
    `Pay - attackPayload: move, pal, player, userSlot, targets,:`,
    attackPayload,
  )
  if (player === PLAYERS.HUMAN) {
    // 1. Pay cost. If you can't, return:
    playerEnergy = newState.game.player.energy
    moveCost = move.cost.energy
    console.log(`cost's ${moveCost} energy. ${player} has ${playerEnergy}`)

    if (playerEnergy < moveCost) {
      console.log(`${playerEnergy}<${moveCost} • Not enough energy for move`)
      const dialogState = switchDialog(
        newState,
        DIALOGS.NOT_ENOUGH_ENERGY,
        // attackPayload,
      )
      console.log(`dialogState: not enough dialog`, dialogState)
      console.groupEnd()
      return dialogState
    } else {
      const playerEnergyAfterPayment = playerEnergy - moveCost
      console.log(
        `Enough Energy, ${playerEnergy}-${moveCost}=${playerEnergyAfterPayment}`,
      )
      const energyPaidState = createUserEnergyPaidState(
        newState,
        playerEnergyAfterPayment,
      )
      console.log('Pay: energyPaidState, resulting state:', energyPaidState)
      const costPaidDialogState = switchDialog(
        energyPaidState,
        DIALOGS.ENERGY_PAID,
      )
      console.log('Pay: PAID, resulting state:', costPaidDialogState)
      console.groupEnd()
      return costPaidDialogState
    }
  } else if (player === PLAYERS.AI) {
    // Theres some undefined stuff here sometimes. I guess
    // some moves need to be looked over to make sure
    // they have a cost.
    moveCost = move.cost.energy
    console.log(
      `costs ${moveCost} e. ${player} has ${playerEnergy}. Pal is:`,
      pal,
    )
    const paidDialogState = switchDialog(newState, DIALOGS.AI_COST_PAID)
    console.groupEnd()
    return paidDialogState
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
