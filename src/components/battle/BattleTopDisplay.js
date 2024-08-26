import React, { useEffect, useState } from 'react'

import { motion, useAnimation } from 'framer-motion'

import './../scenes/Battle.css'
import './../common/Button.css'
import { useStateContext } from '../../MainContext'
import bg1 from './../../assets/backgrounds/bg1.png'
import TooltipButton from '../common/Tooltip'
import { damageStartedAnimConfig, idleAnimConfig } from '../../consts/animation/palAnimConsts'

export default function BattleTopDisplay() {
  const state = useStateContext()
  const [showPassiveTooltip, setShowPassiveTooltip] = useState(false)
  const [prevHP, setPrevHP] = useState(null)

  const [healthWidth, setHealthWidth] = useState(100)
  const controls = useAnimation()
  const currentMon = state.opponent.monsters[0]



  useEffect(() => {
    setPrevHP(currentMon.stats.hp)
  }, [currentMon.stats.hp])
  useEffect(() => {
    controls.start(idleAnimConfig)
  }, [controls])

  useEffect(() => {
    if (currentMon.stats.hp < prevHP) {
      controls.start(damageStartedAnimConfig).then(() => {
        controls.start(idleAnimConfig)
      })
    }
    setPrevHP(currentMon.stats.hp)
  }, [currentMon.stats.hp, controls, prevHP])

  useEffect(() => {
    const newWidth = (currentMon.stats.hp / currentMon.stats.max_hp) * 100
    setHealthWidth(Math.max(0, newWidth))
  }, [currentMon.stats.hp, currentMon.stats.max_hp])

  const toggleTooltip = (key) => {
    setShowTooltip((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }
  const [showTooltip, setShowTooltip] = useState({})
  // Def work on this later
  const currentMonDetailsStatuses = state.opponent.monsters[0].status

  console.log(
    `currentMon & currentMonDetails:`,
    currentMon,
    currentMonDetailsStatuses,
  )

  useEffect(() => {
    const statusKeys = Object.keys(currentMon.status)
    const tooltipState = statusKeys.reduce((acc, key) => {
      acc[key] = false // Initialize all tooltips as not shown
      return acc
    }, {})
    setShowTooltip(tooltipState)
  }, [currentMon.status])

 
  return (
    <div className="flex px-2  pb-1 justify-around bg-boy-green text-8px w-full">
      <div className="flex flex-col items-start px-2 mx-0 flex-grow bg-boy-lightgreen">
        <div className="flex flex-col items-start bg-boy-lightgreen flex-grow w-full">
          <div className="w-full">
            <div className="flex items-start text-2xl">
              {currentMon.name}
              <span className="text-xs text-gray-500">lvl{currentMon.lvl}</span>
            </div>
            <div className="flex items-start w-full">
              {currentMon.stats.hp}HP
              {/* 
              does this replace below? if so it needs its' own component
              <progress
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
          animate={controls}
          whileHover="hover"
          src={currentMon.image}
          alt="Your Chibipal"
          style={{
            width: '200px',
            height: '200px',
          }}
        />
      </div>
    </div>
  )
}
