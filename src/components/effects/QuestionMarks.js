import React from 'react'
import { motion } from 'framer-motion'

const questionMarks = ['?', '?', '?']
const greenColors = ['#9bbc0f', '#8bac0f', '#306230', '#0f380f', '#0d0c0c']

const variants = {
  hidden: { opacity: 0, scale: 1, rotate: 30, color: greenColors[0] },
  visible: { opacity: 1, scale: 2, rotate: -30, color: greenColors },
}

function QuestionMarks() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {questionMarks.map((mark, index) => (
        <motion.div
          key={index}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            delay: Math.random(), // random delay
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            backgroundColor: greenColors[index % greenColors.length], // cycle through colors
          }}
        >
          {mark}
        </motion.div>
      ))}
    </div>
  )
}

export default QuestionMarks
