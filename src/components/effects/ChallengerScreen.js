import { motion } from 'framer-motion'
import ShakeScreen from './misc/ScreenShake'
import SlantedText from './misc/SlantedText'
import AnimatedImage from './misc/AnimatedImage'
import Confetti from './Confetti'
import Button from '../common/Button'

const ChallengerScreen = ({ challengerName, challengerImage }) => {
  const imageVariants = {
    animate: {
      scale: [1, 1.10, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        loop: Infinity,
        ease: 'linear',
        duration: 8,
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Confetti />
      <SlantedText text={`!!! !!! !!!`} />
      <SlantedText text={`A new challenger!`} />
      <SlantedText text={`Recycleroo joined your party`} size="small" />
      <AnimatedImage
        src={challengerImage}
        alt={`Image of ${challengerName}`}
      />
      <button>Alrighty!</button>
    </div>
  )
}

export default ChallengerScreen
