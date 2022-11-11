import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import { map } from "./consts/mapGenerator";
import { startingData } from "./consts/consts";
import reducer from "./reducer";
// import { setSceneAction } from "./actions";

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  // Uncomment this, the import, and button below for control to always load another level
  // const loadNextLevel = () => {
  //   console.log(`loadNextLevel`);
  //   dispatch(setSceneAction());
  // };
  // console.log(`[App.js Rendered]`);

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
          {`Hero: 💞${health}HP 🧪${energy} Energy 💰${gameData.gold} Gold  [ level TBD, Progression: 
        ${gameData.curScene.lvl} -ACT${gameData.curScene.act}- ]`}
        </h3>
      </div>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      {/* <button onClick={loadNextLevel}>Next Level</button> */}
    </div>
  );
}
