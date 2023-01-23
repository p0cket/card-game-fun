import React from "react"
import { setSceneAction } from "../../actions"
const Map = ({ gameData, dispatch, map }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }

  const mapPortion = map.slice(1)

  const currentIndex = gameData.curScene.lvl
  const nextLevels = map.slice(currentIndex + 1 , currentIndex + 6)

  return (
    <>
      <div style={{ fontFamily: "Silkscreen" }}>
        <h1>- The {gameData.curScene.scene} -</h1>
        <div>
          <h3> Next Level: {map[currentIndex + 1]}</h3>
          <button onClick={loadNextLevel}>Next Level</button>

          <h3> Next 5 Levels:</h3>
          {nextLevels.map((lvlName, index) => {
            return (
              <span>
                {` ${lvlName}`}
                {"→ "}{" "}
              </span>
            )
          })}
          <h3>All Levels:</h3>
          <div
            style={{
              padding: "20px 200px",
              display: "flex",
              justifyContent: "column",
              flexWrap: "wrap",
              // fontFamily: "Silkscreen",
            }}
          >
            {mapPortion.map((lvlName, index) => {
              let style = {}
              if (index < currentIndex) {
                style.textDecoration = "line-through"
                style.color = "gray"
              } else {
                style.paddingRight = "10px"
              }
              if (lvlName === "battle") {
                style.color = "blue"
              } else if (lvlName === "reward") {
                style.color = "green"
              } else if (lvlName === "boss") {
                style.color = "red"
              }
              return (
                // <div style=padding>
                <span style={{ ...style, padding: "5px" }}>
                  <img
                    src="/eventImages/questionMark.png"
                    style={{ width: "20px", height: "20px" }}
                    alt="level icon"
                  />
                  <span>
                    {` ${lvlName}`}
                    {"→ "}{" "}
                  </span>
                </span>
                // </div>
              )
            })}
          </div>
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
