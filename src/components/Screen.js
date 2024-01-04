// different screens
import React from 'react'
// import { SCENES } from "../scenes";
import { SCENES } from '../handlers/sceneHandlers_new'
// All of our scenes are below
import Intro from './scenes/Intro'
import Event from './scenes/Event'
import Shop from './scenes/Shop'
import Rest from './scenes/Rest'
import Reward from './scenes/Reward'
import PackReward from './scenes/PackRewardTemp'
import Convo from './scenes/Convo'
import Battle from './scenes/Battle'
// import Map from "./scenes/Map";
import Map from './map/Map'
import Trans from './scenes/Trans'
import Victory from './scenes/Victory'
import { ACTIONS, useDispatchContext, useStateContext } from '../MainContext'
import ChooseCharacter from './scenes/ChooseCharacter'
import { generateEnemyParty } from '../handlers/Battle/prepareBattle'
import { hikerBrak } from '../consts/party/trainers'
import { cusLog } from '../utils/debugging-utils'
import Results from './scenes/Results'
import GameOver from './scenes/GameOver'
import Boss from './scenes/Boss'
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
    RESULTS,
    PACKREWARD,
    CONVO,
    MINIBOSS,
    BOSS,
    GAMEOVER,
    VICTORY,
  } = SCENES

  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  // const logWithColor = (message, color) => {
  //   console.log(`%c${message}`, `color: ${color}; font-weight: bold;`);
  // };

  // const levelToSet = gameData.curScene.scene;
  const levelToSet = contextualState.current.scene.screen

  // console.log(`levelToSet is:`, levelToSet)
  cusLog(`levelToSet is: ${levelToSet}`, 'level', undefined, levelToSet)

  switch (levelToSet) {
    case TRANSITION:
      console.log('((screen: transition)')
      return <Trans gameData={gameData} dispatch={dispatch} />
    case INTRO:
      console.log('(screen: intro)')
      // return <GameOver />
      return <Intro dispatch={dispatch} />
    case CHOOSECHARACTER:
      console.log('(screen: choosecharacter )')

      return <ChooseCharacter />
    case SHOP:
      console.log('(screen: shop )')
      return <Shop gameData={gameData} dispatch={dispatch} />
    case MAP:
      console.log('(screen: map )')

      return <Map />
    // return <Map gameData={gameData} dispatch={dispatch} map={map} />;
    case EVENT:
      console.log('(screen: event )')
      return <Event gameData={gameData} dispatch={dispatch} />
    case REST:
      console.log('(screen: rest)')
      return <Rest  />
      case RESULTS:
        console.log('(screen: results)') 
      return <Results />
    case REWARD:
      console.log('(screen: reward)')
      return (
        <Reward
          gameData={gameData}
          dispatch={dispatch}
          randomizedVal={Math.random()}
        />
      )
    case PACKREWARD:
      console.log('(screen: PackReward)')
      return <PackReward gameData={gameData} dispatch={dispatch} />
    case CONVO:
      console.log('(screen: Convo)')
      return <Convo gameData={gameData} dispatch={dispatch} />
    case BATTLE:
      console.log('(screen: battle)')
      return <Battle gameData={gameData} dispatch={dispatch} />
    case MINIBOSS:
      console.log('(screen: miniboss)')
      return <Battle gameData={gameData} dispatch={dispatch} />
    case BOSS:
      console.log('screen: boss')
      // Do regular bettle or boss?
      // return <Battle gameData={gameData} dispatch={dispatch} />
      return <Battle gameData={gameData} dispatch={dispatch} />

      // return <Boss gameData={gameData} dispatch={dispatch} />
    case GAMEOVER:
      console.log('screen: game over')
      // return <GAMEOVER gameData={gameData} dispatch={dispatch} />
      return <GameOver />
      // return <div>`game over`</div>
    case VICTORY:
      console.log('screen: victory')
      return <Victory gameData={gameData} dispatch={dispatch} />
    default:
      console.log(
        'screen: no scene (Screen Case) selected. Your _levelToSet_ was',
        levelToSet,
      )
      return (
        <h1>
          404 Yo. Something went wrong with selecting a Screen to display.
          likely something related to the switch case, dawg.Your _levelToSet_
          was: {levelToSet}
        </h1>
      )
  }
}

export default Screen
