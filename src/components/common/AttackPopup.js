import React from 'react'

const styles = {
  attackContainer: {
    border: '1px solid #a5e54d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    maxWidth: '90%',
    padding: '12px',
    margin: '8px 0',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  attackContainerHover: {
    transform: 'translateY(-5px)',
  },
  attackInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  attackName: {
    fontWeight: 'bold',
  },
  attackDamage: {
    flex: 1,
    textAlign: 'right',
  },
  attackDescription: {
    flex: 1,
    textAlign: 'left',
    color: 'black',
  },
  attackEnergyCost: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#4b770e',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
  },
}

const AttackPopup = ({
  // name,
  // damage,
  // description,
  // energyCost,
  onAttackClick,
  closeAttackPopup,
  removeAttackButton,
  attack,
}) => {
  console.log('Here is attack', attack)
  // export const QuickStrike = {
  //   name: 'Quick Strike',
  //   type: 'physical',
  //   damage: 25,
  //   speed: 7,
  //   energyCost: 3,
  //   effect: {
  //     description: 'High critical hit chance',
  //     chance: '50%',
  //     result: 'critical_hit',
  //   },
  //   priority: 'fast',
  //   targets: ['opponent', 'opponent_pals'],
  //   // "NotSoFast" aspect:
  //   notSoFast: {
  //     name: 'Nimble Dodge',
  //     type: 'buff',
  //     effect: {
  //       description: 'Increase evasion for the next turn',
  //       duration: '1 turn',
  //       evasion_boost: 30, // Increase evasion for the user
  //     },
  //   },
  //   // "Forceful" aspect:
  //   forceful: {
  //     name: 'Rapid Fury',
  //     type: 'physical',
  //     damage: 40, // Enhanced damage for the Forceful aspect
  //     speed: 9, // Slightly slower due to the added power
  //     fuel: 4, // Increased fuel cost for the Forceful aspect
  //     effect: {
  //       description: 'Guaranteed critical hit and additional damage',
  //       chance: 100,
  //       result: 'critical_hit',
  //     },
  //     targets: ['opponent', 'opponent_pals'],
  //   },
  // };
  const {
    name,
    damage,
    effect,
    energyCost,
    targets,
    priority,
    speed,
    type,
    fuel,
    notSoFast,
    forceful,
  } = attack
  const { description } = effect

  // #TODO: Add the attack param. It is missing so far.

  return (
    <div
      style={{
        ...styles.attackContainer,
      }}
      onClick={onAttackClick}
    >
      <div style={styles.attackInfo}>
        <div style={styles.attackName}>{name}</div>
        <div style={styles.attackDamage}>{damage}</div>
        <div style={styles.attackEnergyCost}>Cost: {energyCost}</div>
        <div style={styles.attackDescription}>{description}</div>
        <div style={styles.attackTargets}>Targets: {targets.join(', ')}</div>
        <div style={styles.attackPriority}>Priority: {priority}</div>
        <div style={styles.attackSpeed}>Speed: {speed}</div>
        <div style={styles.attackType}>Type: {type}</div>
        {fuel && <div style={styles.attackFuel}>Fuel: {fuel}</div>}
        {notSoFast && (
          <div style={styles.attackNotSoFast}>
            Not So Fast: {notSoFast.name}
          </div>
        )}
        {forceful && (
          <div style={styles.attackForceful}>Forceful: {forceful.name}</div>
        )}
      </div>
      {!removeAttackButton && ( // Render the attack button only if not disabled
        <button style={styles.button} onClick={onAttackClick}>
          Attack
        </button>
      )}
      <button style={styles.button} onClick={closeAttackPopup}>
        Close
      </button>
    </div>
  )
}

export default AttackPopup
