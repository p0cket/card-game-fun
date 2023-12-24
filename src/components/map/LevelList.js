import React, { useEffect, useState } from 'react'
// import { SCENES } from '../../scenes'
// import { SCENES } from "../handlers/sceneHandlers_new"
import { SCENES, changeLevel } from '../../handlers/sceneHandlers_new'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { hikerBrak } from '../../consts/party/trainers'

//state.current.completedLevels has how many and the details of the levels you've completed
// should be checked and each entry is one level that we hacve completed

// This is your levels configuration, where each level has an ID, a title, and a set of options.

// The LevelList component is responsible for rendering the list of levels.
// It takes 'levels' as a prop, which is the array of level objects defined above.
export const LevelList = ({ levels }) => {
  const dispatch = useDispatchContext()
  const state = useStateContext()
  // 'currentLevel' keeps track of the level the player is currently on.
  const [currentLevel, setCurrentLevel] = useState(1)
  // 'completedLevels' is a Set that stores the IDs of the levels the player has completed.
  const [completedLevels, setCompletedLevels] = useState(new Set())
  // 'selectedOptions' keeps track of the options the player has selected for each level.
  const [selectedOptions, setSelectedOptions] = useState({})

  const handleOptionSelect = (levelId, optionId) => {
    setSelectedOptions({ ...selectedOptions, [levelId]: optionId })
    setCompletedLevels(new Set([...completedLevels, levelId]))
    setCurrentLevel(Math.max(...Array.from(completedLevels)) + 1)
  }

  useEffect(() => {
    if (state.current.completedLevels) {
      const completedLevelIds = new Set(
        state.current.completedLevels.map((level) => level.id),
      )
      setCompletedLevels(completedLevelIds)
    }
  }, [state.current.completedLevels])

  const handleChangeLevel = (passedInState, payload) => {
    dispatch({
      type: ACTIONS.CHANGE_SCENE,
      payload: {
        screen: payload.screen,
        details: payload.details,
      },
    })
  }

  // The Level component represents a single level.
  // It receives the level object, the selected option, and the onOptionSelect handler as props.
  const Level = ({ level, selectedOption, onOptionSelect }) => {
    // Determine the state of the level to apply conditional styling.
    const isCurrentLevel = level.id === currentLevel
    const isCompleted = completedLevels.has(level.id)
    const isLocked = level.id > currentLevel

    // Conditional styling based on the level state.
    let levelClass = ''
    if (isCurrentLevel) levelClass = 'bg-green-800 text-white'
    if (isCompleted) levelClass = 'bg-green-500 text-white'
    if (isLocked) levelClass = 'bg-gray-500 text-gray-300'

    // Render the level with its options.
    return (
      <div className={`p-1 ${levelClass} rounded-md my-1`}>
        <p>Level {level.id}</p>
        <div>
          {level.options.map((option) => (
            <Option
              key={option.id}
              option={option}
              isSelected={option.id === selectedOption}
              onSelect={() => onOptionSelect(level.id, option.id)}
              isLocked={isLocked}
            />
          ))}{' '}
          <Option
            option={{ description: `Battle` }}
            isSelected={false}
            onSelect={
              () => {
                // onOptionSelect(level.id, level.options[0].id)
                // onClick={() =>
                handleChangeLevel(state, {
                  screen: SCENES.BATTLE,
                  details: {
                    type: 'trainer',
                    trainer: hikerBrak,
                    area: 'tranquil forest',
                    difficulty: 'easy',
                    refillEnergy: true,
                  },
                })
              }
              // }
            }
            isLocked={isLocked}
          />
        </div>{' '}
      </div>
    )
  }

  // The Option component represents a selectable option within a level.
  // It receives the option object, a flag indicating if it's selected, the onSelect handler, and a flag if it's locked.
  const Option = ({ option, isSelected, onSelect, isLocked }) => {
    // Apply conditional styling based on whether the option is selected or locked.
    let optionClass = 'px-2 m-1 border rounded-md'
    if (isSelected) optionClass += ' border-green-500 bg-green-200'
    if (isLocked)
      optionClass +=
        ' border-gray-500 bg-gray-200 text-gray-400 cursor-not-allowed'

    // Render the button for the option, disabling it if the level is locked.
    return (
      <button
        className={optionClass}
        onClick={isLocked ? null : onSelect}
        disabled={isLocked}
      >
        {option.description}
      </button>
    )
  }

  // Finally, render the list of Level components.
  // We map over the 'levels' array and create a Level component for each one.
  return (
    <div>
      {[...levels].reverse().map((level) => (
        <Level
          key={level.id}
          level={level}
          selectedOption={selectedOptions[level.id]}
          onOptionSelect={handleOptionSelect}
        />
      ))}
    </div>
  )
}
