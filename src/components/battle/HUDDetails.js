import React from 'react'
import { useStateContext } from '../../MainContext'
import Test_head from '../../assets/trainers/Test_head_gb.png'
import runeImg_4_3 from '../../assets/itemTestImages/itemsTone-4-column-3.png'

function HUDDetails() {
  const state = useStateContext()
  return (
    <div className="flex gap-2 p-1 mb-1 justify-between items-center text-black bg-boy-green font-[silkscreen]">
      <div className="flex flex-col items-center">
        <div>You vs: {state.current.scene.details.trainer.name}</div>
      </div>
      <div className="flex flex-row">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 bg-gray-400 ${
              index === 5 ? 'bg-green-400' : ''
            }`}
            style={{ marginLeft: '2px' }}
          ></div>
        ))}
      </div>
      <img
        src={Test_head}
        alt="trainer"
        className="w-8 h-8 border border-green-800"
      />
    </div>
  )
}

export default HUDDetails
{
  /* TODO: Show runes and trainer */
}
{
  // state.bag.runes.map((rune, index) => (
  //   <div key={index}>
  //     {/* 🏺{rune} */}
  //     <img src={runeImg_4_3} alt="rune"  className="w-6 h-6 border border-gray-200" />{' '}
  //   </div>
  // ))
}
{
  /* {JSON.stringify(
      state.current.scene.details.trainer.monsters.map((m) => m.name),
    )}
    but actually
    {JSON.stringify(state.opponent.monsters.map((m) => m.name))} */
}
