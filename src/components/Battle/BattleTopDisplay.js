import React, { useState } from 'react'

// eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
import { motion, AnimatePresence } from 'framer-motion'

import './../scenes/Battle.css'
import './../common/Button.css'
import { useDispatchContext, useStateContext } from '../../MainContext'
// eslint-disable-next-line no-unused-vars
import AttackPopup from '../common/AttackPopup'
import Button from '../common/Button'
import bg1 from './../../assets/backgrounds/bg1.png'

export default function BattleTopDisplay() {
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
  const state = useStateContext()
  const dispatch = useDispatchContext()

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
      x: [0, 2, -3, 5, -1, 5, -3, 0],
      y: [0, 3, -1],
      transition: {
        // delay: 0.5,
        duration: 15,
        yoyo: Infinity,
      },
    },
  }
  // Def work on this later
  const currentMonDetailsStatuses = state.opponent.monsters[0].status

  //this is the current monster. We need to track this down and
  // assign it to the currentMon
  const currentMon =
    // state.current.scene.details.trainer.monsters[0]
    state.opponent.monsters[0]
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
  return (
    <div className="flex px-2 mx-2 pb-1 justify-around bg-boy-green text-8px ">
      <div className="flex flex-col items-start px-2 mx-0 flex-grow bg-boy-lightgreen">
        <div className="flex flex-col items-start bg-boy-lightgreen flex-grow">
          <div>
            <div className="flex items-start text-2xl">
              {currentMon.name}
              <span className="text-xs text-gray-500">lvl{currentMon.lvl}</span>
            </div>
            <div className="flex items-start">
              {currentMon.stats.hp}HP
              <progress
                id="health"
                value={currentMon.stats.hp}
                max={currentMon.stats.max_hp}
                className="bg-boy-green"
              />
            </div>
          </div>
          <div>
            <div>
              {Object.keys(currentMon.status).map((key) => {
                console.warn(`currentMon.status`, currentMon.status)
                if (currentMon.status[key]) {
                  return (
                    <span
                      className="inline-block bg-boy-green text-white text-xs px-2 py-1 rounded m-1"
                      key={key}
                    >
                      {key}
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
              })}
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
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          src={currentMon.image}
          alt="Your Chibipal"
        />
      </div>
    </div>
  )
}
