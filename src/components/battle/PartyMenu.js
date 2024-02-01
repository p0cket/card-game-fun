import { motion, useAnimation } from 'framer-motion'
import React from 'react'
import { swapPals } from '../../handlers/state/partyStateHandlers'
import { ACTIONS, useDispatchContext } from '../../MainContext'
import { PLAYERS } from '../../consts/consts'

function PartyMenu({
  party,
  palToSwapWith,
  setPalToSwapWith,
  setPalToSwapWithLocation,
  type,
}) {
  const imageControls = useAnimation()
  imageControls.start({
    y: [0, -5, 0, 5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  })

  const renderMonsterDetails = (monster, index) => {
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
                onClick={() => {
                  if (index !== 0) {
                    console.log(
                      `setPalToSwapWith this monster, index:`,
                      monster,
                      index,
                    )
                    setPalToSwapWith(monster)
                    setPalToSwapWithLocation(index)
                    dispatch({
                      type: ACTIONS.SWAP_PALS,
                      payload: {
                        palToSwap: party[0],
                        palLocation: 0,
                        palToSwapWith: monster,
                        palToSwapWithLocation: index,
                        player: PLAYERS.HUMAN,
                      },
                    })
                    dispatch({ type: ACTIONS.CLOSE_DIALOG })
                  }
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
                className="absolute left-0 top-0"
                style={{
                  width: `${
                    Math.max(0, monster.stats.hp / monster.stats.max_hp) * 100
                  }%`,
                  height: '100%',
                  borderRadius: '5px',
                  backgroundColor: 'darkgreen',
                }}
              ></div>
              <div
                className="absolute right-0 top-0"
                style={{
                  width: `${
                    Math.max(0, 1 - monster.stats.hp / monster.stats.max_hp) *
                    100
                  }%`,
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
      PartyMenu
      {party.map((pal, index) => renderMonsterDetails(pal, index))}
      {/* {type === 'fainted' &&
        party.map((pal, index) => renderMonsterDetails(pal, index))}
      {type === 'display' &&
        party.map((pal, index) => renderMonsterDetails(pal, index))} */}
    </div>
  )
}

export default PartyMenu
