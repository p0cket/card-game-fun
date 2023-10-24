import React from 'react'
import { motion } from 'framer-motion'

const slideIn = {
  hidden: { x: '-100%' },
  visible: {
    x: '0%',
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
}

function TrainerSlideIn() {
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
      }}
    />
  )
}

export default TrainerSlideIn
