import React from 'react'

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

const monsterNameStyle = {
  fontWeight: 'bold',
}

const monsterAbilitiesStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '34px', // To align with the monster icon
}

function Monster({ name, abilities }) {
  const monsterIcon = (
    <div
      style={{
        backgroundColor: 'green',
        width: '24px',
        height: '24px',
        marginRight: '10px',
      }}
    />
  )

  // Check if abilities is an array
  if (Array.isArray(abilities)) {
    return (
      <div style={{ ...attackContainerStyle, backgroundColor: '#5a7d2a' }}>
        <div style={attackInfoStyle}>
          {monsterIcon}
          <div style={monsterNameStyle}>{name}</div>
        </div>
        <div style={monsterAbilitiesStyle}>
          {abilities.map((ability, index) => (
            <div key={index}>{ability}</div>
          ))}
        </div>
      </div>
    )
  } else {
    console.error(`Invalid abilities prop for ${name}:`, abilities)
    return null
  }
}

export default Monster
