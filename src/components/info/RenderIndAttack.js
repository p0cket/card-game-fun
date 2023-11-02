import React, { useState } from 'react'
import { energyEmoji } from '../../consts/consts'
import {
  ATK_PHASES,
  executeMove,
  handlePlayerMoveSelection,
} from '../../handlers/moveHandlers'
import { ACTIONS } from '../../MainContext'
import { Party } from '../../consts/party/parties'

function RenderIndAttack({
  attack,
  contextualState,
  contextualDispatch,
  togglePopup,
}) {
  // const [basicAttackSelected, setBasicAttackSelected] = useState(true)
  const [attackType, setAttackType] = useState('basic') // Default to 'basic' attack

  console.log('attack:', attack) // Log the value of the attack prop
  console.log('contextualState:', contextualState) // Log the value of the contextualState prop

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

  const runMove = (move, user) => {
    // also turn off popup
    togglePopup()

    // console.log('renderIndAttack->runMove():', move, user)
    console.log(
      `renderIndAttack->runMove():
      move,contextualState,contextualDispatch,user,ATK_PHASES.PAY,`,
      move,
      contextualState,
      contextualDispatch,
      user,
      ATK_PHASES.PAY,
    )

    const resultState = executeMove(
      move,
      contextualState,
      contextualDispatch,
      user,
      ATK_PHASES.PAY,
      // player, "human"
      // selectedTargets, [0]
    )
    console.log('resultState [XXXX]:', resultState)
    contextualDispatch({ payload: resultState, type: ACTIONS.UPDATEGAMEDATA })

    //       const appliedCost is in cast
    // if (castResult.success) {
    //   const appliedEffect = applyEffect(castResult, move.effect)
    //   const appliedDamage = applyDamage(appliedEffect, move.damage)
    //   contextualDispatch(castResult.state, ACTIONS.UPDATEGAMEDATA)
    // }
    // or apply the results here:
    // contextualDispatch(castResult.state, ACTIONS.UPDATEGAMEDATA)
    // ------------------------------------
    // const nextLevelState = updateLevel(nextSceneState, 1)
    // contextualDispatch(nextLevelState, ACTIONS.UPDATEGAMEDATA)
  }
  const renderBasic = (move) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div>
            {fuel}
            {energyEmoji}
          </div>
          <div>S {speed}</div>
          <div>{damage}</div>
          <div>{type}</div>
        </div>
        <div>Effect: {effect.description}</div>
        <div>Priority: {priority}</div>
        <div>Targets: {targets.join(', ')}</div>
        <button
          style={{
            backgroundColor: '#4b770e',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          onClick={() =>
            // runMove(attack, contextualState.userParty[Party.SLOT_1])
            runMove(attack, contextualState.userParty[0])
          }
        >
          Use
        </button>
      </div>
    )
  }

  const renderForceful = (move) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
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
        <button
          style={{
            backgroundColor: '#4b770e',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Use
        </button>
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
    <div style={{ ...attackContainerStyle, backgroundColor: '#5a7d2a' }}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundColor: attackType === 'basic' ? '#4b770e' : '#5a7d2a',
            color: attackType === 'basic' ? '#fff' : '#000',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            margin: '0px 3px',
          }}
          onClick={() => setAttackType('basic')}
        >
          {attack.name}
        </div>
        <div
          style={{
            backgroundColor: attackType === 'forceful' ? '#4b770e' : '#5a7d2a',
            color: attackType === 'forceful' ? '#fff' : '#000',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            margin: '0px 3px',
          }}
          onClick={() => setAttackType('forceful')}
        >
          {forceful.name}
        </div>
        <div
          style={{
            backgroundColor: attackType === 'notSoFast' ? '#4b770e' : '#5a7d2a',
            color: attackType === 'notSoFast' ? '#fff' : '#000',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            margin: '0px 3px',
          }}
          onClick={() => setAttackType('notSoFast')}
        >
          {notSoFast.name}
        </div>
      </div>
      {moveFormToRender(attack)}
    </div>
  )
}

export default RenderIndAttack

const attackContainerStyle = {
  border: '1px solid #a5e54d',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '12px',
  margin: '8px 0',
  backgroundColor: '#fff',
}

const attackInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
}

const attackNameStyle = {
  fontWeight: 'bold',
}

const attackDamageStyle = {
  flex: 1,
  textAlign: 'right',
}

const attackDescriptionStyle = {
  flex: 1,
  textAlign: 'left',
  color: 'black',
}

const attackEnergyCostStyle = {
  alignSelf: 'flex-end',
  textAlign: 'right',
}

const attackHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
}

const characterIconStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: 'green', // Blue circle (placeholder for character icon)
  marginRight: '10px',
}

const attackLabelStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
}

const monsterNameStyle = {
  fontWeight: 'bold',
}

const monsterAbilitiesStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '34px', // To align with the monster icon
}
