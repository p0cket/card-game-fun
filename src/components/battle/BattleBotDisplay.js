import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import './../scenes/Battle.css'
import './../common/Button.css'
import { useStateContext } from '../../MainContext'
import bg1 from './../../assets/backgrounds/bg1.png'
import TooltipButton from '../common/Tooltip'
import {
  damageStartedAnimConfig,
  idleAnimConfig2,
} from '../../consts/animation/palAnimConsts'

function BattleBotDisplay({ ourCurrentMon }) {
  const state = useStateContext()
  const inDebug = state.debug && state.debug.isOpen
  const [showPassiveTooltip, setShowPassiveTooltip] = useState(false)
  const [prevHP, setPrevHP] = useState(ourCurrentMon.stats.hp)
  const [healthWidth, setHealthWidth] = useState(100)
  const controls = useAnimation()

  useEffect(() => {
    // Idle (breathing) animation setup
    controls.start(idleAnimConfig2)
  }, [controls])

  useEffect(() => {
    // Health decrease triggers a shake animation
    if (ourCurrentMon.stats.hp < prevHP) {
      controls.start(damageStartedAnimConfig).then(() => {
        // Resume idle animation after shake completes
        controls.start(idleAnimConfig2)
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
          animate={controls}
          whileHover="hover"
          src={ourCurrentMon.image}
          alt="Your Chibipal"
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
            {inDebug && (
              <div className="flex items-start">
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
              </div>
            )}
          </div>
          <div>
            <div>
              {Object.keys(ourCurrentMon.status).map((key) => {
                if (ourCurrentMon.status[key]) {
                  return (
                    <TooltipButton
                      key={key}
                      title="Effect"
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleBotDisplay
