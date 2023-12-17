import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { updateLevel, updateScene } from '../../handlers/sceneHandlers_new'
import { SCENES } from '../../scenes'
import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
import { allTrainers } from '../../consts/party/trainers'
import {
  CuteCharm,
  DoubleStrike,
  LuminousFlight,
  RadiantBeam,
  SunShield,
} from '../../consts/allMoves'

function Results({ experience = 100 }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedMove, setSelectedMove] = useState(null)
  const [selectedModification, setSelectedModification] = useState(null)

  const state = useStateContext()
  const dispatch = useDispatchContext()

  // Define items and their details
  const itemsToChooseFrom = {
    'Sword of Destiny': 'A powerful sword that grants strength and courage.',
    'Shield of Valor': 'A sturdy shield that can withstand any attack.',
    'Potion of Healing': 'A magical potion that heals all wounds.',
  }

  const movesToChooseFrom = [
    CuteCharm,
    SunShield,
    RadiantBeam,
    // LuminousFlight,
    // DoubleStrike,
  ]

  // move modifications
  const moveModifications = [
    {
      name: 'Power Boost',
      description: "Increases the move's damage by 25%.",
      applyModification: (move) => {
        move.damage = Math.ceil(move.damage * 1.25)
        return move
      },
    },
    {
      name: 'Speed Boost',
      description: "Increases the move's speed by 20.",
      applyModification: (move) => {
        move.speed += 20
        return move
      },
    },
    {
      name: 'Energy Saver',
      description: "Reduces the move's energy cost by 1.",
      applyModification: (move) => {
        move.energyCost = Math.max(1, move.energyCost - 1)
        return move
      },
    },
  ]

  // Define animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  const handleItemSelect = (item) => {
    setSelectedItem(item)
  }
  const handleMoveSelect = (move) => {
    setSelectedMove(move)
  }

  const onContinue = (selectedItem) => {
    dispatch({
      type: ACTIONS.ADD_RUNE,
      payload: {
        item: selectedItem,
        permEffect: null,
      },
    })
    const randomizedTrainer = randomlySelectTrainer(allTrainers)

    console.log('Continue to next scene')
    dispatch({
      type: ACTIONS.CHANGE_SCENE,
      payload: {
        screen: SCENES.MAP,
        details: {
          type: 'win',
          trainer: randomizedTrainer,
          area: 'tranquil forest',
          difficulty: 'easy',
          achievement: 'flawless victory',
          VIP: 'your pal',
          EXP: `Difficulty * lvl of monster * 10`,
        },
      },
    })
  }

  function DisplayModifications() {
    return (
      <div id="modifications-container" className="modifications-container gap-2">
        <h2>Available Modifications</h2>
        <button
          className="py-2 px-4 m-1 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300"
          id="power-boost"
          // onClick={() => handleModificationSelect('power-boost')}
        >
          <h3>Power Boost</h3>
          {/* <p className='text-xs'>Increases the move's damage.</p> */}
        </button>
        <button
          className="py-2 px-4 m-1 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300"
          id="speed-boost"
          // onClick={() => handleModificationSelect('speed-boost')}
        >
          <h3>Speed Boost</h3>
          {/* <p className='text-xs'>Increases the move's speed.</p> */}
        </button>
        <button
          className="py-2 px-4 m-1 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300"
          id="energy-saver"
          // onClick={() => handleModificationSelect('energy-saver')}
        >
          <h3>Energy Saver</h3>
          {/* <p className='text-xs'>Reduces the move's energy cost.</p> */}
        </button>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-md mx-auto my-10 p-6 bg-black bg-opacity-60 text-white border border-white rounded-lg font-[silkscreen]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-center text-xl mb-4">Battle Results</h2>
      <p className="mb-4 text-gray-300">{`"Zounds! I really thought I had ya"- Enemy Trainer`}</p>
      <p className="mb-4 text-gray-500">
        That Pal fell to your might. As a reward, the trainer has given you a
        choice
      </p>{' '}
      <p>You gained {experience} experience</p>
      {DisplayModifications()}
      {/* storytelling note: Matt and Trey's method - and so, as opposed to and then */}
      <div className="my-4">
        <h3 className="text-lg mb-2">Choose a Move:</h3>
        <div className="grid grid-cols-3 gap-4">
          {movesToChooseFrom.map((move, index) => (
            <button
              key={index}
              className={`py-2 px-4 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300 ${
                selectedMove === move.name ? 'bg-blue-800' : ''
              }`}
              onClick={() => handleMoveSelect(move)}
            >
              {move.name}
            </button>
          ))}
        </div>
      </div>
      {selectedMove && (
        <div className="my-4 p-4 bg-yellow-100 text-black rounded">
          <h4 className="font-bold">{selectedMove.name}</h4>
          <p>{selectedMove.effect.description}</p>
          <button
            onClick={() => onContinue(selectedMove)}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            disabled={!selectedMove}
          >
            Continue
          </button>
        </div>
      )}
      <div className="my-4">
        <h3 className="text-lg mb-2">Choose an Item or Move:</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(itemsToChooseFrom).map((item, index) => (
            <button
              key={index}
              className={`py-2 px-4 bg-green-400 text-white rounded hover:bg-green-700 transition duration-300 ${
                selectedItem === item ? 'bg-green-800' : ''
              }`}
              onClick={() => handleItemSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {selectedItem && (
        <div className="my-4 p-4 bg-blue-100 text-black rounded">
          <h4 className="font-bold">{selectedItem}</h4>
          <p>{itemsToChooseFrom[selectedItem]}</p>{' '}
          <button
            onClick={() => onContinue(selectedItem)}
            className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            disabled={!selectedItem}
          >
            Continue
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default Results
