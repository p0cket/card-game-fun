import React, { useState, useEffect } from 'react'
import NewCanvas from './NewCanvas'
import mapData from '../../assets/maps/mapTest3.json'
// import tsOuterworld from '../../assets/tilesets/ts_outerworld.png'

const GameMap = () => {
  const [tilesetImage, setTilesetImage] = useState(new Image())

  useEffect(() => {
    // Assuming your tileset is correctly referenced and imported
    const image = new Image()
    image.onload = () => setTilesetImage(image)
    // image.src = tsOuterworld
  }, [])

  const draw = (ctx) => {
    if (!tilesetImage) {
      console.log('Tileset image not loaded...')
      return
    }

    console.log('Drawing map...')
    const tileSize = mapData.tilewidth

    mapData.layers.forEach((layer) => {
      if (layer.type === 'tilelayer') {
        layer.data.forEach((tileIndex, index) => {
          if (tileIndex === 0) return // Skip empty tiles

          const sourceX =
            ((tileIndex - 1) % mapData.tilesets[0].columns) * tileSize
          const sourceY =
            Math.floor((tileIndex - 1) / mapData.tilesets[0].columns) * tileSize
          const targetX = (index % layer.width) * tileSize
          const targetY = Math.floor(index / layer.width) * tileSize

          ctx.drawImage(
            tilesetImage,
            sourceX,
            sourceY,
            tileSize,
            tileSize,
            targetX,
            targetY,
            tileSize,
            tileSize,
          )
        })
      }
    })
    console.log('Finished drawing map.')
  }

  // Use mapData to determine the canvas size
  const width = mapData.width * mapData.tilewidth
  const height = mapData.height * mapData.tileheight

  return (
    <NewCanvas
      draw={draw}
      width={width.toString()}
      height={height.toString()}
    />
  )
}

export default GameMap
