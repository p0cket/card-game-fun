import React from "react"
import { setSceneAction } from "../../actions"
const Map = ({ gameData, dispatch, map }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }

  const currentIndex = gameData.curScene.lvl
  // const mapPortion = map.slice(3)

  return (
    <>
      <h1>-</h1>
      <button onClick={loadNextLevel}>Next Level</button>
      <h1>The {gameData.curScene.scene}</h1>
      <div>
        It is a long way to the top, you can do this! (But you can't, because it
        is currently impossible)
      </div>
      <h2>Heres the list of levels:</h2>
      <div>
        <div>
          {map.map((lvlName, index) => {
            let style = {}
            if (index < currentIndex) {
              style.textDecoration = "line-through"
              style.color = "gray"
            }else {
              style.padding = '10px';
            }
            if (lvlName === "battle") {
              style.color = "blue"
            } else if (lvlName === "reward") {
              style.color = "green"
            } else if (lvlName === "boss") {
              style.color = "red"
            }
            return <div style={style}>{lvlName}</div>
          })}
        </div>
      </div>
    </>
  )
}

export default Map
