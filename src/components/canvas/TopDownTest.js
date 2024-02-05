import React, { useState, useEffect, useRef } from 'react'
import NewCanvas from './NewCanvas'
import playerImageSrc from '../../assets/pals/berocroseal_pxl2.png'
import npcImageSrc from '../../assets/creatures/Squirrely.png'
import npcImageSrc2 from '../../assets/pals/Luminowl_pxl.png'
import bgImgSrc from '../../assets/maps/bg2testBIG.png'
import boundaryImgSrc from '../../assets/mapTiles/autoTile_nature-25.png.png'
import { DialogueMenu } from './DialogueMenu'

const TopDownTest = () => {
  const [showDialogue, setShowDialogue] = useState(false)
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 })
  const [npcPositions, setNpcPositions] = useState([
    { x: 300, y: 300, imgSrc: npcImageSrc },
    { x: 400, y: 400, imgSrc: npcImageSrc2 },
  ])
  const [boundaries, setBoundaries] = useState([
    { x: 200, y: 200, width: 100, height: 100 },
  ])
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  })

  const checkCollision = (obj1, obj2) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + 50 > obj2.x && // Assuming player size is 50x50
      obj1.y < obj2.y + obj2.height &&
      obj1.y + 50 > obj2.y
    )
  }

  const playerImage = useRef(new Image())
  const npcImages = useRef(new Map())
  const bgImage = useRef(new Image())
  const boundaryImage = useRef(new Image())

  useEffect(() => {
    playerImage.current.src = playerImageSrc
    bgImage.current.src = bgImgSrc
    boundaryImage.current.src = boundaryImgSrc

    npcPositions.forEach((npc) => {
      if (!npcImages.current.has(npc.imgSrc)) {
        const img = new Image()
        img.src = npc.imgSrc
        npcImages.current.set(npc.imgSrc, img)
      }
    })

    const allImages = [
      playerImage.current,
      bgImage.current,
      boundaryImage.current,
      ...npcImages.current.values(),
    ]
    const loadedPromises = allImages.map(
      (img) => new Promise((resolve) => (img.onload = resolve)),
    )
    Promise.all(loadedPromises).then(() => {
      console.log('All images loaded')
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) =>
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }))
    const handleKeyUp = (e) =>
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }))

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    const move = () => {
      const speed = 3
      let newX = playerPosition.x
      let newY = playerPosition.y

      if (keys.w) newY -= speed
      if (keys.s) newY += speed
      if (keys.a) newX -= speed
      if (keys.d) newX += speed

      // Ensure newX and newY are within canvas bounds
      const canvasWidth = 1024
      const canvasHeight = 576
      newX = Math.max(0, Math.min(newX, canvasWidth - 50)) // Prevent moving beyond canvas edges
      newY = Math.max(0, Math.min(newY, canvasHeight - 50))
      // Check collision with boundaries
      let collisionWithBoundary = boundaries.some((boundary) =>
        checkCollision({ x: newX, y: newY, width: 50, height: 50 }, boundary),
      )

      // Optionally, check collision with NPCs
      let collisionWithNpc = npcPositions.some((npc) =>
        checkCollision(
          { x: newX, y: newY, width: 50, height: 50 },
          { ...npc, width: 50, height: 50 },
        ),
      )
      if (collisionWithBoundary || collisionWithNpc) {
        setShowDialogue(true) // Show the dialogue when a collision is detected
      }

      // Update player position if there's no collision
      if (!collisionWithBoundary && !collisionWithNpc) {
        setPlayerPosition({ x: newX, y: newY })
      }
    }

    const interval = setInterval(move, 10)
    return () => clearInterval(interval)
  }, [keys, playerPosition])

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(bgImage.current, 0, 0, ctx.canvas.width, ctx.canvas.height)

    npcPositions.forEach((npc) => {
      const npcImage = npcImages.current.get(npc.imgSrc)
      if (npcImage && npcImage.complete) {
        ctx.drawImage(npcImage, npc.x, npc.y, 50, 50)
      }
    })

    boundaries.forEach((boundary) => {
      if (boundaryImage.current.complete) {
        ctx.drawImage(
          boundaryImage.current,
          boundary.x,
          boundary.y,
          boundary.width,
          boundary.height,
        )
      }
    })

    if (playerImage.current.complete) {
      ctx.drawImage(
        playerImage.current,
        playerPosition.x,
        playerPosition.y,
        50,
        50,
      )
    }
  }

  return (
    <div>
      {showDialogue && <DialogueMenu onClose={() => setShowDialogue(false)} />}
      <NewCanvas draw={draw} width={1024} height={576} />
    </div>
  )
}

export default TopDownTest
