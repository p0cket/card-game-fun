/* eslint-disable indent */
import React, { useContext } from 'react'
import './index.css'
// import { startingData } from "./consts/consts";
import { newStartingData } from './consts/startingData'
import { cusLog } from './utils/debugging-utils'
import { payPhase } from './handlers/attack/payPhase'
import { dmgPhase } from './handlers/attack/dmgPhase'
import { statusPhase } from './handlers/attack/statusPhase'
import { cleanupPhase } from './handlers/attack/cleanupPhase'
import { endPhase } from './handlers/attack/endPhase'
import { updateLevel, updateScene } from './handlers/sceneHandlers_new'
import { SCENES } from './scenes'

const stateContext = React.createContext()
const dispatchContext = React.createContext()

export function useStateContext() {
  return useContext(stateContext)
}

export function useDispatchContext() {
  // const dispatch = useContext(dispatchContext)
  // return function(action){
  //   console.error(`dispatching check:`, action)
  //   dispatch(action)
  // }
  return useContext(dispatchContext)
}

export const ACTIONS = {
  CHANGE_LEVEL: 'CHANGE_LEVEL',
  CHANGE_SCENE: 'CHANGE_SCENE',

  SET_SCENE: 'SET_SCENE',
  SET_HEALTH: 'SET_HEALTH',
  SET_GOLD: 'SET_GOLD',
  SET_LEVEL: 'SET_LEVEL',
  SET_INVENTORY: 'SET_INVENTORY',
  ATTACK: 'ATTACK',
  UPDATEGAMEDATA: 'UPDATEGAMEDATA',
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
      stateWithProgression

    switch (action.type) {
      case ACTIONS.UPDATEGAMEDATA:
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
        return stateWithProgression
      case ACTIONS.CHANGE_SCENE:
        // if(state.game.player.maxEnergy < 0){
        // }
        if (action.payload.screen === SCENES.BATTLE) {
          state = {
            ...state,
            game: {
              ...state.game,
              player: {
                ...state.game.player,
                energy: state.game.player.maxEnergy,
              },
            },
          }
          // now lets add the current level, or an increment to a
          // varaible. we'll add it in completedLevels
          state = {
            // state.current is this below:
            //   current: {
            // level: 0,
            // act: 1,
            // completedLevels: [],
            ...state,
            current: {
              ...state.current,
              completedLevels: [
                ...state.current.completedLevels,
                [
                  state.current.level,
                  state.current.act,
                  state.current.curEvent,
                  state.current.scene,
                  state.current.incomingLevels,
                ],
              ],
            },
          }
        }

        nextSceneState = updateScene(state, {
          screen: action.payload.screen,
          details: action.payload.details,
        })
        nextLevelState = updateLevel(nextSceneState, 1)
        // dispatch({
        //   payload: nextLevelState,
        //   type: ACTIONS.UPDATEGAMEDATA,
        // })
        return nextLevelState
      case ACTIONS.SHOW_ATTACK:
        return {
          ...state,
          popup: {
            ...state.popup,
            isOpen: true,
            type: 'attack',
            attack: action.payload.attack,
            ourCurrentMon: action.payload.ourCurrentMon,
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
