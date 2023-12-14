import React, { useState } from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { SCENES } from '../../scenes'
import { allTrainers } from '../../consts/party/trainers'
import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
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
