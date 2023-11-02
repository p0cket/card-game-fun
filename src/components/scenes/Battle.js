import React, { useState } from 'react'
import { endTurnAction, playCardAction } from '../../actions'
import Card from '../common/Card'
import { dmgEmoji, energyEmoji, goldEmoji } from '../../consts/consts'
import { motion } from 'framer-motion/dist/framer-motion'

import Dialog from '../common/Dialog'
import MenuPopup from '../common/MenuPopup'
// import HUDHeader from "../battle/HUDHeader"
// import EnemyDisplay from "../battle/BattleTopDisplay";
import BattleTopDisplay from '../battle/BattleTopDisplay'
import BattleBotDisplay from '../battle/BattleBotDisplay'
import UserPartyDisplay from '../battle/UserPartyDisplay'
import MenuButtonGroup from '../battle/MenuButtonGroup'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { startingData } from '../../consts/startingData'
import { Party } from '../../consts/party/parties'
import DialoguePopup from '../common/DialoguePopup'
import HUDHeader from '../battle/HUDHeader'

// const Battle = ({ gameData, dispatch }) => {
const Battle = () => {
  const gameData = startingData

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
  console.log(`ourCurrentMonSHOULDBE`, ourParty)

  const ourCurrentMon = ourParty[0]

  console.log(`ourCurrentMon`, ourCurrentMon, `curMON`, ourParty)

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

  // TODO Leverage the knowledge events to make victory scenes, and any scene that goes between another
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'Silkscreen',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <HUDHeader />
          <UserPartyDisplay />
          <BattleTopDisplay gameData={gameData} />
          <BattleBotDisplay ourCurrentMon={ourCurrentMon} />
        </div>
        {gameData.alert ? (
          <div
            style={{
              color: 'Red',
              padding: '10px 0px',
              margin: '0px 30px',
              backgroundColor: 'black',
            }}
          >
            {gameData.alert}
          </div>
        ) : (
          <></>
        )}

        <div style={{ display: 'flex' }}>
          {/* #TODO: Give MenuPopup its' own toggle, and remove this - MenuPopup */}
          <MenuButtonGroup togglePopup={togglePopup} />
        </div>
        <UserPartyDisplay />
        <div
          style={{
            fontFamily: 'Silkscreen',
            backgroundColor: '#5a7d2a',
            color: 'white',
          }}
        >
          <MenuPopup
            selectedPal={ourCurrentMon}
            trigger={popupOpen}
            togglePopup={togglePopup}
            zIndex={1}
          />
          <DialoguePopup
            trigger={showPopup}
            title="BATTLE START"
            message="Mr. Yamashita wants to fight! Are you ready to battle?"
            onButtonClick={handleButtonClick}
            options={[
              {
                label: 'OK',
                onClick: handleButtonClick,
                backgroundColor: '#4b770e',
                color: '#fff',
              },
              {
                label: 'Counter',
                buttonText2: 'Counter',
                onClick: handleButtonClick,
                backgroundColor: '#4b770e',
                color: '#fff',
              },
              {
                label: 'Relaxxx',
                buttonText2: 'Counter',
                // onButtonClick: handleButtonClick,
                onClick: handleButtonClick,
                backgroundColor: '#4b770e',
                color: '#fff',
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

const attackContainerStyle = {
  border: '1px solid #a5e54d',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '12px',
  margin: '8px 0',
  backgroundColor: '#fff',
}

const attackInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
}

const attackNameStyle = {
  fontWeight: 'bold',
}

const attackDamageStyle = {
  flex: 1,
  textAlign: 'right',
}

const attackDescriptionStyle = {
  flex: 1,
  textAlign: 'left',
  color: 'black',
}

const attackEnergyCostStyle = {
  alignSelf: 'flex-end',
  textAlign: 'right',
}

const attackHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
}

export default Battle
