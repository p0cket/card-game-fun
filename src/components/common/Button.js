//Deprecated while we figure out what we want to use for our buttons.
import React from 'react'

const Button = (text, onClick) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        style={{ padding: '10px', margin: '5px' }}
      >
        {text ? text : 'no text provided'}
      </button>
    </>
  )
}

export default Button
