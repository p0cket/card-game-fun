import PropTypes from 'prop-types';
import React from 'react';
// different screens
import Intro from "./Intro";
import Event from "./Event";
import Shop from "./Shop";
import Rest from "./Rest";
import Battle from "./Battle";
import MiniBoss from "./MiniBoss";
import { ACTIONS } from "../App";

const Screen = ({ gameData, dispatch, map }) => {
  const curLevelNum = gameData.curScene.lvl;
  const levelToSet = map[curLevelNum];
  console.log(`levelToSet`,levelToSet)

  //the time you should be using useEffect is when you're reacting to 
// battle should start on click, so it shouldn't use useEffect()
  // useEffect(() => {
  //   if (levelToSet === 'battle') {
  //     dispatch({ type: ACTIONS.BEGIN_BATTLE, payload: "start", enemy: decideEnemy() });
  //   }
  //   // it'll do it every time levelToSet is changed and dispatch is changed (it won't be though)
  // }, [levelToSet, dispatch]);
  

  switch (levelToSet) {
    case "intro":
      return <Intro />;
    case "battle":
      console.log("battleLogic");
      //begin battle logic
      //decide enemy here and add to dispatch

      // any state change causes a component to rerender will cause this to dispatch again,
      // which is inefficient and causes a loop
      // because I'm sending state, (gameData) to every component, every component will be re-rendered every 
      // time state (gameData) is changed 
      // dispatch({ type: ACTIONS.BEGIN_BATTLE, payload: "start" });
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

Screen.propTypes = {
  gameData: PropTypes.object,
  dispatch: PropTypes.func,
  map: PropTypes.array
};

export default Screen;
