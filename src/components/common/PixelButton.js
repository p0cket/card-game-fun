import React, { useState } from 'react'

const PixelButton = ({
  onClick,
  children,
  color = 'white', // Default text color
  bgColor = 'bg-green-500', // Default background color
  borderColor = 'border-green-700', // Default border color
  hoverBgColor = 'bg-green-400', // Default hover background color
  shadowColor = '#000000', // Default shadow color
  size = 'medium', // Default size
  buttonStyle = 'normal', // Default button style
}) => {
  const [isPressed, setIsPressed] = useState(false)

  // Size configurations
  const sizeClasses = {
    small: 'py-1 px-3 text-xs',
    medium: 'py-2 px-4 text-sm',
    large: 'py-3 px-6 text-lg',
  }

  // Style configurations
  const styleConfigs = {
    normal: {
      bgColor: bgColor,
      borderColor: borderColor,
      shadowColor: shadowColor,
    },
    // Great important style but not for gb
    // important: {
    //   bgColor: 'bg-red-500',
    //   borderColor: 'border-red-700',
    //   shadowColor: '#000000',
    // },
    important: {
      bgColor: 'bg-green-800', // Darker green for importance
      borderColor: 'border-green-900', // Even darker border for emphasized importance
      shadowColor: '#4B5563', // Dark gray shadow for a subtle contrast
    },
    disabled: {
      bgColor: 'bg-gray-500',
      borderColor: 'border-gray-500',
      shadowColor: '#000000',
    },
    alternative: {
      bgColor: 'bg-green-200', // Muted green for the "Back" button
      borderColor: 'border-green-300', // Slightly darker border for distinction
      shadowColor: '#000000', // Black shadow to maintain consistency
    },
    negative: {
      bgColor: 'bg-green-900', // Muted green for the "Back" button
      borderColor: 'border-green-800', // Slightly darker border for distinction
      shadowColor: '#000000', // Black shadow to maintain consistency
    },
    boy: {
      // bgColor: 'bg-boy-green', 
      bgColor: 'bg-green-700', 
      borderColor: 'border-green-800',
      shadowColor: '#000000',
    },
  }

  const currentStyle = styleConfigs[buttonStyle] || styleConfigs.normal

  const handleMouseDown = () => {
    if (buttonStyle !== 'disabled') {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
    if (buttonStyle !== 'disabled' && onClick) {
      onClick()
    }
  }
  // Handle touch start similar to mouse down
  const handleTouchStart = () => {
    if (buttonStyle !== 'disabled') {
      setIsPressed(true)
    }
  }

  // Handle touch end similar to mouse up
  const handleTouchEnd = (event) => {
    event.preventDefault() // Prevent the mouse event from firing
    setIsPressed(false)
    if (buttonStyle !== 'disabled' && onClick) {
      onClick()
    }
  }
  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`${currentStyle.bgColor} ${color} font-bold ${
        sizeClasses[size]
      } border-b-4 ${
        isPressed ? currentStyle.borderColor : currentStyle.borderColor
      } ${
        buttonStyle !== 'disabled' ? hoverBgColor : ''
      } focus:outline-none focus:shadow-outline transform-gpu ${
        isPressed ? 'translate-y-1' : 'translate-y-0'
      } transition-transform duration-150 ease-in-out`}
      style={{
        fontFamily: 'silkscreen',
        fontSize: '0.75rem',
        imageRendering: 'pixelated',
        boxShadow: `${
          isPressed
            ? `1px 1px 0px 0px ${currentStyle.shadowColor}`
            : `3px 3px 0px 0px ${currentStyle.shadowColor}`
        }`,
        cursor: buttonStyle === 'disabled' ? 'not-allowed' : 'pointer',
      }}
      disabled={buttonStyle === 'disabled'}
    >
      {children}
    </button>
  )
}

export default PixelButton
