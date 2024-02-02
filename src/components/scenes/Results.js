import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'
// import { SCENES } from '../../scenes'
import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
import { allTrainers } from '../../consts/party/trainers'
import {
  CuteCharm,
  DoubleStrike,
  LuminousFlight,
  RadiantBeam,
  Smash,
  SunShield,
} from '../../consts/allMoves'
import { apple, potion, pumpernickelSoda } from '../../consts/items/basicItems'
import { enemyDefeatedResponses } from '../../consts/fun/enemyDefeatedResponses'
import { rewardDialogs } from '../../consts/fun/rewardDialog'
import { DoubleJab } from '../../consts/allMoves'
import { EarthenGrasp } from '../../consts/allMoves'
import { FrostBite } from '../../consts/allMoves'
import { Thunderclap } from '../../consts/allMoves'
import { CrystalShard } from '../../consts/allMoves'
import { ShadowLash } from '../../consts/allMoves'

function Results({ experience = 100, pal, isBoss = false }) {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const [selectedRune, setSelectedRune] = useState(null)
  const [selectedMove, setSelectedMove] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const [enemyDialog, setEnemyDialog] = useState(null)
  const [rewardDialog, setRewardDialog] = useState(null)
  const [rewardNum, setRewardNum] = useState(null)

  const [movesYourPalsCanChoose, setMovesYourPalsCanChoose] = useState(null)

  const randomlySelect = (arr) => arr[Math.floor(Math.random() * arr.length)]

  useEffect(() => {
    setEnemyDialog(randomlySelect(enemyDefeatedResponses))
    setRewardDialog(randomlySelect(rewardDialogs))
    setRewardNum(Math.floor(Math.random() * 2))
    const moveArr = generateMovesToChooseFrom(
      state.userParty,
      movesToChooseFrom,
    )
    setMovesYourPalsCanChoose(moveArr)
    // setRewardNum(Math.floor(Math.random() * 3))
  }, [])
  const [selectedModification, setSelectedModification] = useState(null)
  // Define runes and their details
  const runesToChooseFrom = {
    'Sword of Destiny': 'A powerful sword that grants strength and courage.',
    'Shield of Valor': 'A sturdy shield that can withstand any attack.',
    'Enchanted Cloak':
      'A cloak woven with magical threads. It conceals the wearer from plain sight.',
  }
  const itemsToChooseFrom = [pumpernickelSoda]
  // Add like 4 moves here
  //or take a look at the move array of a mon, see if the move is in there,
  // if not, then display it as an option to add
  const movesToChooseFrom = [
    // CuteCharm,
    // SunShield,
    RadiantBeam,
    // LuminousFlight,
    Smash,
    DoubleStrike,
    DoubleJab,
    EarthenGrasp,
    FrostBite,
    Thunderclap,
    CrystalShard,
    ShadowLash,
  ]
  //state.userParty has your pals. Lets take a look through our pals, through
  // their moves, and see if any of them match any of the moves in the movesToChooseFrom
  // arr. If they do, then remove the move from the arr that can be used on that pal
  // then return the arr.

  // choose a random pal from your party
  // const chooseRandomPal = (userParty) => {
  //   const randomPal = userParty[Math.floor(Math.random() * userParty.length)]
  //   return randomPal
  // }

  // get an array of moves from movePool that a pal does not know
  function getArrOfUnlearntMoves(pal, movePool) {
    // Assuming both pal.moves and movePool contain move names as strings.
    const unlearntMoves = movePool.filter((move) => !pal.moves.includes(move))
    return unlearntMoves
  }

  function generateMovesToChooseFrom(userParty, movePool) {
    const movesToChooseFrom = []
    const selectedMoves = new Set() // Track selected moves to ensure uniqueness.

    while (movesToChooseFrom.length < 3) {
      const ourRandomNumber = Math.floor(Math.random() * userParty.length)
      const randomPal = userParty[ourRandomNumber]
      const unlearntMoves = getArrOfUnlearntMoves(randomPal, movePool).filter(
        (move) => !selectedMoves.has(move),
      )

      if (unlearntMoves.length === 0) {
        // If the randomly selected pal has no unlearnt moves, try another pal.
        continue
      }

      const randomMove =
        unlearntMoves[Math.floor(Math.random() * unlearntMoves.length)]
      if (randomMove) {
        selectedMoves.add(randomMove) // Mark this move as selected.
        movesToChooseFrom.push({
          move: randomMove,
          pal: randomPal,
          palIndex: ourRandomNumber,
        })
      }

      // Prevent infinite loop if not enough unique moves are available.
      if (
        movesToChooseFrom.length ===
        userParty.flatMap((pal) =>
          getArrOfUnlearntMoves(pal, movePool).filter(
            (move) => !selectedMoves.has(move),
          ),
        ).length
      ) {
        break
      }
    }

    console.log('movesToChooseFrom generated:', movesToChooseFrom)
    return movesToChooseFrom
  }

  // case ACTIONS.ADD_MOVE:
  //   console.log('Reducer ADD_MOVE:', action)
  //   state = addMoveToPalInState(
  //     state,
  //     action.payload.move,
  //     action.payload.palIndex,
  //   )
  //   return state

  // const chooseRandomMove = (pal, movePool) => {
  //   const unlearntMoves = getArrOfUnlearntMoves(pal, movePool)
  //   const randomMove = unlearntMoves[Math.floor(Math.random() * unlearntMoves.length)]
  //   return randomMove
  // }

  // const generateMovesToChooseFrom = (userParty, movePool) => {
  //   // create an array of 3 unlearnt moves and the pal they go with
  //   const movesToChooseFrom = [];

  //   userParty.forEach((pal) => {
  //     const unlearntMoves = getArrOfUnlearntMoves(pal, movePool);
  //     const randomMove = chooseRandomMove(pal, unlearntMoves);

  //     if (randomMove) {
  //       movesToChooseFrom.push({
  //         move: randomMove,
  //         pal: pal,
  //       });
  //     }
  //   });

  //   return movesToChooseFrom.slice(0, 3);
  //   }

  // }

  // Then run a function 3 times. This function will be choosing a move and a mon
  // and then applying the move to the mon.

  // I'll have to make switching free to be able to do this.

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
      name: 'Accuracy Boost',
      description: "Increases the move's accuracy by 25%.",
      applyModification: (move) => {
        move.accuracy = Math.ceil(move.accuracy * 1.25)
        return move
      },
    },
    {
      name: 'Effect Boost',
      description: "Increases the move's effect amount by 25%.",
      applyModification: (move) => {
        move.effectChance = Math.ceil(move.effect.amt * 1.25)
        return move
      },
    },
    // {
    //   name: 'Energy Saver',
    //   description: "Reduces the move's energy cost by 1.",
    //   applyModification: (move) => {
    //     move.energyCost = Math.max(1, move.energyCost - 1)
    //     return move
    //   },
    // },
  ]

  // Define animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  const handleRuneSelect = (rune) => {
    setSelectedRune(rune)
  }
  const handleMoveSelect = (move) => {
    setSelectedMove(move)
  }

  const handleItemSelect = (item) => {
    setSelectedItem(item)
  }

  const onContinue = (selected, type) => {
    if (type === 'rune') {
      dispatch({
        type: ACTIONS.ADD_RUNE,
        payload: {
          item: selected,
          permEffect: null,
        },
      })
    } else if (type === 'move') {
      // here is what add_move looks like. Knowing this, lets add
      // a index and move in the payload
      // case ACTIONS.ADD_MOVE:
      //   console.log('Reducer ADD_MOVE:', action)
      //   state = addMoveToPalInState(
      //     state,
      //     action.payload.palIndex,
      //     action.payload.move,
      //   )
      dispatch({
        type: ACTIONS.ADD_MOVE,
        payload: {
          move: selected,
          palIndex: 0,
        },
      })
    } else if (type === 'item') {
      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: {
          item: selected,
          // palIndex: 0,
        },
      })
    }
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

  const onSelectMove = (selected, palIndex) => {
    // case ACTIONS.ADD_MOVE:
    //   console.log('Reducer ADD_MOVE:', action)
    //   state = addMoveToPalInState(
    //     state,
    //     action.payload.move,
    //     action.payload.palIndex,
    //   )
    //   return state
    dispatch({
      type: ACTIONS.ADD_MOVE,
      payload: {
        move: selected,
        palIndex: palIndex,
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
      <div
        id="modifications-container"
        className="modifications-container gap-2"
      >
        <h2>Available Modifications</h2>
        <button
          className="py-2 px-4 m-1 bg-boy-green text-white rounded hover:bg-green-700 transition duration-300"
          id="power-boost"
          // onClick={() => handleModificationSelect('power-boost')}
        >
          <h3>Power Boost</h3>
          {/* <p className='text-xs'>Increases the move's damage.</p> */}
        </button>
        <button
          className="py-2 px-4 m-1 bg-boy-green text-white rounded hover:bg-green-700 transition duration-300"
          id="speed-boost"
          // onClick={() => handleModificationSelect('speed-boost')}
        >
          <h3>Speed Boost</h3>
          {/* <p className='text-xs'>Increases the move's speed.</p> */}
        </button>
        <button
          className="py-2 px-4 m-1 bg-boy-green text-white rounded hover:bg-green-700 transition duration-300"
          id="energy-saver"
          // onClick={() => handleModificationSelect('energy-saver')}
        >
          <h3>Energy Saver</h3>
          {/* <p className='text-xs'>Reduces the move's energy cost.</p> */}
        </button>
      </div>
    )
  }

  const displayItems = () => {
    return (
      <div>
        <div id="item-container" className="item-container">
          {itemsToChooseFrom.map((item) => (
            <button
              key={item.name}
              className="py-2 px-4 m-1 bg-boy-green text-white rounded hover:bg-green-700 transition duration-300"
              onClick={() => handleItemSelect(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
        {selectedItem && (
          <div className="my-4 p-4 bg-yellow-100 text-black rounded">
            <h4 className="font-bold">{selectedItem.name}</h4>
            <p>{selectedItem.description}</p>
            <button
              onClick={() => onContinue(selectedItem, 'item')}
              className="mt-4 py-2 px-4 bg-boy-green text-white rounded hover:bg-blue-600 transition duration-300"
              disabled={!selectedItem}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    )
  }

  const displayMoves = () => {
    //
    // 0
    // :
    // move
    // :
    // {name: 'Smash', type: 'physical', damage: 45, accuracy: 80, speed: 8, …}
    // pal
    // :
    // {id: 1, name: 'Luminowl', elemental_type: 'Light', creature_type: 'Owl', specialty_group: 'Mystic', …}
    // palIndex
    // :
    // 0
    // [[Prototype]]
    // :
    // Object
    // 1
    // :
    // move
    // :
    // {name: 'Double Strike', type: 'physical', damage: 45, accuracy: 70, speed: 7, …}
    // pal
    // :
    // {id: 1, name: 'Luminowl', elemental_type: 'Light', creature_type: 'Owl', specialty_group: 'Mystic', …}
    // palIndex
    // :
    // 0
    // [[Prototype]]
    // :
    // Object
    // 2
    // :

    return (
      <div>
        <div className="my-4">
          <h3 className="text-lg mb-2">Choose a Move:</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* lets take into account the shape of the data now.
            this is an example obj from the arr
            // move
// : 
// {name: 'Radiant Beam', type: 'elemental', damage: 70, accuracy: 20, speed: 12, …}
// pal
// : 
// {id: 1, name: 'Luminowl', elemental_type: 'Light', creature_type: 'Owl', specialty_group: 'Mystic', …}
// palIndex
// : 
// 0
             */}
            {movesYourPalsCanChoose ? (
              movesYourPalsCanChoose.map((moveObj, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 text-white rounded transition duration-300 ${
                    selectedMove === moveObj.move.name
                      ? 'bg-boy-green'
                      : 'bg-boy-green hover:bg-green-700'
                  }`}
                  onClick={() => onSelectMove(moveObj.move, moveObj.palIndex)}
                >
                  <div className="font-bold">{moveObj.move.name}</div>
                  {/* <div className="text-semibold text-gray-200">{moveObj.pal.name}</div> */}
                  <img src={moveObj.pal.image} />
                  <div className="text-xs text-gray-200">
                    {' '}
                    (party slot {moveObj.palIndex + 1})
                  </div>
                  <div>Uncommon</div>
                </button>
              ))
            ) : (
              <div>No moves available</div>
            )}
            {/* {movesYourPalsCanChoose.map((move, index) => (
              <button
                key={index}
                className={`py-2 px-4 bg-boy-green text-white rounded hover:bg-green-700 transition duration-300 ${
                  selectedMove === move.name ? 'bg-boy-green' : ''
                }`}
                onClick={() => handleMoveSelect(move)}
              >
                {move.name}
              </button>
            ))} */}
          </div>
        </div>
        {selectedMove && (
          <div className="my-4 p-4 bg-yellow-100 text-black rounded">
            <h4 className="font-bold">{selectedMove.name}</h4>
            <p>{selectedMove.effect.description}</p>
            <button
              onClick={() => onContinue(selectedMove, 'move')}
              className="mt-4 py-2 px-4 bg-boy-green text-white rounded hover:bg-green-500 transition duration-300"
              disabled={!selectedMove}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    )
  }

  const displayRunes = () => {
    return (
      <>
        <div className="my-4">
          <h3 className="text-lg mb-2">Choose an Item:</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(runesToChooseFrom).map((item, index) => (
              <button
                key={index}
                className={`py-2 px-4 bg-green-400 text-white rounded hover:bg-green-700 transition duration-300 ${
                  selectedRune === item ? 'bg-green-800' : ''
                }`}
                onClick={() => handleRuneSelect(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {selectedRune && (
          <div className="my-4 p-4 bg-blue-100 text-black rounded">
            <h4 className="font-bold">{selectedRune}</h4>
            <p>{runesToChooseFrom[selectedRune]}</p>{' '}
            <button
              onClick={() => onContinue(selectedRune, 'rune')}
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              disabled={!selectedRune}
            >
              Continue
            </button>
          </div>
        )}{' '}
      </>
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
      <p className="mb-4 text-gray-300">{`${enemyDialog}`}</p>
      <p className="mb-4 text-gray-500">{rewardDialog}</p>
      {/* TODO: decide on exp and gold reward */}
      {/* storytelling note: Matt and Trey's method - and so, as opposed to and then */}
      {/* TODO: Add display of Modifications
      {DisplayModifications()} */}
      {displayMoves()}
      {/* uncomment the 3 below when ready: */}
      {/* {rewardNum === 0 ? displayMoves() : ''}
      {rewardNum === 1 ? displayItems() : ''}
      {rewardNum === 2 ? displayRunes() : ''} */}
      {/* TODO: Add display of Runes */}
    </motion.div>
  )
}

export default Results
