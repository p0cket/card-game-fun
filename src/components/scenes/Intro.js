import React, { useEffect, useState } from 'react'
import './Intro.css'
import { setSceneAction } from '../../actions'
import { motion } from 'framer-motion'
import '../common/Button.css'
import { AnimatePresence } from 'framer-motion'
import mapTest from '../../assets/maps/mapTiledTest2.tmj'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'
import { difficultyLevels, gameVersion } from '../../consts/consts'
import Chibipal from '../../assets/Chibipal.png'
import Carousel from '../effects/Carousel'
import { palImages } from '../../consts/pals/images'
import ChibipalsLogo from '../../assets/icons/Chibipals_Logo_only_2_n.png'
import gashTrainerImg from '../../assets/actors/Gash.png'
import FlashingImage from '../effects/misc/FlashingImage'
import Shop from './Shop'
import CanvasSquare from '../canvas/CanvasSquare'
import Tilemap from '../canvas/Tilemap'
import TreasureChest from '../visuals/TeasureChest'
import SpinningBall from '../visuals/SpinningBall'
import TopDownTest from '../canvas/TopDownTest'
import PixelButton from '../common/PixelButton'
import Slider from '../common/Slider'
import VariablesConfigMenu from '../dialog/VariablesConfigMenu'
import Betas from '../inTesting/Betas'

const Intro = () => {
  const [toolBoxVisible, setToolBoxVisible] = useState(false)
  const [canvasVisible, setCanvasVisible] = useState(false)
  const toggleCanvas = () => {
    setCanvasVisible((prev) => !prev)
  }
  const toggleToolBox = () => {
    setToolBoxVisible((prev) => !prev)
  }
  const handleVariablesChange = (newVariables) => {
    console.log('Updated Variables:', newVariables)
    // Update your game's configuration based on newVariables here
  }
  const styles = {
    fontStyle: {
      fontFamily: 'Silkscreen',
      fontSize: '22px',
      color: 'white',
      padding: '20px',
    },
    fontFam: {
      fontFamily: 'Silkscreen',
    },
  }

  const state = useStateContext()
  const dispatch = useDispatchContext()
  const [difficultyLevel, setDifficultyLevel] = useState(0)
  const inDebug = state.debug && state.debug.isOpen // shft+D
  const isNewGamePlus = state.userData && state.userData.newGamePlus
  // const newGamePlus = state.newGamePlus

  const loadNextLevel = () => {
    dispatch(setSceneAction())
    const nextSceneState = updateScene(state, {
      screen: SCENES.CHOOSECHARACTER,
      details: null,
    })
    const nextLevelState = updateLevel(nextSceneState, 1)
    dispatch({
      payload: nextLevelState,
      type: ACTIONS.UPDATE_GAMEDATA,
    })
  }
  const [displayMessage, setDisplayMessage] = useState('')

  // Correctly expect an event object and parse the new value from it.
  const handleSliderChange = (e) => {
    const newDifficulty = parseInt(e, 10) // Since you're passing the value directly, not an event object
    if (newDifficulty <= state.permissions.difficulty) {
      setDifficultyLevel(newDifficulty)
      setDisplayMessage('') // Clear any locked message if the level is allowed
    } else {
      // If the new difficulty is beyond allowed, don't change the level but indicate it's locked
      setDisplayMessage(' - Locked')
    }
  }

  // Viseral Resonance, Behavioral Resonance, Reflective Resonance
  // Emotional Attachment
  const [lastPlayedTime, setLastPlayedTime] = useState(null)
  const [streak, setStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  useEffect(() => {
    const today = new Date().toDateString()
    const lastPlayed = localStorage.getItem('lastPlayed')

    if (lastPlayed !== today) {
      const localStreak = localStorage.getItem('streak')
      const localLongestStreak = localStorage.getItem('longestStreak')
      let newStreak = 1
      if (lastPlayed === new Date(Date.now() - 86400000).toDateString()) {
        newStreak = localStreak ? Number(localStreak) + 1 : 1
        localStorage.setItem('streak', newStreak)
        setStreak(newStreak)
      } else {
        localStorage.setItem('streak', 1)
        setStreak(1)
      }
      if (!localLongestStreak || newStreak > Number(localLongestStreak)) {
        localStorage.setItem('longestStreak', newStreak)
        setLongestStreak(newStreak)
      }
      localStorage.setItem('lastPlayed', today)
    }

    setLastPlayedTime(localStorage.getItem('lastPlayed'))
    setStreak(Number(localStorage.getItem('streak')))
    setLongestStreak(Number(localStorage.getItem('longestStreak')))
  }, [])

  return (
    <>
      {inDebug ? (
        <>
          <Betas
            // draw={draw}
            palImages={palImages}
            gashTrainerImg={gashTrainerImg}
            loadNextLevel={loadNextLevel}
          />
        </>
      ) : (
        <div>
          <div
            className="font-[silkscreen] flex flex-col items-center
         bg-repeat bg-cover bg-boy-green text-white"
          >
            <div
              className="font-[silkscreen] text-white bg-black text-xs
          p-1 m-1"
            >
              {gameVersion}
            </div>
            {!inDebug && (
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 2 }}
                  style={styles.fontStyle}
                >
                  <img src={ChibipalsLogo} alt="pal logo" />
                  <div>友達を殺す</div>
                  <div className="text-sm">
                    Plausibly Sentient Monster Slayer
                  </div>
                  <div className="text-sm text-green-300">
                    Friendship Edition Demo X
                  </div>
                  <div>友情編</div>
                </motion.div>
              </div>
            )}
            <div className="p-4">
              {toolBoxVisible && (
                <>
                  <VariablesConfigMenu
                    onVariablesChange={handleVariablesChange}
                  />
                </>
              )}
            </div>
            {!inDebug && (
              <div className="grid grid-cols-2 items-center gap-4 relative">
                <Carousel ourImages={palImages} />
                <div className="relative">
                  <img
                    src={gashTrainerImg}
                    alt="gash trainer"
                    className="block"
                  />
                  <div
                    className="absolute"
                    style={{ bottom: '25%', right: '38%' }}
                  >
                    <SpinningBall />
                  </div>
                </div>
              </div>
            )}
            {canvasVisible && <TopDownTest />}
            <div style={{ paddingRight: '5px', paddingLeft: '5px' }}>
              <br />
            </div>{' '}
            <div style={{ padding: '10px' }}>
              <PixelButton
                size="large"
                buttonStyle="normal"
                className="p-1 m-1"
                onClick={loadNextLevel}
              >
                {`Let's Adventure!`}
              </PixelButton>
              {inDebug && (
                <div>
                  <div>
                    Difficulty Lvl:{' '}
                    {difficultyLevel <= state.permissions.difficulty
                      ? difficultyLevels[difficultyLevel]
                      : 'Locked'}
                  </div>
                  <Slider
                    min="0"
                    max="10"
                    value={difficultyLevel.toString()} // Ensuring the value is a string
                    onChange={handleSliderChange} // Since handleSliderChange now correctly expects a value directly
                  />
                </div>
              )}
            </div>
            {inDebug && (
              <>
                {' '}
                <PixelButton
                  size="small"
                  buttonStyle="normal"
                  onClick={toggleToolBox}
                >
                  ToolBox
                </PixelButton>
                <PixelButton
                  size="small"
                  buttonStyle="normal"
                  onClick={toggleCanvas}
                >
                  Toggle Canvas
                </PixelButton>
                <div style={{ padding: '10px' }}>
                  <PixelButton
                    size="small"
                    buttonStyle="normal"
                    className="p-1 m-1"
                    onClick={() => console.log('Small button clicked')}
                  >
                    Daily Woods Expedition{' '}
                  </PixelButton>
                </div>
              </>
            )}
            {isNewGamePlus && (
              <>
                <div>
                  <button>Credits:</button>
                  Credits: (People who have supported the project)
                  <>splatfest in credits based on the team people backed</>
                  <>
                    quest: use x move 5 times, poison 3 times, regain x health
                    with x
                  </>
                  <>Or: Move used 5x, it then grows to lvl 2</>
                </div>
                <div>
                  spend gems from run on bonuses. (bonuses must balance), catch
                </div>
                <div>difficulty: enemyHealth, pain runes</div>
                <div>randomized shop options: 1,2,3</div>
                <div>Coming Features</div>{' '}
                <div>Defeated runs: defeatedRuns on version: gameversion</div>
                <div>Previous wins: wins</div>
                <div>Badges: badges</div>
                <div>difficulty: 1,2,3,4,5,6, --------slider</div>
                <div>try modified vals: ---------</div>
                {/* This gets hooked up to our code, and we can allow users
              to submit their own takes on difficulty
              */}
              </>
            )}
            <div className="font-[silkscreen]">© 22,23,24 Pocket Games Inc</div>
            <div className="bg-boy-lightgreen p-1">
              <p className="font-[silkscreen] font-bold text-green-800 text-sm">
                Streak: {streak} Best: {longestStreak} (LP: {lastPlayedTime})
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Intro

// const Explosion = () => (
//   <motion.div
//     variants={explosionVariants}
//     initial="initial"
//     animate="animate"
//     style={{
//       position: 'absolute',
//       top: '0',
//       background: 'orange',
//       borderRadius: '50%',
//       width: '200px',
//       height: '200px',
//     }}
//   />
// )

// const [explode, setExplode] = useState(false)
// const [startAnimation, setStartAnimation] = useState(false)

// const handleSliderChange = (e) => {
//   const newDifficulty = parseInt(e.target.value, 10)
//   if (newDifficulty <= state.permissions.difficulty) {
//     setDifficultyLevel(newDifficulty)
//   }
// }
// const handleSliderChange = (newValue) => {
//   const newDifficulty = parseInt(newValue, 10);
//   if (newDifficulty <= state.permissions.difficulty) {
//     setDifficultyLevel(newDifficulty);
//   }
// };
// const handleSliderChange = (newValue) => {
//   const newDifficulty = parseInt(newValue, 10);
//   if (newDifficulty <= state.permissions.difficulty) {
//     setDifficultyLevel(newDifficulty);
//     setDisplayMessage(''); // Clear the display message when within allowed difficulty
//   } else {
//     // Keep the slider's visual feedback but indicate the level is locked
//     setDisplayMessage(' - Locked Difficulty');
//   }
// };

//  //Canvas stuff

// const circleVariants = {
//   initial: { y: 0 },
//   animate: { y: '-100vh' },
//   exit: { opacity: 0 },
// }

// const Circle = ({ onComplete }) => (
//   <motion.div
//     variants={circleVariants}
//     initial="initial"
//     animate="animate"
//     exit="exit"
//     onAnimationComplete={onComplete}
//     style={{
//       background: 'red',
//       borderRadius: '50%',
//       width: '100px',
//       height: '100px',
//     }}
//   />
// )

// const explosionVariants = {
//   initial: { scale: 0 },
//   animate: { scale: [1, 2, 2, 1, 1], opacity: [1, 1, 1, 0, 0] },
// }
