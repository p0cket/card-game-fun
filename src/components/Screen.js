// different screens
import React from 'react';
import { SCENES } from '../scenes';
// All of our scenes are below
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

  const { INTRO, BATTLE, SHOP, EVENT, REST, MINIBOSS, BOSS, GAMEOVER } = SCENES;

  switch (levelToSet) {
    case INTRO:
      return <Intro />;
    case BATTLE:
      console.log("(battle Screen)");
      return (
        <Battle
          gameData={gameData}
          dispatch={dispatch}
        />
      );
    case SHOP:
      console.log("shopLogic");
      return <Shop />;
    case EVENT:
      console.log("eventLogic");
      return <Event />;
    case REST:
      console.log("restLogic");
      return <Rest />;
    case MINIBOSS:
      console.log("minibossLogic");
      return <MiniBoss />;
    case BOSS:
      console.log("bossLogic");
      return <div>`bossLogic`</div>;
    case GAMEOVER:
        console.log("game over");
        return <div>`game over`</div>;
    default:
      console.log("no scene selected");
      return <>404 Yo</>
  }
};

// Screen.propTypes = {
//   gameData: PropTypes.object,
//   dispatch: PropTypes.func,
//   map: PropTypes.array
// };

export default Screen;
