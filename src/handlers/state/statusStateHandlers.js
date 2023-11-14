// damageStateHandlers.js

import { PLAYERS } from '../../consts/consts'
import { ATK_PHASES, executeMove } from '../moveHandlers'

// Apply poison effect to the target
export const applyPoison = (target, effectValue) => {
  console.log(`applying poison to ${target.name}, damage: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    poison: {
      active: true,
      damage: effectValue,
    },
  }
  return target
}

// Apply burn effect to the target
export const applyBurn = (target, effectValue) => {
  console.log(`applying burn to ${target.name}, damage: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    burn: {
      active: true,
      damage: effectValue,
    },
  }
  return target
}

// Apply freeze effect to the target
export const applyFreeze = (target, effectValue) => {
  console.log(`applying freeze to ${target.name}, duration: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    freeze: {
      active: true,
      duration: effectValue,
    },
  }
  return target
}

// Apply paralysis effect to the target
export const applyParalysis = (target, effectValue) => {
  console.log(`applying paralysis to ${target.name}, chance: ${effectValue}`)
  target.statuses = {
    ...target.statuses,
    paralysis: {
      active: true,
      chance: effectValue,
    },
  }
  return target
}

// fix this. All this does is apply the status to the array of statuses
// in the monster's stats.
// the shape for this looks like:
//  pal = {
//   name: 'Luminowl',
//   quirks: ['Guiding Light', 'Soothing Feathers'],
//   stats: {
//     hp: 91,
//     max_hp: 111,
//     attack: 80,
//     defense: 60,
//     special_attack: 120,
//     special_defense: 90,
//     speed: 110,
//   },
//   status: { test: true },
// ... }
// in status is where we should store the status if it is applied
// to the monster. so like status: {test: true, poison: {active: true, damage: 10}} etc.
export const updateStatusState = (
  contextualState,
  player,
  statusResult,
  statusValue = true,
  index = 0,
) => {
  const { HUMAN, AI } = PLAYERS
  if (player === HUMAN) {
    let updatedMonsters = [...contextualState.opponent.monsters]
    console.log(`updatedMonsters: ${JSON.stringify(updatedMonsters)}`)
    console.log(`index: ${index}`)
    updatedMonsters[index].obj.status = {
      ...updatedMonsters[index].obj.status,
      [statusResult]: statusValue,
    }
    return {
      ...contextualState,
      opponent: {
        ...contextualState.opponent,
        monsters: updatedMonsters,
      },
    }
  } else if (player === AI) {
    let updatedMonsters = [...contextualState.userParty]
    updatedMonsters[index].obj.status = {
      ...updatedMonsters[index].obj.status,
      [statusResult]: statusValue,
    }
    return {
      ...contextualState,
      userParty: updatedMonsters,
    }
  }
  return contextualState // In case player is neither 'human' nor 'AI'
}

export const createStatusAppliedDialogState = (
  ourState,
  contextualDispatch,
  move,
  pal,
) => {
  console.log(
    `createStatusAppliedDialogState called:
   ourState, contextualDispatch, move, pal`,
    ourState,
    contextualDispatch,
    move,
    pal,
  )
  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move?.effect?.result} applied.
      ${pal.name} ${move?.effect?.result}'d the opponent`,
      options: [
        {
          label: `ok, cool thing`,
          onClick: () => {
            console.log(`Clicked confirm pay`)
            //doesn't need to return anything because it runs again
            executeMove(
              // move,
              // ourState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.EFFECTS, // phase,
              {
                state: ourState,
                dispatch: contextualDispatch,

                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.EFFECTS,
                userSlot: 0,

                targets: targets,
                // possessed: false,
              },
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
              ...ourState,
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
      ],
      title: 'Effect Phase',
      header: 'You can Effect!',
    },
  }
  return paidState
}
export const createStatusNotAppliedDialogState = (
  ourState,
  contextualDispatch,
  move,
  pal,
) => {
  console.log(
    `createStatusNotAppliedDialogState called:
   ourState, contextualDispatch, move, pal`,
    ourState,
    contextualDispatch,
    move,
    pal,
    ourState.dialog,
  )

  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move?.effect?.result} NOT applied.
      ${pal.name} failed to ${move?.effect?.result} the opponent`,
      options: [
        {
          label: `oh no, cool thing`,
          onClick: () => {
            console.log(`Clicked confirm 'oh no' in effect not applied`)
            //doesn't need to return anything because it runs again
            executeMove(
              // move,
              // ourState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.EFFECTS,
              {
                state: ourState,
                dispatch: contextualDispatch,

                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.EFFECTS,
                userSlot: 0,

                targets: targets,
                // possessed: false,
              },
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
              ...ourState,
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
      ],
      title: 'Effect Phase',
      header: 'You can Effect!',
    },
  }
  return paidState
}

export const createCleanupDialogState = (
  ourState,
  contextualDispatch,
  move,
  pal,
) => {
  console.log(
    `createCleanupDialogState called:
   ourState, contextualDispatch, move, pal`,
    ourState,
    contextualDispatch,
    move,
    pal,
    ourState.dialog,
  )

  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `applying end of turn cleanup effects`,
      options: [
        {
          label: `go to end`,
          onClick: () => {
            console.log(`Clicked confirm 'go to end' in effect not applied`)
            //doesn't need to return anything because it runs again
            executeMove(
              // move,
              // ourState,
              // contextualDispatch,
              // pal,
              // ATK_PHASES.END,
              {
                state: ourState,
                dispatch: contextualDispatch,

                pal: pal,
                move: move,
                player: player,
                phase: ATK_PHASES.END,
                userSlot: 0,

                targets: targets,
                // possessed: false,
              },
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
              ...ourState,
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
      ],
      title: 'Cleanup Phase',
      header: 'Cleanup!',
    },
  }
  return paidState
}
