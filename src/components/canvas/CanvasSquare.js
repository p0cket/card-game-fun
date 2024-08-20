import React, { useEffect, useRef, useState } from 'react'
import 'tailwindcss/tailwind.css'
import Actor from './Actor'
import ToasterCanvas from './ToasterCanvas'

const CanvasSquare = () => {
  const canvasRef = useRef(null)
  const playerRef = useRef(new Actor(50, 50, 50, 'blue', 10))
  const keysPressed = useRef({})
  const npc = useRef(
    new Actor(200, 200, 50, 'red', 2, 'horizontal', [5, 10, 15]),
  )

  const [showToaster, setShowToaster] = useState(false)
  const [lastTrigger, setLastTrigger] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key] = true
    }
    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      updatePosition()
      drawSquare()
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  const updatePosition = () => {
    let newX = playerRef.current.x
    let newY = playerRef.current.y

    if (keysPressed.current['ArrowUp']) newY -= playerRef.current.speed
    if (keysPressed.current['ArrowDown']) newY += playerRef.current.speed
    if (keysPressed.current['ArrowLeft']) newX -= playerRef.current.speed
    if (keysPressed.current['ArrowRight']) newX += playerRef.current.speed

    playerRef.current.x = newX
    playerRef.current.y = newY

    const now = Date.now()
    if (
      npc.current.collidesWith({
        ...playerRef.current,
        size: playerRef.current.size,
      }) &&
      now - lastTrigger > 3000
    ) {
      setShowToaster(true)
      setLastTrigger(now)
      setTimeout(() => setShowToaster(false), 3000)
    }
  }

  const drawSquare = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    playerRef.current.draw(ctx)
    npc.current.draw(ctx)
    npc.current.updatePosition(
      canvasRef.current.width,
      canvasRef.current.height,
    )
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        className="border"
      ></canvas>
      <ToasterCanvas
        message="Collision detected!"
        show={showToaster}
        onClose={() => setShowToaster(false)}
      />
    </div>
  )
}

export default CanvasSquare
