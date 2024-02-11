// ./hooks/useGameControls.js
import { useState, useEffect } from 'react'

const useGameControls = () => {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  })

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key in keys) {
        setKeys((prev) => ({ ...prev, [key]: true }))
      }
    }

    const handleKeyUp = ({ key }) => {
      if (key in keys) {
        setKeys((prev) => ({ ...prev, [key]: false }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [keys])

  return keys
}

export default useGameControls
