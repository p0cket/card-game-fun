import React, { useState } from 'react'
import { energyEmoji } from '../../consts/consts'
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers'
import { ACTIONS } from '../../MainContext'
import stunImg from './../../assets/packImages/Stun.png'

function RenderIndAttack({
  attack,
  contextualState,
  contextualDispatch,
  togglePopup,
}) {
  // const [basicAttackSelected, setBasicAttackSelected] = useState(true)
  const [attackType, setAttackType] = useState('basic') // Default to 'basic' attack
  const {
    name,
    type,
    damage,
    speed,
    fuel,
    effect,
    priority,
    targets,
    notSoFast,
    forceful,
  } = attack

  const runMove = (move, pal) => {
    if (togglePopup !== undefined) {
      togglePopup()
    }

    executeMove({
      // context:
      state: contextualState,
      dispatch: contextualDispatch,
      // command:
      pal: pal,
      move: move,
      phase: ATK_PHASES.PAY,
      // actionDetails:
      userSlot: 0,
      targets: { ally: null, enemy: [0] },
      player: 'human',
      possessed: false,
    })
  }

  const renderBasic = (move) => {
    return (
      <div className="bg-boy-lightgreen p-1 rounded shadow">
        {/* <div className="text-left text-lg mb-2">
          {move.name} ({move.type})
        </div> */}
        <div className="flex justify-between mb-2">
          <div className="p-1 m-1 bg-green-600">
            <img src={stunImg} alt={move.name} className="w-28" />
          </div>
          <table>
            <tbody>
              <tr>
                <td className="text-gray-600 text-left">Damage:</td>
                <td>{move.damage}</td>
              </tr>
              <tr>
                <td className="text-gray-600 text-left">Speed:</td>
                <td>{move.speed}</td>
              </tr>
              <tr>
                <td className="text-gray-600 text-left">Accuracy:</td>
                <td>95%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-left">
          <div className="mb-2">{move.effect.description}</div>
          <div>{`May ${move.effect.result} (${move.effect.chance})`}</div>
          <div>Targets: {move.targets.join(', ')}</div>
        </div>
        {/* <button
        className="bg-boy-green text-white cursor-pointer py-2 px-4 text-lg font-bold rounded shadow"
        onClick={() => runMove(move)}
      >
        Use
      </button> */}
      </div>
    )
  }

  const renderForceful = (move) => {
    return (
      <div className="flex flex-col">
        <div className="flex">
          <div>
            {forceful.fuel}
            {energyEmoji}
          </div>
          <div>Speed: {forceful.speed}</div>
          <div>{forceful.damage}DMG</div>
          <div>{forceful.type}</div>
        </div>
        <div>Effect: {forceful.effect.description}</div>
        <div>chance: {forceful.effect.chance}</div>
        <div>result: {forceful.effect.result}</div>
        <div>Targets: {forceful.targets.join(', ')}</div>
      </div>
    )
  }

  const renderCounter = (move) => {
    return <div>CounterAttack</div>
  }

  const moveFormToRender = (move) => {
    if (attackType === 'basic') {
      return renderBasic(move)
    } else if (attackType === 'forceful') {
      return renderForceful(move)
    } else if (attackType === 'notSoFast') {
      return renderCounter(move)
    }
  }
  return (
    <div className="border border-green-400 flex flex-col items-stretch p-1 my-1 bg-boy-lightgreen">
      {/* <div className="flex">
        <div
          className={`px-2 py-1 text-lg font-bold rounded shadow cursor-pointer mx-1 ${
            attackType === 'basic'
              ? 'bg-boy-green text-white'
              : 'bg-gray-600 text-black'
          }`}
          onClick={() => setAttackType('basic')}
        >
          {attack.name}
        </div>
      </div> */}
      {moveFormToRender(attack)}
      <div className="flex gap-2">
        <button
          className="w-3/4 bg-boy-green text-white cursor-pointer py-2 px-4 mt-2 text-lg font-bold rounded shadow"
          onClick={() => runMove(attack)}
        >
          Use ({attack.cost.energy} {energyEmoji})
        </button>{' '}
        <button
          className="bg-boy-green text-white flex flex-grow justify-center cursor-pointer py-2 mt-2 text-lg font-bold rounded shadow"
          onClick={() => runMove(attack)}
        >
          +{/* (8 {energyEmoji}) */}
        </button>
      </div>
      {/* <button className="bg-boy-green text-white cursor-pointer py-2 px-4 text-lg font-bold rounded shadow">
          Use
        </button> */}
    </div>
  )
}

export default RenderIndAttack
