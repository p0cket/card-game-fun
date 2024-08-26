import React, { useState } from 'react'
import { energyEmoji } from '../../consts/consts'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'
import ItemMenuModal from '../common/ItemMenuModal'
import { DIALOGS } from '../dialog/DialogManager'
import { viewConsts } from '../../consts/battleConsts'
import AttackButtons from './menus/AttackButtons'
import CombatMainMenuButtons from './menus/CombatMainMenuButtons'

function MenuButtonGroup({ togglePopup, ourCurrentMon }) {
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  const inDebug = contextualState.debug && contextualState.debug.isOpen
  const [currentView, setCurrentView] = useState(viewConsts.MENU)
  const [itemModalVisible, setItemModalVisible] = useState(false)
  const { items } = contextualState.bag
  const { energy, maxEnergy } = contextualState.game.player

  const togglePalMenu = () => {
    // set current menu to SWAP
    contextualDispatch({
      type: ACTIONS.CHANGE_DIALOG,
      payload: { dialog: DIALOGS.SWAP_PAL_BASIC },
    })
  }

  console.log(`ourCurrentMon!:D `, ourCurrentMon)

  return (
    <div className="w-full relative">
      {currentView === viewConsts.MENU ? (
        <CombatMainMenuButtons
          energy={energy}
          maxEnergy={maxEnergy}
          energyEmoji={energyEmoji}
          setCurrentView={setCurrentView}
          setItemModalVisible={setItemModalVisible}
          inDebug={inDebug}
          togglePalMenu={togglePalMenu}
        />
      ) : (
        <AttackButtons
          energy={energy}
          maxEnergy={maxEnergy}
          energyEmoji={energyEmoji}
          ourCurrentMon={ourCurrentMon}
          contextualDispatch={contextualDispatch}
          contextualState={contextualState}
          setCurrentView={setCurrentView}
        />
      )}
      {itemModalVisible && (
        <ItemMenuModal
          items={items}
          setItemModalVisible={setItemModalVisible}
        />
      )}
    </div>
  )
}

export default MenuButtonGroup
