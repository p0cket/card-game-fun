import React, { useContext } from "react";
import "./index.css";

const stateContext = React.createContext();
const dispatchContext = React.createContext();

export function useStateContext() {
  return useContext(stateContext);
}

export function useDispatchContext() {
  return useContext(dispatchContext);
}

export const ACTIONS = {
  SET_SCENE: "SET_SCENE",
  SET_HEALTH: "SET_HEALTH",
  SET_GOLD: "SET_GOLD",
  SET_LEVEL: "SET_LEVEL",
  SET_INVENTORY: "SET_INVENTORY",
};

export const MainProvider = ({ children }) => {
  //initial state
  const initialState = {
    health: 100,
    gold: 0,
    level: 1,
    scene: "town",
    inventory: [],
  };

  //Here is the reducer function
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_SCENE:
        return { ...state, scene: action.payload };
      case ACTIONS.SET_HEALTH:
        return { ...state, health: action.payload };
      case ACTIONS.SET_GOLD:
        return { ...state, gold: action.payload };
      case ACTIONS.SET_LEVEL:
        return { ...state, level: action.payload };
      case ACTIONS.SET_INVENTORY:
        return { ...state, inventory: action.payload };
      default:
        return state;
    }
  }

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};
