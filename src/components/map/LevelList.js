import React, { useState } from 'react'

// This is your levels configuration, where each level has an ID, a title, and a set of options.
export const levels = [
  {
    id: 1,
    title: 'The Path Begins',
    options: [
      { id: '1a', description: 'Fight a monster' },
      { id: '1b', description: 'Visit a shop' },
      { id: '1c', description: 'Rest' },
    ],
  },
  {
    id: 2,
    title: 'But you need more',
    options: [
      { id: '2a', description: 'Fight a harder monster' },
      { id: '2b', description: 'Find a treasure' },
    ],
  },
  {
    id: 3,
    title: 'You venture deep',
    options: [
      { id: '3a', description: 'Fight an even harder monster' },
      { id: '3b', description: 'Find another treasure' },
    ],
  },
  {
    id: 4,
    title: 'You have found the treasure',
    options: [
      { id: '4a', description: 'Fight a thug' },
      { id: '4b', description: 'Enter a shop' },
      { id: '4c', description: 'Find another treasure' },
    ],
  },
  {
    id: 5,
    title: 'You pay a great price',
    options: [
      { id: '5a', description: '???' },
      { id: '5b', description: 'Enter a shop' },
      { id: '5c', description: 'Find another treasure' },
    ],
  },
  {
    id: 6,
    title: 'You return',
    options: [
      { id: '6a', description: 'Fight a thug' },
      { id: '6b', description: '???' },
      { id: '6c', description: 'Find another treasure' },
    ],
  },
  {
    id: 7,
    title: 'Having changed',
    options: [
      { id: '7a', description: 'Fight a thug' },
      { id: '7b', description: 'Enter a shop' },
      { id: '7c', description: 'Find another treasure' },
    ],
  },
]

// The LevelList component is responsible for rendering the list of levels.
// It takes 'levels' as a prop, which is the array of level objects defined above.
export const LevelList = ({ levels }) => {
  // 'currentLevel' keeps track of the level the player is currently on.
  const [currentLevel, setCurrentLevel] = useState(1)
  // 'completedLevels' is a Set that stores the IDs of the levels the player has completed.
  const [completedLevels, setCompletedLevels] = useState(new Set())
  // 'selectedOptions' keeps track of the options the player has selected for each level.
  const [selectedOptions, setSelectedOptions] = useState({})

  // 'handleOptionSelect' is called when a player selects an option.
  // It updates the 'selectedOptions' state and may also update 'currentLevel' and 'completedLevels'.
  const handleOptionSelect = (levelId, optionId) => {
    // Update the selected option for the level.
    setSelectedOptions({ ...selectedOptions, [levelId]: optionId })

    // Add the level to the set of completed levels and update the current level.
    // This assumes completing any option in a level completes the level.
    setCompletedLevels(new Set([...completedLevels, levelId]))
    setCurrentLevel(Math.max(...Array.from(completedLevels)) + 1)
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

    // if (isCurrentLevel) levelClass = 'bg-blue-500 text-white'
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
          ))}
        </div>
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
      {levels.map((level) => (
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
