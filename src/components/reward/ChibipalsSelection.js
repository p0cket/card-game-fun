import React, { useState } from 'react'
import { Luminowl, Glowbuggle, Umbrabunny } from '../../consts/pals/pals'
import { addPalToParty } from '../../handlers/partyHandlers_new'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import {
  SCENES,
  updateLevel,
  updateScene,
} from '../../handlers/sceneHandlers_new'

const ChibipalsSelection = () => {
  const [selectedPal, setSelectedPal] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const palStarters = [Luminowl, Glowbuggle, Umbrabunny]
  const handleMonsterClick = (clickedPal) => {
    setSelectedPal(clickedPal)
    setShowDetails(true)
  }
  const handleGoBack = () => {
    setShowDetails(false)
  }
  const popupStyle = {
    position: 'fixed',
    transform: 'translate( 0%, -50%)',
    background: 'green',
    padding: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    color: 'white',
    textAlign: 'center',
  }

  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

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
      type: ACTIONS.UPDATEGAMEDATA,
      payload: newState,
    })
  }

  return (
    <div className="font-[silkscreen] text-white m-4">
      <h1 className="text-center text-2xl font-bold">Adopt Your Chibipal</h1>
      <div className="flex justify-center ">
        {palStarters.map((monster) => (
          <div
            key={monster.id}
            className={`flex-1 m-2 cursor-pointer p-2 border border-transparent rounded-lg ${
              selectedPal === monster ? 'border-green-800' : ''
            }`}
            onClick={() => handleMonsterClick(monster)}
            style={{ flex: '1', margin: '5px', cursor: 'pointer' }}
          >
            <div
              className={`w-full pb-full rounded-full ${
                monster.image ? 'bg-cover' : 'bg-green-500'
              }`}
            >
              {monster.image && (
                <img
                  src={monster.image}
                  alt={monster.name}
                  className="w-[100px] h-[100px] object-cover"
                  key={monster.id} // Added key prop
                />
              )}
            </div>
            <p className="text-center text-sm pt-3">{monster.name}</p>
          </div>
        ))}
      </div>

      {showDetails && (
        <div style={popupStyle}>
          <div
            className="popup-content"
            style={{ fontSize: '14px', margin: '10px' }}
          >
            <p style={{ fontSize: '16px', marginBottom: '4px' }}>
              {selectedPal.name}
            </p>
            <div style={{ display: 'flex' }}>
              <img
                src={selectedPal.image}
                alt={selectedPal.name}
                style={{
                  width: '240px',
                  height: '240px',
                  objectFit: 'cover',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                }}
              />{' '}
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '10px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>Level:</span>
                      <span>{selectedPal.level}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px',
                        }}
                      ></div>
                      <div
                        style={{
                          width: '100px',
                          height: '10px',
                          backgroundColor: 'lightgray',
                          borderRadius: '5px',
                          border: '1px solid lightgreen',
                        }}
                      >
                        <div
                          style={{
                            width: `${
                              (selectedPal.stats.hp /
                                selectedPal.stats.max_hp) *
                              100
                            }%`,
                            height: '100%',
                            backgroundColor: 'darkgreen',
                            borderRadius: '3px',
                          }}
                        ></div>
                      </div>
                      <div style={{ marginTop: '4px', fontSize: '12px' }}>
                        {selectedPal.stats.hp} /{' '}
                        {selectedPal.stats.max_hp
                          ? selectedPal.stats.max_hp
                          : 'not found'}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>Atk:</span>
                    <span>{selectedPal.stats.attack.name}</span>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>Def:</span>
                    <span>{selectedPal.stats.defense}</span>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>Speed:</span>
                    <span>{selectedPal.stats.speed}</span>
                  </div>
                </div>
                {selectedPal.elemental_type}
                {'-'}
                {selectedPal.creature_type} [{selectedPal.specialty_group}]
              </div>{' '}
            </div>
            <div>
              <span style={{ marginRight: '10px' }}>
                Lvl: {selectedPal.level}
              </span>
              <span style={{ marginRight: '10px' }}>
                Exp: {selectedPal.experience}
              </span>
              <span>Exp to Next Lvl: xxx</span>
              <div
                style={{
                  width: '100%',
                  backgroundColor: 'gray',
                  height: '10px',
                  borderRadius: '2px',
                  border: '1px solid lightgreen',
                }}
              >
                <div
                  style={{
                    width: `${30}%`,
                    backgroundColor: 'darkgreen',
                    height: '100%',
                    borderRadius: '2px',
                  }}
                ></div>
              </div>
            </div>

            <div>
              <p style={{ padding: '10px' }}>
                <span>{selectedPal.description}</span>
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                gap: '4px',
              }}
            >
              {/* weird bug below, don't keep it */}
              {/* <div key={index}>Moves: </div> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  gap: `2px`,
                }}
              >
                {selectedPal.moves.map((move, index) => (
                  <div key={index} style={{ padding: '1px' }}>
                    <span
                      style={{
                        backgroundColor: 'lightgreen',
                        borderRadius: '4px',
                        padding: '3px',
                        color: 'darkgreen',
                      }}
                    >
                      {move.name}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div>Possible Moves:</div>
                <span>
                  <div
                    style={{ color: 'lightGray', gap: '2px', display: 'flex' }}
                  >
                    {selectedPal.possible_moves.map((move, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          // marginBottom: "4px",
                          backgroundColor: 'black',
                          borderRadius: '8%',
                          padding: '2px',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'gray',
                            borderRadius: '50%',
                            width: '7px', // Adjust the width and height as needed
                            height: '7px',
                            marginRight: '2px',
                            // padding: "3px",
                          }}
                        ></div>
                        <span>{move}</span>
                      </div>
                    ))}
                  </div>
                </span>
              </div>
              <span>
                <div>Passive:</div>
                <span
                  style={{
                    backgroundColor: 'lightgreen',
                    borderRadius: '4px',
                    padding: '1px',
                    color: 'green',
                  }}
                >
                  {selectedPal.passive_ability}
                </span>
              </span>
            </div>
            <div className="p-4 flex gap-4 w-full justify-center">
              <button
                className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleSelect(selectedPal)}
              >
                Select
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChibipalsSelection
