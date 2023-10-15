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

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData)
  // const [screen, setScreen] = useState(null)

  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  console.log(
    `[App.js ContextualState and ContextualDispatch]`,
    contextualState,
    contextualDispatch,
  )

  return (
    <div style={{ backgroundColor: 'black' }}>
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
        <Screen gameData={gameData} dispatch={dispatch} map={map} />
      </div>
    </div>
    // #TODO: Test out why tailwind is broken here
    // <h1 className="text-3xl font-bold underline">Hello world!</h1>
  )
}
