import React from 'react'

function PalDetailsPopup({selectedPal, setShowDetails, handleSelect, handleGoBack}) {
  return (
    <div className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden">
    <div className="p-1">
      <p className="text-lg font-semibold">{selectedPal.name}</p>
      <div className="flex mt-1">
        <img
          src={selectedPal.image}
          alt={selectedPal.name}
          className="w-60 h-60 object-cover mr-1"
        />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Level:</span>
            <span>{selectedPal.level}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <div className="w-16 h-1 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${
                      (selectedPal.stats.hp /
                        selectedPal.stats.max_hp) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-xs ml-1">
                {selectedPal.stats.hp} /{' '}
                {selectedPal.stats.max_hp
                  ? selectedPal.stats.max_hp
                  : 'not found'}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Atk:</span>
            <span>{selectedPal.stats.attack.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Def:</span>
            <span>{selectedPal.stats.defense}</span>
          </div>
          <div className="flex justify-between">
            <span>Speed:</span>
            <span>{selectedPal.stats.speed}</span>
          </div>
          <div>
            {selectedPal.elemental_type}
            {'-'}
            {selectedPal.creature_type} [{selectedPal.specialty_group}]
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="mr-2">Lvl: {selectedPal.level}</span>
        <span className="mr-2">Exp: {selectedPal.experience}</span>
        <span>Exp to Next Lvl: xxx</span>
        <div className="w-full bg-gray-300 h-1 rounded-full mt-1">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${30}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-2">
        <p>{selectedPal.description}</p>
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex flex-wrap gap-1">
          {selectedPal.moves.map((move, index) => (
            <div key={index} className="px-1">
              <span className="bg-green-200 rounded px-1 text-green-700">
                {move.name}
              </span>
            </div>
          ))}
        </div>
        <div>
          <div>Possible Moves:</div>
          <div className="text-gray-400 flex gap-1">
            {selectedPal.possible_moves.map((move, index) => (
              <div
                key={index}
                className="flex items-center bg-black rounded-full px-1"
              >
                <div className="bg-gray-500 rounded-full w-1.5 h-1.5 mr-1"></div>
                <span>{move}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>Passive:</div>
          <span className="bg-green-200 rounded px-1 text-green-700">
            {selectedPal.passive_ability}
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSelect(selectedPal)}
        >
          Select
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
  )
}

export default PalDetailsPopup