import React, { useState } from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
// import { SCENES } from '../../scenes'
import { allTrainers, bossBarry } from '../../consts/party/trainers'
import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'
import { MoltenScale } from '../../consts/pals/pals'
import {
  battleConfig,
  bossConfig,
  eventConfig,
  restConfig,
} from '../../consts/level/levelConfigs'

function SimpleLevelList({ levels, onOptionSelected }) {
  //   const [currentLevelId, setCurrentLevelId] = useState(1)
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const goToBoss = () => {
    console.log('goToBoss MoltenScale')
    //add in the logic to send to the boss level
    // const loadNextLevel = () => {
    console.log(`func: loadNextLevel()`)

    const nextSceneState = updateScene(state, {
      screen: SCENES.BATTLE,
      details: bossConfig,
    })
    const nextLevelState = updateLevel(nextSceneState, 1)
    dispatch({
      payload: nextLevelState,
      type: ACTIONS.UPDATE_GAMEDATA,
    })
    // }
  }

  const changeLevel = (level, option) => {
    const selectedTrainer = randomlySelectTrainer(allTrainers)
    console.log(`selectedTrainer`, selectedTrainer, allTrainers)
    console.table(selectedTrainer)
    console.log(`level, option`, level, option)
    switch (option.scene) {
      case SCENES.BATTLE:
        handleChangeLevel(state, {
          screen: SCENES.BATTLE,
          details: battleConfig(),
        })
        break
      case SCENES.REST:
        handleChangeLevel(state, {
          screen: SCENES.REST,
          details: restConfig,
        })
        break
      case SCENES.EVENT:
        handleChangeLevel(state, {
          screen: SCENES.EVENT,
          details: eventConfig,
        })
        break
        case SCENES.BOSS:
        handleChangeLevel(state, {
          screen: SCENES.BOSS,
          details: bossConfig,
        })
    } 
  }

  const handleChangeLevel = (passedInState, payload) => {
    console.log(`handleChangeLevel payload: `, payload)
    dispatch({
      type: ACTIONS.CHANGE_LEVEL,
      payload: {
        screen: payload.screen,
        details: payload.details,
      },
    })
    dispatch({
      type: ACTIONS.CHANGE_SCENE,
      payload: {
        screen: payload.screen,
        details: payload.details,
      },
    })
  }
  const handleOptionClick = (level, option) => {
    // possibly check if we can advance
    // if (levelId < levels.length) {
    console.warn(`handleOptionClick: level,  option`, level, option)
    changeLevel(level, option)
    // }

    // const nextLevelId = levelId < levels.length ? levelId + 1 : levelId
    // setCurrentLevelId(nextLevelId)
  }

    // Boss level card
  // const bossLevelCard = () => {
  //   const bossLevel = levels[levels.length - 1] // Assuming the boss level is the last one
  //   return (
  //     <div
  //       className={`flex flex-col rounded shadow p-2 mb-1 text-xs ${
  //         bossLevel.id === state.current.mapLevel + 1
  //           ? 'border-l-4 border-red-500 bg-gray-800'
  //           : 'bg-gray-700'
  //       }`}
  //     >
  //       {/* <p className="font-bold">Boss Level {bossLevel.id}</p> */}
  //       <div className="flex justify-between items-center">
  //         {/* <p>{bossLevel.name}</p> */}
  //         <button
  //           className={`px-2 py-1 rounded ${
  //             bossLevel.id === state.current.mapLevel + 1
  //               ? 'bg-red-600 hover:bg-red-700'
  //               : 'bg-gray-600 cursor-not-allowed'
  //           }`}
  //           onClick={() => {
  //             if (bossLevel.id === state.current.mapLevel + 1) {
  //               // changeLevel()
  //               goToBoss()
  //             }
  //           }}
  //           disabled={bossLevel.id !== state.current.mapLevel + 1}
  //         >
  //           Challenge Boss
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="container mx-auto p-1 bg-gray-900 text-white">
      {[...levels].reverse().map((level) => (
        <div
          key={level.id}
          className={`flex flex-col rounded shadow p-2 mb-1 text-xs ${
            // level.id === currentLevelId
            level.id === state.current.mapLevel + 1
              ? 'border-l-4 border-blue-500 bg-gray-800'
              : 'bg-gray-700'
          }`}
        >
          <div className="font-semibold mb-1">{level.title}</div>
          {/* {level.id === currentLevelId && ( */}
          {level.id === state.current.mapLevel + 1 && (
            <div className="flex justify-between">
              {level.options.map((option) => (
                <button
                  key={option.id}
                  className="flex-1 text-center bg-blue-600 text-white rounded p-1 mx-1 hover:bg-blue-700 focus:outline-none"
                  onClick={() => handleOptionClick(level, option)}
                >
                  {option.description}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SimpleLevelList
