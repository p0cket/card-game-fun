import React from "react";
import "./styles.css";
import Screen from "./components/Screen";
import { useReducer } from "react";
import { map } from "./consts/mapGenerator";
import { startingData } from "./consts/consts";
import reducer from "./reducer";
import { useStateContext } from "./MainContext";
import './scanlines.css'
// import { motion } from "framer-motion/dist/framer-motion"

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  // Uncomment this, the import, and button below for control to always load another level
  // const loadNextLevel = () => {
  //   console.log(`loadNextLevel`);
  //   dispatch(setSceneAction());
  // };
  // console.log(`[App.js Rendered]`);

  const contextualState = useStateContext();
  console.log(`[App.js ContextualState]`, contextualState);

  return (
    <div
      className="App scanlines"
      style={{
        // backgroundImage: "url(/backgrounds/gridBGlight.png)",
        backgroundImage: "url(/backgrounds/gridBGdark.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 500px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      {/* <button onClick={loadNextLevel}>Next Level</button> */}
    </div>
  );
}
