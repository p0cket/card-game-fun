import React, { useState } from 'react'
import Button from './Button'
import { useDispatchContext, useStateContext } from '../../MainContext'
import { Party } from '../../consts/party/parties'
import { IceWall } from '../../consts/allMoves'
import Monster from '../info/Monster'
import RenderIndAttack from '../info/RenderIndAttack'


const MenuOptions = {
  ATTACKS: 'attacks',
  // BENCH_ATTACKS: 'benchAttacks',
  // DO_SOMETHING: 'doSomething',
}

function MenuPopup(props) {
  const [currentMenu, setCurrentMenu] = useState(MenuOptions.ATTACKS)
  const toggleMenu = (menu) => {
    setCurrentMenu(menu)
  }

  const renderTab = (menuOption) => (
    <div
      key={menuOption}
      onClick={() => toggleMenu(menuOption)}
      style={{
        cursor: 'pointer',
        padding: '10px',
        backgroundColor: currentMenu === menuOption ? '#4b770e' : '#5a7d2a',
        color: currentMenu === menuOption ? '#fff' : '#000',
        marginRight: '10px',
      }}
    >
      {menuContent[menuOption].label}
    </div>
  )
  const contextualState = useStateContext()
  const contextualDispatch = useDispatchContext()

  const menuContent = {
    [MenuOptions.ATTACKS]: {
      label: 'Attacks',
      content: (
        <>
          {props.selectedPal.moves.map((move) => (
            <RenderIndAttack
              attack={move}
              contextualState={contextualState}
              contextualDispatch={contextualDispatch}
              togglePopup={props.togglePopup}
            />
          ))}
        </>
      ),
    },
    [MenuOptions.BENCH_ATTACKS]: {
      label: 'Bench Attacks',
      content: (
        <>
          <Monster name={'Monster 1'} abilities={['Tackle', 'Growl']} />
          <Monster name={'Monster 2'} abilities={['Scratch']} />
          <Monster name={'Monster 3'} abilities={['Tail Whip', 'Growl']} />
          <Monster name={'Monster 4'} abilities={['Tail Whip']} />
          <Monster name={'Monster 5'} abilities={['Tail Whip']} />
        </>
      ),
    },
    [MenuOptions.DO_SOMETHING]: {
      label: 'Do Something',
      content: (
        <div>This is the "Do Something" menu. Add your content here.</div>
      ),
    },
  }

  return props.trigger ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: '#5a7d2a',
          width: '80%',
          maxWidth: '640px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={attackHeaderStyle}>
          <div style={characterIconStyle}>{'i'}</div>
          <div style={attackLabelStyle}>{menuContent[currentMenu].label}</div>
        </div>
        <div
          style={{
            maxHeight: '400px', // Set a maximum height for the scrollable content
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          {menuContent[currentMenu].content}
        </div>
        <div style={{ marginTop: '20px' }}>
          {Object.values(MenuOptions).map((menuOption) =>
            renderTab(menuOption),
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          {/* Add any additional details here */}
        </div>
        <button
          style={{
            backgroundColor: '#4b770e',
            border: 'none',
            color: '#fff',
            padding: '10px 20px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
          onClick={() => props.togglePopup()}
        >
          Close
        </button>
      </div>
    </div>
  ) : (
    ''
  )
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
