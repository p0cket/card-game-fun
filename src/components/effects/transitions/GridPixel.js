import React from 'react'
import { motion } from 'framer-motion'

const GridPixel = ({ delay }) => (
  <motion.div
    style={{ width: '10px', height: '10px', backgroundColor: 'black' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.2 }}
  />
)
function calculateSpiralSequence(gridSize) {
  let result = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0))
  let num = 1,
    minRow = 0,
    maxRow = gridSize - 1,
    minCol = 0,
    maxCol = gridSize - 1

  while (minRow <= maxRow && minCol <= maxCol) {
    for (let i = minCol; i <= maxCol; i++) {
      result[minRow][i] = num++
    }
    minRow++

    for (let i = minRow; i <= maxRow; i++) {
      result[i][maxCol] = num++
    }
    maxCol--

    for (let i = maxCol; i >= minCol; i--) {
      result[maxRow][i] = num++
    }
    maxRow--

    for (let i = maxRow; i >= minRow; i--) {
      result[i][minCol] = num++
    }
    minCol++
  }

  // Flatten and normalize the result to use as delays
  let flatResult = result.flat()
  let maxNum = Math.max(...flatResult)
  return flatResult.map((x) => (x - 1) / maxNum) // Normalizing delays between 0 and 1
}

const SpiralTransition = () => {
  const gridSize = 50 // Example grid size
  const spiralSequence = calculateSpiralSequence(gridSize) // Function to calculate spiral sequence

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 10px)`,
      }}
    >
      {spiralSequence.map((delay, index) => (
        <GridPixel key={index} delay={delay} />
      ))}
    </div>
  )
}

export default SpiralTransition
