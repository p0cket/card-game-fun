import { motion, useAnimation } from 'framer-motion'
import React, { useState } from 'react'
import { swapPals } from '../../handlers/state/partyStateHandlers'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'

function PartyMenu({
  party,
  palToSwapWith,
  setPalToSwapWith,
  setPalToSwapWithLocation,
  type,
  // canSwitch = true,
  hasSwitchOption = true,
}) {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const inDebug = state.debug && state.debug.isOpen
  const [selectedOne, setSelectedOne] = useState()
  const [selectedTwo, setSelectedTwo] = useState()
  const selectPal = (pal, index) => {
    console.log(
      `selectPal: pal, index of ${index}.
      selectedOne is ${selectedOne}, selectedTwo is ${selectedTwo}`,
      pal,
      index,
      selectedOne,
      selectedTwo,
    )
    if (!selectedOne) {
      setSelectedOne({ pal: pal, index: index })
    } else if (!selectedTwo) {
      setSelectedTwo({ pal: pal, index: index })
    }
  }

  // const handlePalClick = (monster, index, isRegSwap) => {
  //   console.log(
  //     `handlePalClick: monster, index, isRegSwap`,
  //     monster,
  //     index,
  //     isRegSwap,
  //   )
  //   if (isRegSwap) {
  //     selectPal(monster, index)
  //   }
  //   // cases where pal is fainted. not regular swap
  //   else {
  //     runSwapOnFainted(index, monster, dispatch)
  //   }
  //   // isRegSwap
  //   // ? () => selectPal(monster, index)
  //   // : () =>
  // }

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

    // set the selecteds back to null
    setSelectedOne(null)
    setSelectedTwo(null)
  }

  const renderMonsterDetails = (monster, index, isRegSwap) => {
    console.log(`isRegSwap`, isRegSwap)
    console.log(`type`, type)
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
                onClick={() => {
                  //prev
                  // handlePalClick(monster, index, isRegSwap)
                  // back to og
                  runSwapOnFainted(index, monster, dispatch)
                }}
              >
                <motion.img
                  src={monster.image}
                  alt={monster.name}
                  className="max-w-[35px] max-h-[35px] object-cover"
                  animate={imageControls}
                />
                <div>{monster.name}</div>
                <p className="p-1">
                  {JSON.stringify(isRegSwap)} HP: {monster.stats.hp}/
                  {monster.stats.max_hp}
                </p>
              </div>
            )}
            {type === 'display' && (
              <div
                className={`flex items-center justify-between w-full ${
                  selectedOne && selectedOne.index === index
                    ? 'bg-green-600'
                    : ''
                } ${
                  selectedTwo && selectedTwo.index === index
                    ? 'bg-green-800'
                    : ''
                 }
              `}
                onClick={(e) => {
                  e.stopPropagation() // Prevent the event from bubbling up
                  if (switchMode) {
                    selectPal(monster, index)
                  } else {
                    console.log(`clicked pal but not in switch mode`)
                  }
                }}
                // onClick={() => {
                //   if (switchMode) {
                //     selectPal(monster, index)
                //   } else {
                //     console.log(`clicked pal but not in switch mode`)
                //   }
                // }}
              >
                <motion.img
                  src={monster.image}
                  alt={monster.name}
                  className="max-w-[35px] max-h-[35px] object-cover"
                  animate={imageControls}
                />
                <div>{monster.name}</div>
                <p className="p-1">
                  r HP: {monster.stats.hp}/{monster.stats.max_hp}
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
      <div>Party</div>
      {party.map((pal, index) =>
        renderMonsterDetails(pal, index, hasSwitchOption),
      )}
      {hasSwitchOption &&
        inDebug &&
        (switchMode ? (
          <button onClick={toggleSwitchMode}>
            Cancel Swap (switchMode:{JSON.stringify(switchMode)})
          </button>
        ) : (
          <button onClick={toggleSwitchMode}>
            Switch Pal? (switchMode:{JSON.stringify(switchMode)})
          </button>
        ))}
      {selectedOne && selectedTwo && (
        <button
          onClick={() =>
            runSwap(
              selectedOne.pal,
              selectedOne.index,
              selectedTwo.pal,
              selectedTwo.index,
              dispatch,
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

//add in logic for if swap is regular swap
// { isRegSwap ? onClick={() => runSwap{ monster, index}} : ''}
//replace

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
