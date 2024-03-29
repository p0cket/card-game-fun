import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
// import { useDispatchContext, useStateContext } from "../../MainContext"
import './../scenes/Battle.css'
import './../common/Button.css'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { Party } from '../../consts/party/parties'
import Button from '../common/Button'
import bg1 from './../../assets/backgrounds/bg1.png'
import TooltipButton from '../common/Tooltip'

function BattleBotDisplay({ ourCurrentMon }) {
  const state = useStateContext()
  const inDebug = state.debug && state.debug.isOpen
  const [showPassiveTooltip, setShowPassiveTooltip] = useState(false)
  const [prevHP, setPrevHP] = useState(ourCurrentMon.stats.hp)
  const [healthWidth, setHealthWidth] = useState(100) // Initially set to 100%
  const controls = useAnimation()

  // Idle (breathing) animation setup
  useEffect(() => {
    controls.start({
      // scale: [1, 1.02, 1],
      scale: [1, 1.02, 1],

      x: [0, 2, -3, 5, -1, 5, -3, 0],
      y: [0, 3, -1, 4, 0],
      transition: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
    })
  }, [controls])

  useEffect(() => {
    // Health decrease triggers a shake animation
    if (ourCurrentMon.stats.hp < prevHP) {
      controls
        .start({
          x: [0, -5, 5, -5, 5, 0],
          transition: { duration: 0.5 },
          filter: ['brightness(100%)', 'brightness(0%)', 'brightness(100%)'],
        })
        .then(() => {
          // Resume idle animation after shake completes
          controls.start({
            scale: [1, 1.02, 1],
            x: [0, 2, -3, 5, -1, 5, -3, 0],
            y: [0, 3, -1, 4, 0],
            transition: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
          })
        })
    }
    setPrevHP(ourCurrentMon.stats.hp)
  }, [ourCurrentMon.stats.hp, controls, prevHP])

  useEffect(() => {
    const newWidth = (ourCurrentMon.stats.hp / ourCurrentMon.stats.max_hp) * 100
    setHealthWidth(Math.max(0, newWidth))
  }, [ourCurrentMon.stats.hp, ourCurrentMon.stats.max_hp])
  
  const toggleTooltip = (key) => {
    setShowTooltip((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }
  const [showTooltip, setShowTooltip] = useState({})

  useEffect(() => {
    const statusKeys = Object.keys(ourCurrentMon.status)
    const tooltipState = statusKeys.reduce((acc, key) => {
      acc[key] = false // Initialize all tooltips as not shown
      return acc
    }, {})
    setShowTooltip(tooltipState)
  }, [ourCurrentMon.status])

  return (
    <div className="flex px-2 justify-around bg-boy-green text-8px w-full">
      <div
        className="flex flex-col items-center flex-grow"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <motion.img
          // className="w-45 h-38"
          // animate="visible"
          animate={controls}
          whileHover="hover"
          // variants={yourVariants}
          src={ourCurrentMon.image}
          alt="Your Chibipal"
          // className={`w-48 h-48`}
          style={{
            width: '200px',
            height: '200px',
          }}
        />
      </div>
      <div className="flex flex-col items-start px-2 mx-0 flex-grow bg-boy-lightgreen ">
        <div className="flex flex-col items-start bg-boy-lightgreen flex-grow w-full">
          <div className="w-full">
            <div className="flex items-start text-2xl">
              {ourCurrentMon.name}
              <span className="text-xs text-gray-500">
                lvl{ourCurrentMon.lvl}
              </span>
            </div>
            <div className="flex items-start">
              {ourCurrentMon.stats.hp}HP
              <div className="relative w-full h-4 ml-2 bg-gray-400">
                <motion.div
                  className="bg-boy-green h-full"
                  initial={{ width: '100%' }}
                  animate={{ width: `${healthWidth}%` }}
                  transition={{ duration: 0.5, ease: 'easeIn' }}
                />
              </div>
            </div>
         {inDebug &&   <div className="flex items-start">
              {ourCurrentMon.stats.hp}HP
              <div className="relative w-full h-4 ml-2 bg-gray-400">
                 <motion.div
                  className="bg-boy-extra-green h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.max(0, healthWidth - 100)}%` }}
                  transition={{ duration: 0.5, ease: 'easeIn' }}
                  style={{ opacity: healthWidth > 100 ? 1 : 0 }}
                />
              </div>
            </div>}
          </div>
          <div>
            <div>
              {Object.keys(ourCurrentMon.status).map((key) => {
                if (ourCurrentMon.status[key]) {
                  return (
                    <TooltipButton
                      key={key}
                      title="Effect"
                      // details={JSON.stringify(ourCurrentMon.status[key])}
                      details={
                        ourCurrentMon.status[key].type
                          ? ourCurrentMon.status[key].type.description
                          : 'No details available'
                      }
                      name={key}
                      ourCurrentMon={ourCurrentMon}
                      showTooltip={showTooltip[key]}
                      setShowTooltip={() => toggleTooltip(key)}
                      amt={ourCurrentMon.status[key].effect}
                    />
                    //   <span
                    //   className="inline-block bg-boy-green text-white text-xs px-2 py-1 rounded m-1"
                    //   key={key}
                    // >
                    //   {key} {JSON.stringify(ourCurrentMon.status[key])}
                    // </span>
                  )
                } else {
                  console.log(`${key} is false`)
                  return (
                    <span className="text-gray-500" key={key}>
                      {key} {ourCurrentMon.status[key].effect}
                    </span>
                  )
                }
              })}
            </div>
            <ul className="text-sm flex flex-col justify-start align-start mt-1">
              {ourCurrentMon.passives && (
                <TooltipButton
                  title="Passive"
                  details={ourCurrentMon.passives.details}
                  explanation={ourCurrentMon.passives.reasoning}
                  name={ourCurrentMon.passives.name}
                  ourCurrentMon={ourCurrentMon}
                  showTooltip={showPassiveTooltip}
                  setShowTooltip={setShowPassiveTooltip}
                />
              )}
              {/* <li>Group: {ourCurrentMon.specialty_group}</li>
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
              </li> */}
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
    passives: PropTypes.string,
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
