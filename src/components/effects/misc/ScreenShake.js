import { motion } from 'framer-motion'

const ShakeScreen = ({ children }) => {
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div variants={shakeVariants} animate="shake">
      {children}
    </motion.div>
  )
}

export default ShakeScreen
