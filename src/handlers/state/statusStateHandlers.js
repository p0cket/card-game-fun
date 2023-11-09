// damageStateHandlers.js

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
export const updateStatusState = (contextualState, player, statusResult) => {
  console.log('Updating status state')
  if (player === 'human') {
    console.log('Updating opponent monster status')
    return {
      ...contextualState,
      opponent: {
        ...contextualState.opponent,
        monsters: contextualState.opponent.monsters.map((monster, index) => {
          console.log(`Checking opponent monster at index ${index}`)
          if (index === 0) {
            console.log('Updating status for opponent monster at index 0')
            return {
              ...monster,
              stats: { ...monster.stats, status: statusResult },
            }
          } else {
            return monster
          }
        }),
      },
    }
  } else if (player === 'AI') {
    console.log('Updating user party monster status')
    return {
      ...contextualState,
      userParty: contextualState.userParty.map((monster, index) => {
        console.log(`Checking user party monster at index ${index}`)
        if (index === 0) {
          console.log('Updating status for user party monster at index 0')
          return {
            ...monster,
            stats: { ...monster.stats, status: statusResult },
          }
        } else {
          return monster
        }
      }),
    }
  }
  console.log('Returning contextual state')
  return contextualState // In case player is neither 'human' nor 'AI'
}

export const createStatusAppliedDialogState = (
  ourState,
  contextualDispatch,
  move,
  user,
) => {
  console.log(
    `createStatusAppliedDialogState called:
   ourState, contextualDispatch, move, user`,
    ourState,
    contextualDispatch,
    move,
    user,
  )
  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move?.effect?.result} applied.
      ${user.name} ${move?.effect?.result}'d the opponent`,
      options: [
        {
          label: `ok, cool thing`,
          onClick: () => {
            console.log(`Clicked confirm pay`)
            //doesn't need to return anything because it runs again
            executeMove(
              move,
              ourState,
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
  user,
) => {
  console.log(
    `createStatusNotAppliedDialogState called:
   ourState, contextualDispatch, move, user`,
    ourState,
    contextualDispatch,
    move,
    user,
    ourState.dialog,
  )

  const paidState = {
    ...ourState,
    dialog: {
      ...ourState.dialog,
      isOpen: true,
      message: `${move?.effect?.result} NOT applied.
      ${user.name} failed to ${move?.effect?.result} the opponent`,
      options: [
        {
          label: `oh no, cool thing`,
          onClick: () => {
            console.log(`Clicked confirm 'oh no' in effect not applied`)
            //doesn't need to return anything because it runs again
            executeMove(
              move,
              ourState,
              contextualDispatch,
              user,
              ATK_PHASES.EFFECTS, 
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
  user,
) => {
  console.log(
    `createCleanupDialogState called:
   ourState, contextualDispatch, move, user`,
    ourState,
    contextualDispatch,
    move,
    user,
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
              move,
              ourState,
              contextualDispatch,
              user,
              ATK_PHASES.END, 
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
