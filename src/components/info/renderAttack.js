import React, { useState } from 'react'
import { energyEmoji } from '../../consts/consts'

function renderAttack(attack, contextualDispatch) {
  const [basicAttackSelected, setBasicAttackSelected] = useState(true)

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

  const useMove = (move) => {
    // const castResult = castMove(move)
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

  return (
    <div style={{ ...attackContainerStyle, backgroundColor: '#5a7d2a' }}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundColor: basicAttackSelected ? '#4b770e' : '#5a7d2a',
            color: basicAttackSelected ? '#fff' : '#000',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setBasicAttackSelected(true)}
        >
          {attack.name}
        </div>
        <div
          style={{
            backgroundColor: basicAttackSelected ? '#5a7d2a' : '#4b770e',
            color: basicAttackSelected ? '#000' : '#fff',
            cursor: 'pointer',
            padding: '8px 8px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setBasicAttackSelected(false)}
        >
          {forceful.name}
        </div>
      </div>
      {basicAttackSelected ? (
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
            }}
          >
            counter: {notSoFast.name}
          </button>
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
      ) : (
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
      )}
    </div>
  )
}

export default renderAttack

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
