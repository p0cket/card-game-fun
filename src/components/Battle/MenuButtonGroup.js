import React, { useState } from 'react'
import { energyEmoji } from '../../consts/consts'
import PropTypes from 'prop-types'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { showTheAttack } from '../../handlers/popup/attackPopupHandlers'

function MenuButtonGroup({ togglePopup, ourCurrentMon }) {
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  const [currentView, setCurrentView] = useState('menu')

  const [itemModalVisible, setItemModalVisible] = useState(false)
  const { items } = contextualState.bag

  const ItemMenuModal = () => {
    // pass in the item to use. (item)
    const useItem = (item) => {
      if (item.qty > 0) {
        console.log(`Using ${item.contents.name}...`)
        contextualDispatch({
          type: 'USE_ITEM',
          payload: item,
        })
      } else {
        console.log(
          `You don't have any ${item.contents.name} left. QTy is ${item.qty}`,
        )
      }
    }

    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 font-[silkscreen]">
        <div
          className="bg-boy-green text-white p-4 rounded max-w-md w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="item-modal-title"
        >
          <h2 id="item-modal-title" className="font-bold text-lg mb-4">
            Items
          </h2>
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2"
              >
                <span>{item.contents.name}</span>
                <span>{item.qty}x</span>
                <button
                  onClick={() => useItem(item)}
                  disabled={item.qty === 0}
                  className={`ml-4 ${
                    item.quantity > 0 ? 'text-black' : 'text-gray-700'
                  }`}
                >
                  Use
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setItemModalVisible(false)}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
  // const showTheAttack = (move, contextualDispatch, ourCurrentMon) => {
  //   console.log(`move`, move)
  //   console.log(`ourCurrentMon`, ourCurrentMon)
  //   contextualDispatch({
  //     type: 'SHOW_ATTACK',
  //     payload: { attack: move, ourCurrentMon: ourCurrentMon },
  //   })
  // }
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
          <div
            className="text-[#ddf4c5] text-sm p-1 flex items-center justify-center"
            onClick={() => setItemModalVisible(true)}
          >
            Items
          </div>
          <div className="text-sm p-1 flex items-center justify-center">
            🔒PaLs
          </div>
          <div
            // onClick={togglePopup}
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
        <div onClick={() => setCurrentView('menu')}>
          <div className="text-white bg-boy-green-500 flex justify-end">x</div>
        </div>

        {ourCurrentMon.moves.map((move, index) => (
          <div
            className="cursor-pointer text-sm text-white"
            key={index}
            onClick={() => showTheAttack(move, contextualDispatch, true, ourCurrentMon)}
          >
            {move.name}
          </div>
        ))}
        {/* <div
          className="cursor-pointer text-sm text-white"
          onClick={() => setCurrentView('menu')}
        >
          Blizzard
        </div> */}
      </div>
    </div>
  )
  return (
    <div className="w-full mx-2 relative">
      {' '}
      {/* Add relative here for positioning the modal */}
      {currentView === 'menu' ? menuButtons() : attackButtons()}
      {itemModalVisible && <ItemMenuModal />}
    </div>
  )
}

MenuButtonGroup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
}

export default MenuButtonGroup
