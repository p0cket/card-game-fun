/* eslint-disable indent */
import React, { useContext, useState } from 'react'
import './index.css'
import {
  getFreshStartingData,
  newStartingData,
  startingDataBackup,
} from './consts/startingData'
import { cusLog } from './utils/debugging-utils'
import { payPhase } from './handlers/attack/payPhase'
import { dmgPhase } from './handlers/attack/dmgPhase'
import { statusPhase } from './handlers/attack/statusPhase'
import { cleanupPhase } from './handlers/attack/cleanupPhase'
import { endPhase } from './handlers/attack/endPhase'
import {
  SCENES,
  setupOpponent,
  updateLevel,
  updateScene,
} from './handlers/sceneHandlers_new'
// import { SCENES } from './scenes'
import {
  clearEnemyPalStatuses,
  clearUserPartyStatuses,
  healAIPal,
  healHumanPal,
  setEnemyPalEnergyToMax,
  setEnemyPalHPToMax,
  setPlayerPalHPToMax,
} from './handlers/state/healthStateHandlers'
import { subtractItem } from './handlers/state/itemStateHandlers'
import {
  addAttackToPalInState,
  addAttackToState,
  addMoveToPalInState,
  updateMoveOnPal,
} from './handlers/state/attackStateHandlers'
import {
  logLevelsCompletedData,
  setMaxPalEnergy,
  setPalEnergyToMax,
  setPalHPToMax,
} from './handlers/state/levelStateHandlers'
import { swapPals } from './handlers/state/partyStateHandlers'

function logAndStripFunctions(obj, path = '', functionPaths = []) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item, index) =>
      logAndStripFunctions(item, `${path}[${index}]`, functionPaths),
    )
  }

  const strippedObj = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key
      if (typeof value === 'function') {
        console.log(`GOTCHA! Function found at ${currentPath}`)
        functionPaths.push(currentPath)
        return [key, null] // Replace function with null for cloning purposes
      }
      return [key, logAndStripFunctions(value, currentPath, functionPaths)]
    }),
  )

  if (path === '') {
    console.log(`GOTCHAS Summary of functions found: ${functionPaths.length}`)
    functionPaths.forEach((path) => console.log(`Function path: ${path}`))
  }

  return strippedObj
}

const stateContext = React.createContext()
const dispatchContext = React.createContext()

export function useStateContext() {
  return useContext(stateContext)
}

export function useDispatchContext() {
  return useContext(dispatchContext)
}

export const ACTIONS = {
  CHANGE_LEVEL: 'CHANGE_LEVEL',
  CHANGE_SCENE: 'CHANGE_SCENE',

  ADD_RUNE: 'ADD_RUNE',
  ADD_ITEM: 'ADD_ITEM',
  ADD_MOVE: 'ADD_MOVE',
  INCREASE_MOVE_DAMAGE: 'INCREASE_MOVE_DAMAGE',

  USE_ITEM: 'USE_ITEM',

  SET_SCENE: 'SET_SCENE',

  HEAL_PAL_FULL: 'HEAL_PAL_FULL',
  SET_HEALTH: 'SET_HEALTH',
  SET_GOLD: 'SET_GOLD',
  SET_LEVEL: 'SET_LEVEL',
  SET_INVENTORY: 'SET_INVENTORY',
  ATTACK: 'ATTACK',
  UPDATE_GAMEDATA: 'UPDATE_GAMEDATA',
  SHOW_ATTACK: 'SHOW_ATTACK',
  CLOSE_POPUP: 'CLOSE_POPUP',
  CLOSE_DIALOG: 'CLOSE_DIALOG',

  CHANGE_DIALOG: 'CHANGE_DIALOG',
  SHOW_COUNTERS: 'SHOW_COUNTERS',

  SWAP_PALS: 'SWAP_PALS',
  // Phases:
  PAY_PHASE: 'PAY_PHASE',
  DAMAGE_PHASE: 'DAMAGE_PHASE',
  STATUS_PHASE: 'STATUS_PHASE',
  CLEANUP_PHASE: 'CLEANUP_PHASE',
  END_PHASE: 'END_PHASE',
  ADD_MOVE_TO_STACK: 'ADD_MOVE_TO_STACK',

  ANIMATION_RUNNING_TOGGLE: 'ANIMATION_RUNNING_TOGGLE',

  TOGGLE_DEBUG: 'TOGGLE_DEBUG',

  RESET_DATA: 'RESET_DATA',
}

export const MainProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, newStartingData)
  function reducer(state, action) {
    // console.log('Reducer called with "state" and "action":', state, action)
    const functionPaths = []

    // If theres a non-serializable issue, log here to find it:
    // const cleanState = logAndStripFunctions(state, '', functionPaths)
    // const cleanPayload = logAndStripFunctions(action.payload, '', functionPaths)

    // Log individual nested properties
    // if (state.opponent) {
    //   console.log('State opponent:', JSON.stringify(state.opponent, null, 2))
    //   if (state.opponent.monsters) {
    //     state.opponent.monsters.forEach((monster, index) => {
    //       console.log(
    //         `State opponent monster ${index}:`,
    //         JSON.stringify(monster, null, 2),
    //       )
    //     })
    //   }
    // }

    // if (action.payload && action.payload.opponent) {
    //   console.log(
    //     'Action payload opponent:',
    //     JSON.stringify(action.payload.opponent, null, 2),
    //   )
    //   if (action.payload.opponent.monsters) {
    //     action.payload.opponent.monsters.forEach((monster, index) => {
    //       console.log(
    //         `Action payload opponent monster ${index}:`,
    //         JSON.stringify(monster, null, 2),
    //       )
    //     })
    //   }
    // }

    try {
      state = structuredClone(state)
    } catch (error) {
      console.error('Error cloning state:', error)
      console.log('State at error:', state)
      console.log('Action at error:', action)
    }
    cusLog(`dispatching:`, 'info', undefined, action)
    let payState,
      dmgState,
      statusState,
      cleanupState,
      endState,
      nextSceneState,
      nextLevelState,
      stateWithProgression,
      stateWithRune,
      stateWithItem,
      stateWithHealth,
      stateAfterUse,
      stateWithAttack,
      countersState,
      newMoveStack,
      newStateWithStack,
      freshData

    switch (action.type) {
      case ACTIONS.UPDATE_GAMEDATA:
        // within here do the handlers
        return { ...state, ...action.payload }
      case ACTIONS.SET_SCENE:
        return { ...state, scene: action.payload }
      // same? Made this as a second attempt
      case ACTIONS.CHANGE_LEVEL:
        stateWithProgression = {
          ...state,
          current: {
            ...state.current,
            mapLevel: state.current.mapLevel + 1,
          },
        }
        console.log(`stateWithProgression: `, stateWithProgression)
        return stateWithProgression
      case ACTIONS.CHANGE_SCENE:
        //changing to battle that. is refactored. fix it.
        console.log(`CHANGE_SCENE. action.payload: `, action.payload)
        nextSceneState = updateScene(state, {
          screen: action.payload.screen,
          details: action.payload.details,
        })
        nextLevelState = updateLevel(nextSceneState, 1)
        console.log(`updateLevel`, nextLevelState, action.payload)
        // setup opponent. for a boss this needs to be modified
        nextLevelState = setupOpponent(
          nextLevelState,
          action.payload.details.trainer,
        )
        switch (action.payload.screen) {
          case SCENES.BATTLE:
          case SCENES.BOSS:
            // set the pal to max, probably should be setEnemyPalEnergyToMax. or pass in opponent/index as a param.
            nextLevelState = logLevelsCompletedData(nextLevelState)
            nextLevelState = setEnemyPalEnergyToMax(nextLevelState)
            nextLevelState = setEnemyPalHPToMax(nextLevelState)
            nextLevelState = clearEnemyPalStatuses(nextLevelState)
            // clear our pal's statuses before the next level as well
            nextLevelState = clearUserPartyStatuses(nextLevelState)
            break // This will prevent fall-through and continue with the rest of the function after the switch. Other cases can be added here as needed
        }
        console.log(`nextLevelState after setupOpponent: `, nextLevelState)
        return nextLevelState
      case ACTIONS.SHOW_ATTACK:
        return {
          ...state,
          popup: {
            ...state.popup,
            isOpen: true,
            popupType: 'attack',
            attack: action.payload.attack,
            canUse: action.payload.canUse,
            ourCurrentMon: action.payload.ourCurrentMon
              ? action.payload.ourCurrentMon
              : null,
          },
          // attack: action.payload.attack,
          // ourCurrentMon: action.payload.ourCurrentMon,
        }
      case ACTIONS.CLOSE_POPUP:
        // within here do the handlers
        console.log('Reducer CLOSE_POPUP:', action)
        return {
          ...state,
          popup: {
            ...state.popup,
            isOpen: false,
          },
        }
      case ACTIONS.CLOSE_DIALOG:
        console.log('Reducer CLOSE_DIALOG:', action)
        return {
          ...state,
          dialog: {
            ...state.dialog,
            isOpen: false,
          },
        }
      case ACTIONS.SHOW_COUNTERS:
        //show the counter menu
        countersState = {
          ...state,
          popup: {
            ...state.popup,
            isOpen: true,
            popupType: action.payload.popupType,
            //deprecated?
            prevDialog: action.payload.prevDialog,
            prevPayload: action.payload.prevPayload,
            prevMoveFunc: action.payload.prevMove,
            // pal: action.payload.pal,
          },
          previous: {
            ...state.previous,
            dialog: action.payload.prevDialog,
            movePayload: action.payload.prevPayload,
            moveFunc: action.payload.prevMove,
          },
        }
        return countersState
      // case ACTIONS.ADD_TO_MOVE_STACK:
      //   newMoveStack = [...state.moveStack, action.payload.prevMove]
      //   newStateWithStack = {
      //     ...state,
      //     moveStack: newMoveStack,
      //   }
      //   return newStateWithStack
      case ACTIONS.ATTACK:
        return {
          ...state,
          playerParty: [
            { ...state.playerParty[0], health: action.payload },
            ...state.playerParty,
          ],
        }
      case ACTIONS.SET_HEALTH:
        return { ...state, health: action.payload }
      case ACTIONS.SET_GOLD:
        return { ...state, gold: action.payload }
      case ACTIONS.SET_LEVEL:
        return { ...state, level: action.payload }
      case ACTIONS.SET_INVENTORY:
        return { ...state, inventory: action.payload }
      case ACTIONS.PAY_PHASE:
        //
        console.log('Reducer PAY_PHASE: action & state', action, state)
        payState = { ...state }
        // if the attack is a counter, add the stashed move to the move stack
        // if (action.payload.attack.isCounter) {... }
        // now overwrite the attack with the new payload
        payState = {
          ...payState,
          attack: {
            ...payState.attack,
            ...action.payload,
          },
        }
        payState = payPhase(state, action.payload)
        return payState
      case ACTIONS.DAMAGE_PHASE:
        console.log('Reducer DAMAGE_PHASE: action&state', action, state)
        dmgState = {
          ...state,
          attack: {
            ...state.attack,
            ...action.payload,
          },
        }
        dmgState = dmgPhase(state, action.payload)
        return dmgState
      case ACTIONS.STATUS_PHASE:
        console.log('Reducer STATUS_PHASE: action&state', action, state)
        statusState = {
          ...state,
          attack: {
            ...state.attack,
            ...action.payload,
          },
        }
        statusState = statusPhase(state, action.payload)
        return statusState
      case ACTIONS.CLEANUP_PHASE:
        console.log('Reducer CLEANUP_PHASE: action&state', action, state)
        cleanupState = {
          ...state,
          attack: {
            ...state.attack,
            ...action.payload,
          },
        }
        cleanupState = cleanupPhase(state, action.payload)
        return cleanupState
      case ACTIONS.END_PHASE:
        // seems like I have the state here already
        console.log('Reducer END_PHASE: action&state', action, state)
        endState = {
          ...state,
          attack: {
            ...state.attack,
            ...action.payload,
          },
        }
        endState = endPhase(state, action.payload)
        return endState
      case ACTIONS.ADD_MOVE_TO_STACK:
        console.log('Reducer ADD_MOVE_TO_STACK: action&state', action, state)
        newMoveStack = [...state.moveStack, action.payload.prevMove]
        console.log('Reducer ADD_MOVE_TO_STACK: newMoveStack', newMoveStack)
        state = {
          ...state,
          moveStack: newMoveStack,
        }
        console.log('Reducer ADD_MOVE_TO_STACK: state', state)
        return state
      case ACTIONS.COUNTER_PHASE:
        // get the state after whatever phase, then run the next phase
        // at the end, run the next phase
        // runCounter(state, action.payload)
        // after everything is done,
        // runNextPhase(state, action.payload)
        break
      // return state
      case ACTIONS.CHANGE_DIALOG:
        console.log('Reducer CHANGE_DIALOG:', action)
        return {
          ...state,
          dialog: {
            ...state.dialog,
            isOpen: true,
            type: action.payload.dialog, // title: action.payload.title, // message: action.payload.message, // options: action.payload.options,
          },
        }
      // export const switchDialog = (ourState, dialogToShow) => {
      //   console.log(`switchDialog: ourState, dialogToShow`, ourState, dialogToShow)
      //   return {
      //     ...ourState,
      //     dialog: {
      //       ...ourState.dialog,
      //       isOpen: true,
      //       type: dialogToShow,
      //     },
      //   }
      //
      case ACTIONS.ADD_RUNE:
        // Maybe we'll have both an item and effect in the rune payload,
        // so if theres a permanent effect we can handle it separately
        console.log('Reducer ADD_RUNE:', action)
        stateWithRune = {
          ...state,
          bag: {
            ...state.bag,
            runes: [...state.bag.runes, action.payload.item],
          },
        }
        console.log(`stateWithRune: `, stateWithRune)
        return stateWithRune
      case ACTIONS.ADD_ITEM: {
        console.log('Reducer ADD_ITEM:', action)
        // Find the index of the item in the inventory, if it exists
        const itemIndex = state.bag.items.findIndex(
          (item) => item.name === action.payload.item.name,
        )
        let updatedItems = []
        if (itemIndex >= 0) {
          // Item exists, update quantity
          updatedItems = state.bag.items.map((item, index) =>
            index === itemIndex ? { ...item, qty: item.qty + 1 } : item,
          )
        } else {
          // Item does not exist, add new item with qty
          updatedItems = [
            ...state.bag.items,
            { ...action.payload.item, qty: 1 },
          ]
        }
        const stateWithItemUpdated = {
          ...state,
          bag: {
            ...state.bag,
            items: updatedItems,
          },
        }
        console.log(`stateWithItemUpdated: `, stateWithItemUpdated)
        return stateWithItemUpdated
      }
      case ACTIONS.ADD_MOVE:
        console.log('Reducer ADD_MOVE:', action)
        state = addMoveToPalInState(
          state,
          action.payload.move,
          action.payload.palIndex,
        )
        return state
      // Change stats:
      // case ACTIONS.UPDATE_HEALTH:
      // console.log('Reducer UPDATE_HEALTH:', action)
      // stateWithHealth = {
      //   ...state,
      //   opponent: {
      //     ...
      //   }
      // }
      // return stateWithHealth
      // break
      case ACTIONS.INCREASE_MOVE_DAMAGE: {
        const { palIndex, moveIndex, additionalDamage } = action.payload
        const updatedState = {
          ...state,
          userParty: state.userParty.map((pal, index) => {
            if (index === palIndex) {
              return updateMoveOnPal(pal, moveIndex, additionalDamage)
            }
            return pal
          }),
        }
        return updatedState
      }
      case ACTIONS.USE_ITEM:
        console.log('Reducer USE_ITEM:', action)
        // Check for the effect property directly in the payload
        // const { effect } = action.payload;

        // Handle HP effects
        if (action.payload.effect && action.payload.effect.hp) {
          state = healHumanPal(state, action.payload.effect.hp)
        }
        // Example: Handle energy effects
        // if (effect && effect.energy) {
        //   // Assuming you have a function to handle energy increases
        //   state = increaseEnergy(state, effect.energy);
        // }
        // Subtract the item after applying its effect
        state = subtractItem(state, action.payload)
        return state
      case ACTIONS.HEAL_PAL_FULL:
        console.log(
          'Reducer HEAL_PAL_FULL: action (should be later the Pal)',
          action,
        )
        state = setPlayerPalHPToMax(state)
        return state
      case ACTIONS.SWAP_PALS:
        console.log('Reducer SWAP_PALS:', action)
        state = swapPals(
          state,
          action.payload.palToSwap,
          action.payload.palLocation,
          action.payload.palToSwapWith,
          action.payload.palToSwapWithLocation,
          action.payload.player,
        )
        return state
      case ACTIONS.ANIMATION_RUNNING_TOGGLE: {
        console.log(`ANIMATION_RUNNING_TOGGLE case hit:`, action)
        const updatedState = {
          ...state,
          animationFinished: !state.animationFinished,
        }
        return updatedState
      }
      case ACTIONS.TOGGLE_DEBUG:
        console.log('Reducer TOGGLE_DEBUG:', action)

        state = {
          ...state,
          debug: {
            ...(state.debug || {}), // Ensures that state.debug is an object if it was undefined
            isOpen: !(state.debug && state.debug.isOpen), // Correctly toggles isOpen between true and false
          },
        }
        return state
      case ACTIONS.RESET_DATA:
        console.log('Reducer RESET_DATA:', action)
        console.log('resetData: state, newStartingData', state, newStartingData)

        freshData = getFreshStartingData()
        freshData.userData = state.userData
        return freshData
      default:
        console.log('ERROR: Invalid action type. End of Reducer reached')
        return state
    }
  }

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  )
}
