/* eslint-disable indent */
import React, { useContext } from 'react'
import './index.css'
// import { startingData } from "./consts/consts";
import { newStartingData } from './consts/startingData'

const stateContext = React.createContext()
const dispatchContext = React.createContext()

export function useStateContext() {
  return useContext(stateContext)
}

export function useDispatchContext() {
  return useContext(dispatchContext)
}

export const ACTIONS = {
  SET_SCENE: 'SET_SCENE',
  SET_HEALTH: 'SET_HEALTH',
  SET_GOLD: 'SET_GOLD',
  SET_LEVEL: 'SET_LEVEL',
  SET_INVENTORY: 'SET_INVENTORY',
  ATTACK: 'ATTACK',
  UPDATEGAMEDATA: 'UPDATEGAMEDATA',
}

export const MainProvider = ({ children }) => {
  // Here we initialize the state with the startingData
  // const initialState = { startingData };
  // Here is the reducer function
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const [state, dispatch] = React.useReducer(reducer, newStartingData)

  function reducer(state, action) {
    console.log(`reducer HIT`)
    switch (action.type) {
      case ACTIONS.UPDATEGAMEDATA:
        return { ...state, ...action.payload }
      case ACTIONS.SET_SCENE:
        return { ...state, scene: action.payload }
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
