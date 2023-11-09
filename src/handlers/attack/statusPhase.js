import { ACTIONS } from '../../MainContext'
import {
  applyStatusEffect,
  calculateDoesItLand,
} from '../../utils/battle-utils'
import { createPopupVisibleState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'
// import { createStatusEffectDialogState } from '../dialog/basicDialogHandlers'
import {
  createStatusAppliedDialogState,
  createStatusNotAppliedDialogState,
} from '../state/statusStateHandlers'



export const statusPhase = (
  contextualState,
  contextualDispatch,
  user,
  move,
  targetMonster,
  player,
  damagedHP,
) => {
  console.group(`😵‍💫 STATUS: start`)
  let doesItLand = calculateDoesItLand(move)
  let newState = contextualState

  const statusOptions = [
    {
      label: `ok, cool thing`,
      onClick: () => {
        console.log(`Clicked status did land`)
        //doesn't need to return anything because it runs again
        executeMove(
          move,
          newState,
          contextualDispatch,
          user,
          ATK_PHASES.EFFECTS, // phase,
        )
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
    {
      label: 'Add on',
      onClick: () => {
        //replace here with our function create
        // const closedPopupState = createRemovedState(whateverMakesSenseHere)
        // handle onClick logic here
        const closedPopupState = {
          ...newState,
          dialog: {
            ...ourState.dialog,
            isOpen: false,
          },
        }
        return closedPopupState
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]
  
  const statusNotLandOptions = [
    {
      label: `sad, not cool thing`,
      onClick: () => {
        console.log(`Clicked status not land`)
        //doesn't need to return anything because it runs again
        executeMove(
          move,
          newState,
          contextualDispatch,
          user,
          ATK_PHASES.EFFECTS, // phase,
        )
      },
      backgroundColor: '#4b770e',
      color: '#fff',
    },
  ]

  if (doesItLand) {
    console.log(`effect lands`)
    newState = applyStatusEffect(newState, player, move)
    // newState = createStatusEffectDialogState(newState, `Status of ${move.effect.result} lands`)

    newState = createPopupVisibleState({
      prevState: newState,
      message: `${move?.effect?.result} applied.
      ${user.name} ${move?.effect?.result}'d the opponent`,
      options: statusOptions,
      header: `ok, cool thing`,
      title: 'status applied',
    })

    // newState = createStatusAppliedDialogState(
    //   newState,
    //   contextualDispatch,
    //   move,
    //   user,
    // )

    // Assign the button actions
    // newState.dialog.buttons[0].onClick = () =>
    //   handleOkButton(newState, move, contextualDispatch, user)
    // newState.dialog.buttons[1].onClick = () =>
    //   handleNotSoFastButton(newState, move, contextualDispatch, user)

    console.groupEnd()
    return contextualDispatch({
      payload: newState,
      type: ACTIONS.UPDATEGAMEDATA,
    })
  } else {
    // Handle the case where the effect does not land
    console.log(`effect did not land`)
    newState = createPopupVisibleState({
      prevState: newState,
      message: `${move?.effect?.result} did not land.
      ${user.name} failed to ${move?.effect?.result} the opponent`,
      options: statusNotLandOptions,
      header: `oh no, cool thing`,
      title: 'status not applied',
    })
    // newState = createStatusNotAppliedDialogState(
    //   newState,
    //   contextualDispatch,
    //   move,
    //   user,
    // )

    console.log(`statusPhase: ending, newState`, newState)
    console.groupEnd()
    return contextualDispatch({
      payload: newState, // No update if effect did not land
      type: ACTIONS.UPDATEGAMEDATA,
    })
  }
}

// import { ACTIONS } from '../../MainContext'
// import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
// import { ATK_PHASES, executeMove } from '../moveHandlers'

// let doesItLand
// let newState

// export const statusPhase = (
//   contextualState,
//   contextualDispatch,
//   user,
//   move,
//   targetMonster,
//   player,
//   damagedHP,
// ) => {
//   console.group(`😵‍💫 STATUS: start`)
//   console.log(
//     `ATK STATUSES: apply statuses resolve phase.
//   Here is   contextualState,
//   contextualDispatch,
//   user,
//   move,
//   targetMonster,
//   player,
//   damagedHP,`,
//     contextualState,
//     contextualDispatch,
//     user,
//     move,
//     targetMonster,
//     player,
//     damagedHP,
//   )
//   console.log(`move.effect is ${move.effect.result}`, `move`, move)

//   // 3. resolve effect?
//   doesItLand = Math.random() <= parseFloat(move.effect.chance) / 100
//   console.log(
//     `doesItLand is ${doesItLand}. the move.effect.chance is ${move.effect.chance}`,
//   )
//   let effectResultState = null
//   if (doesItLand) {
//     console.log(`effect lands`)
//     if (player === 'human') {
//       // targetMonster.stats.status = move.effect.result
//       // console.log(`AI's HP is now ${move.effect.result}`)
//       // newState = {
//       //   ...contextualState,
//       //   opponent: {
//       //     ...contextualState.opponent,
//       //     monsters: [
//       //       {
//       //         ...contextualState.opponent.monsters[0],
//       //         stats: {
//       //           ...contextualState.opponent.monsters[0].stats,
//       //           status: damagedHP,
//       //         },
//       //       },
//       //       ...contextualState.opponent.monsters.slice(1),
//       //     ],
//       //   },
//       //   dialog: {
//       //     ...newState.dialog,
//       //     isOpen: true,
//       //     message: `${move.effect.result} lands successfully!`,
//       //     title: `${move.effect.result} lands`,
//       //     header: `${move.effect.result} landed`,
//       //     buttons: [
//       //       {
//       //         label: 'OK',
//       //         onClick: () => {
//       //           // replace here with our function create
//       //           // Here will be actual new logic for ok
//       //           // continuing on with the new status
//       //           const closedPopupState =
//       //             createPopupRemovedState(effectResultState)
//       //           executeMove(
//       //             move,
//       //             closedPopupState,
//       //             contextualDispatch,
//       //             user,
//       //             ATK_PHASES.EFFECTS, // phase,
//       //           )
//       //         },
//       //         backgroundColor: '#4b770e',
//       //         color: '#fff',
//       //       },
//       //       {
//       //         label: 'Not So Fast',
//       //         onClick: () => {
//       //           //replace here with our function create
//       //           // Here will be actual new logic for not so fast
//       //           const closedPopupState =
//       //             createPopupRemovedState(effectResultState)
//       //           executeMove(
//       //             move,
//       //             closedPopupState,
//       //             contextualDispatch,
//       //             user,
//       //             ATK_PHASES.EFFECTS, // phase,
//       //           )
//       //         },
//       //         backgroundColor: '#4b770e',
//       //         color: '#fff',
//       //       },
//       //     ],
//       //   },
//       // }
//     } else if (player === 'AI') {
//       user.stats.status = move.effect.result
//       // console.log(`user's status is now ${user.stats.status}`)
//       // newState = {
//       //   ...contextualState,
//       //   userParty: [
//       //     {
//       //       ...contextualState.userParty[0],
//       //       stats: {
//       //         ...contextualState.userParty[0].stats,
//       //         status: damagedHP,
//       //       },
//       //     },
//       //     ...contextualState.userParty.slice(1),
//       //   ],
//       // }
//     }
//     //
//     // Dialogue: ___ lands
//     // Dialogue: ___ is taking x poison damage (or any other effect)
//     console.log(`STATUSES: ending - effect landed, returning effectResultState`, effectResultState)
//     console.groupEnd()
//     return effectResultState = {
//       // ...contextualState,
//       // dialog: {
//       //   ...contextualState.dialog,
//       //   isOpen: true,
//       //   message: `${move.effect.result} lands successfully!`,
//       //   title: `${move.effect.result} lands`,
//       //   header: `${move.effect.result} landed`,
//       //   buttons: [
//       //     {
//       //       label: 'OK',
//       //       onClick: () => {
//       //         //replace here with our function create
//       //         // Here will be actual new logic for ok
//       //         // continuing on with the new status
//       //         effectResultState = {
//       //           ...effectResultState,
//       //         }

//       //         const closedPopupState =
//       //           createPopupRemovedState(effectResultState)
//       //         executeMove(
//       //           move,
//       //           closedPopupState,
//       //           contextualDispatch,
//       //           user,
//       //           ATK_PHASES.EFFECTS, // phase,
//       //         )
//       //       },
//       //       backgroundColor: '#4b770e',
//       //       color: '#fff',
//       //     },
//       //     {
//       //       label: 'Not So Fast',
//       //       onClick: () => {
//       //         //replace here with our function create
//       //         // Here will be actual new logic for not so fast
//       //         const closedPopupState =
//       //           createPopupRemovedState(effectResultState)
//       //         executeMove(
//       //           move,
//       //           closedPopupState,
//       //           contextualDispatch,
//       //           user,
//       //           ATK_PHASES.EFFECTS, // phase,
//       //         )
//       //       },
//       //       backgroundColor: '#4b770e',
//       //       color: '#fff',
//       //     },
//       //   ],
//       // },
//     }
//   } else {
//     console.log(`STATUSES: ending - effect did not land, returning effectResultState`, effectResultState)
//     console.groupEnd()
//     return effectResultState = {
//       //but with did not land
//     }
//   }

// }
