import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { SCENES, changeLevel } from '../../handlers/sceneHandlers_new'
import { hikerBrak } from '../../consts/party/trainers'
import MapComponent from './MapComponent'
import { LevelList, levels } from './LevelList'

function Map() {
  const [selectedPal, setSelectedPal] = useState(null)
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  const imageControls = useAnimation()
  imageControls.start({
    y: [0, -5, 0, 5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  })

  const handleChangeLevel = (state, scene) => {
    const stateWithChangedLevel = changeLevel(state, scene)
    contextualDispatch({
      type: ACTIONS.UPDATEGAMEDATA,
      payload: stateWithChangedLevel,
    })
  }

  const ourParty = contextualState.userParty

  const renderMonsterDetails = (monster) => {
    return (
      <div
        key={monster ? monster.id : 'empty-slot'}
        className="mb-2 border border-lightgreen w-full"
      >
        {monster ? (
          <div className="flex items-center w-full">
            <motion.img
              src={monster.image}
              alt={monster.name}
              className="max-w-[35px] max-h-[35px] object-cover"
              animate={imageControls}
            />
            <div>{monster.name}</div>
            <p className="p-1">
              HP: {monster.stats.hp}/{monster.stats.max_hp}
            </p>
            <div className="bg-gray-900 w-full h-2 rounded mt-1">
              <div
                style={{
                  width: `${(monster.stats.hp / monster.stats.max_hp) * 100}%`,
                  height: '100%',
                  borderRadius: '5px',
                  backgroundColor: 'darkgreen',
                }}
              ></div>
            </div>
          </div>
        ) : (
          <p>Empty Slot</p>
        )}
      </div>
    )
  }

  return (
    <div className="font-[silkscreen] text-white m-1 text-center">
      <div className="bg-green-500 rounded p-1 mb-1">
        <h2 className="text-2xl mb-1">Map to the Elites: Choose your path</h2>
        <LevelList levels={levels} />
        <div className="flex">
          {contextualState.game.map[contextualState.current.level].map(
            (option, index) => (
              <button
                key={index}
                onClick={() => handleChangeLevel(contextualState, option)}
                className="bg-green-700 text-white border-none rounded p-1 m-1 cursor-pointer"
              >
                {option.screen}
              </button>
            ),
          )}
          <button
            onClick={() =>
              handleChangeLevel(contextualState, {
                screen: SCENES.BATTLE,
                details: {
                  type: 'trainer',
                  trainer: hikerBrak,
                  area: 'tranquil forest',
                  difficulty: 'easy',
                },
              })
            }
            className="bg-green-700 text-white border-none rounded p-1 m-1 cursor-pointer"
          >
            •Battle•
          </button>
        </div>
      </div>
      <h3 className="text-sm">Party:</h3>
      <div className="flex flex-wrap justify-between">
        {ourParty.map((monster) => renderMonsterDetails(monster))}
      </div>
      <div className="bg-green-500 rounded p-1 mb-1">
        <h3 className="text-sm">Inventory</h3>
        {/* Add content for inventory management here */}
      </div>
    </div>
  )
}

export default Map
