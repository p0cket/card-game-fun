import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
// import { useDispatchContext, useStateContext } from "../../MainContext"

import './../scenes/Battle.css'
import './../common/Button.css'

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

  // const contextualState = useStateContext()
  // const contextualDispatch = useDispatchContext()
  return (
    <div className="battleBot">
      {/* @TODO: reverse left and right here */}
      <div className="battleBotRight">
        <motion.img
          style={{ width: 180, height: 150 }}
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src="/creatures/Chibipal.png"
          alt="Your Chibipal"
        />
      </div>
      <div className="battleBotLeft">
        <div className="battleBotLeftUpper">
          <div>
            <div className="battleBLname" style={{ fontSize: '25px' }}>
              {ourCurrentMon.name}
            </div>
            <div className="battleBLhealth">
              {ourCurrentMon.health}
              <img
                style={{ width: 10, height: 10 }}
                src="./icons/heart.png"
                alt="Health"
              />
              <progress
                id="health"
                value={ourCurrentMon.health}
                max={ourCurrentMon.maxHP}
                style={{
                  backgroundColor: '#4caf50',
                }}
              />
            </div>
          </div>
          <div className="battleBuffs">
            {' '}
            <span style={{ fontSize: '12px' }}>
              {' '}
              <span style={{ color: 'gray' }}>lvl</span>
              {JSON.stringify(ourCurrentMon.lvl)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
  BattleBotDisplay.propTypes = {
    ourCurrentMon: PropTypes.shape({
      name: PropTypes.string,
      health: PropTypes.number,
      maxHP: PropTypes.number,
      lvl: PropTypes.number,
      // Add other expected prop types here
    }).isRequired,
  }
}

export default BattleBotDisplay
