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
  const currentMonDetailsStatuses =
    state.opponent.monsters[0].obj.status

    //this is the current monster. We need to track this down and 
    // assign it to the currentMon
  const currentMon =
    // state.current.scene.details.trainer.monsters[0].obj
    state.opponent.monsters[0].obj
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
    <div className="flex p-1 mx-2 bg-boy-green">
      <div className="flex flex-col items-start bg-boy-lightgreen flex-grow">
        <div className="text-2xl">
          {name}
          <span className="text-gray-500 text-sm">lvl{lvl}</span>
        </div>
         <div>
          {state.opponent.monsters[0].obj.stats.hp}HP
          <progress
            id="health"
            value={state.opponent.monsters[0].obj.stats.hp}
            // max={stats.max_hp}
            max={state.opponent.monsters[0].obj.stats.max_hp}
            style={{
              backgroundColor: '#4caf50',
              color: '#9faf4c',
            }}
          />
        </div>
        <div className="text-xs">
          Statuses:
          {Object.keys(currentMonDetailsStatuses).map((key) => {
            if (currentMonDetailsStatuses[key]) {
              return (
                <span className="inline-block bg-boy-green text-white text-xs px-2 py-1 rounded m-1" key={key}>
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
        {isAttackPopupVisible && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10"
            onClick={closeAttackPopup}
          >
            <div className="bg-lightgreen shadow-md p-5 rounded">
              <AttackPopup
                name={moves[0].name} // Pass the attack details here
                damage="30"
                description="An example attack description."
                energyCost="10"
                onAttackClick={closeAttackPopup}
                closeAttackPopup={closeAttackPopup}
                removeAttackButton={false}
                attack={moves[0]}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className="flex flex-col items-center mx-2 flex-grow-2 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <motion.img
          style={{ width: 180, height: 150 }}
          animate="visible"
          whileHover="hover"
          variants={yourVariants}
          // src={img}
          src={image}
          alt="Enemy Frontside"
        />
      </div>
    </div>
  )
}
