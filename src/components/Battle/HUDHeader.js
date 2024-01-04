import React from 'react'

function HUDHeader({ gameData }) {
  return (
    <p
      style={{
        margin: '4px',
        backgroundColor: '#5a7d2a',
        color: 'white',
        // center
        display: 'flex',
        justifyContent: 'center',
        // make it take up the full width
        width: '100%',
      }}
      className='font-[silkscreen]'
    >
      Simulation Room: No Effects
    </p>
  )
}

export default HUDHeader
