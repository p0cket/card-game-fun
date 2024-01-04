import React, { useState } from 'react'
import { endTurnAction, playCardAction } from '../../actions'
import Card from '../common/Card'
import { dmgEmoji, energyEmoji, goldEmoji } from '../../consts/consts'
import { motion } from 'framer-motion'

import Dialog from '../common/Dialog'
import MenuPopup from '../common/MenuPopup'
import BattleTopDisplay from '../battle/BattleTopDisplay'
import BattleBotDisplay from '../battle/BattleBotDisplay'
import PartyDisplay from '../battle/PartyDisplay'
import MenuButtonGroup from '../battle/MenuButtonGroup'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { startingDataOld } from '../../consts/startingData'
import { Party } from '../../consts/party/parties'
import HUDHeader from '../battle/HUDHeader'
import BattleCreatureTypes from '../battle/BattleCreatureTypes'
import HUDDetails from '../battle/HUDDetails'

// const Battle = ({ gameData, dispatch }) => {
const Battle = () => {
  const gameData = startingDataOld

  //TODO: Make this contextual based on what is passed in
  const [popupOpen, setPopupOpen] = useState(false)
  const togglePopup = () => setPopupOpen(!popupOpen)

  //Remove when ready. Breaks the old implementation
  const { health, energy, maxHP } = gameData.hero
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
  const contextualDispatch = useDispatchContext()

  const ourParty = contextualState.userParty
  // console.log(`ourCurrentMonSHOULDBE`, ourParty)

  const ourCurrentMon = ourParty[0]

  // console.log(`ourCurrentMon`, ourCurrentMon, `curMON`, ourParty)

  const [showPopup, setShowPopup] = useState(true)

  const handleButtonClick = () => {
    setShowPopup(false)
  }

  const popupContent = {
    trigger: showPopup,
    title: 'BATTLE START',
    message: 'Mr. Yamashita wants to fight! Are you ready to battle?',
    buttonText: 'OK',
    buttonText2: 'Counter',
    onButtonClick: handleButtonClick,
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[500px]">
        <div>
          <HUDDetails />
          {/* TODO: Add in the heading of the area you are in */}
          {/* <HUDHeader /> */}
          {/* <PartyDisplay party={contextualState.current.scene.details.trainer.monsters.slice(1)} /> */}
          <PartyDisplay party={contextualState.opponent.monsters.slice(1)} />
          <div className="font-[silkscreen] flex flex-wrap items-center">
            <BattleTopDisplay gameData={gameData} />
            {/* TODO: Add in battle types */}
            {/* <BattleCreatureTypes ourCurrentMon={contextualState.opponent.monsters[0]} /> */}
            <BattleBotDisplay ourCurrentMon={ourCurrentMon} />
            {/* Add in battle types here too */}
            {/* <BattleCreatureTypes ourCurrentMon={ourCurrentMon} /> */}
          </div>
          {gameData.alert ? (
            <div className="text-red-500 p-10 m-30 bg-black">
              {gameData.alert}
            </div>
          ) : (
            <></>
          )}
          <div style={{ display: 'flex' }}>
            {/* #TODO: Give MenuPopup its' own toggle, and remove this - MenuPopup */}
            <MenuButtonGroup
              togglePopup={togglePopup}
              ourCurrentMon={ourCurrentMon}
            />
          </div>
          <PartyDisplay
            party={
              // () => { console.log(`ourParty where slice doesn't work`, ourParty)
              ourParty.slice(1)
              // }
            }
            userFlag={true}
          />
          <div
            className="font-silkscreen bg-green-500 text-white"
            style={{ fontFamily: 'Silkscreen' }}
          >
            <MenuPopup
              selectedPal={ourCurrentMon}
              trigger={popupOpen}
              togglePopup={togglePopup}
              zIndex={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
// Styles converted to Tailwind CSS
const attackContainerStyle =
  'border border-green-500 flex flex-col items-stretch p-3 m-2 bg-white'
const attackInfoStyle = 'flex justify-between mb-2'
const attackNameStyle = 'font-bold'
const attackDamageStyle = 'flex-1 text-right'
const attackDescriptionStyle = 'flex-1 text-left text-black'
const attackEnergyCostStyle = 'self-end text-right'
const attackHeaderStyle = 'flex items-center mb-2'
export default Battle
