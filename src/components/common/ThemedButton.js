import React from 'react'
import './ThemedButton.css'

const ThemedButton = ({ text, onClick }) => (
  //   <button className="stylish-button">{text}</button>
  <button className="stylish-button" onClick={() => onClick()}>
    {text ? text : 'no text provided'}
  </button>
)

export default ThemedButton
