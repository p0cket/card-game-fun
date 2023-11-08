import React, { useState } from 'react'

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
      { id: '3a', description: 'Fight a even harder monster' },
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
      { id: '4a', description: '???' },
      { id: '4b', description: 'Enter a shop' },
      { id: '4c', description: 'Find another treasure' },
    ],
  },
  {
    id: 6,
    title: 'You return',
    options: [
      { id: '4a', description: 'Fight a thug' },
      { id: '4b', description: '???' },
      { id: '4c', description: 'Find another treasure' },
    ],
  },
  {
    id: 7,
    title: 'Having changed',
    options: [
      { id: '4a', description: 'Fight a thug' },
      { id: '4b', description: 'Enter a shop' },
      { id: '4c', description: 'Find another treasure' },
    ],
  },
]

export const LevelList = ({ levels }) => {
  const [selectedOptions, setSelectedOptions] = useState({})

  const handleOptionSelect = (levelId, optionId) => {
    setSelectedOptions({ ...selectedOptions, [levelId]: optionId })
  }
  const Level = ({ level, selectedOption, onOptionSelect }) => {
    return (
      <div className="">
        <p className=''>Level {level.id}</p>
        <div>
          {level.options.map((option) => (
            <Option
              key={option.id}
              option={option}
              isSelected={option.id === selectedOption}
              onSelect={() => onOptionSelect(level.id, option.id)}
            />
          ))}
        </div>
      </div>
    )
  }

  const Option = ({ option, isSelected, onSelect }) => {
    return (
      <button
        className={`option ${isSelected ? 'selected' : ''} px-2 m-1 border rounded-md border-green-950`}
        onClick={onSelect}
      >
        {option.description}
      </button>
    )
  }

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
