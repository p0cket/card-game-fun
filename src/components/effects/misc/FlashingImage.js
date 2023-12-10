import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FlashingImage = ({
  src,
  flashTrigger,
  flashCount,
  glowTrigger,
  shakeTrigger,
}) => {
  const [flash, setFlash] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  // Flashing effect
  useEffect(() => {
    if (flashTrigger) {
      let count = 0
      const interval = setInterval(() => {
        setFlash((f) => !f)
        count++
        if (count >= flashCount * 2) {
          clearInterval(interval)
          setFlash(false) // Reset flash state after completion
        }
      }, 300)
    } else {
      setFlash(false) // Reset flash state if trigger is off
    }
  }, [flashTrigger, flashCount])

  // Glowing effect
  useEffect(() => {
    if (glowTrigger) {
      setIsGlowing(true)
      // Assuming a similar duration for glow effect, adjust as necessary
      setTimeout(() => setIsGlowing(false), 600)
    } else {
      setIsGlowing(false) // Reset glow state when trigger is off
    }
  }, [glowTrigger])

  // Shaking effect
  useEffect(() => {
    if (shakeTrigger) {
      setIsShaking(true)
      // Assuming a similar duration for shake effect, adjust as necessary
      setTimeout(() => setIsShaking(false), 600)
    } else {
      setIsShaking(false) // Reset shake state when trigger is off
    }
  }, [shakeTrigger])

  return (
    <motion.div
      className={`relative ${flash ? 'bg-boy-green' : ''}`}
      animate={{
        opacity: flash ? 1 : 0,
        scale: isGlowing ? [1, 1.05, 1] : 1,
        x: isShaking ? [0, -5, 5, -5, 0] : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <img src={src} alt="Effectful Image" className="w-full h-auto" />
    </motion.div>
  )
}

export default FlashingImage
