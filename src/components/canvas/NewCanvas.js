import React, { useRef, useEffect } from 'react'

const NewCanvas = ({ draw, width, height }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!draw) {
      console.log('Draw function not provided to NewCanvas.')
      return
    }
    // console.log('Calling draw function from NewCanvas...')
    draw(context)
  }, [draw, width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black' }}
      width={width}
      height={height}
    />
  )
}

export default NewCanvas
