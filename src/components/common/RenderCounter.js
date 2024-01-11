import React, { useState } from 'react'
import { executeMove } from '../../handlers/moveHandlers'

function RenderCounter({ move, pal }) {
  const [showCounter, setShowCounter] = useState(false)
  const toggleShowCounter = () => setShowCounter(!showCounter)

  const counterDetail = (move, pal) => {
    const buttonStyle =
      'bg-boy-green text-white font-semibold px-6 py-3 rounded shadow hover:bg-green-700 transition-colors duration-300'
    const textStyle = 'text-sm text-gray-600'
    const titleStyle = 'text-xl font-bold text-gray-800 mb-2'

    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <div className={titleStyle}>Counter: {move.name}</div>
        <div className={textStyle}>Type: {move.type}</div>
        <div className={textStyle}>Effect: {move.effect.description}</div>
        {move.targets && (
          <div className={textStyle}>Targets: {move.targets.join(', ')}</div>
        )}
        <div className="mt-4">
          <button
            className={buttonStyle}
            onClick={() => executeMove(move, pal)}
          >
            Use Counter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      key={move.name}
      className="p-2 border border-gray-400 hover:shadow-md transition-shadow"
      onClick={toggleShowCounter}
    >
      <div
        className={`text-2xl font-bold ${
          move.counter
            ? 'cursor-pointer text-blue-300 hover:text-blue-600'
            : 'text-gray-400'
        }`}
      >
        {showCounter && move.counter ? (
          counterDetail(move.counter, pal)
        ) : (
          <>
            <span className="text-blue-200">
              {move.counter ? (
                <span className="text-gray-400"> {move.name} </span>
              ) : (
                move.name
              )}
            </span>{' '}
            <span>{move.counter ? move.counter.name : 'No Counter Form'}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default RenderCounter
