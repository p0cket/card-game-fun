import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Define your animations
const animations = {
  sleep: { scale: [1, 0.9, 1], transition: { duration: 1, repeat: Infinity } },
  heal: {
    backgroundColor: ['#fff', 'green', '#fff'],
    transition: { duration: 1, repeat: Infinity },
  },
  buff: { scale: [1, 1.2, 1], transition: { duration: 1, repeat: Infinity } },
  stun: {
    rotate: [0, 10, -10, 0],
    transition: { duration: 1, repeat: Infinity },
  },
  poison: {
    backgroundColor: ['#fff', 'green', '#fff'],
    transition: { duration: 1, repeat: Infinity },
  },
  burn: {
    backgroundColor: ['#fff', 'red', '#fff'],
    transition: { duration: 1, repeat: Infinity },
  },
  freeze: {
    scale: [1, 0.95, 1],
    backgroundColor: ['#fff', 'blue', '#fff'],
    transition: { duration: 1, repeat: Infinity },
  },
  paralysis: {
    x: [0, -10, 10, -10, 10, -10, 0],
    transition: { duration: 2, repeat: Infinity },
  },
}

// Your character component
// const CharacterAnims = ({ status }) => {
const CharacterAnims = () => {
  const [status, setStatus] = useState('normal')
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setStatus('normal')
        setDuration(null)
      }, duration * 1000)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleStatusChange = (newStatus, duration) => {
    setStatus(newStatus)
    setDuration(duration)
  }

  return (
    <div>
      <motion.div animate={animations[status]}>
        {/* Your character */}
        <div>Character \(^_^)/</div>
      </motion.div>
      <button onClick={() => handleStatusChange('sleep', 2)}>Sleep</button>
      <button onClick={() => handleStatusChange('heal', 2)}>Heal</button>
      <button onClick={() => handleStatusChange('buff', 2)}>Buff</button>
      <button onClick={() => handleStatusChange('stun', 2)}>Stun</button>
      <button onClick={() => handleStatusChange('poison', 2)}>Poison</button>
      <button onClick={() => handleStatusChange('burn', 2)}>Burn</button>
      <button onClick={() => handleStatusChange('freeze', 2)}>Freeze</button>
      <button onClick={() => handleStatusChange('paralysis', 2)}>
        Paralysis
      </button>
    </div>
  )
}

export default CharacterAnims
