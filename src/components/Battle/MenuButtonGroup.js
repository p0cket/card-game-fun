import React from 'react'
import { energyEmoji } from '../../consts/consts'
import PropTypes from 'prop-types'
import { useStateContext } from '../../MainContext'

function MenuButtonGroup({ togglePopup }) {
  const contextualState = useStateContext()

  return (
    <div
      style={{
        fontFamily: 'Silkscreen',
        display: 'flex',
        color: 'white',
        backgroundColor: '#5a7d2a',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: '20px',
          alignContent: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '4px',
        }}
      >
        {contextualState.game.player.energy} Energy
        {energyEmoji}
      </div>
      <div
        style={{
          fontFamily: 'Silkscreen',
          display: 'flex',
          justifyContent: 'space-around',
          flex: 2,
          backgroundColor: '#5a7d2a',
          color: 'white',
          margin: '3px',
        }}
      >
        <div>
          <div
            style={{ padding: '3px' }}
            onClick={togglePopup}
            className="text-green-200"
          >
            Attack
          </div>
          <div style={{ padding: '3px' }} className="text-blue-400">
            Items
          </div>
        </div>
        <div>
          <div style={{ padding: '3px' }}>[(Locked)PaLs</div>
          <div style={{ padding: '3px' }}>Options</div>
        </div>
      </div>
    </div>
  )
}

MenuButtonGroup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
}
export default MenuButtonGroup
