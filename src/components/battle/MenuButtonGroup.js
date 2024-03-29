import React, { useEffect, useState } from 'react'
import { energyEmoji } from '../../consts/consts'
import PropTypes from 'prop-types'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import { showTheAttack } from '../../handlers/popup/attackPopupHandlers'
import { MeteorStrike } from '../../consts/allMoves'
import ItemMenuModal from '../common/ItemMenuModal'
import { DIALOGS } from '../dialog/DialogManager'

function MenuButtonGroup({ togglePopup, ourCurrentMon }) {
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  const inDebug = contextualState.debug && contextualState.debug.isOpen
  const [currentView, setCurrentView] = useState('menu')
  const [debugMenuOpen, setDebugMenuOpen] = useState(false)

  const [itemModalVisible, setItemModalVisible] = useState(false)
  const { items } = contextualState.bag

  //   useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.shiftKey && event.key === 'D') {
  //       setDebugMenuOpen((prev) => !prev)
  //     }
  //   }

  //   document.addEventListener('keydown', handleKeyDown)

  //   // Clean up to avoid memory leak
  //   return () => document.removeEventListener('keydown', handleKeyDown)
  // }, [])
  const togglePalMenu = () => {
    // set current menu to swap
    // state = switchDialog(state, DIALOGS.SWAP_PAL)
    contextualDispatch({
      type: ACTIONS.CHANGE_DIALOG,
      payload: { dialog: DIALOGS.SWAP_PAL_BASIC },
    })
  }

  console.log(`ourCurrentMon!:D `, ourCurrentMon)
  const menuButtons = () => (
    <div className="font-[silkscreen] flex w-full justify-between text-white bg-[#5a7d2a] border border-[#4e6a22] shadow-inner">
      <div className="flex items-center justify-center flex-grow p-1 text-sm">
        {contextualState.game.player.energy} Energy {energyEmoji}
      </div>
      {inDebug && (
        <div className="flex items-start">
          {contextualState.game.player.energy} Energy
          <div className="relative w-full h-4 ml-2 bg-gray-400">
            <motion.div
              className="bg-blue-500 h-full"
              initial={{ height: '0%' }}
              animate={{
                height: `${Math.min(100, contextualState.game.player.energy)}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-grow justify-around items-center m-1 bg-[#5a7d2a]">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full bg-boy-green border border-gray-400 rounded-sm">
          <div
            onClick={() => setCurrentView('attacks')}
            className="text-[#ddf4c5] text-sm cursor-pointer p-1 flex items-center justify-center"
          >
            Attack
          </div>
          <div
            className="text-[#ddf4c5] text-sm p-1 flex items-center justify-center"
            onClick={() => setItemModalVisible(true)}
          >
            Items
          </div>
          {inDebug ? (
            <div
              className="text-sm p-1 flex items-center justify-center"
              onClick={togglePalMenu}
            >
              🔒PaLs
            </div>
          ) : (
            <div className="text-sm p-1 flex items-center justify-center">
              🔒PaLs
            </div>
          )}
          <div
            // onClick={togglePopup} maybe options button?
            className="text-sm p-1 flex items-center justify-center"
          >
            🔒End Turn
          </div>
        </div>
      </div>
    </div>
  )

  const attackButtons = () => (
    <div className="flex flex-grow justify-around items-center bg-[#5a7d2a]">
      <div className="font-[silkscreen] flex-none w-1/4 items-center justify-center text-sm text-white">
        {contextualState.game.player.energy} Energy {energyEmoji}
      </div>
      <div className="border border-gray-400 rounded-sm flex p-2 flex-grow flex-col font-[silkscreen]">
        {ourCurrentMon.moves.map((move, index) => (
          <div
            className="cursor-pointer text-sm text-white"
            key={index}
            onClick={() =>
              showTheAttack(move, contextualDispatch, true, ourCurrentMon)
            }
          >
            {move.name}
          </div>
        ))}
        {contextualState.debug && contextualState.debug.isOpen ? (
          <div>DEBUG / LIMIT BREAK</div>
        ) : (
          ''
        )}
        {/*  */}
        {contextualState.debug && contextualState.debug.isOpen && (
          <div
            className="cursor-pointer text-sm text-white"
            onClick={() =>
              showTheAttack(
                MeteorStrike,
                contextualDispatch,
                true,
                ourCurrentMon,
              )
            }
          >
            {MeteorStrike.name}
          </div>
        )}
        <div onClick={() => setCurrentView('menu')}>
          <div className="text-white bg-boy-green-500 flex justify-end">x</div>
        </div>
      </div>
    </div>
  )
  return (
    <div className="w-full relative">
      {' '}
      {/* Add relative here for positioning the modal */}
      {currentView === 'menu' ? menuButtons() : attackButtons()}
      {/* test this and then replace */}
      {/* {currentView === 'menu' ? menuButtons() : ""} */}
      {/* {currentView === 'attacks' ?  attackButtons() : ""} */}
      {itemModalVisible && (
        <ItemMenuModal
          items={items}
          setItemModalVisible={setItemModalVisible}
        />
      )}
    </div>
  )
}

MenuButtonGroup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
}

export default MenuButtonGroup
