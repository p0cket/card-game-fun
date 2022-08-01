// different screens
import React from 'react'
import Intro from "./Intro";
import Event from "./Event";
import Shop from "./Shop";
import Rest from "./Rest";
import Battle from "./Battle";
import MiniBoss from "./MiniBoss";

const Screen = ({ gameData, dispatch, map }) => {
  const curLevelNum = gameData.curScene.lvl;
  const levelToSet = map[curLevelNum];
  console.log(`levelToSet is:`,levelToSet)

  switch (levelToSet) {
    case "intro":
      return <Intro />;
    case "battle":
      console.log("(battle Screen)");
      return (
        <Battle
          gameData={gameData}
          dispatch={dispatch}
        />
      );
    case "shop":
      console.log("shopLogic");
      return <Shop />;
    case "event":
      console.log("eventLogic");
      return <Event />;
    case "rest":
      console.log("restLogic");
      return <Rest />;
    case "miniboss":
      console.log("minibossLogic");
      return <MiniBoss />;
    case "boss":
      console.log("bossLogic");
      return <div>`bossLogic`</div>;
    default:
      console.log("no scene selected");
  }
};

// Screen.propTypes = {
//   gameData: PropTypes.object,
//   dispatch: PropTypes.func,
//   map: PropTypes.array
// };

export default Screen;
