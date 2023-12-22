import React from 'react'
import { useStateContext } from '../../MainContext'

function HUDDetails() {
  const state = useStateContext()
  return (
    <div className="text-black bg-boy-green">
      rune 1 rune 2 rune 3 - map{' '}
      {JSON.stringify(state.current.scene.details.trainer.name)}
      {JSON.stringify(
        state.current.scene.details.trainer.monsters.map((m) => m.name),
      )}
      but actually
      {JSON.stringify(state.opponent.monsters.map((m) => m.name))}
    </div>
  )
}

export default HUDDetails
