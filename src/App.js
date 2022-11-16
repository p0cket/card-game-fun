import React from "react"
import "./styles.css"
import Screen from "./components/Screen"
import { useReducer } from "react"
import { map } from "./consts/mapGenerator"
import { startingData } from "./consts/consts"
import reducer from "./reducer"
import { motion } from "framer-motion/dist/framer-motion"

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData)

  // Uncomment this, the import, and button below for control to always load another level
  // const loadNextLevel = () => {
  //   console.log(`loadNextLevel`);
  //   dispatch(setSceneAction());
  // };
  // console.log(`[App.js Rendered]`);

  const { health, energy } = gameData.hero
  const healthBarCount = health / 4
  const heartEmoji = `❤️`

  return (
    <div className="App">
      <div>
        <motion.h1
          initial={{ y: -300 }}
          animate={{ fontSize: 200, color: "#ff2994" , x: 0, y: 0}}
        >
          {/* <motion.h1 initial={{x: 100, y: 100 }} animate={{ fontSize: 200, color: "#ff2994", x: 10, y: 10 }}> */}
          FramerMotion
        </motion.h1>
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
  )
}
