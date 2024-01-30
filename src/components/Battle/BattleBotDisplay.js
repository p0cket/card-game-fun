import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
// import { useDispatchContext, useStateContext } from "../../MainContext"
import './../scenes/Battle.css'
import './../common/Button.css'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { Party } from '../../consts/party/parties'
import Button from '../common/Button'
import bg1 from './../../assets/backgrounds/bg1.png'
import TooltipButton from '../common/Tooltip'

function BattleBotDisplay({ ourCurrentMon }) {
  const [showPassiveTooltip, setShowPassiveTooltip] = useState(false)
  const yourVariants = {
    visible: {
      x: [0, 2, -3, 5, -1, 5, -3, 1],
      y: [0, 3, -1, 4],
      transition: {
        // delay: 0.5,
        duration: 15,
        yoyo: Infinity,
      },
    },
  }
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
    <div className="flex px-2 mx-2 justify-around bg-boy-green text-8px">
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
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src={ourCurrentMon.image}
          alt="Your Chibipal"
        />
      </div>
      <div className="flex flex-col items-start px-2 mx-0 flex-grow bg-boy-lightgreen">
        <div className="flex flex-col items-start bg-boy-lightgreen flex-grow">
          <div>
            <div className="flex items-start text-2xl">
              {ourCurrentMon.name}
              <span className="text-xs text-gray-500">
                lvl{ourCurrentMon.lvl}
              </span>
            </div>
            <div className="flex items-start">
              {ourCurrentMon.stats.hp}HP
              <progress
                id="health"
                value={ourCurrentMon.stats.hp}
                max={ourCurrentMon.stats.max_hp}
                className="bg-boy-green"
              />
            </div>
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
                      details={ourCurrentMon.status[key].type.description}
                      // explanation={JSON.stringify(ourCurrentMon.status[key])}
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

              {/* {Object.keys(ourCurrentMon.status).map((key) => {
                if (ourCurrentMon.status[key]) {
                  return (
                  //   <TooltipButton
                  //   key={key}
                  //   title="effect"
                  //   details={ourCurrentMon.passives.details}
                  //   explanation={ourCurrentMon.passives.reasoning}
                  //   name={ourCurrentMon.passives.name}
                  //   ourCurrentMon={ourCurrentMon}
                  //   showTooltip={showTooltip}
                  //   setShowTooltip={setShowTooltip}
                  // />
                    <span
                      className="inline-block bg-boy-green text-white text-xs px-2 py-1 rounded m-1"
                      key={key}
                    >
                      {key} {JSON.stringify(ourCurrentMon.status[key])}
                    </span>
                  )
                } else {
                  console.log(`${key} is false`)
                  return (
                    <span className="text-gray-500" key={key}>
                      {key}
                    </span>
                  )
                }
              })} */}
            </div>
            <ul className="text-sm flex flex-col justify-start align-start">
              <TooltipButton
                title="Passive"
                details={ourCurrentMon.passives.details}
                explanation={ourCurrentMon.passives.reasoning}
                name={ourCurrentMon.passives.name}
                ourCurrentMon={ourCurrentMon}
                showTooltip={showPassiveTooltip}
                setShowTooltip={setShowPassiveTooltip}
              />
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
