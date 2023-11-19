import React, { useState } from 'react'
import Screen from './components/Screen'
import { useReducer } from 'react'
import { map } from './consts/mapGenerator_old'
import { startingData } from './consts/consts'
import reducer from './reducer'
import { useDispatchContext, useStateContext } from './MainContext'
import './scanlines.css'
import './styles.css'
import './index.css'
import './input.css'
// import ClickGlow from './components/effects/ClickGlow'
import Flashing from './components/effects/Flashing'
import Confetti from './components/effects/Confetti'
import DialoguePopup from './components/common/DialoguePopup'
import SpinningBoxes from './components/effects/SpinningBoxes'
import QuestionMarks from './components/effects/QuestionMarks'
import CharacterAnims from './components/effects/CharacterAnims'
import { cusLog } from './utils/debugging-utils'
import GeneralPopup from './components/common/GeneralPopup'
import SpiralTransition from './components/effects/transitions/GridPixel'
import ChallengerScreen from './components/effects/ChallengerScreen'
import { palImages } from './consts/pals/images'

const message = 'intro message'

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData)

  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  return (
    <div style={{ backgroundColor: 'black' }}>
      {/* <Flashing /> */}
      <div
        className="App scanlines"
        style={{
          backgroundImage: 'url(backgrounds/gridBGdark.png)',
          backgroundRepeat: 'repeat',
          // backgroundSize: '800px 500px',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh',
          margin: '0 auto',
          display: 'flex', // Added for potential flexbox centering
          justifyContent: 'center', // Center content horizontally in a flex container
          alignItems: 'center', // Center content vertically in a flex container
        }}
      >
        {/* < ClickGlow /> */}

        {/* Working animations */}
        {/* <SpinningBoxes /> */}
        {/* <QuestionMarks /> */}
        {/* <Confetti amount={300} /> */}
        {/* <CharacterAnims /> */}

        {/* Dialogue goes here and passes state in or runs from useReducer state somehow */}
        <DialoguePopup message={message} />
        <GeneralPopup message={message} />
        {/* <SpiralTransition delay={1} /> */}
        {/* <ChallengerScreen challengerName={"Mr Steven"} challengerImage={palImages[2]} /> */}
        <Screen gameData={gameData} dispatch={dispatch} map={map} />
      </div>
    </div>
    // #TODO: Test out why tailwind is broken here
    // <h1 className="text-3xl font-bold underline">Hello world!</h1>
  )
}
