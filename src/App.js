import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import { map } from "./components/mapGenerator";
import { startingData } from "./components/consts";
import reducer from "./reducer";
import { ACTIONS } from "./actions";

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch({
      type: ACTIONS.SET_SCENE, payload: {
        enemySeed: Math.random(),
        atkSeed: Math.random(),
        beginBattleSeed: Math.random(),
        startingHandCount: 3
    }})
  };
  console.log(`[App.js Rendered]`);

  return (
    <div className="App">
      <h3>dashboard stuff</h3>
      <h3>
        {`Hero: 💞${gameData.hero.health}HP 🧪${gameData.hero.energy}Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
      </h3>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      <button onClick={loadNextLevel}>Next Level</button>
    </div>
  );
}
