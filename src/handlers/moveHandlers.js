// export const EmotionDrain = {
//   name: 'Emotion Drain',
//   type: 'dark',
//   damage: 40,
//   speed: 12,
//   fuel: 5,
//   effect: {
//     description: 'Drain the opponents emotions to weaken them',
//     chance: '20%',
//     result: 'debuff',
//   },
//   priority: 'medium',
//   targets: ['opponent'],
//   // "NotSoFast" aspect:
//   notSoFast: {
//     name: 'Resilient Spirit',
//     type: 'buff',
//     effect: {
//       description: 'Enhance your emotional resilience to resist debuffs',
//       duration: '1 turn',
//       debuff_resist: 100, // Provides immunity to debuffs for 1 turn
//     },
//   },
//   // "Forceful" aspect:
//   forceful: {
//     name: 'Soul Siphon',
//     type: 'dark',
//     damage: 60,
//     speed: 14,
//     fuel: 7,
//     effect: {
//       description: 'Drain the opponents soul, guaranteeing debuffs',
//       chance: '100%',
//       result: 'debuff',
//     },
//     targets: ['opponent'],
//   },
// }

import { ACTIONS } from '../MainContext'
import { Party } from '../consts/party/parties'
// import { customLog } from '../utils/debugging-utils'
export const ATK_PHASES = {
  PAY_COST: 'pay',
  CALCULATE_DAMAGE: 'calcDamage',
  RESOLVE_EFFECT: 'effect',
  APPLY_STATUSES: 'apply',
  APPLY_DAMAGE: 'damage',
  END: 'end',
}

export const createPopupRemovedState = (prevState) => {
  return {
    ...prevState,
    dialog: {
      ...prevState.dialog,
      isOpen: false,
    },
  }
}
export const createPopupVisibleState = (prevState) => {
  return {
    ...prevState,
    dialog: {
      ...prevState.dialog,
      isOpen: true,
    },
  }
}

//also check if dead along the way :P

export const executeMove = (
  move,
  contextualState,
  contextualDispatch,
  user,
  phase,
) => {
  const userMonster = contextualState.userParty[Party.SLOT_1]
  const targetMonster = contextualState.opponent.monsters[0].obj
 

  // this is a function that gets called many times.
  // at each point, we need do a phase and then
  // present to the player a dialog to decide what to do next

  // the dialog has everything needed to run the function yet again,
  // this continues until the full attack resolves

  // TODO: Finish this function
  switch (phase) {
    case ATK_PHASES.PAY_COST:
      // customLog('info', `begin phase`)
      // 1. Pay cost. If you can't, return:
      // Lets use player energy for this
      const playerEnergy = contextualState.game.player.energy
      // Add the type later, this is for another switch statement.
      // They might have to pay health or gold or something else
      // cosnt costType = move.cost.type
      // customLog('info', `costType is ${costType}`)
      const moveCost = move.cost

      if (playerEnergy < moveCost) {
        // customLog('error', 'Not enough energy to perform the move')
        // Dialogue: not enough energy
        const dialogState = {
          ...contextualState,
          'contextualState.dialog': {
            isOpen: true,
            message: 'Not enough energy to perform the move',
            options: [
              {
                label: 'Oh dear',
                onClick: () => {
                  // customLog('info', `Pay: You can't pay Popup button clicked`)

                  // maybe a "i'm sorry button, that says,
                  // I forgive you love, when clicked"
                  // end the popup

                  const closedPopupState = createPopupRemovedState()
                  return contextualDispatch({
                    payload: closedPopupState,
                    type: ACTIONS.UPDATEGAMEDATA,
                  })
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
            ],
            title: 'startingData Title',
            header: 'startingData Header',
          },
        }
        // customLog('info', 'Pay: CANT PAY, resulting state:', contextualState)
        // return the original state
        return contextualDispatch({
          payload: dialogState,
          type: ACTIONS.UPDATEGAMEDATA,
        })
      } else {
        const playerEnergyAfterPayment = playerEnergy - moveCost
        // customLog(
        //   'success',
        //   `${move.energyCost} paid for ${move.name}. The energy is now ${user.energy}`,
        // )
        const energyPaidState = {
          ...contextualState,
          game: {
            ...contextualState.game,
            player: {
              ...contextualState.game.player,
              energy: playerEnergyAfterPayment,
            },
          },
        }
        const costPaidDialogState = {
          ...energyPaidState,
          'contextualState.dialog': {
            isOpen: true,
            message: '___X___ Energy paid',
            options: [
              {
                label: 'Okay',
                onClick: () => {
                  //replace here with our function create
                  // const closedPopupState = createRemovedState(whateverMakesSenseHere)
                  // handle onClick logic here
                  const closedPopupState = {
                    ...energyPaidState,
                    dialog: {
                      ...energyPaidState.dialog,
                      isOpen: false,
                    },
                  }
                  executeMove(
                    move,
                    closedPopupState,
                    contextualDispatch,
                    user,
                    ATK_PHASES.CALCULATE_DAMAGE, // phase,
                  )
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
              {
                label: 'Enhance',
                onClick: () => {
                  //replace here with our function create
                  // const closedPopupState = createRemovedState(whateverMakesSenseHere)
                  // handle onClick logic here
                  const closedPopupState = {
                    ...energyPaidState,
                    dialog: {
                      ...energyPaidState.dialog,
                      isOpen: false,
                    },
                  }
                  // -maybe just use the same executeMove
                  // the button should change phase
                  executeMove(
                    move,
                    closedPopupState,
                    contextualDispatch,
                    user,
                    ATK_PHASES.CALCULATE_DAMAGE, // phase,
                  )
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
              {
                label: 'Enhance',
                onClick: () => {
                  //replace here with our function create
                  // const closedPopupState = createRemovedState(whateverMakesSenseHere)
                  // handle onClick logic here
                  const closedPopupState = {
                    ...energyPaidState,
                    dialog: {
                      ...energyPaidState.dialog,
                      isOpen: false,
                    },
                  }
                  // -maybe just use the same executeMove
                  // the button should change phase
                  executeMove(
                    move, // move,
                    // energyPaidState, // contextualState,
                    closedPopupState,
                    contextualDispatch, // contextualDispatch,
                    user, // user,
                    ATK_PHASES.CALCULATE_DAMAGE, // phase,
                  )
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
            ],
            title: 'startingData Title',
            header: 'startingData Header',
          },
          // Dialogue: Paid x energy
        }
        // customLog('info', 'Pay: PAID, resulting state:', contextualState)
        return contextualDispatch({
          payload: costPaidDialogState,
          type: ACTIONS.UPDATEGAMEDATA,
        })
      }

      //dispatch( payload:  whatever to set the dialog with, rest of the obj
      // type: ACTIONS.UPDATE SETDATA)

      // Dialogue: ___ used ____ <-move
      break
    case ATK_PHASES.CALCULATE_DAMAGE:
      // customLog('info', `ATK: calculate damage phase`)
      // Calculate the damage based on move and user's stats
      // also apply the enemy abilities and effects with this as well
      const ourDmg = move.damage //Apply pal's stats (userMonster.stats.attack * move.damage) / 100
    //   customLog(
    //     'info',
    //     `The damage to be dealt is ${ourDmg}. from ${
    //       userMonster.stats.attack
    //     } * ${ourDmg} / 100. 
    // This will result in targetMonster.stats.hp (${targetMonster.stats.hp})
    //  at: ${targetMonster.stats.hp - ourDmg}`,
    //   )
    //   customLog('info', `move.effect is ${move.effect.result}`, `move`, move)
      // Check if the move has a status effect
      // 2. Calculate damage
      // const stateWithDamageDealt = dealDamage(move, user)
      // for all modifiers, switch(move.modifiers) go through every modifier.
      break
    case ATK_PHASES.APPLY_DAMAGE:
      // customLog('info', `ATK: Apply Damage Phase`)
      const damage = move.damage //Apply pal's stats (userMonster.stats.attack * move.damage) / 100

      // (Previously 5). Apply damage
      // Apply dmg to the target
      // Dialogue: ___ is dealt x damage
      targetMonster.stats.hp -= damage
      break
    case ATK_PHASES.APPLY_STATUSES:
      console.log(`ATK: apply statuses resolve phase`)
      // 3. resolve effect?
      const doesItLand = Math.random() <= parseFloat(move.effect.chance) / 100
      console.log(`doesItLand is ${doesItLand}`)
      // Dialogue: does/does not land

      break
    case ATK_PHASES.RESOLVE_EFFECTS:
      // 4. Apply statuses
      // const stateWithStatusesApplied = applyStatuses(move, user) // switch(move.statuses)
      if (move.effect && doesItLand) {
        const effect = move.effect.result
        // Implement logic to apply the status effect (e.g., set 'blind' status)
        // if it has an effect, run it through the effects switch case
        // abstract the logic out into its' own file
        // For example:
        switch (effect) {
          case 'blind':
            // apply blind
            // Dialogue: applying blind
            console.log(`applying blind to ${targetMonster.name}`)
            //applyEffect("blind", targetMonster)
            //evasion less
            // acuracy less
            // note the effect is applied to the target
            targetMonster.status.blind = true
            break
          case 'buff':
            // apply buff
            // Dialogue: applying buff
            targetMonster.stats.attack += 2
          default:
            console.log(`default case for hero buffs applied`)
        }
        // 6. Resolve End Steps (is this taken care of here?)
        // Dialogue: ___ is taking x poison damage (or any other effect)
        // const stateWithEndStepsResolved = resolveEndSteps(move, user) // switch(move.endStepsTriggers)
        // if theres poison, apply damage. it theres sleep, see if it wakes, etc.
      }
      break
    case ATK_PHASES.END:
      console.log(`ATK: end phase`)
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
  const user = state.userParty[Party.SLOT_1] // Get the user's party
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
// const handleSelect = (selectedMonster) => {
//   console.log(
//     `you selected monster: ${selectedMonster.name}`,
//     selectedMonster,
//   )
//   // #TODO: This is the code that breaks things but I need to make it work:
//   setShowDetails(false)
//   // this is just the party obj, not the full state
//   const partyWithMonsterAdded = addMonsterToParty(
//     selectedMonster,
//     contextualState.userParty,
//   )
//   const stateWithParty = {
//     ...contextualState,
//     userParty: partyWithMonsterAdded,
//   }
//   const nextSceneState = updateScene(stateWithParty, {
//     screen: SCENES.MAP,
//     details: null,
//   })
//   const nextLevelState = updateLevel(nextSceneState, 0)

//   //
//   // Define a function to log colored messages
//   const logWithColor = (message, color) => {
//     console.log(`%c${message}`, `color: ${color}; font-weight: bold;`)
//   }
