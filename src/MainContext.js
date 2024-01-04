/* eslint-disable indent */
import React, { useContext } from 'react'
import './index.css'
import { newStartingData } from './consts/startingData'
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
} from './handlers/state/attackStateHandlers'
import {
  logLevelsCompletedData,
  setMaxPalEnergy,
  setPalEnergyToMax,
  setPalHPToMax,
} from './handlers/state/levelStateHandlers'

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
  // Phases:
  PAY_PHASE: 'PAY_PHASE',
  DAMAGE_PHASE: 'DAMAGE_PHASE',
  STATUS_PHASE: 'STATUS_PHASE',
  CLEANUP_PHASE: 'CLEANUP_PHASE',
  END_PHASE: 'END_PHASE',
}

export const MainProvider = ({ children }) => {
  // Here we initialize the state with the startingData
  // const initialState = { startingData };
  // Here is the reducer function
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const [state, dispatch] = React.useReducer(reducer, newStartingData)

  function reducer(state, action) {
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
      stateWithAttack

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
        // here is the logic for changing to battle that
        // is refactored. fix it.
        console.log(`CHANGE_SCENE. action.payload: `, action.payload)

        nextSceneState = updateScene(state, {
          screen: action.payload.screen,
          details: action.payload.details,
        })
        nextLevelState = updateLevel(nextSceneState, 1)
        console.log(
          `nextLevelState after updateLevel,  action.payload: `,
          nextLevelState,
          action.payload,
        )
        // setup our opponent
        console.log(
          'action.payload.details nextLevelState:',
          action.payload.details,
          nextLevelState,
        )
        // here is where we setup opponent.
        // for a boss this needs to be modified or
        // we need bosses that are trainers.
        nextLevelState = setupOpponent(
          nextLevelState,
          action.payload.details.trainer,
        )
        switch (action.payload.screen) {
          case SCENES.BATTLE:
          case SCENES.BOSS:
            // set the pal to max, probably should be setEnemyPalEnergyToMax,
            // or pass in opponent/index as a param.
            nextLevelState = logLevelsCompletedData(nextLevelState)
            nextLevelState = setEnemyPalEnergyToMax(nextLevelState)
            nextLevelState = setEnemyPalHPToMax(nextLevelState)
            break // This will prevent fall-through and continue with the rest of the function after the switch
          // Other cases can be added here as needed
        }

        console.log(`nextLevelState after setupOpponent: `, nextLevelState)
        return nextLevelState
      case ACTIONS.SHOW_ATTACK:
        return {
          ...state,
          popup: {
            ...state.popup,
            isOpen: true,
            type: 'attack',
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
        payState = payPhase(state, action.payload)
        return payState
      case ACTIONS.DAMAGE_PHASE:
        console.log('Reducer DAMAGE_PHASE: action&state', action, state)
        dmgState = dmgPhase(state, action.payload)
        return dmgState
      case ACTIONS.STATUS_PHASE:
        console.log('Reducer STATUS_PHASE: action&state', action, state)
        statusState = statusPhase(state, action.payload)
        return statusState
      case ACTIONS.CLEANUP_PHASE:
        console.log('Reducer CLEANUP_PHASE: action&state', action, state)
        cleanupState = cleanupPhase(state, action.payload)
        return cleanupState
      case ACTIONS.END_PHASE:
        console.log('Reducer END_PHASE: action&state', action, state)
        endState = endPhase(state, action.payload)
        return endState
      case ACTIONS.CHANGE_DIALOG:
        console.log('Reducer CHANGE_DIALOG:', action)
        return {
          ...state,
          dialog: {
            ...state.dialog,
            isOpen: true,
            type: action.payload.type, // title: action.payload.title, // message: action.payload.message, // options: action.payload.options,
          },
        }

      case ACTIONS.ADD_RUNE:
        // Maybe we'll have both an item and effect in
        // the rune payload, so if theres a permanent
        // effect we can handle it separately
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
      case ACTIONS.ADD_ITEM:
        console.log('Reducer ADD_ITEM:', action)
        stateWithItem = {
          ...state,
          bag: {
            ...state.bag,
            items: [...state.bag.items, action.payload.item],
          },
        }
        return stateWithItem
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
      case ACTIONS.USE_ITEM:
        console.log('Reducer USE_ITEM:', action)
        // item's health effect. grab it
        // effect: { hp: 20 },
        // item.effect
        if (action.payload.contents.effect.hp) {
          state = healHumanPal(state, action.payload.contents.effect.hp)
          state = subtractItem(state, action.payload)
        }
        return state
      case ACTIONS.HEAL_PAL_FULL:
        console.log(
          'Reducer HEAL_PAL_FULL: action (should be later the Pal)',
          action,
        )
        state = setPlayerPalHPToMax(state)
        return state
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
