import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ACTIONS, useDispatchContext } from '../../MainContext'

function EnergyBar({ energy, maxEnergy, energyEmoji, onAnimationComplete }) {
  const dispatch = useDispatchContext()
  const handleAnimationComplete = () => {
    // Dispatch an action to update the state or perform any other necessary actions
    dispatch({ type: ACTIONS.ANIMATION_RUNNING_TOGGLE })
  }
  // state.animationFinished (bool)
  // whatever this triggers should reset the animation complete as well.

  const controls = useAnimation()

  useEffect(() => {
    controls
      .start({
        height: `${Math.min(100, (energy / maxEnergy) * 100)}%`,
        transition: { duration: 0.5, ease: 'easeIn' },
      })
      .then(() => {
        // if (onAnimationComplete) {
        //   onAnimationComplete()
        // }
        handleAnimationComplete()
      })
  }, [energy, maxEnergy, controls, onAnimationComplete])

  return (
    <div className="flex flex-col justify-evenly flex-grow p-1 text-sm font-[silkscreen] text-white px-2">
      <div>
        {energy} Energy {energyEmoji}
      </div>
      <div className="relative w-full h-4 ml-2 bg-gray-400">
        <motion.div
          className="bg-green-500 h-full"
          initial={{ height: '0%' }}
          animate={controls}
        />
      </div>
    </div>
  )
}

export default EnergyBar

// import React from 'react'
// import { motion } from 'framer-motion'

// function EnergyBar({ energy, maxEnergy, energyEmoji }) {

// return (
//     <div
//         className="flex flex-col justify-evenly flex-grow p-1 text-sm font-[silkscreen] text-white px-2"
//     >
//         <div>
//             {' '}
//             {energy} Energy {energyEmoji}{' '}
//         </div>
//         <div className="relative w-full h-4 ml-2 bg-gray-400">
//             <motion.div
//                 className="bg-green-500 h-full"
//                 initial={{ height: '0%' }}
//                 animate={{
//                     height: `${Math.min(100, (energy / maxEnergy) * 100)}%`,
//                 }}
//                 transition={{ duration: 0.5, ease: 'easeIn' }}
//             />
//             {/* this should be over state.game.player.maxEnergy */}
//         </div>
//     </div>
// )
// }

// export default EnergyBar