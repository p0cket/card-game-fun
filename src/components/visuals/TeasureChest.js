import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Explosion from './Explosion'
import chestImage from '../../assets/items/chest.png' // Ensure the path is correct
import openChestImage from '../../assets/items/item1.png' // Adjust the path as necessary

const TreasureChest = ({
  item,
  handleSelectItem,
  selectedItem,
  onContinue,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const controls = useAnimation()

  // const openChest = () => setIsOpen(true)

  useEffect(() => {
    // Start with an idle animation
    controls.start({
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    })
  }, [controls])

  const openChest = async () => {
    setIsOpen(true)
    // Stop the idle animation
    await controls.stop()
    // Proceed with any other animation, for example, an opening chest animation
    // Then restart the idle animation after the action is completed
    controls.start({
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    })
  }

  return (
    <div className="inline-block relative w-[100px] h-[100px]">
      {!isOpen ? (
        // <motion.img
        //   src={chestImage}
        //   alt="Treasure Chest"
        //   initial={{ opacity: 0.5 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 0.2 }}
        //   onClick={() => {
        //     openChest()
        //     // handleSelectItem(item)
        //   }}
        //   className="w-full h-full cursor-pointer"
        // />
        <motion.img
          src={chestImage}
          alt="Treasure Chest"
          initial={{ opacity: 0.5 }}
          animate={controls}
          onClick={openChest}
          className="w-full h-full cursor-pointer"
        />
      ) : (
        // <motion.img
        //   src={openChestImage}
        //   alt="Open Treasure Chest"
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 0.2 }}
        //   className="w-full h-full"
        //   // onClick={() => onContinue(selectedItem, 'item')}
        //   onClick={() => onContinue(item, 'item')}
        // />
        <motion.img
          src={openChestImage}
          alt="Open Treasure Chest"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        />
      )}
      <Explosion isOpen={isOpen} />
      {isOpen && (
        <div
          className="text-center mt-2"
          onClick={() => onContinue(item, 'item')}
        >
          <button
            //   className="text-sm font-bold mb-1 bg-black
            //  text-white py-1 px-2 inline-block rounded"
            className="mt-1 py-2 px-4 bg-green-500 text-white rounded
           hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          >
            {item.name}
          </button>
          {/* <button
            onClick={() => onContinue(selectedItem, 'item')}
            className="mt-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            disabled={!selectedItem}
          >
            Continue
          </button> */}
        </div>
      )}
    </div>
  )
}

export default TreasureChest

// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import Explosion from './Explosion'
// import chestImage from '../../assets/items/chest.png' // Ensure the path is correct
// import item1 from '../../assets/items/item1.png' // Ensure the path is correct

// const TreasureChest = () => {
//   const [isOpen, setIsOpen] = useState(false)

//   // Debugging: Log when component mounts and state changes
//   useEffect(() => {
//     console.log('Component mounted')
//     return () => console.log('Component unmounted')
//   }, [])

//   useEffect(() => {
//     console.log('isOpen state changed:', isOpen)
//   }, [isOpen])

//   const toggleChest = () => {
//     console.log('Toggling chest')
//     setIsOpen(!isOpen)
//   }

//   return (
//     <div style={{ position: 'relative', display: 'inline-block' }}>
//       {/* Background Effect */}
//       <Explosion isOpen={isOpen} />
//       {/* Chest Image */}
//       <motion.img
//         src={chestImage}
//         alt="Closed Treasure Chest"
//         initial={false}
//         animate={{ opacity: isOpen ? 0 : 1 }}
//         transition={{ duration: 0.5 }}
//         style={{
//           width: '100px',
//           cursor: 'pointer',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//         }}
//         onClick={toggleChest}
//       />
//       {/* Open Chest Image */}
//       <motion.img
//         src={item1}
//         alt="Open Treasure Chest"
//         initial={false}
//         animate={{ opacity: isOpen ? 1 : 0 }}
//         transition={{ duration: 0.5 }}
//         style={{
//           width: '100px',
//           cursor: 'pointer',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//         }}
//         onClick={toggleChest}
//       />
//     </div>
//   )
// }

// export default TreasureChest
