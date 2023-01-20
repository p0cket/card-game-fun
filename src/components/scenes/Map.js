import React from "react"
import { setSceneAction } from "../../actions"
const Map = ({ gameData, dispatch, map }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }

  // const mapPortion = map.slice(3)

  const currentIndex = gameData.curScene.lvl

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
      {/* <div style={mapContainerStyle}> {printedMap(mapExample)}</div> */}

      <div>
        <div style={{ padding: "20px 200px" }}>
          {map.map((lvlName, index) => {
            let style = {}
            if (index < currentIndex) {
              style.textDecoration = "line-through"
              style.color = "gray"
            } else {
              style.padding = "10px"
            }
            if (lvlName === "battle") {
              style.color = "blue"
            } else if (lvlName === "reward") {
              style.color = "green"
            } else if (lvlName === "boss") {
              style.color = "red"
            }
            return (
              <span style={style}>
                {lvlName}
                {" -> "}{" "}
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}
  // const printedMap = (oneMap) => {
  //   return oneMap.map(row => {
  //     <div>r</div>
  //   })
  // }

  // const mapContainerStyle = {
  //   display: "flex",
  //   width: "20px",
  //   height: "20px",
  // }
  // const mapRowStyle = {
  //   display: "flex",
  //   width: "20px",
  //   height: "20px",
  //   padding: "20px"
  // }

  // const mapElementStyle = {
  //   width: "20px",
  //   height: "20px",
  //   padding: "20px",
  //   color: 'blue'

  // }

  // const printedMap = (oneMap) => {
  //   return oneMap.map((row) => {
  //     return (
  //       <div style={mapRowStyle}>
  //         {row.map((place) => {
  //           // return <div style={mapElementStyle}>{place}</div>
  //           return <div style={mapElementStyle}>{place}</div>

  //         })}
  //       </div>
  //     )
  //   })
  // }


export default Map
