import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Explosion from './Explosion';
import chestImage from '../../assets/items/chest.png'; // Ensure the path is correct
import openChestImage from '../../assets/items/item1.png'; // Adjust the path as necessary

const TreasureChest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChest = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100px', height: '100px' }}>
      {!isOpen && (
        <motion.img
          src={chestImage}
          alt="Treasure Chest"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={toggleChest}
          style={{ width: '100%', cursor: 'pointer', position: 'absolute', top: 0, left: 0 }}
        />
      )}
      {isOpen && (
        <motion.img
          src={openChestImage}
          alt="Open Treasure Chest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={toggleChest} // You might want to keep the ability to toggle on both images
          style={{ width: '100%', cursor: 'pointer', position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <Explosion isOpen={isOpen} />
    </div>
  );
};

export default TreasureChest;


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
