import React, { useState } from 'react'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
// import { SCENES } from '../../scenes'
import { allTrainers, bossBarry } from '../../consts/party/trainers'
import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'
import { MoltenScale } from '../../consts/pals/pals'
import {
  battleConfig,
  bossConfig,
  eventConfig,
  restConfig,
} from '../../consts/level/levelConfigs'
import { motion } from 'framer-motion'
import PixelButton from '../common/PixelButton'

function SimpleLevelList({ levels, onOptionSelected }) {
  //   const [currentLevelId, setCurrentLevelId] = useState(1)
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const goToBoss = () => {
    console.log('goToBoss MoltenScale')
    //add in the logic to send to the boss level
    // const loadNextLevel = () => {
    console.log(`func: loadNextLevel()`)

    const nextSceneState = updateScene(state, {
      screen: SCENES.BATTLE,
      details: bossConfig,
    })
    const nextLevelState = updateLevel(nextSceneState, 1)
    dispatch({
      payload: nextLevelState,
      type: ACTIONS.UPDATE_GAMEDATA,
    })
    // }
  }

  const changeLevel = (level, option) => {
    const selectedTrainer = randomlySelectTrainer(allTrainers)
    console.log(`selectedTrainer`, selectedTrainer, allTrainers)
    console.table(selectedTrainer)
    console.log(`level, option`, level, option)
    switch (option.scene) {
      case SCENES.BATTLE:
        handleChangeLevel(state, {
          screen: SCENES.BATTLE,
          details: battleConfig(),
        })
        break
      case SCENES.REST:
        handleChangeLevel(state, {
          screen: SCENES.REST,
          details: restConfig,
        })
        break
      case SCENES.EVENT:
        handleChangeLevel(state, {
          screen: SCENES.EVENT,
          details: eventConfig,
        })
        break
      case SCENES.BOSS:
        handleChangeLevel(state, {
          screen: SCENES.BOSS,
          details: bossConfig,
        })
    }
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
  const handleOptionClick = (level, option) => {
    // possibly check if we can advance
    // if (levelId < levels.length) {
    console.warn(`handleOptionClick: level,  option`, level, option)
    changeLevel(level, option)
    // }
    // const nextLevelId = levelId < levels.length ? levelId + 1 : levelId
    // setCurrentLevelId(nextLevelId)
  }

  const glowAnimation = {
    glow: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 3px rgba(255, 255, 255, 0.6)',
        '0 0 12px rgba(124,252,0, 0.8)',
        '0 0 3px rgba(255, 255, 255, 0.6)',
        // '0 0 3px rgba(255, 255, 255, 0.6)',
        // '0 0 12px rgba(255, 255, 255, 0.8)',
        // '0 0 3px rgba(255, 255, 255, 0.6)',
      ],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  }

  return (
    <div className="container mx-auto p-1 bg-gray-900 text-white">
      {[...levels].reverse().map((level) => {
        const isNextLevel = level.id === state.current.mapLevel + 1

        return (
          <div
            key={level.id}
            className={`flex flex-col rounded shadow p-2 mb-1 text-xs ${
              isNextLevel
                ? 'border-l-4 border-boy-green bg-gray-800'
                : 'bg-gray-700'
            }`}
          >
            <div className="font-semibold mb-1">{level.title}</div>
            {isNextLevel && (
              <div className="flex flex-wrap items-start">
                {level.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex flex-col items-center m-1"
                  >
                    <motion.div
                      variants={glowAnimation}
                      initial="glow"
                      animate="glow"
                    >
                      <PixelButton
                        size="large"
                        buttonStyle="normal"
                        className="p-1 m-1"
                        // onClick={() => console.log('Small button clicked')}
                        onClick={() => handleOptionClick(level, option)}
                      >
                        {option.shortDesc}
                      </PixelButton>
                      {/* <button
                        className="bg-boy-green text-white rounded py-1 px-2 focus:outline-none"
                        onClick={() => handleOptionClick(level, option)}
                      >
                        {option.shortDesc}
                      </button>{' '} */}
                    </motion.div>
                    <span className="text-xs mt-2">{option.longDesc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  // return (
  //   <div className="container mx-auto p-1 bg-gray-900 text-white">
  //     {[...levels].reverse().map((level) => (
  //       <div
  //         key={level.id}
  //         className={`flex flex-col rounded shadow p-2 mb-1 text-xs ${
  //           // level.id === currentLevelId
  //           level.id === state.current.mapLevel + 1
  //             ? 'border-l-4 border-boy-green bg-gray-800'
  //             : 'bg-gray-700'
  //         }`}
  //       >
  //         <div className="font-semibold mb-1">{level.title}</div>
  //         {/* <div className="m-1 text-gray-800">{level.description}</div> */}
  //         {/* {level.id === currentLevelId && ( */}
  //         {level.id === state.current.mapLevel + 1 && (
  //           <div className="flex justify-between">
  //             {level.options.map((option) => (
  //               // <div key={option.id}>
  //               <div className="flex flex-col justify-center" key={option.id}>
  //                 {' '}
  //                 <button
  //                   // key={option.id}
  //                   className=" text-center bg-boy-green text-white rounded py-1 m-1 hover:bg-green-700 focus:outline-none"
  //                   onClick={() => handleOptionClick(level, option)}
  //                 >
  //                   <div>{option.shortDesc}</div>{' '}
  //                 </button>
  //                 {option.longDesc}
  //               </div>
  //               // </div>
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // )
}

export default SimpleLevelList
