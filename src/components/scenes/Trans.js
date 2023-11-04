import React from "react"
import { motion } from 'framer-motion'
import {
  // transitionSceneAction,
  setSceneAction,
} from "../../actions"
const Trans = ({ gameData, dispatch, dialog, options }) => {
  const loadNextLevel = () => {
    dispatch(setSceneAction())
  }
  // TODO if another transition scene is warranted, send to that transition scene
  //else, send them to the next scene in the map
  // const loadTransitionScene = () => {
  //   console.log(`loadTransitionScene`)
  //   dispatch(transitionSceneAction())
  // }

  return (
    <>
      <div style={{ fontFamily: "Silkscreen" }}>
        <br />
        <h1>Results:</h1>
        <motion.div
        style={{ padding: "30px", fontSize: "20px"}}
          animate={{
            rotate: 360,
            borderRadius: ["50% 50%", "2% 50%"],
            x: 75,
          }}
          initial={{
            x: -75,
          }}
          transition={{
            flip: Infinity,
            duration: 1,
            ease: "easeInOut",
          }}
        >
          Success!!!
        </motion.div>
        <h1 style={{ padding: "30px" }}>
          {gameData.curEvent.resultDialogTitle
            ? gameData.curEvent.resultDialogTitle
            : "No dialog title found"}
        </h1>
        <div>
          <div>
            {gameData.curEvent.resultDialog
              ? gameData.curEvent.resultDialog
              : "No dialog found"}
          </div>
        </div>
        {options ? (
          options
        ) : (
          // <button onClick={loadTransitionScene}>Next Level</button>
          <button onClick={() => loadNextLevel()}>Next Level</button>
        )}
      </div>
    </>
  )
}

export default Trans
