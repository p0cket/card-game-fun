import React from 'react'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { showTheAttack } from '../../handlers/popup/attackPopupHandlers'
import PixelButton from './PixelButton'

function PalDetailsPopup({
  selectedPal,
  setShowDetails,
  handleSelect,
  handleGoBack,
}) {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const inDebug = state.debug && state.debug.isOpen

  return (
    <div className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-1">
        <p className="text-3xl font-semibold">{selectedPal.name}</p>
        <div className="flex mt-1">
          <img
            src={selectedPal.image}
            alt={selectedPal.name}
            className="w-60 h-60 object-cover mr-1"
          />
          <div className="space-y-2">
            {inDebug ? (
              <>
                {' '}
                <div className="flex px-1">Moves:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedPal.moves.map((move, index) => (
                    <div key={index} className="p-1">
                      <span
                        className="bg-green-200 rounded p-1 text-green-700"
                        onClick={() => showTheAttack(move, dispatch, false)}
                      >
                        {move.name}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ''
            )}
            {inDebug && (
              <>
                <div className="mt-2">
                  {/* <p className="max-w-xs">{selectedPal.description}</p> */}
                  <div className="flex justify-start">Types</div>
                  <div className="flex">
                    <div className="flex-grow">
                      <div className="flex flex-col gap-2 p-1">
                        <button className="bg-green-200 rounded px-1 text-green-700">
                          {selectedPal.elemental_type}
                        </button>
                        <button className="bg-green-200 rounded px-1 text-green-700">
                          {selectedPal.creature_type}
                        </button>
                        <button className="bg-green-200 rounded px-1 text-green-700">
                          {selectedPal.specialty_group}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="space-y-2 mt-1">
          <div>
            {/* {selectedPal.passives && ( */}
            <div className="flex justify-center">
              <p className="w-full max-w-xs text-white p-1">
                {selectedPal.description}
              </p>
            </div>
            {/* )} */}
          </div>
          <div>
            {selectedPal.passives && (
              <div>
                <div className="p-1">Passive:</div>
                {/* <span className="bg-green-200 rounded p-1 text-green-700">
                  {selectedPal.passives.name}
                </span> */}
                 <span className=" p-1 text-green-700">
                  {selectedPal.passives.name}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 p-6 flex justify-between">
          {/* <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSelect(selectedPal)}
          >
            Select
          </button> */}
          <PixelButton
            size="large"
            buttonStyle="negative"
            className="p-1 m-1"
            // onClick={() => console.log('Small button clicked')}
            onClick={handleGoBack}
          >
            {`Go Back`}
          </PixelButton>
          <PixelButton
            size="large"
            buttonStyle="normal"
            className="p-1 m-1"
            // onClick={() => console.log('Small button clicked')}
            onClick={() => handleSelect(selectedPal)}
          >
            {`Select!`}
          </PixelButton>
        </div>
      </div>
    </div>
  )
}

export default PalDetailsPopup
