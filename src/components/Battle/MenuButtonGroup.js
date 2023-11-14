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
          margin: '2px',
        }}
      >
        <div>
          <div
            onClick={togglePopup}
            className="p-1 text-green-200 text-sm"
          >
            Attack
          </div>
          <div className="p-1 text-green-400 text-sm">
            [(🔒)Items]
          </div>
        </div>
        <div>
          <div className="p-1 text-sm">[(🔒)PaLs]</div>
          <div className="p-1 text-sm">[(🔒)Options]</div>
        </div>
      </div>
    </div>
  )
}

MenuButtonGroup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
}
export default MenuButtonGroup
