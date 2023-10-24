import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

// function Flashing(duration = 0.5, repeat = 5) {
function Flashing() {
  const [isAnimating, setIsAnimating] = useState(true)

  const flash = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        repeat: 5,
        // duration: 0.5,
        // repeat: 5,
        repeatType: 'reverse',
      },
    },
  }
  return (
    isAnimating && (
      <motion.div
        variants={flash}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setIsAnimating(false)}
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'green',
        }}
      />
    )
  )
}

export default Flashing
