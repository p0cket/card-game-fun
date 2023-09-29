import React, { useState } from "react";
import Screen from "./components/Screen";
import { useReducer } from "react";
import { map } from "./consts/mapGenerator";
import { startingData } from "./consts/consts";
import reducer from "./reducer";
import { useDispatchContext, useStateContext } from "./MainContext";
import "./scanlines.css";
import "./styles.css";
import "./index.css";
// import { motion } from "framer-motion/dist/framer-motion"

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);
  // const [screen, setScreen] = useState(null)

  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();
  console.log(
    `[App.js ContextualState and ContextualDispatch]`,
    contextualState,
    contextualDispatch
  );

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
      <Screen gameData={gameData} dispatch={dispatch} map={map}  />
    </div>
    // #TODO: Test out why tailwind is broken here
    // <h1 className="text-3xl font-bold underline">Hello world!</h1>
  );
}
