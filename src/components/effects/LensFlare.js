import React from 'react'
import { motion } from 'framer-motion'
// import lensFlare1 from './path_to_lens_flare_1.png' // Path to your lens flare image
// import lensFlare2 from './path_to_lens_flare_2.png' // Another lens flare image

const LensFlare = () => {
  const flareVariants = {
    initial: { opacity: 0, x: '-50%', y: '-50%' },
    animate: {
      opacity: [0, 0.6, 0.6, 0, 0],
      x: '-50%',
      y: '-50%',
      transition: {
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  }

  return (
    <div className="lens-flare-container">
      <motion.img
        // src={lensFlare1}
        className="lens-flare"
        variants={flareVariants}
        initial="initial"
        animate="animate"
      />
      {/* Add more lens flare images as needed */}
    </div>
  )
}

export default LensFlare
