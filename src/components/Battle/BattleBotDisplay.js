import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
// import { useDispatchContext, useStateContext } from "../../MainContext"
import './../scenes/Battle.css'
import './../common/Button.css'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { Party } from '../../consts/party/parties'
import Button from '../common/Button'

function BattleBotDisplay({ ourCurrentMon }) {
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

  return (
    <div className="battleBot">
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
              <li>
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
              <li>Group: {ourCurrentMon.specialty_group}</li>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
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
export default BattleBotDisplay
