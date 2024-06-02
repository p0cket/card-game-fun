import React, { useState } from 'react'
// import { endTurnAction, playCardAction } from '../../actions'
// import Card from '../common/Card'
// import { dmgEmoji, energyEmoji, goldEmoji } from '../../consts/consts'
// import { motion } from 'framer-motion'
// import Dialog from '../common/Dialog'
import MenuPopup from '../common/MenuPopup'
import BattleTopDisplay from '../battle/BattleTopDisplay'
import BattleBotDisplay from '../battle/BattleBotDisplay'
import PartyDisplay from '../battle/PartyDisplay'
import MenuButtonGroup from '../battle/MenuButtonGroup'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { startingDataOld } from '../../consts/startingData'
// import { Party } from '../../consts/party/parties'
import HUDHeader from '../battle/HUDHeader'
// import BattleCreatureTypes from '../battle/BattleCreatureTypes'
import HUDDetails from '../battle/HUDDetails'

const Battle = () => {
  const gameData = startingDataOld

  //TODO: Make this contextual based on what is passed in
  const [popupOpen, setPopupOpen] = useState(false)
  const togglePopup = () => setPopupOpen(!popupOpen)

  const contextualState = useStateContext()
  const inDebug = contextualState.debug && contextualState.debug.isOpen
  const ourParty = contextualState.userParty
  const ourCurrentMon = ourParty[0]
  // console.log(`ourCurrentMon`, ourCurrentMon, `curMON`, ourParty)

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[500px]">
        <div>
          <HUDDetails />
          {/* TODO: Add in the heading of the area you are in */}
          {inDebug ? <HUDHeader /> : ''}
          {inDebug ? (
            <PartyDisplay party={contextualState.opponent.monsters.slice(1)} />
          ) : (
            ''
          )}{' '}
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
          {inDebug ? (
            <PartyDisplay party={ourParty.slice(1)} userFlag={true} />
          ) : (
            ''
          )}{' '}
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
export default Battle
