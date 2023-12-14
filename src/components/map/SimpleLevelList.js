import React, { useState } from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { SCENES } from '../../scenes'
import { allTrainers } from '../../consts/party/trainers'
import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
import { updateLevel, updateScene } from '../../handlers/sceneHandlers_new'
// import { hikerBrak } from '../../consts/party/trainers'

function SimpleLevelList({ levels, onOptionSelected }) {
  //   const [currentLevelId, setCurrentLevelId] = useState(1)
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const handleOptionClick = (levelId, optionId) => {
    //   onOptionSelected(levelId, optionId);

    // possibly check if we can advance
    // if (levelId < levels.length) {
    changeLevel()
    // }

    // const nextLevelId = levelId < levels.length ? levelId + 1 : levelId
    // setCurrentLevelId(nextLevelId)
  }
  const goToBoss = () => {
      console.log('goToBoss')
      //add in the logic to send to the boss level
      const loadNextLevel = () => {
        console.log(`func: loadNextLevel()`)
    
        const nextSceneState = updateScene(state, {
          screen: SCENES.BOSS,
          details: null,
        })
        const nextLevelState = updateLevel(nextSceneState, 1)
        dispatch({
          payload: nextLevelState,
          type: ACTIONS.UPDATEGAMEDATA,
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
  const changeLevel = () => {
    const selectedTrainer = randomlySelectTrainer(allTrainers)
    console.log(`selectedTrainer`, selectedTrainer, allTrainers)
    console.table(selectedTrainer)
    handleChangeLevel(state, {
      screen: SCENES.BATTLE,
      details: {
        type: 'trainer',
        trainer: selectedTrainer,
        area: 'tranquil forest',
        difficulty: 'easy',
        refillEnergy: true,
      },
    })
  }

  const bossLevelCard = () => {
    // Boss level card
    const bossLevel = levels[levels.length - 1] // Assuming the boss level is the last one
    return (
      <div
        className={`flex flex-col rounded shadow p-2 mb-1 text-xs ${
          bossLevel.id === state.current.mapLevel + 1
            ? 'border-l-4 border-red-500 bg-gray-800'
            : 'bg-gray-700'
        }`}
      >
        <p className="font-bold">Boss Level {bossLevel.id}</p>
        <div className="flex justify-between items-center">
          <p>{bossLevel.name}</p>
          <button
            className={`px-2 py-1 rounded ${
              bossLevel.id === state.current.mapLevel + 1
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            onClick={() => {
              if (bossLevel.id === state.current.mapLevel + 1) {
                // changeLevel()
                goToBoss()
              }
            }}
            disabled={bossLevel.id !== state.current.mapLevel + 1}
          >
            Challenge Boss
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto p-1 bg-gray-900 text-white">
      {/* boss level at the top of the map */}
      {bossLevelCard()}
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
                  onClick={() => handleOptionClick(level.id, option.id)}
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
