import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import { map } from "./consts/mapGenerator";
import { startingData } from "./consts/consts";
import reducer from "./reducer";
import { ACTIONS } from "./actions";

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch({
      type: ACTIONS.SET_SCENE,
      payload: {
        enemySeed: Math.random(),
        atkSeed: Math.random(),
        beginBattleSeed: Math.random(),
        startingHandCount: 3,
      },
    });
  };
  console.log(`[App.js Rendered]`);

  const { health, energy } = gameData.hero;
  const healthBarCount = health / 4;
  const heartEmoji = `❤️`;

  return (
    <div className="App">
      <div>
        <h3 style={{ textAlign: "center" }}>
          {heartEmoji.repeat(healthBarCount)}
        </h3>
        <h3>
          {`Hero: 💞${health}HP 🧪${energy} Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
        </h3>
      </div>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      <button onClick={loadNextLevel}>Next Level</button>
    </div>
  );
}
