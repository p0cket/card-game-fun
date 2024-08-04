import React, { useEffect, useState } from 'react'

// eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

import './../scenes/Battle.css'
import './../common/Button.css'
import { useDispatchContext, useStateContext } from '../../MainContext'
// eslint-disable-next-line no-unused-vars
import AttackPopup from '../common/AttackPopup'
import Button from '../common/Button'
import bg1 from './../../assets/backgrounds/bg1.png'
import TooltipButton from '../common/Tooltip'

export default function BattleTopDisplay() {
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const [showPassiveTooltip, setShowPassiveTooltip] = useState(false)
  const [prevHP, setPrevHP] = useState(null)

  // const [prevHP, setPrevHP] = useState(currentMon.stats.hp)
  const [healthWidth, setHealthWidth] = useState(100) // Initially set to 100%
  const controls = useAnimation()
  // Assuming `state.opponent.monsters[0]` is always available; adjust accordingly if it might not be
  const currentMon = state.opponent.monsters[0]

  // Now that `currentMon` is defined, we can set `prevHP` appropriately
  useEffect(() => {
    setPrevHP(currentMon.stats.hp)
  }, [currentMon.stats.hp])
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
    if (currentMon.stats.hp < prevHP) {
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
    setPrevHP(currentMon.stats.hp)
  }, [currentMon.stats.hp, controls, prevHP])

  useEffect(() => {
    console.log(`health changed to ${currentMon.stats.hp}. max hp is ${currentMon.stats.max_hp}.`)
    const newWidth = (currentMon.stats.hp / currentMon.stats.max_hp) * 100
    setHealthWidth(Math.max(0, newWidth))
  }, [currentMon.stats.hp, currentMon.stats.max_hp])
  // -------

  const attackPopupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    container: {
      background: 'lightgreen',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      padding: '20px',
      borderRadius: '2px',
    },
  }
  // const [isAttackDisplayVisible, setAttackDisplayVisible] = useState(false)

  const toggleTooltip = (key) => {
    setShowTooltip((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }
  const [showTooltip, setShowTooltip] = useState({})
  // Def work on this later
  const currentMonDetailsStatuses = state.opponent.monsters[0].status

  //this is the current monster. We need to track this down and
  // assign it to the currentMon
  // const currentMon =
  //   // state.current.scene.details.trainer.monsters[0]
  //   state.opponent.monsters[0]
  console.log(
    `currentMon & currentMonDetails:`,
    currentMon,
    currentMonDetailsStatuses,
  )
  const {
    name,
    lore,
    image,
    elemental_type,
    creature_type,
    specialty_group,
    nature,
    quirks,
    stats,
    enterAbility,
    strengths,
    weaknesses,
    cost,
    moves,
    possible_moves,
    passives,
    experience,
    lvl,
    // status,
  } = currentMon
  useEffect(() => {
    const statusKeys = Object.keys(currentMon.status)
    const tooltipState = statusKeys.reduce((acc, key) => {
      acc[key] = false // Initialize all tooltips as not shown
      return acc
    }, {})
    setShowTooltip(tooltipState)
  }, [currentMon.status])

  const handleAttackClick = (name) => {
    // Dispatch an action to perform the selected attack
    dispatch({
      type: 'PERFORM_ATTACK',
      payload: { attackName: name },
    })
  }

  const [isAttackPopupVisible, setAttackPopupVisible] = useState(false)

  const openAttackPopup = () => {
    setAttackPopupVisible(true)
  }

  const closeAttackPopup = () => {
    setAttackPopupVisible(false)
  }

  const renderAttack = (name, damage, description, energyCost) => {
    return (
      <AttackPopup
        name={name}
        damage={damage}
        description={description}
        energyCost={energyCost}
        onAttackClick={() => handleAttackClick(name)}
        // attack={moves[0]}
      />
    )
  }
  // const { name, status, poison, health, maxHP, img, nextAttack } =
  //   gameData.battle.enemy;
  const yourVariants = {
    visible: {
      x: [0, 1, -3, 4, -1, 5, -3, 2],
      y: [0, 3, -1, 4],
      transition: {
        // delay: 0.5,
        duration: 15,
        yoyo: Infinity,
      },
    },
  }

  return (
    <div className="flex px-2  pb-1 justify-around bg-boy-green text-8px w-full">
      <div className="flex flex-col items-start px-2 mx-0 flex-grow bg-boy-lightgreen">
        <div className="flex flex-col items-start bg-boy-lightgreen flex-grow w-full">
          <div className='w-full'>
            <div className="flex items-start text-2xl">
              {currentMon.name}
              <span className="text-xs text-gray-500">lvl{currentMon.lvl}</span>
            </div>
            <div className="flex items-start w-full">
              {currentMon.stats.hp}HP
              {/* <progress
                id="health"
                value={currentMon.stats.hp}
                max={currentMon.stats.max_hp}
                className="bg-boy-green"
              /> */}
              <div className="relative w-full h-4 ml-2 bg-gray-400">
                <motion.div
                  className="bg-boy-green h-full"
                  initial={{ width: '100%' }}
                  animate={{ width: `${healthWidth}%` }}
                  transition={{ duration: 0.5, ease: 'easeIn' }}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              {/*  */}
              {showPassiveTooltip && (
                <div className="absolute bottom-full mb-1 px-4 py-1 bg-boy-green text-white text-xs shadow-md">
                  <button
                    className="absolute top-0 right-0 text-2xl leading-none px-2 py-1"
                    onClick={() => setShowPassiveTooltip(false)}
                  >
                    {/* &times; */}
                  </button>
                  <div>Passive: {currentMon.passives.details} </div>
                  <div className="text-xs text-gray-900">
                    {' '}
                    {currentMon.passives.reasoning}
                  </div>
                  x
                </div>
              )}
              {/*  */}
              {Object.keys(currentMon.status).map((key) => {
                if (currentMon.status[key]) {
                  return (
                    <TooltipButton
                      key={key}
                      title="Effect"
                      details={
                        currentMon.status[key] && currentMon.status[key].type
                          ? currentMon.status[key].type.description
                          : 'No details available'
                      }
                      name={key}
                      ourCurrentMon={currentMon}
                      showTooltip={showTooltip[key]}
                      setShowTooltip={() => toggleTooltip(key)}
                      amt={currentMon.status[key].effect}
                    />
                  )
                } else {
                  console.log(`${key} is false`)
                  return (
                    <span className="text-gray-500" key={key}>
                      {key} {currentMon.status[key].effect}
                    </span>
                  )
                }
              })}
              {/* {Object.keys(currentMon.status).map((key) => {
                console.warn(`currentMon.status`, currentMon.status)
                if (currentMon.status[key]) {
                  return (
                    <span
                      className="inline-block bg-boy-green text-white text-xs px-2 py-1 rounded m-1"
                      key={key}
                    >
                      {key} {JSON.stringify(currentMon.status[key])}
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
            <ul className="text-sm flex flex-col justify-start align-start"></ul>
          </div>
        </div>
      </div>
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
          src={currentMon.image}
          alt="Your Chibipal"
          // className={`w-48 h-48`}
          style={{
            width: '200px',
            height: '200px',
          }}


        />
        {/* <motion.img
          // className="w-45 h-38"
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src={currentMon.image}
          alt="Your Chibipal"
        /> */}
      </div>
    </div>
  )
}
