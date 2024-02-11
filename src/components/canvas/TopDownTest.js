import React, { useState, useEffect, useRef } from 'react'
import NewCanvas from './NewCanvas'
import playerImageSrc from '../../assets/pals/berocroseal_pxl2.png'
import npcImageSrc from '../../assets/creatures/Squirrely.png'
import npcImageSrc2 from '../../assets/pals/Luminowl_pxl.png'
import bgImgSrc from '../../assets/maps/bg2testBIG2.png'
import boundaryImgSrc from '../../assets/mapTiles/autoTile_nature-25.png.png'
import { DialogueMenu } from './DialogueMenu'
import { drawPlayer, loadPlayerImage } from './elements/Player'
import { lvlOne, lvlTwo } from './levels/testLevels'

const TopDownTest = () => {
  const [mode, setMode] = useState('edit') // 'edit' or 'play'

  const [editingMode, setEditingMode] = useState('boundary') // Default mode
  const [npcs, setNpcs] = useState([])
  const [configInput, setConfigInput] = useState('')

  // Assuming setLevel and loadCurrentLevel functions are modified to update React state
  const [levelConfig, setLevelConfig] = useState({ boundaries: [], NPCs: [] })

  const cellPadding = '40px'
  const [playerImage, setPlayerImage] = useState(null)
  const [showDialogue, setShowDialogue] = useState(false)
  const [playerPosition, setPlayerPosition] = useState({ x: 214, y: 400 })
  const [npcPositions, setNpcPositions] = useState([
    { x: 300, y: 300, imgSrc: npcImageSrc },
    { x: 400, y: 400, imgSrc: npcImageSrc2 },
  ])
  const [boundaries, setBoundaries] = useState([
    { x: 200, y: 200, width: 100, height: 100 },
  ])
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [debugInfo, setDebugInfo] = useState([])
  const [showBoundaryBackgrounds, setShowBoundaryBackgrounds] = useState(true)

  const npcImages = useRef(new Map())
  const bgImage = useRef(new Image())
  const boundaryImage = useRef(new Image())
  const gridSize = 50 // Size of each grid cell, adjust as needed
  const drawGrid = (ctx, canvasWidth, canvasHeight, gridSize) => {
    ctx.beginPath()
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight)
    }
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      ctx.moveTo(0, y)
      ctx.lineTo(canvasWidth, y)
    }
    ctx.strokeStyle = '#ddd' // Grid line color
    ctx.stroke()
  }
  const [selectedCells, setSelectedCells] = useState([])

  // Load level configuration
  const loadLevelConfig = (level) => {
    // Assuming level is an object like { boundaries: [...], NPCs: [...] }
    console.log('Loading level configuration:', level)
    setLevelConfig(level)
    // If you keep separate states for NPCs and boundaries
    // setNpcs(level.NPCs);
    // setBoundaries(level.boundaries);
  }
  const toggleMode = () => {
    setMode(mode === 'edit' ? 'play' : 'edit')
  }

  //   useEffect(() => {
  //     // Example: Load level 1 on component mount
  //     setLevel(1) // Set the desired level
  //     const config = loadCurrentLevel() // Load the current level's configuration
  //     setLevelConfig(config) // Update state with the level configuration
  //   }, [])

  //   // Function to handle level loading
  //   const handleLoadLevel = (levelNumber) => {
  //     setLevel(levelNumber)
  //     const config = loadCurrentLevel()
  //     setLevelConfig(config)
  //   }
  useEffect(() => {
    // Load the initial level configuration on component mount
    loadLevelConfig(lvlTwo) // Replace with your default or initial level
  }, [])

  const exportLevelConfigToClipboard = () => {
    const levelConfig = {
      boundaries: boundaries,
      NPCs: npcs,
    }

    const formattedData = JSON.stringify(levelConfig, null, 2)
    navigator.clipboard
      .writeText(formattedData)
      .then(() => alert('Level configuration copied to clipboard!'))
      .catch((err) => console.error('Failed to copy data: ', err))
  }

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const handleClick = (event) => {
      console.log('Clicked on canvas', event.clientX, event.clientY)
      if (mode === 'edit') {
        // Existing logic for adding NPCs or boundaries
        console.log('EditMode:', event.clientX, event.clientY)

        const rect = canvas.getBoundingClientRect()
        const x = Math.floor((event.clientX - rect.left) / gridSize) * gridSize
        const y = Math.floor((event.clientY - rect.top) / gridSize) * gridSize

        if (editingMode === 'boundary') {
          let foundBoundaryIndex = boundaries.findIndex(
            (boundary) =>
              x >= boundary.x &&
              x < boundary.x + boundary.width &&
              y >= boundary.y &&
              y < boundary.y + boundary.height,
          )

          if (foundBoundaryIndex > -1) {
            // Remove the boundary
            setBoundaries(
              boundaries.filter((_, index) => index !== foundBoundaryIndex),
            )
          } else {
            // Create a new boundary for the cell
            const newBoundary = {
              x: x,
              y: y,
              width: gridSize,
              height: gridSize,
            }
            setBoundaries([...boundaries, newBoundary])
          }
          // Boundary creation logic (same as before, or adjusted as needed)
        } else if (editingMode === 'NPC') {
          // Logic for adding an NPC at the clicked location
          // This could involve setting an NPC state array or similar
          const newNpc = { x, y, type: 'defaultNPC' }
          setNpcs([...npcs, newNpc])
        }
        // Check if the cell is already part of an existing boundary
      }
    }
    // For 'play' mode, you might want to handle different interactions

    canvas.addEventListener('click', handleClick)

    return () => {
      canvas.removeEventListener('click', handleClick)
    }
  }, [editingMode, npcs, gridSize, boundaries])

  // Depend on selectedCells to capture changes
  const drawSelectedCells = (ctx, cells) => {
    cells.forEach((cell) => {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)' // Adjust the color and opacity as needed
      ctx.fillRect(cell.x, cell.y, gridSize, gridSize)
    })
  }
  // Example of adding a boundary object
  const addBoundary = () => {
    const newBoundary = {
      x: Math.min(...selectedCells.map((cell) => cell.x)),
      y: Math.min(...selectedCells.map((cell) => cell.y)),
      width:
        Math.max(...selectedCells.map((cell) => cell.x)) -
        Math.min(...selectedCells.map((cell) => cell.x)) +
        gridSize,
      height:
        Math.max(...selectedCells.map((cell) => cell.y)) -
        Math.min(...selectedCells.map((cell) => cell.y)) +
        gridSize,
    }
    setBoundaries([...boundaries, newBoundary])
    setSelectedCells([]) // Clear selection after adding
  }

  const exportBoundariesToClipboard = () => {
    const formattedData = JSON.stringify(boundaries, null, 2)
    navigator.clipboard
      .writeText(formattedData)
      .then(() => alert('Collision data copied to clipboard!'))
      .catch((err) => console.error('Failed to copy data: ', err))
  }

  //   const drawSelectedCells = (ctx, cells) => {
  //     ctx.fillStyle = 'rgba(255, 0, 0, 0.5)' // Semi-transparent red
  //     cells.forEach((cell) => {
  //       ctx.fillRect(cell.x, cell.y, gridSize, gridSize)
  //     })
  //   }

  useEffect(() => {
    const image = loadPlayerImage()
    image.onload = () => setPlayerImage(image)

    bgImage.current.src = bgImgSrc
    boundaryImage.current.src = boundaryImgSrc

    npcPositions.forEach((npc) => {
      if (!npcImages.current.has(npc.imgSrc)) {
        const img = new Image()
        img.src = npc.imgSrc
        npcImages.current.set(npc.imgSrc, img)
      }
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
      let newX = playerPosition.x
      let newY = playerPosition.y

      if (keys.w) newY -= 3
      if (keys.s) newY += 3
      if (keys.a) newX -= 3
      if (keys.d) newX += 3

      newX = Math.max(0, Math.min(newX, 1024 - 50))
      newY = Math.max(0, Math.min(newY, 576 - 50))

      const collisionWithBoundary = boundaries.some(
        (boundary) =>
          newX < boundary.x + boundary.width &&
          newX + 50 > boundary.x &&
          newY < boundary.y + boundary.height &&
          newY + 50 > boundary.y,
      )

      const collisionWithNpc = npcPositions.some(
        (npc) =>
          newX < npc.x + 50 &&
          newX + 50 > npc.x &&
          newY < npc.y + 50 &&
          newY + 50 > npc.y,
      )

      if (!collisionWithBoundary && !collisionWithNpc) {
        setPlayerPosition({ x: newX, y: newY })
      }
    }

    const interval = setInterval(move, 10)
    return () => clearInterval(interval)
  }, [keys, playerPosition, boundaries, npcPositions])
  const loadConfig = () => {
    try {
      const config = JSON.parse(configInput)
      if (config.boundaries) {
        setBoundaries(config.boundaries)
      }
      if (config.NPCs) {
        setNpcs(config.NPCs) // Assuming you have an `npcs` state similar to `boundaries`
      }
      // Load other parts of the config as necessary
      alert('Level configuration loaded successfully!')
    } catch (error) {
      alert('Failed to load configuration: Invalid JSON')
      console.error('Load config error:', error)
    }
  }
  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (bgImage.current.complete) {
      ctx.drawImage(bgImage.current, 0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    if (playerImage && playerImage.complete) {
      drawPlayer(ctx, playerPosition, playerImage)
    }

    npcPositions.forEach((npc) => {
      const npcImage = npcImages.current.get(npc.imgSrc)
      if (npcImage && npcImage.complete) {
        ctx.drawImage(npcImage, npc.x, npc.y, 50, 50)
      }
    })

    if (showBoundaryBackgrounds) {
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
    }
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height, gridSize)
    drawSelectedCells(ctx, selectedCells) // Draw all selected cells
    npcs.forEach((npc) => {
      // Placeholder for NPC rendering logic
      // For example, drawing a simple rectangle or an NPC sprite
      ctx.fillStyle = 'blue' // Different color to distinguish NPCs from boundaries
      ctx.fillRect(npc.x, npc.y, gridSize, gridSize)
    })

    //Drawing lvlConfig stuff. We should choose between this and the other.
    // really we should add in this to start and be able to add or remove from it

    if (showBoundaryBackgrounds) {
      levelConfig.boundaries.forEach((boundary) => {
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
    }

    // NPCs
    levelConfig.NPCs.forEach((npc) => {
      const npcImage = npcImages.current.get(npc.imgSrc)
      //   console.log(`npcImage`, npcImage, npc.x, npc.y)
      if (npcImage && npcImage.complete) {
        ctx.drawImage(npcImage, npc.x, npc.y, 50, 50) // Adjust size as necessary
      }
    })
  }

  return (
    <div>
      <NewCanvas draw={draw} width={1024} height={576} />
      <button onClick={() => toggleMode()}>toggleMode</button>
      {mode === 'edit' && (
        <div className="editing-controls">
          <button
            onClick={() => setEditingMode('boundary')}
            style={{
              backgroundColor: editingMode === 'boundary' ? 'lightblue' : '',
            }}
            className="p-4 m-2"
          >
            Edit Boundaries
          </button>
          <button
            onClick={() => setEditingMode('NPC')}
            style={{
              backgroundColor: editingMode === 'NPC' ? 'lightblue' : '',
            }}
            className="p-4 m-2"
          >
            Add NPCs
          </button>
        </div>
      )}
      {showDialogue && <DialogueMenu onClose={() => setShowDialogue(false)} />}
      {mode === 'edit' && (
        <div className="p-4 m-2">
          Mouse Position: {`X: ${mousePosition.x}, Y: ${mousePosition.y}`}
          {debugInfo.map((info, index) => (
            <div key={index}>
              {info.label}: X: {info.position.x}, Y: {info.position.y}
            </div>
          ))}
          <button
            onClick={() => setShowBoundaryBackgrounds(!showBoundaryBackgrounds)}
            className="p-4 m-2"
          >
            Toggle Boundary Backgrounds
          </button>
          <div className="debug-menu">
            <h3>Debug Menu</h3>
            <div className="p-2 m-2">
              {' '}
              <button onClick={addBoundary} className="p-4 m-2">
                Add Boundary
              </button>
              <button onClick={exportBoundariesToClipboard} className="p-4 m-2">
                Export Boundaries
              </button>
              <button
                onClick={exportLevelConfigToClipboard}
                className="p-4 m-2"
              >
                Export Full Level Config
              </button>
            </div>

            <ul className="boundary-list">
              <table className="boundary-table">
                <thead>
                  <tr>
                    <th style={{ paddingRight: cellPadding }}>i</th>
                    <th style={{ paddingRight: cellPadding }}>X</th>
                    <th style={{ paddingRight: cellPadding }}>Y</th>
                    <th style={{ paddingRight: cellPadding }}>Width</th>
                    <th style={{ paddingRight: cellPadding }}>Height</th>
                  </tr>
                </thead>
                <tbody>
                  {boundaries.map((boundary, index) => (
                    <tr key={index} className="boundary-item">
                      <td className="boundary-index">{index}</td>
                      <td
                        className="boundary-coord"
                        style={{ paddingRight: cellPadding }}
                      >
                        {boundary.x}
                      </td>
                      <td
                        className="boundary-coord"
                        style={{ paddingRight: cellPadding }}
                      >
                        {boundary.y}
                      </td>
                      <td
                        className="boundary-dim"
                        style={{ paddingRight: cellPadding }}
                      >
                        {boundary.width}
                      </td>
                      <td className="boundary-dim">{boundary.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ul>
          </div>
          <div className="config-loader">
            <textarea
              value={configInput}
              onChange={(e) => setConfigInput(e.target.value)}
              placeholder="Paste level config JSON here"
              rows="10"
              cols="50"
              className="text-black"
            ></textarea>
            <button onClick={loadConfig} className="p-4 m-2">
              Load Config
            </button>
            {/* <div>
            {' '}
            <button onClick={() => handleLoadLevel(1)}>Load Level 1</button>
            <button onClick={() => handleLoadLevel(2)}>Load Level 2</button>
          </div> */}
          </div>
          {/* <div className="debug-menu">
          <h3>Collision Boundaries</h3>
          <ul>
            {boundaries.map((boundary, index) => (
              <li key={index}>
                x: {boundary.x}, y: {boundary.y}, width: {boundary.width},
                height: {boundary.height}
              </li>
            ))}
          </ul>
          <button onClick={exportBoundariesToClipboard}>
            Copy to Clipboard
          </button>
        </div> */}
        </div>
      )}
    </div>
  )
}

export default TopDownTest

// import React, { useState, useEffect, useRef } from 'react'
// import NewCanvas from './NewCanvas'
// // import playerImageSrc from '../../assets/pals/berocroseal_pxl2.png'
// import playerImageSrc from '../../assets/pals/berocroseal_pxl2.png'
// import npcImageSrc from '../../assets/creatures/Squirrely.png'
// import npcImageSrc2 from '../../assets/pals/Luminowl_pxl.png'
// import bgImgSrc from '../../assets/maps/bg2testBIG2.png'
// import boundaryImgSrc from '../../assets/mapTiles/autoTile_nature-25.png.png'
// import { DialogueMenu } from './DialogueMenu'
// import { drawPlayer, loadPlayerImage } from './elements/Player'

// const TopDownTest = () => {
//   const [playerImage, setPlayerImage] = useState(null)
//   //   useEffect(() => {
//   //     const image = loadPlayerImage()
//   //     image.onload = () => setPlayerImage(image)
//   //   }, [])
//   useEffect(() => {
//     const image = loadPlayerImage()
//     image.onload = () => setPlayerImage(image)
//   }, [])

//   const [showDialogue, setShowDialogue] = useState(false)
//   const [playerPosition, setPlayerPosition] = useState({ x: 214, y: 400 })
//   const [npcPositions, setNpcPositions] = useState([
//     { x: 300, y: 300, imgSrc: npcImageSrc },
//     { x: 400, y: 400, imgSrc: npcImageSrc2 },
//   ])
//   const [boundaries, setBoundaries] = useState([
//     { x: 200, y: 200, width: 100, height: 100 },
//   ])
//   const [keys, setKeys] = useState({
//     w: false,
//     a: false,
//     s: false,
//     d: false,
//   })
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [debugInfo, setDebugInfo] = useState([])
//   const [showBoundaryBackgrounds, setShowBoundaryBackgrounds] = useState(true)

//   //   const playerImage = useRef(new Image())
//   const npcImages = useRef(new Map())
//   const bgImage = useRef(new Image())
//   const boundaryImage = useRef(new Image())

//   const toggleBoundaryBackgrounds = () => {
//     setShowBoundaryBackgrounds(!showBoundaryBackgrounds)
//   }
//   // Mouse move handler to update mouse position state
//   const handleMouseMove = (event) => {
//     const canvas = event.target
//     const rect = canvas.getBoundingClientRect()
//     setMousePosition({
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     })
//   }

//   const checkCollision = (obj1, obj2) => {
//     return (
//       obj1.x < obj2.x + obj2.width &&
//       obj1.x + 50 > obj2.x && // Assuming player size is 50x50
//       obj1.y < obj2.y + obj2.height &&
//       obj1.y + 50 > obj2.y
//     )
//   }

//   useEffect(() => {
//     bgImage.current = new Image();
//     bgImage.current.src = bgImgSrc;

//     boundaryImage.current = new Image();
//     boundaryImage.current.src = boundaryImgSrc;

//     // Preload NPC images if necessary
//     npcPositions.forEach(npc => {
//       if (!npcImages.current.has(npc.imgSrc)) {
//         const img = new Image();
//         img.src = npc.imgSrc;
//         npcImages.current.set(npc.imgSrc, img);
//       }
//     });
//   useEffect(() => {
//     playerImage.current.src = playerImageSrc
//     bgImage.current.src = bgImgSrc
//     boundaryImage.current.src = boundaryImgSrc

//     npcPositions.forEach((npc) => {
//       if (!npcImages.current.has(npc.imgSrc)) {
//         const img = new Image()
//         img.src = npc.imgSrc
//         npcImages.current.set(npc.imgSrc, img)
//       }
//     })

//     const allImages = [
//       playerImage.current,
//       bgImage.current,
//       boundaryImage.current,
//       ...npcImages.current.values(),
//     ]
//     const loadedPromises = allImages.map(
//       (img) => new Promise((resolve) => (img.onload = resolve)),
//     )
//     Promise.all(loadedPromises).then(() => {
//       console.log('All images loaded')
//     })
//   }, [])

//   useEffect(() => {
//     const handleKeyDown = (e) =>
//       setKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }))
//     const handleKeyUp = (e) =>
//       setKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }))

//     window.addEventListener('keydown', handleKeyDown)
//     window.addEventListener('keyup', handleKeyUp)

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown)
//       window.removeEventListener('keyup', handleKeyUp)
//     }
//   }, [])

//   useEffect(() => {
//     const move = () => {
//       const speed = 3
//       let newX = playerPosition.x
//       let newY = playerPosition.y

//       if (keys.w) newY -= speed
//       if (keys.s) newY += speed
//       if (keys.a) newX -= speed
//       if (keys.d) newX += speed

//       const canvasWidth = 1024
//       const canvasHeight = 576
//       newX = Math.max(0, Math.min(newX, canvasWidth - 50))
//       newY = Math.max(0, Math.min(newY, canvasHeight - 50))

//       let collisionWithBoundary = boundaries.some((boundary) =>
//         checkCollision({ x: newX, y: newY, width: 50, height: 50 }, boundary),
//       )

//       let collisionWithNpc = npcPositions.some((npc) =>
//         checkCollision(
//           { x: newX, y: newY, width: 50, height: 50 },
//           { ...npc, width: 50, height: 50 },
//         ),
//       )

//       if (collisionWithBoundary || collisionWithNpc) {
//         setShowDialogue(true)
//       } else {
//         setPlayerPosition({ x: newX, y: newY })
//       }
//     }

//     const interval = setInterval(move, 10)
//     return () => clearInterval(interval)
//   }, [keys, playerPosition, boundaries, npcPositions])

//   useEffect(() => {
//     const canvas = document.querySelector('canvas')
//     if (canvas && canvas.getContext) {
//       const ctx = canvas.getContext('2d')
//       draw(ctx) // Redraw canvas with current states
//     }
//   }, [showBoundaryBackgrounds]) // Redraw canvas when toggle state changes

//   useEffect(() => {
//     // Update debug info whenever relevant state changes
//     const newDebugInfo = [
//       { label: 'Player', position: playerPosition },
//       ...npcPositions.map((npc, index) => ({
//         label: `NPC ${index + 1}`,
//         position: npc,
//       })),
//       ...boundaries.map((boundary, index) => ({
//         label: `CollisionBlock ${index + 1}`,
//         position: boundary,
//       })),
//     ]
//     setDebugInfo(newDebugInfo)
//   }, [playerPosition, npcPositions, boundaries])

//   //   const draw = (ctx) => {

//   //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
//   //     ctx.drawImage(bgImage.current, 0, 0, ctx.canvas.width, ctx.canvas.height)

//   //     if (playerImage && playerImage.complete) {
//   //         drawPlayer(ctx, playerPosition, playerImage);
//   //       }

//   //     npcPositions.forEach((npc) => {
//   //       const npcImage = npcImages.current.get(npc.imgSrc)
//   //       if (npcImage && npcImage.complete) {
//   //         ctx.drawImage(npcImage, npc.x, npc.y, 50, 50)
//   //       }
//   //     })

//   //     if (showBoundaryBackgrounds) {
//   //       boundaries.forEach((boundary) => {
//   //         if (boundaryImage.current.complete) {
//   //           ctx.drawImage(
//   //             boundaryImage.current,
//   //             boundary.x,
//   //             boundary.y,
//   //             boundary.width,
//   //             boundary.height,
//   //           )
//   //         }
//   //       })
//   //     }

//   //     if (playerImage.current.complete) {
//   //       ctx.drawImage(
//   //         playerImage.current,
//   //         playerPosition.x,
//   //         playerPosition.y,
//   //         50,
//   //         50,
//   //       )
//   //     }
//   //   }
//   const draw = (ctx) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     // Draw the background
//     if (bgImage.current && bgImage.current.complete) {
//       ctx.drawImage(bgImage.current, 0, 0, ctx.canvas.width, ctx.canvas.height);
//     }

//     // Draw the player
//     if (playerImage && playerImage.complete) {
//       drawPlayer(ctx, playerPosition, playerImage);
//     }

//     // Draw NPCs
//     npcPositions.forEach(npc => {
//       const npcImage = npcImages.current.get(npc.imgSrc);
//       if (npcImage && npcImage.complete) {
//         ctx.drawImage(npcImage, npc.x, npc.y, 50, 50);
//       }
//     });

//     // Draw boundaries
//     if (showBoundaryBackgrounds) {
//       boundaries.forEach(boundary => {
//         if (boundaryImage.current && boundaryImage.current.complete) {
//           ctx.drawImage(boundaryImage.current, boundary.x, boundary.y, boundary.width, boundary.height);
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     const canvas = document.querySelector('canvas')
//     canvas.addEventListener('mousemove', handleMouseMove)

//     return () => {
//       canvas.removeEventListener('mousemove', handleMouseMove)
//     }
//   }, [])

//   return (
//     <div>
//       <NewCanvas
//         draw={draw}
//         width={1024}
//         height={576}
//         onMouseMove={handleMouseMove}
//       />
//       {/* {showDialogue && <DialogueMenu onClose={() => setShowDialogue(false)} />} */}
//       <div>
//         Mouse Position: {`X: ${mousePosition.x}, Y: ${mousePosition.y}`}
//         {debugInfo.map((info, index) => (
//           <div key={index}>
//             {info.label}: X: {info.position.x}, Y: {info.position.y}
//           </div>
//         ))}
//         <button onClick={toggleBoundaryBackgrounds}>
//           Toggle Boundary Backgrounds
//         </button>
//       </div>
//     </div>
//   )
// }

// export default TopDownTest
