// src/components/Explosion.js
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const particles = [...Array(20)].map(() => ({
  x: Math.random() * 200 - 100,
  y: Math.random() * 200 - 100,
}))

const Explosion = ({ isOpen }) => (
  <AnimatePresence>
    {isOpen &&
      particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
          animate={{ x: particle.x, y: particle.y, opacity: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#00FF00', // gold color

            // backgroundColor: '#FFD700', // gold color
            top: '50%', // Adjust based on actual image size
            left: '50%', // Adjust based on actual image size
          }}
        />
      ))}
  </AnimatePresence>
)

export default Explosion
