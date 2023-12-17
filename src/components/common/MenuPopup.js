import React, { useState } from 'react'
import { useDispatchContext, useStateContext } from '../../MainContext'
import Monster from '../info/Monster'
import RenderIndAttack from '../info/RenderIndAttack'

const MenuOptions = {
  ATTACKS: 'attacks',
}
function MenuPopup(props) {
  const [currentMenu, setCurrentMenu] = useState(MenuOptions.ATTACKS)
  const toggleMenu = (menu) => {
    setCurrentMenu(menu)
  }
  const renderTab = (menuOption) => (
    <div>
      <div
        key={menuOption}
        onClick={() => setCurrentMenu(menuOption)}
        className={`cursor-pointer mr-1 ${
          currentMenu === menuOption
            ? 'bg-boy-green  text-white'
            : 'bg-boy-lightgreen text-black'
        }`}
      >
        {menuContent[menuOption].label}
      </div>
    </div>
  )
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()
  console.log('props.selectedPal', props.selectedPal)
  const menuContent = {
    [MenuOptions.ATTACKS]: {
      label: 'Attacks',
      content: (
        <>
          {props.selectedPal.moves.map((move, index) => (
            <RenderIndAttack
              attack={move}
              key={index}
              contextualState={contextualState}
              contextualDispatch={contextualDispatch}
              togglePopup={props.togglePopup}
              pal={props.selectedPal}
            />
          ))}
        </>
      ),
    },
  }

  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="relative p-2 bg-boy-green w-4/5 max-w-xl shadow-md">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-boy-green mr-2"></div>{' '}
          {/* Placeholder for character icon */}
          <div className="text-2xl font-bold">
            {menuContent[currentMenu].label}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          
          {menuContent[currentMenu].content}
        </div>
        <div className="mt-5">
          {Object.values(MenuOptions).map((menuOption) =>
            renderTab(menuOption),
          )}
        </div>
        <div className="mt-5">{/* Add any additional details here */}</div>
        <button
          className="bg-boy-green text-white p-2 mt-5 w-full text-center"
          onClick={() => props.togglePopup()}
        >
          Close
        </button>
      </div>
    </div>
  ) : null
}

const attackHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
}

const characterIconStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: 'green', // Blue circle (placeholder for character icon)
  marginRight: '10px',
}

const attackLabelStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
}

export default MenuPopup
