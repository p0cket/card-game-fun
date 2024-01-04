import React from 'react'
import { useStateContext } from '../../MainContext'

// /Users/pocket/Documents/Code/card-game-fun/src/assets/itemTestImages/itemsTone-4-column-3.png
import runeImg_4_3 from '../../assets/itemTestImages/itemsTone-4-column-3.png'

function HUDDetails() {
  const state = useStateContext()
  return (
    <div className="flex gap-2 p-1 mb-1 justify-center text-black bg-boy-green font-[silkscreen]">
      {/* TODO: Show runes and trainer */}
      {
      // state.bag.runes.map((rune, index) => (
      //   <div key={index}>
      //     {/* 🏺{rune} */}
      //     <img src={runeImg_4_3} alt="rune"  className="w-6 h-6 border border-gray-200" />{' '}
      //   </div>
      // ))
      }
      You vs Trainer: {state.current.scene.details.trainer.name}
      {/* {JSON.stringify(
        state.current.scene.details.trainer.monsters.map((m) => m.name),
      )}
      but actually
      {JSON.stringify(state.opponent.monsters.map((m) => m.name))} */}
    </div>
  )
}

export default HUDDetails
