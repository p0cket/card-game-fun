import React from "react"
import { transitionSceneAction } from "../../actions"
const Trans = ({ gameData, dispatch, dialog, options }) => {
  const loadTransitionScene = () => {
    console.log(`loadTransitionScene`)
    dispatch(transitionSceneAction())
  }

  return (
    <>
      <div style={{ fontFamily: "Silkscreen" }}>
        <h1>-</h1>
        <h1>Transitional Scene</h1>
        {/* <h3>{dialog.title ? dialog.title : "No dialog title found"}</h3> */}
        <div>
          {/* We are all like super proud of you. You earned some coins, you're up
          to {gameData.gold} gold now. */}
          {/* {dialog.text ? <div>{dialog.text}</div> : "No dialog text found"} */}
        </div>
        {/* <h3>{"Ready for more?"}</h3> */}
        <h3>
          {/* {dialog.callToAction ? dialog.callToAction : "No call to action text"}{" "} */}
        </h3>
        {options ? (
          options
        ) : (
          <button onClick={loadTransitionScene}>Next Level</button>
        )}
      </div>
    </>
  )
}

export default Trans
