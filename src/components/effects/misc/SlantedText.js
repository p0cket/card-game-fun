import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const SlantedText = ({ text, size = 'large' }) => {
  const controls = useAnimation()

  const textVariants = {
    offscreen: {
      x: 300,
      rotate: -40, // More slanted when offscreen
      scale: 0.2, // Start a bit smaller
    },
    onscreen: {
      x: 0,
      rotate: -7, // Less slanted when onscreen
      scale: 1, // Scale to normal size
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const continuousMotion = {
    scale: [1, 1.05, 1],
    transition: {
      loop: Infinity,
      ease: 'linear',
      duration: 2,
    },
  }

  useEffect(() => {
    controls.start('onscreen').then(() => {
      controls.start(continuousMotion)
    })
  }, [controls])

  return (
    <motion.div
      initial="offscreen"
      animate={controls}
      variants={textVariants}
      style={{ fontStyle: 'italic' }} // Apply slant via italic style
      className={`font-[Silkscreen] bg-boy-green ${
        size === 'large' ? 'text-5xl' : 'text-2xl'
      }`}
    >
      {text}
    </motion.div>
  )
}

export default SlantedText
