// hooks/useGameLogic.js
import { useState, useEffect } from 'react'
import { checkCollision } from '../utils/checkCollision'
// import { checkCollision } from '../utils/collisionDetection'

export default function useGameLogic({
  initialPlayerPosition,
  initialNpcPositions,
  initialBoundaries,
}) {
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition)
  const [npcPositions, setNpcPositions] = useState(initialNpcPositions)
  const [boundaries, setBoundaries] = useState(initialBoundaries)
  const [showDialogue, setShowDialogue] = useState(false)
  const [keysPressed, setKeysPressed] = useState({})

  // Handle key press events
  useEffect(() => {
    const handleKeyDown = ({ key }) =>
      setKeysPressed((prev) => ({ ...prev, [key]: true }))
    const handleKeyUp = ({ key }) =>
      setKeysPressed((prev) => ({ ...prev, [key]: false }))

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Handle player movement and collisions
  useEffect(() => {
    const movePlayer = () => {
      let dx = 0,
        dy = 0,
        speed = 5
      if (keysPressed['ArrowUp']) dy -= speed
      if (keysPressed['ArrowDown']) dy += speed
      if (keysPressed['ArrowLeft']) dx -= speed
      if (keysPressed['ArrowRight']) dx += speed

      let newPosition = { x: playerPosition.x + dx, y: playerPosition.y + dy }
      // Boundary check
      if (
        newPosition.x < 0 ||
        newPosition.y < 0 ||
        newPosition.x > 1024 ||
        newPosition.y > 576
      )
        return

      // Collision with NPCs
      const collision = npcPositions.some((npc) =>
        checkCollision(newPosition, npc),
      )
      if (!collision) {
        setPlayerPosition(newPosition)
      } else {
        setShowDialogue(true) // Assuming collision triggers dialogue
      }
    }

    const interval = setInterval(movePlayer, 1000 / 60) // 60 FPS
    return () => clearInterval(interval)
  }, [keysPressed, playerPosition, npcPositions])

  // Function to close dialogue and potentially reset game state
  const closeDialogue = () => setShowDialogue(false)

  return {
    playerPosition,
    npcPositions,
    boundaries,
    showDialogue,
    closeDialogue,
    setPlayerPosition,
    setNpcPositions,
    setBoundaries,
  }
}
