import React, { useEffect, useRef } from 'react'
import axios from 'axios'

const Tilemap = ({ src, tilesetSrc, tileWidth, tileHeight }) => {
  const canvasRef = useRef(null)

  const loadTilemap = async () => {
    try {
      const response = await axios.get(src)
      const tilemap = response.data
      renderTilemap(tilemap)
    } catch (error) {
      console.error('Failed to load tilemap:', error)
    }
  }

  const renderTilemap = (tilemap) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const tilesetImage = new Image()
    tilesetImage.onload = () => {
      tilemap.layers.forEach((layer) => {
        if (layer.type === 'tilelayer') {
          renderLayer(
            ctx,
            layer,
            tilesetImage,
            tilemap.tilewidth,
            tilemap.tileheight,
          )
        }
      })
    }
    tilesetImage.src = tilesetSrc
  }

  const renderLayer = (ctx, layer, tilesetImage, tileWidth, tileHeight) => {
    const { data, width } = layer
    data.forEach((tileId, index) => {
      if (tileId === 0) return // 0 means no tile
      const sourceX =
        ((tileId - 1) % (tilesetImage.width / tileWidth)) * tileWidth
      const sourceY =
        Math.floor((tileId - 1) / (tilesetImage.width / tileWidth)) * tileHeight
      const targetX = (index % width) * tileWidth
      const targetY = Math.floor(index / width) * tileHeight

      ctx.drawImage(
        tilesetImage,
        sourceX,
        sourceY,
        tileWidth,
        tileHeight,
        targetX,
        targetY,
        tileWidth,
        tileHeight,
      )
    })
  }

  useEffect(() => {
    loadTilemap()
  }, [src, tilesetSrc])

  return <canvas ref={canvasRef} width={800} height={600} />
}

export default Tilemap
