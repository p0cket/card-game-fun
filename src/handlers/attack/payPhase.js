import { ACTIONS, useStateContext } from '../../MainContext'
import { DIALOGS } from '../../components/dialog/DialogManager'
import { PLAYERS } from '../../consts/consts'
import { checkForUndefined } from '../../utils/debugging-utils'
import {
  createNotEnoughEnergyDialogState,
  switchDialog,
} from '../dialog/energyDialogHandler'
import { ATK_PHASES, createPayloadState } from '../moveHandlers'
import {
  createAIPaidState,
  createCostPaidDialogState,
  createUserEnergyPaidState,
} from '../state/costStateHandlers'

let playerEnergy
let moveCost

// Pay phase should be visual (e.g., lowering the meter) instead of text

export const payPhase = (state, attackPayload) => {
  console.log(`state, attackPayload:`, state, attackPayload)
  //necessary?
  let newState = createPayloadState(state, attackPayload)
  const { phase } = attackPayload
  const { pal, move, player, userSlot, targets } = newState.attack
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
  checkForUndefined({ newState, move, pal, phase, player, userSlot, targets })
  console.warn(
    `Pay - attackPayload:`,
    newState,
    newState.game,
    newState.game.player,
  )

  if (player === PLAYERS.HUMAN) {
    // Human player: check and pay cost
    playerEnergy = newState.game.player.energy
    moveCost = move.cost.energy
    console.log(`cost's ${moveCost} energy. ${player} has ${playerEnergy}`)

    if (playerEnergy < moveCost) {
      console.log(`${playerEnergy}<${moveCost} • Not enough energy for move`)
      const dialogState = switchDialog(newState, DIALOGS.NOT_ENOUGH_ENERGY)
      console.log(`dialogState: not enough energy dialog`, dialogState)
      console.groupEnd()
      return dialogState
    } else {
      const playerEnergyAfterPayment = playerEnergy - moveCost
      console.log(
        `Enough Energy, ${playerEnergy} - ${moveCost} = ${playerEnergyAfterPayment}`,
      )
      const energyPaidState = createUserEnergyPaidState(
        newState,
        playerEnergyAfterPayment,
      )
      console.log('Pay: energyPaidState, resulting state:', energyPaidState)

      // Heres what the next energy paid dialog's `continue` button does. But it should be done only after the
      // framer motion energy removed completes, now that we're trying to get rid of the dialog box.
      // const movePayload = {
      //   pal: state.attack.pal,
      //   move: state.attack.move,
      //   phase:
      //     // moveCategory === 'change' ? ATK_PHASES.STATUSES : ATK_PHASES.DAMAGE,
      //     ATK_PHASES.DAMAGE,
      //   userSlot: state.attack.userSlot,
      //   targets: state.attack.targets,
      //   player: state.attack.player,
      //   // possessed: false,
      // }
      // executeMove(dispatch, movePayload)

      // instead of visually showing a dialog, lets just wait for the energy to be shown to be paid through framer motion.
      const costPaidDialogState = switchDialog(
        energyPaidState,
        DIALOGS.ENERGY_PAID,
      )
      // replace with this but fixed
      // const costPaidDialogState = energyPaidState //fix

      console.log('Pay: PAID, resulting state:', costPaidDialogState)
      console.groupEnd()
      return costPaidDialogState
    }
  } else if (player === PLAYERS.AI) {
    // AI player: assume cost can be paid
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

// import { ACTIONS, useStateContext } from '../../MainContext'
// import { DIALOGS } from '../../components/dialog/DialogManager'
// import { PLAYERS } from '../../consts/consts'
// import { checkForUndefined } from '../../utils/debugging-utils'
// import {
//   createNotEnoughEnergyDialogState,
//   switchDialog,
// } from '../dialog/energyDialogHandler'
// import { createPayloadState } from '../moveHandlers'
// import {
//   createAIPaidState,
//   createCostPaidDialogState,
//   createUserEnergyPaidState,
// } from '../state/costStateHandlers'

// let playerEnergy
// let moveCost

// // TODO: payPhase should be done visually, not with text. Maybe lowering the meter.

// export const payPhase = (state, attackPayload) => {
//   //fix.below
//   console.log(`state, attackPayload: bird`, state, attackPayload)
//   let newState = createPayloadState(state, attackPayload)
//   const { phase } = attackPayload
//   const { pal, move, player, userSlot, targets } = newState.attack

//   //maybe this is taken care of already in the attack dispatch
//   // if (move.isCounter) {
//   //   console.log(`move is a counter`)
//   //   newState = { ...newState, moveStack: [...newState.moveStack, move] }
//   //   console.log(`newState with counter:`, newState)
//   // }
//   console.groupCollapsed(
//     `💵 payPhase: starting`,
//     newState,
//     move,
//     pal,
//     phase,
//     player,
//     userSlot,
//     targets,
//   )
//   checkForUndefined({
//     newState,
//     move,
//     pal,
//     phase,

//     player,
//     userSlot,
//     targets,
//   })
//   console.warn(
//     `Pay - attackPayload: move, pal, player, userSlot, targets,:`,
//     // attackPayload,
//     newState,
//     newState.game,
//     newState.game.player,
//   )
//   if (player === PLAYERS.HUMAN) {
//     // 1. Pay cost. If you can't, return:
//     playerEnergy = newState.game.player.energy
//     moveCost = move.cost.energy
//     console.log(`cost's ${moveCost} energy. ${player} has ${playerEnergy}`)

//     if (playerEnergy < moveCost) {
//       console.log(`${playerEnergy}<${moveCost} • Not enough energy for move`)
//       const dialogState = switchDialog(
//         newState,
//         DIALOGS.NOT_ENOUGH_ENERGY,
//       )
//       console.log(`dialogState: not enough dialog`, dialogState)
//       console.groupEnd()
//       return dialogState
//     } else {
//       const playerEnergyAfterPayment = playerEnergy - moveCost
//       console.log(
//         `Enough Energy, ${playerEnergy}-${moveCost}=${playerEnergyAfterPayment}`,
//       )
//       const energyPaidState = createUserEnergyPaidState(
//         newState,
//         playerEnergyAfterPayment,
//       )
//       console.log('Pay: energyPaidState, resulting state:', energyPaidState)
//       const costPaidDialogState = switchDialog(
//         energyPaidState,
//         DIALOGS.ENERGY_PAID,
//       )
//       console.log('Pay: PAID, resulting state:', costPaidDialogState)
//       console.groupEnd()
//       return costPaidDialogState
//     }
//   } else if (player === PLAYERS.AI) {
//     // Theres some undefined stuff here sometimes. I guess
//     // some moves need to be looked over to make sure
//     // they have a cost.
//     moveCost = move.cost.energy
//     console.log(
//       `costs ${moveCost} e. ${player} has ${playerEnergy}. Pal is:`,
//       pal,
//     )
//     const paidDialogState = switchDialog(newState, DIALOGS.AI_COST_PAID)
//     console.groupEnd()
//     return paidDialogState
//   }
// }
// // newEnergy = playerEnergy < moveCost ? playerEnergy : playerEnergy - moveCost
// //  GAMEPLAN:
// // move handlers actually  into reducer, and create dialogue component switch statement
// // with different versions for each type of dialog
// /*
// function reducer(state, action) {
//   if (state.player === PLAYER.HUMAN && state.playerEnergy >= action.moveCost) {
//     state.playerEnergy = state.playerEnergy = action.moveCost;
//     state.dialog = 'GREAT_ATTACK_DIALOG';
//   } else {
//     state.dialog = 'NO_BUENO_DIALOG';
//   }
//   return state;
// }
// */
