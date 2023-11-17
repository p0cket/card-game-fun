import React, { useState } from 'react'
import { energyEmoji } from '../../consts/consts'
import PropTypes from 'prop-types'
import { useDispatchContext, useStateContext } from '../../MainContext'

function MenuButtonGroup({ togglePopup, ourCurrentMon }) {
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  const [currentView, setCurrentView] = useState('menu')

  const showTheAttack = (move, ourCurrentMon) => {
    console.log(`move`, move)
    console.log(`ourCurrentMon`, ourCurrentMon)
    contextualDispatch({
      type: 'SHOW_ATTACK',
      payload: { attack: move, ourCurrentMon: ourCurrentMon },
    })
  }
  console.log(`ourCurrentMon!:D `, ourCurrentMon)
  const menuButtons = () => (
    <div className="font-[silkscreen] flex w-full justify-between text-white bg-[#5a7d2a] border border-[#4e6a22] shadow-inner">
      <div className="flex items-center justify-center flex-grow p-1 text-sm">
        {contextualState.game.player.energy} Energy {energyEmoji}
      </div>
      <div className="flex flex-grow justify-around items-center m-1 bg-[#5a7d2a]">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full bg-boy-green border border-gray-400 rounded-sm">
          <div
            onClick={() => setCurrentView('attacks')}
            className="text-[#ddf4c5] text-sm cursor-pointer p-1 flex items-center justify-center"
          >
            Attack
          </div>
          <div className="text-[#ddf4c5] text-sm p-1 flex items-center justify-center">
            🔒Items
          </div>
          <div className="text-sm p-1 flex items-center justify-center">
            🔒PaLs
          </div>
          <div
            onClick={togglePopup}
            className="text-sm p-1 flex items-center justify-center"
          >
            🔒Options
          </div>
        </div>
      </div>
    </div>
  )

  const attackButtons = () => (
    <div className="flex flex-grow justify-around items-center  bg-[#5a7d2a]">
      <div className="font-[silkscreen] flex-none w-1/4 items-center justify-center text-sm text-white">
        {contextualState.game.player.energy} Energy {energyEmoji}
      </div>
      <div className="border border-gray-400 rounded-sm flex flex-grow flex-col font-[silkscreen]">
        {ourCurrentMon.moves.map((move, index) => (
          <div
            className="cursor-pointer text-sm text-white"
            key={index}
            onClick={() => showTheAttack(move, ourCurrentMon)}
          >
            {move.name}
          </div>
        ))}
        <div
          className="cursor-pointer text-sm text-white"
          onClick={() => setCurrentView('menu')}
        >
          Blizzard
        </div>
      </div>
      {/* <div
        onClick={() => setCurrentView('menu')}
        className="p-2 cursor-pointer"
      >
        X
      </div> */}
    </div>
  )

  return (
    <div className="w-full  mx-2 ">
      {currentView === 'menu' ? menuButtons() : attackButtons()}
    </div>
  )
}

MenuButtonGroup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
}

export default MenuButtonGroup
