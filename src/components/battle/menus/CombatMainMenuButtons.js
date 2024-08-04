import React from 'react'
import { viewConsts } from '../../../consts/battleConsts'
import EnergyBar from '../EnergyBar'

const CombatMainMenuButtons = ({
  energy,
  maxEnergy,
  energyEmoji,
  setCurrentView,
  setItemModalVisible,
  inDebug,
  togglePalMenu,
}) => {
  return (
    <div className="font-[silkscreen] flex w-full justify-between text-white bg-[#5a7d2a] border border-[#4e6a22] shadow-inner">
      <EnergyBar
        energy={energy}
        maxEnergy={maxEnergy}
        energyEmoji={energyEmoji}
      />
      <div className="flex flex-grow justify-around items-center m-1 bg-[#5a7d2a]">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full bg-boy-green border border-gray-400 rounded-sm">
          <div
            onClick={() => setCurrentView(viewConsts.ATTACKS)}
            className="text-[#ddf4c5] text-sm cursor-pointer p-1 flex items-center justify-center"
          >
            Attack
          </div>
          <div
            className="text-[#ddf4c5] text-sm p-1 flex items-center justify-center"
            onClick={() => setItemModalVisible(true)}
          >
            Items
          </div>
          {inDebug ? (
            <div
              className="text-sm p-1 flex items-center justify-center"
              onClick={togglePalMenu}
            >
              🔒PaLs
            </div>
          ) : (
            <div className="text-sm p-1 flex items-center justify-center">
              🔒PaLs
            </div>
          )}
          <div
            // onClick={togglePopup} maybe options button?
            className="text-sm p-1 flex items-center justify-center"
          >
            🔒End Turn
          </div>
        </div>
      </div>
    </div>
  )
}

export default CombatMainMenuButtons
