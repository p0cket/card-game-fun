import React from 'react'
import { useStateContext } from '../../MainContext'

function HUDDetails() {
  const state = useStateContext()
  return (
    <div className="flex gap-2 p-2 justify-center text-black bg-boy-green font-[silkscreen]">
      {state.bag.runes.map((rune, index) => (
        <div key={index}>🏺{rune} </div>
      ))}
      {state.current.scene.details.trainer.name}
      {/* {JSON.stringify(
        state.current.scene.details.trainer.monsters.map((m) => m.name),
      )}
      but actually
      {JSON.stringify(state.opponent.monsters.map((m) => m.name))} */}
    </div>
  )
}

export default HUDDetails
