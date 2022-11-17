import React from "react"
import "./styles.css"
import Screen from "./components/Screen"
import { useReducer } from "react"
import { map } from "./consts/mapGenerator"
import { startingData } from "./consts/consts"
import reducer from "./reducer"
// import { motion } from "framer-motion/dist/framer-motion"

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData)

  // Uncomment this, the import, and button below for control to always load another level
  // const loadNextLevel = () => {
  //   console.log(`loadNextLevel`);
  //   dispatch(setSceneAction());
  // };
  // console.log(`[App.js Rendered]`);

  return (
    <div className="App">
      <div>
        {/* <motion.h1
          initial={{ y: -300 }}
          animate={{ fontSize: 200, color: "#ff2994" , x: 0, y: 0}}
        >
          FramerMotion
        </motion.h1> */}
        <h3>
          {` 💰${gameData.gold}Gold  Level  
        ${gameData.curScene.lvl} -ACT${gameData.curScene.act}- `}
        </h3>
      </div>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      {/* <button onClick={loadNextLevel}>Next Level</button> */}
    </div>
  )
}
