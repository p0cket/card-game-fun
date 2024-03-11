import React, { useState } from 'react'
import { Luminowl, Glowbuggle, Umbrabunny, getLuminowl, getGlowbuggle, getUmbrabunny } from '../../consts/pals/pals'
import { addPalToParty } from '../../handlers/partyHandlers_new'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'
import PalDetailsPopup from '../common/PalDetailsPopup'
import selectStartImg from './../../assets/eventImages/SelectStarterImg.png'

const ChibipalsSelection = () => {
  const [selectedPal, setSelectedPal] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const palStarters = [getLuminowl(), getGlowbuggle(), getUmbrabunny()]
  const handleMonsterClick = (clickedPal) => {
    setSelectedPal(clickedPal)
    setShowDetails(true)
  }
  const handleGoBack = () => {
    setShowDetails(false)
  }
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  const inDebug = contextualState.debug && contextualState.debug.isOpen

  const handleSelect = (selectedPal) => {
    console.log(`you selected monster: ${selectedPal.name}`, selectedPal)
    // #TODO: This is the code that breaks things but I need to make it work:
    setShowDetails(false)
    // this is just the party obj, not the full state
    const partyWithPalAdded = addPalToParty(
      selectedPal,
      contextualState.userParty,
    )
    const stateWithParty = {
      ...contextualState,
      userParty: partyWithPalAdded,
    }
    const nextSceneState = updateScene(stateWithParty, {
      screen: SCENES.MAP,
      details: null,
    })
    const nextLevelState = updateLevel(nextSceneState, 0)

    // Clone the current state into a new variable
    const newState = { ...nextLevelState }
    // Dispatch the updated state
    contextualDispatch({
      type: ACTIONS.UPDATE_GAMEDATA,
      payload: newState,
    })
  }

  const addPalManually = (selectedPal) => {
    const partyWithPalAdded = addPalToParty(
      selectedPal,
      contextualState.userParty,
    )
    const stateWithParty = {
      ...contextualState,
      userParty: partyWithPalAdded,
    }
    contextualDispatch({
      type: ACTIONS.UPDATE_GAMEDATA,
      payload: stateWithParty,
    })
  }

  return (
    <div className="font-[silkscreen] text-white m-1">
      {!showDetails && (
        <div>
          {' '}
          <div className="text-center text-3xl p-1 mb-1 border-2 border-green-600">To defeat a gym leader, youll need help...</div>
          <img src={selectStartImg} alt="select starter" />
        </div>
      )}
      <h1 className="text-center text-2xl font-bold">Recruit Your Chibipal</h1>
      <div className="flex justify-center ">
        {palStarters.map((monster) => (
          <div
            key={monster.id}
            className={`flex-1 m-1 cursor-pointer p-1 border border-transparent rounded-lg ${
              selectedPal === monster ? 'border-green-800' : ''
            }`}
            onClick={() => handleMonsterClick(monster)}
            style={{ flex: '1', margin: '2px', cursor: 'pointer' }}
          >
            <button className="w-full h-full  bg-boy-green">
              {monster.name}
            </button>
            {/* <p className="text-center text-sm pt-3">{monster.name}</p> */}
          </div>
        ))}
      </div>

      {showDetails && (
        <>
          <PalDetailsPopup
            selectedPal={selectedPal}
            setShowDetails={setShowDetails}
            handleSelect={handleSelect}
            handleGoBack={handleGoBack}
          />
          {inDebug && (
            <button onClick={() => addPalManually(selectedPal)}>
              Manually Add Pal
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ChibipalsSelection
