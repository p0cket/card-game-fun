import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const rainbowColors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff']
const greenColors = ['#9bbc0f', '#8bac0f', '#306230', '#0f380f', '#0d0c0c']

const confettiColors = greenColors

function ConfettiPiece({ amount = 500 }) {
  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)]
  const x = Math.floor(Math.random() * window.innerWidth)
  const rotate = Math.random() * 360

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: x,
        width: 6,
        height: 6,
        backgroundColor: color,
        // borderRadius: '50%',
      }}
      animate={{
        y: [0, window.innerHeight],
        rotate: [0, rotate],
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  )
}

export default function Confetti({ amount = 500, duration = 5000 }) {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  return (
    <div>
      {isActive &&
        Array.from({ length: amount }).map((_, i) => <ConfettiPiece key={i} />)}
    </div>
  )
}
