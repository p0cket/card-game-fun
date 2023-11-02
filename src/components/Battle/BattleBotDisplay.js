import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
// import { useDispatchContext, useStateContext } from "../../MainContext"

import './../scenes/Battle.css'
import './../common/Button.css'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { Party } from '../../consts/party/parties'
import Button from '../common/Button'

// function BattleBotDisplay({ gameData, health, maxHP, energy }) {
function BattleBotDisplay({ ourCurrentMon }) {
  console.log(`battleBot currentMon`, ourCurrentMon)
  const yourVariants = {
    visible: {
      x: [0, 2, -3, 5, -1, 5, -3, 0],
      y: [0, 3, -1],
      transition: {
        // delay: 0.5,
        duration: 15,
        yoyo: Infinity,
      },
    },
  }

  const contextualState = useStateContext()
  const ourParty = contextualState.userParty
  // const ourMain = ourParty[Party.SLOT_1]

  // console.log(`X_ourParty:`, ourParty, `ourMain`, ourMain)

  // const ourParty = contextualState.userParty.SLOT_1
  return (
    <div className="battleBot">
      {/* @TODO: reverse left and right here */}
      <div className="battleBotRight">
        <motion.img
          style={{ width: 180, height: 150 }}
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src={ourCurrentMon.image}
          alt="Your Chibipal"
        />
      </div>
      <div className="battleBotLeft">
        <div className="battleBotLeftUpper">
          <div>
            <div className="battleBLname" style={{ fontSize: '25px' }}>
              {ourCurrentMon.name}
              <span style={{ fontSize: '12px' }}>
                <span style={{ color: 'gray' }}>lvl{ourCurrentMon.lvl}</span>
              </span>
            </div>

            <div className="battleBLhealth">
              {ourCurrentMon.stats.hp}HP
              {/* <img
                style={{ width: 10, height: 10 }}
                src="./icons/heart.png"
                alt="Health"
              /> */}
              <progress
                id="health"
                value={ourCurrentMon.stats.hp}
                max={ourCurrentMon.stats.max_hp}
                style={{
                  backgroundColor: '#4caf50',
                }}
              />
            </div>
          </div>
          {/* <div className="battleBuffs"></div> */}
          {/* <div className="battleBotLeftProperties"> */}
          <div>
            <ul
              style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <li>Commander Ability: {ourCurrentMon.commander_ability.name}</li>
              <li>Cost: {ourCurrentMon.cost}</li>
              <li>Creature Type: {ourCurrentMon.creature_type}</li>
              <li>Description: {ourCurrentMon.description}</li>
              <li>Elemental Type: {ourCurrentMon.elemental_type}</li>
              <li>Enter Ability: {ourCurrentMon.enterAbility}</li>
              <li>Experience: {ourCurrentMon.experience}</li>
              <li>ID: {ourCurrentMon.id}</li> */}
              {/* <li>Lore: {ourCurrentMon.lore}</li> */}
              {/* <li>
                Moves:{' '}
                {ourCurrentMon.moves.map((move, index) => (
                  <span key={index}>{move}, </span>
                ))}
              </li> */}
              {/* <li>Name: {ourCurrentMon.name}</li> */}
              {/* <li>Nature: {ourCurrentMon.nature}</li> */}
              <li>
                {/* Passive: <Button text={ourCurrentMon.passive_ability} /> */}
                <button
                  style={{
                    backgroundColor: 'green',
                    padding: '5px',
                    borderRadius: '2px',
                    color: 'white',
                  }}
                >
                  {ourCurrentMon.passive_ability}
                </button>
              </li>
              {/* <li> */}
              {/* Possible Moves:{' '} */}
              {/* {ourCurrentMon.possible_moves.map((move, index) => (
                  <span key={index}>{move}, </span>
                )} */}
              {/* </li> */}
              {/* <li> */}
              {/* Quirks:{' '} */}
              {/* {ourCurrentMon.quirks.map((quirk, index) => (
                  <span key={index}>{quirk}, </span>
                )} */}
              {/* </li> */}
              {/* <li>Size: {ourCurrentMon.size}</li> */}
              <li>Group: {ourCurrentMon.specialty_group}</li>
              {/* <li>
                Stats:
                <ul>
                  <li>HP: {ourCurrentMon.stats.hp}</li>
                  <li>Max HP: {ourCurrentMon.stats.max_hp}</li>
                  <li>Attack: {ourCurrentMon.stats.attack}</li>
                  <li>Defense: {ourCurrentMon.stats.defense}</li>
                  <li>Special Attack: {ourCurrentMon.stats.special_attack}</li>
                </ul>
              </li> */}
              <li>
                +{' '}
                {ourCurrentMon.strengths.map((strength, index) => (
                  <span key={index}>{strength}, </span>
                ))}
              </li>
              <li>
                -{' '}
                {ourCurrentMon.weaknesses.map((weakness, index) => (
                  <span key={index}>{weakness}, </span>
                ))}
              </li>
              {/* <li>Weight: {ourCurrentMon.weight}</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  BattleBotDisplay.propTypes = {
    ourCurrentMon: PropTypes.shape({
      name: PropTypes.string,
      // health: PropTypes.number,
      stats: PropTypes.object,
      passive_ability: PropTypes.string,
      moves: PropTypes.array,
      possible_moves: PropTypes.array,
      quirks: PropTypes.array,
      size: PropTypes.string,
      weight: PropTypes.number,
      maxHP: PropTypes.number,
      lvl: PropTypes.number,
      image: PropTypes.string,
      description: PropTypes.string,
      strengths: PropTypes.array,
      weaknesses: PropTypes.array,
      specialty_group: PropTypes.string,
      commander_ability: PropTypes.object,
      cost: PropTypes.number,
      creature_type: PropTypes.string,
      elemental_type: PropTypes.string,
      enterAbility: PropTypes.string,
      experience: PropTypes.number,
      id: PropTypes.number,
      lore: PropTypes.string,
      nature: PropTypes.string,

      // Add other expected prop types here
    }).isRequired,
  }
}

export default BattleBotDisplay
