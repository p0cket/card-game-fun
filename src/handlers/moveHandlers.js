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
import { Party, opponent } from '../consts/party/parties'
import { cusLog } from '../utils/debugging-utils'
// import { customLog } from '../utils/debugging-utils'
export const ATK_PHASES = {
  PAY: 'pay',
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
  user, // maybe change to add the other aspects, destructure after
  phase,
  // ---
  // player: AI , you, them
  player = 'human',
  selectedTargets = [0],
  // target/s: AI, you, them
) => {
  let targetMonster = null
  // user is the user
  if (player === 'human') {
    targetMonster = contextualState.opponent.monsters[0].obj
  } else if (player === 'AI') {
    targetMonster = contextualState.userParty[0].obj
  } else {
    console.error('executeMove: Player of attack not recognized')
  }

  // this is a function that gets called many times.
  // at each point, we need do a phase and then
  // present to the player a dialog to decide what to do next

  // the dialog has everything needed to run the function yet again,
  // this continues until the full attack resolves

  // hmm, ATK_PHASES.PAY should match `phase`. Lets check that
  // if (phase !== ATK_PHASES.PAY) {
  //   cusLog(`Starting ${phase} phase`, 'info')
  // } else {
  //   cusLog(`Starting ${phase} phase, not pay phase`, 'pay')
  // }

  // this shows the difference between phase and ATK_PHASES.PAY

  // TODO: Finish this function
  switch (phase) {
    case ATK_PHASES.PAY:
      console.log(`Starting PAY phase`, 'pay')
      // cusLog(`Starting PAY phase`, 'pay')
      // 1. Pay cost. If you can't, return:
      // Lets use player energy for this
      const playerEnergy = contextualState.game.player.energy
      // Add the type later, this is for another switch statement.
      // They might have to pay health or gold or something else
      // cosnt costType = move.cost.type

      const moveCost = move.cost.energy
      console.log(`cost is ${moveCost} energy. Player has ${playerEnergy}`)

      if (playerEnergy < moveCost) {
        console.log(
          `${playerEnergy}<${moveCost} • Not enough energy to perform the move`,
        )
        // Dialogue: not enough energy
        const dialogState = {
          ...contextualState,
          dialog: {
            ...contextualState.dialog,
            isOpen: true,
            message: `Not enough energy. user.name of ${user.name} does not have enough energy to perform the move.`,
            options: [
              {
                label: 'Oh dear',
                onClick: () => {
                  const closedPopupState =
                    createPopupRemovedState(contextualState)
                  console.log(closedPopupState)
                  return contextualDispatch({
                    payload: closedPopupState,
                    type: ACTIONS.UPDATEGAMEDATA,
                  })
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
            ],
            title: 'Pay Phase',
            header: 'Not enough energy to perform the move',
          },
        }
        // return the original state
        return contextualDispatch({
          payload: dialogState,
          type: ACTIONS.UPDATEGAMEDATA,
        })
      } else {
        const playerEnergyAfterPayment = playerEnergy - moveCost
        console.log(
          `Enough to use :), ${playerEnergy}-${moveCost} = ${playerEnergyAfterPayment}`,
        )
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
        console.log('Pay: energyPaidState, resulting state:', energyPaidState)

        const costPaidDialogState = {
          ...energyPaidState,
          dialog: {
            ...energyPaidState.dialog,
            isOpen: true,
            message: `${moveCost} Energy paid.
            ${user.name} uses ${move.name}`,
            options: [
              {
                label: 'Confirm',
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
            title: 'Pay Phase',
            header: 'You can pay!',
          },
          // Dialogue: Paid x energy
        }
        console.log('Pay: PAID, resulting state:', costPaidDialogState)
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
      console.log(`ATK: CALCULATE_DAMAGE phase`, contextualState)
      // Calculate the damage based on move and user's stats
      // also apply the enemy abilities and effects with this as well
      const ourDmg = move.damage //Apply pal's stats (userMonster.stats.attack * move.damage) / 100
      console.log(
        'info',
        `The damage to be dealt is ${ourDmg}. from ${
          user.stats.attack
        } * ${ourDmg} / 100.
      This will result in targetMonster.stats.hp (${targetMonster.stats.hp})
       at: ${targetMonster.stats.hp - ourDmg}`,
      )
      // 2. Calculate damage
      // const stateWithDamageDealt = dealDamage(move, user)
      //----------
      const damagedHP = targetMonster.stats.hp - ourDmg
      let newState = { ...contextualState }

      if (player === 'human') {
        targetMonster.stats.hp = damagedHP
        console.log(`AI's HP is now ${targetMonster.stats.hp}`)
        newState = {
          ...contextualState,
          opponent: {
            ...contextualState.opponent,
            monsters: [
              {
                ...contextualState.opponent.monsters[0],
                stats: {
                  ...contextualState.opponent.monsters[0].stats,
                  hp: damagedHP,
                },
              },
              ...contextualState.opponent.monsters.slice(1),
            ],
          },
          dialog: {
            ...newState.dialog,
            isOpen: true,
            message: `${moveCost} Energy paid.
            ${user.name} uses ${move.name}`,
            options: [
              {
                label: 'Confirm',
                onClick: () => {
                  //replace here with our function create
                  // const closedPopupState = createRemovedState(whateverMakesSenseHere)
                  // handle onClick logic here
                  const closedPopupState = {
                    ...newState,
                    dialog: {
                      ...newState.dialog,
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
                    newState,
                    contextualDispatch,
                    user,
                    ATK_PHASES.APPLY_DAMAGE, // phase,
                  )
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
              {
                label: 'Enhance',
                onClick: () => {
                  const closedPopupState = {
                    ...newState,
                    dialog: {
                      ...newState.dialog,
                      isOpen: false,
                    },
                  }
                  executeMove(
                    move,
                    closedPopupState,
                    contextualDispatch,
                    user, // user,
                    ATK_PHASES.APPLY_DAMAGE, // phase,
                  )
                },
                backgroundColor: '#4b770e',
                color: '#fff',
              },
            ],
            title: 'Pay Phase',
            header: 'You can pay!',
          },
        }
      } else if (player === 'AI') {
        user.stats.hp = damagedHP
        console.log(`user's HP is now ${user.stats.hp}`)
        newState = {
          ...contextualState,
          userParty: [
            {
              ...contextualState.userParty[0],
              stats: {
                ...contextualState.userParty[0].stats,
                hp: damagedHP,
              },
            },
            ...contextualState.userParty.slice(1),
          ],
        }
      }
      console.log(`ATK: CALCULATE_DAMAGE phase ending`, newState)
      return contextualDispatch({
        payload: newState,
        type: ACTIONS.UPDATEGAMEDATA,
      })
      // for all modifiers, switch(move.modifiers) go through every modifier.
      break
    case ATK_PHASES.APPLY_DAMAGE:
      console.log(`ATK: Apply Damage Phase`)
      const damage = move.damage //Apply pal's stats (userMonster.stats.attack * move.damage) / 100

      // (Previously 5). Apply damage
      // Apply dmg to the target
      // Dialogue: ___ is dealt x damage
      targetMonster.stats.hp -= damage
      break
    // Check if the move has a status effect
    case ATK_PHASES.APPLY_STATUSES:
      console.log(`move.effect is ${move.effect.result}`, `move`, move)

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
  // const user = state.userParty[Party.SLOT_1] // Get the user's party
  const user = state.userParty[0] // Get the user's party

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
