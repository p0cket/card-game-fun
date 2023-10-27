import { motion } from 'framer-motion'
import React from 'react'

const greenColors = ['#9bbc0f', '#8bac0f', '#306230', '#0f380f', '#0d0c0c']

const boxVariants = {
  hidden: { rotate: 0, backgroundColor: greenColors[0] },
  visible: { rotate: 360, backgroundColor: greenColors },
}

const Box = ({ offset }) => (
  <motion.div
    style={{
      width: '30px',
      height: '10px',
      position: 'absolute',
      top: `calc(50% + ${50 * Math.sin(offset)}px)`,
      left: `calc(50% + ${50 * Math.cos(offset)}px)`,
    }}
    variants={boxVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 2, loop: Infinity, ease: 'linear' }}
  />
)

const groupVariants = {
  hidden: { rotate: 0 },
  visible: { rotate: 360 },
}

export default function SpinningBoxes() {
  const boxes = [0, 1, 2, 3, 4, 5].map((i) => (
    <Box key={i} offset={(2 * Math.PI * i) / 6} />
  ))

  return (
    <motion.div
      style={{ position: 'relative', height: '200px' }}
      variants={groupVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 3, loop: Infinity, ease: 'linear' }}
    >
      {boxes}
    </motion.div>
  )
}
