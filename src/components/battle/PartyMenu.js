import { motion, useAnimation } from 'framer-motion'
import React, { useState } from 'react'
import { swapPals } from '../../handlers/state/partyStateHandlers'
import { ACTIONS, useDispatchContext } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'

function PartyMenu({
  party,
  palToSwapWith,
  setPalToSwapWith,
  setPalToSwapWithLocation,
  type,
  canSwitch = true,
}) {
  const [selectedOne, setSelectedOne] = useState()
  const [selectedTwo, setSelectedTwo] = useState()
  const selectPal = (pal, index) => {
    if (!selectedOne) {
      setSelectedOne({ pal: pal, index: index })
    } else if (!selectedTwo) {
      setSelectedTwo({ pal: pal, index: index })
    }
  }

  const [switchMode, setSwitchMode] = useState(false)
  const toggleSwitchMode = () => setSwitchMode(!switchMode)

  const imageControls = useAnimation()
  imageControls.start({
    y: [0, -5, 0, 5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  })

  const runSwapOnFainted = (index, pal, dispatch) => {
    if (index !== 0) {
      console.log(`setPalToSwapWith this pal, index:`, pal, index)
      setPalToSwapWith(pal)
      setPalToSwapWithLocation(index)
      dispatch({
        type: ACTIONS.SWAP_PALS,
        payload: {
          palToSwap: party[0],
          palLocation: 0,
          palToSwapWith: pal,
          palToSwapWithLocation: index,
          player: PLAYERS.HUMAN,
        },
      })
      dispatch({ type: ACTIONS.CLOSE_DIALOG })
    }
  }

  const runSwap = (
    pal,
    palLocation,
    palToSwapWith,
    palToSwapWithLocation,
    dispatch,
  ) => {
    console.log(
      `setPalToSwapWith this pal, index:`,
      pal,
      palLocation,
      palToSwapWith,
      palToSwapWithLocation,
      dispatch,
    )
    // setPalToSwapWith(palToSwapWith)
    // setPalToSwapWithLocation(palToSwapWithLocation)
    dispatch({
      type: ACTIONS.SWAP_PALS,
      payload: {
        palToSwap: pal,
        palLocation: palLocation,
        palToSwapWith: palToSwapWith,
        palToSwapWithLocation: palToSwapWithLocation,
        player: PLAYERS.HUMAN,
      },
    })
    dispatch({ type: ACTIONS.CLOSE_DIALOG })
  }

  const renderMonsterDetails = (monster, index, isRegSwap) => {
    const dispatch = useDispatchContext()
    return (
      <div
        key={monster ? monster.id : 'empty-slot'}
        className="mb-2 border border-lightgreen w-full"
      >
        {monster ? (
          <>
            {type === 'fainted' && (
              <div
                className={`flex items-center justify-between w-full ${
                  index === 0 ? 'pointer-events-none opacity-50' : ''
                }`}
                //add in logic for if swap is regular swap
                // { isRegSwap ? onClick={() => runSwap{ monster, index}} : ''}
                //replace
                onClick={
                  isRegSwap
                    ? () => selectPal(monster, index)
                    : () => runSwapOnFainted(index, monster, dispatch)
                  // () => {
                  //     if (index !== 0) {
                  //       console.log(
                  //         `setPalToSwapWith this monster, index:`,
                  //         monster,
                  //         index,
                  //       )
                  //       setPalToSwapWith(monster)
                  //       setPalToSwapWithLocation(index)
                  //       dispatch({
                  //         type: ACTIONS.SWAP_PALS,
                  //         payload: {
                  //           palToSwap: party[0],
                  //           palLocation: 0,
                  //           palToSwapWith: monster,
                  //           palToSwapWithLocation: index,
                  //           player: PLAYERS.HUMAN,
                  //         },
                  //       })
                  //       dispatch({ type: ACTIONS.CLOSE_DIALOG })
                  //     }
                  //   }
                }
              >
                <motion.img
                  src={monster.image}
                  alt={monster.name}
                  className="max-w-[35px] max-h-[35px] object-cover"
                  animate={imageControls}
                />
                <div>{monster.name}</div>
                <p className="p-1">
                  HP: {monster.stats.hp}/{monster.stats.max_hp}
                </p>
              </div>
            )}
            {type === 'display' && (
              <div
                className={`flex items-center justify-between w-full
            `}
              >
                <motion.img
                  src={monster.image}
                  alt={monster.name}
                  className="max-w-[35px] max-h-[35px] object-cover"
                  animate={imageControls}
                />
                <div>{monster.name}</div>
                <p className="p-1">
                  HP: {monster.stats.hp}/{monster.stats.max_hp}
                </p>
              </div>
            )}
            <div className="relative bg-gray-900 w-full h-2 px-2 pb-1 rounded mt-1">
              <div
                className="absolute left-0 top-0 bg-darkgreen"
                style={{
                  width: `${
                    Math.max(
                      0,
                      Math.min(1, monster.stats.hp / monster.stats.max_hp),
                    ) * 100
                  }%`, // Ensure the width is between 0% and 100%
                  height: '100%',
                  borderRadius: '5px',
                  backgroundColor: 'darkgreen',
                }}
              ></div>
              <div
                className="absolute right-0 top-0 bg-gray-500"
                style={{
                  width: `${
                    Math.max(
                      0,
                      Math.min(1, 1 - monster.stats.hp / monster.stats.max_hp),
                    ) * 100
                  }%`, // Ensure the width is between 0% and 100%
                  height: '100%',
                  backgroundColor: '#5c5c5c',
                }}
              ></div>
            </div>
          </>
        ) : (
          <p>Empty Slot</p>
        )}
      </div>
    )
  }
  return (
    <div>
      <div>PartyMenu</div>
      {party.map((pal, index) => renderMonsterDetails(pal, index))}
      {canSwitch &&
        (switchMode ? (
          <button onClick={toggleSwitchMode}>Switch Pal?</button>
        ) : (
          <button onClick={toggleSwitchMode}>Cancel Swap</button>
        ))}
      {selectedOne && selectedTwo && (
        <button
          onClick={() =>
            runSwap(
              selectedOne.pal,
              selectedOne.index,
              selectedTwo.pal,
              selectedTwo.index,
            )
          }
        >
          Confirm Swap
        </button>
      )}
      {/* {type === 'fainted' &&
        party.map((pal, index) => renderMonsterDetails(pal, index))}
      {type === 'display' &&
        party.map((pal, index) => renderMonsterDetails(pal, index))} */}
    </div>
  )
}

export default PartyMenu
