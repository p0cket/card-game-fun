import React, { useState } from 'react'
import Screen from './components/Screen'
import { useReducer } from 'react'
import { map } from './consts/mapGenerator_old'
import reducer from './reducer'
import { useDispatchContext, useStateContext } from './MainContext'
import './scanlines.css'
import './styles.css'
import './index.css'
import './input.css'
// import ClickGlow from './components/effects/ClickGlow'
import Flashing from './components/effects/Flashing'
import Confetti from './components/effects/Confetti'
import SpinningBoxes from './components/effects/SpinningBoxes'
import QuestionMarks from './components/effects/QuestionMarks'
import CharacterAnims from './components/effects/CharacterAnims'
import { cusLog } from './utils/debugging-utils'
import GeneralPopup from './components/common/GeneralPopup'
import SpiralTransition from './components/effects/transitions/GridPixel'
import ChallengerScreen from './components/effects/ChallengerScreen'
import { palImages } from './consts/pals/images'
import { gameLog } from './utils/logFormatter'
import NotEnoughEnergy from './components/dialog/NotEnoughEnergy'
import DialogManager, { DIALOGS } from './components/dialog/DialogManager'
import { startingDataOld } from './consts/startingData'


const message = 'intro message'

export default function App() {
  const [gameDataOld, dispatchOld] = useReducer(reducer, startingDataOld)

  const state = useStateContext()
  const dispatch = useDispatchContext()
  
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
          // uncommenting this causes the real estate to be too small
          // to contain the contents.
          // fix or make contents smaller
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
        {/* <DialoguePopup message={message} /> */}
        {/* <NotEnoughEnergy /> */}
       {state.dialog ? <DialogManager current={state.dialog.type} /> : ""}
        <GeneralPopup message={message} />
        {/* <SpiralTransition delay={1} /> */}
        {/* <ChallengerScreen challengerName={"Mr Steven"} challengerImage={palImages[2]} /> */}
        <div style={{width: "100%"}}><Screen gameData={gameDataOld} dispatch={dispatchOld} map={map} /></div>
      </div>
    </div>
  )
}
