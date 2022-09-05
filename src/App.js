import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import { map } from "./consts/mapGenerator";
import { startingData } from "./consts/consts";
import reducer from "./reducer";
import { ACTIONS } from "./actions";
//antd
import { PageHeader, Button } from "antd";
import "antd/dist/antd.css";


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
        // enemiesArr, determined by level
      },
    });
  };
  console.log(`[App.js Rendered]`);

  const { health, energy } = gameData.hero;
  const healthBarCount = health / 4;
  const heartEmoji = `❤️`;

  return (
    <div className="App">
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title={`One Wish`}
        subTitle={`Hero: 💞${health}HP 🧪${energy} Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
      />
      <div>
        {/*  //A repeating healthbar. I can do better
         <h3 style={{ textAlign: "center" }}>
          {heartEmoji.repeat(healthBarCount)}
        </h3> */}
        {/* <h3>
          {`Hero: 💞${health}HP 🧪${energy} Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
        </h3> */}
      </div>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      <Button onClick={loadNextLevel} type="primary">Next Level</Button>
    </div>
  );
}
