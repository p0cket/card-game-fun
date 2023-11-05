import { createPopupRemovedState } from '../dialog/basicDialogHandlers'
import { ATK_PHASES, executeMove } from '../moveHandlers'

let doesItLand
let newState

export const statusPhase = (
  contextualState,
  contextualDispatch,
  user,
  move,
  targetMonster,
  player,
  damagedHP,
) => {
  console.log(`ATK STATUSES: apply statuses resolve phase`)
  console.log(`move.effect is ${move.effect.result}`, `move`, move)

  // 3. resolve effect?
  doesItLand = Math.random() <= parseFloat(move.effect.chance) / 100
  console.log(
    `doesItLand is ${doesItLand}. the move.effect.chance is ${move.effect.chance}`,
  )
  let effectResultState = null
  if (doesItLand) {
    console.log(`effect lands`)
    if (player === 'human') {
      targetMonster.stats.status = move.effect.result
      console.log(`AI's HP is now ${move.effect.result}`)
      newState = {
        ...contextualState,
        opponent: {
          ...contextualState.opponent,
          monsters: [
            {
              ...contextualState.opponent.monsters[0],
              stats: {
                ...contextualState.opponent.monsters[0].stats,
                status: damagedHP,
              },
            },
            ...contextualState.opponent.monsters.slice(1),
          ],
        },
        dialog: {
          ...newState.dialog,
          isOpen: true,
          message: `${move.effect.result} lands successfully!`,
          title: `${move.effect.result} lands`,
          header: `${move.effect.result} landed`,
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                // replace here with our function create
                // Here will be actual new logic for ok
                // continuing on with the new status
                const closedPopupState =
                  createPopupRemovedState(effectResultState)
                executeMove(
                  move,
                  closedPopupState,
                  contextualDispatch,
                  user,
                  ATK_PHASES.EFFECTS, // phase,
                )
              },
              backgroundColor: '#4b770e',
              color: '#fff',
            },
            {
              label: 'Not So Fast',
              onClick: () => {
                //replace here with our function create
                // Here will be actual new logic for not so fast
                const closedPopupState =
                  createPopupRemovedState(effectResultState)
                executeMove(
                  move,
                  closedPopupState,
                  contextualDispatch,
                  user,
                  ATK_PHASES.EFFECTS, // phase,
                )
              },
              backgroundColor: '#4b770e',
              color: '#fff',
            },
          ],
        },
      }
    } else if (player === 'AI') {
      user.stats.status = move.effect.result
      console.log(`user's status is now ${user.stats.status}`)
      newState = {
        ...contextualState,
        userParty: [
          {
            ...contextualState.userParty[0],
            stats: {
              ...contextualState.userParty[0].stats,
              status: damagedHP,
            },
          },
          ...contextualState.userParty.slice(1),
        ],
      }
    }
    //
    // Dialogue: ___ lands
    // Dialogue: ___ is taking x poison damage (or any other effect)
    effectResultState = {
      ...contextualState,
      dialog: {
        ...contextualState.dialog,
        isOpen: true,
        message: `${move.effect.result} lands successfully!`,
        title: `${move.effect.result} lands`,
        header: `${move.effect.result} landed`,
        buttons: [
          {
            label: 'OK',
            onClick: () => {
              //replace here with our function create
              // Here will be actual new logic for ok
              // continuing on with the new status
              effectResultState = {
                ...effectResultState,
              }

              const closedPopupState =
                createPopupRemovedState(effectResultState)
              executeMove(
                move,
                closedPopupState,
                contextualDispatch,
                user,
                ATK_PHASES.EFFECTS, // phase,
              )
            },
            backgroundColor: '#4b770e',
            color: '#fff',
          },
          {
            label: 'Not So Fast',
            onClick: () => {
              //replace here with our function create
              // Here will be actual new logic for not so fast
              const closedPopupState =
                createPopupRemovedState(effectResultState)
              executeMove(
                move,
                closedPopupState,
                contextualDispatch,
                user,
                ATK_PHASES.EFFECTS, // phase,
              )
            },
            backgroundColor: '#4b770e',
            color: '#fff',
          },
        ],
      },
    }
  } else {
    console.log(`effect did not land`)
  }
  console.log(`ATK: STATUSES phase ending`, effectResultState)
  return contextualDispatch({
    payload: effectResultState,
    type: ACTIONS.UPDATEGAMEDATA,
  })
}
