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
          backgroundSize: '800px 500px',
          width: '100vw',
          height: '100vh',
          maxWidth: '800px',
          maxHeight: '1000px',
          // display this div in the center:
          margin: 'auto',
          center: 'true',
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
        {/* <DialoguePopup message={message} /> */}

        <Screen gameData={gameData} dispatch={dispatch} map={map} />
      </div>
    </div>
    // #TODO: Test out why tailwind is broken here
    // <h1 className="text-3xl font-bold underline">Hello world!</h1>
  )
}
