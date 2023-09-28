import React from "react";
import { setSceneAction } from "../../actions";
import ThemedButton from "../common/ThemedButton";
const Map = ({ gameData, dispatch, map }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch(setSceneAction());
  };

  const mapPortion = map.slice(1);

  const currentIndex = gameData.curScene.lvl;
  const nextLevels = map.slice(currentIndex + 1, currentIndex + 6);

  return (
    <>
      <div
        style={{
          fontFamily: "Silkscreen",
          // color: "white",
          display: "flex",
          flexDirection: "column",
          backgroundPosition: "center",
        }}
      >
        <h1 style={{ color: "white" }}>- The {gameData.curScene.scene} -</h1>
        <div style={{ color: "gray" }}>
          <h3 > Next Level: {map[currentIndex + 1]}</h3>
          <h1 className=" pr-20 text-blue-300">DOes tailwind work</h1>
          <ThemedButton text={`Next level`} onClick={loadNextLevel} />
          {/* <button onClick={loadNextLevel}>Next Level</button> */}

          {/* <h3> Next 5 Levels:</h3>
          <h3>
            {nextLevels.map((lvlName, index) => {
              return (
                <span style={{ fontSize: "30px" }}>
                  {` ${lvlName}`}
                  {"→ "}{" "}
                </span>
              );
            })}
          </h3> */}

          {/* <h3>All Levels:</h3>
          <div
            style={{
              padding: "20px 200px",
              display: "flex",
              justifyContent: "column",
              flexWrap: "wrap",
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
                <div
                  className="map-container"
                  style={{
                    ...style,
                    padding: "10px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <span>
                    <img
                      src="/eventImages/questionMark.png"
                      style={{ width: "20px", height: "20px" }}
                      alt="level icon"
                    />
                    <span>
                      {` ${lvlName}`} {"→ "}{" "}
                    </span>
                  </span>
                </div>
              )
            })}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Map;
