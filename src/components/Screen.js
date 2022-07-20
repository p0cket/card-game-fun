// different screens
import Intro from "./Intro";
import Event from "./Event";
import Shop from "./Shop";
import Rest from "./Rest";
import Battle from "./Battle";
import MiniBoss from "./MiniBoss";
import { ACTIONS } from "../App";

const Screen = ({ gameData, dispatch, map, changeToScene }) => {
  const curLevelNum = gameData.curScene.lvl;
  const levelToSet = map[curLevelNum];

  switch (levelToSet) {
    case "intro":
      return <Intro />;
    case "battle":
      console.log("battleLogic");
      //begin battle logic
      dispatch({ type: ACTIONS.BEGIN_BATTLE, payload: "start" });
      //--
      //   if (!gameData.battle.enemy) {
      //     decideEnemy();
      //     decideEnemyATK();
      //   }
      //--

      return (
        <Battle
          gameData={gameData}
          dispatch={dispatch}
          changeToScene={changeToScene}
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
      return <div>"bossLogic"</div>;
    default:
      console.log("no scene selected");
  }
};

export default Screen;
