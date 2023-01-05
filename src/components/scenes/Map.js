import React from "react"
import { setSceneAction } from "../../actions"
const Map = ({ gameData, dispatch, map }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }

  const mapPortion = map.slice(3)
  return (
    <>
      <h1>-</h1>
      <button onClick={loadNextLevel}>Next Level</button>
      <h1>The {gameData.curScene.scene}</h1>
      <div>
        It is a long way to the top, you can do this! (But you can't, because it
        is currently impossible)
      </div>
      <h2>Heres a list of whats coming:</h2>
      <div>
        {mapPortion.map((lvl) => {
          return <h3>{lvl}</h3>
        })}
      </div>
    </>
  )
}

export default Map
