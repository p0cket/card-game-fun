// different screens
import React from "react";
// import { SCENES } from "../scenes";
import { SCENES } from "../handlers/sceneHandlers_new";
// All of our scenes are below
import Intro from "./scenes/Intro";
import Event from "./scenes/Event";
import Shop from "./scenes/Shop";
import Rest from "./scenes/Rest";
import Reward from "./scenes/Reward";
import PackReward from "./scenes/PackRewardTemp";
import Convo from "./scenes/Convo";
import Battle from "./scenes/Battle";
// import Map from "./scenes/Map";
import Map from "./map/Map";
import Trans from "./scenes/Trans";
import Victory from "./scenes/Victory";
import { ACTIONS, useDispatchContext, useStateContext } from "../MainContext";
import ChooseCharacter from "./scenes/ChooseCharacter";
import { generateEnemyParty } from "../handlers/Battle/prepareBattle";
import { hikerBrak } from "../consts/party/trainers";
// import MiniBoss from "./scenes/MiniBoss";

const Screen = ({ gameData, dispatch, map }) => {
  const {
    TRANSITION,
    INTRO,
    CHOOSECHARACTER,
    BATTLE,
    SHOP,
    MAP,
    EVENT,
    REST,
    REWARD,
    PACKREWARD,
    CONVO,
    MINIBOSS,
    BOSS,
    GAMEOVER,
    VICTORY,
  } = SCENES;

  console.log(`levelToSet is:`, levelToSet);

  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();

  // const levelToSet = gameData.curScene.scene;
  const levelToSet = contextualState.current.scene;

  switch (levelToSet) {
    case TRANSITION:
      console.log("transition Screen Case");
      return <Trans gameData={gameData} dispatch={dispatch} />;
    case INTRO:
      // return <Intro dispatch={dispatch} />;
      return <Intro dispatch={dispatch} />;
    case CHOOSECHARACTER:
      return <ChooseCharacter />;
    case SHOP:
      console.log("shop Screen Case");
      return <Shop gameData={gameData} dispatch={dispatch} />;
    case MAP:
      console.log("map Screen Case");


      // If the scene is a battle, add a new opponent to the opponentParty

      const stateWithTrainers = contextualState.game.map[
        contextualState.current.level
      ].map((option, index) => {
        if (option === SCENES.BATTLE) {
          // load new
          const stateWithEnemyParty = generateEnemyParty(
            contextualState,
            hikerBrak
          );
          contextualDispatch({
            type: ACTIONS.UPDATEGAMEDATA,
            payload: stateWithEnemyParty,
          });

          console.log(
            `[!]state after adding an opponent:`,
            contextualState,
            contextualState.opponentParty
          );
        }
      });
      return <Map />;
    // return <Map gameData={gameData} dispatch={dispatch} map={map} />;
    case EVENT:
      console.log("event Screen Case");
      return <Event gameData={gameData} dispatch={dispatch} />;
    case REST:
      console.log("rest Screen Case");
      return <Rest gameData={gameData} dispatch={dispatch} />;
    case REWARD:
      console.log("reward Screen Case");
      return (
        <Reward
          gameData={gameData}
          dispatch={dispatch}
          randomizedVal={Math.random()}
        />
      );
    case PACKREWARD:
      console.log("PackReward Screen Case");
      return <PackReward gameData={gameData} dispatch={dispatch} />;
    case CONVO:
      console.log("Convo Screen Case");
      return <Convo gameData={gameData} dispatch={dispatch} />;
    case BATTLE:
      console.log("(battle Screen)");
      return <Battle gameData={gameData} dispatch={dispatch} />;
    case MINIBOSS:
      console.log("miniboss Screen Case");
      return <Battle gameData={gameData} dispatch={dispatch} />;
    case BOSS:
      console.log("boss Screen Case");
      return <Battle gameData={gameData} dispatch={dispatch} />;
    case GAMEOVER:
      console.log("game over Screen Case");
      // return <GAMEOVER gameData={gameData} dispatch={dispatch} />
      return <div>`game over`</div>;
    case VICTORY:
      console.log("victory Screen Case");
      return <Victory gameData={gameData} dispatch={dispatch} />;
    default:
      console.log("no scene (Screen Case) selected");
      return (
        <h1>
          404 Yo. Something went wrong with selecting a Screen to display.
          likely something related to the switch case, dawg.
        </h1>
      );
  }
};

// Screen.propTypes = {
//   gameData: PropTypes.object,
//   dispatch: PropTypes.func,
//   map: PropTypes.array
// };

export default Screen;
