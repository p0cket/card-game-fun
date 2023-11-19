import { motion } from 'framer-motion'

const AnimatedImage = ({ src, alt }) => {
  const imageVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        loop: Infinity,
        ease: 'linear',
        duration: 8,
      },
    },
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      variants={imageVariants}
      animate="animate"
    />
  )
}

export default AnimatedImage
