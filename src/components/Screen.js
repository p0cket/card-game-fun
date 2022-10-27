// different screens
import React from "react";
import { SCENES } from "../scenes";
// All of our scenes are below
import Intro from "./scenes/Intro";
import Event from "./scenes/Event";
import Shop from "./scenes/Shop";
import Rest from "./scenes/Rest";
import Reward from "./scenes/Reward";
import Battle from "./scenes/Battle";
// import MiniBoss from "./scenes/MiniBoss";

const Screen = ({ gameData, dispatch, map }) => {
  const curLevelNum = gameData.curScene.lvl;
  const levelToSet = map[curLevelNum];
  console.log(`levelToSet is:`, levelToSet);

  const {
    INTRO,
    BATTLE,
    SHOP,
    EVENT,
    REST,
    REWARD,
    MINIBOSS,
    BOSS,
    GAMEOVER,
  } = SCENES;

  switch (levelToSet) {
    case INTRO:
      return <Intro />;
    case SHOP:
      console.log("shop Screen Case");
      return <Shop dispatch={dispatch} />;
    case EVENT:
      console.log("event Screen Case");
      return <Event dispatch={dispatch} />;
    case REST:
      console.log("rest Screen Case");
      return <Rest dispatch={dispatch} />;
    case REWARD:
      console.log("reward Screen Case");
      return <Reward gameData={gameData} dispatch={dispatch} />;
    case BATTLE:
      console.log("(battle Screen)");
      return <Battle gameData={gameData} dispatch={dispatch} />;
    case MINIBOSS:
      console.log("miniboss Screen Case");
      // return <MiniBoss />;
      return <Battle gameData={gameData} dispatch={dispatch} />;
    case BOSS:
      console.log("boss Screen Case");
      return <div>`boss Screen Case`</div>;
    case GAMEOVER:
      console.log("game over Screen Case");
      return <div>`game over`</div>;
    default:
      console.log("no scene (Screen Case) selected");
      return <>404 Yo</>;
  }
};

// Screen.propTypes = {
//   gameData: PropTypes.object,
//   dispatch: PropTypes.func,
//   map: PropTypes.array
// };

export default Screen;
