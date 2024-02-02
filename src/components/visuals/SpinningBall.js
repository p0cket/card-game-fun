import React from 'react'
import { motion } from 'framer-motion'
import texturedBallImage from '../../assets/items/spray1.png' // Adjust the path as necessary

const SpinningBall = () => {
  const ballStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${texturedBallImage})`, // Use the imported image
    backgroundSize: 'cover', // Ensure the image covers the ball completely
    borderRadius: '50%', // Make it round
    width: '50px', // Size of the ball
    height: '50px', // Size of the ball
    position: 'absolute', // Adjust based on your needs
    bottom: '20px', // Adjust to position near the character's hand
    right: '-30px', // Adjust to position near the character's hand
  }

  const animationSequence = {
    y: ['0%', '-250%', '0%'], // Move up then down, adjust for desired height
    rotate: [0, 720], // Spin one full rotation
    transition: {
      y: {
        duration: 2, // Adjust for how long the toss should take
        ease: 'easeInOut', // Mimics the physics of a toss
        // ease: 'easeOut', // Mimics the physics of a toss
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 5, // Waits 5 seconds before repeating
      },
      rotate: {
        duration: 2, // Should match the y animation duration
        ease: 'linear', // Constant rotation speed
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 5, // Waits 5 seconds before repeating
      },
    },
  }

  return <motion.div style={ballStyle} animate={animationSequence} />
}

export default SpinningBall

// // src/components/SpinningBall.js
// import React from 'react';
// import { motion } from 'framer-motion';
// import texturedBallImage from '../../assets/items/spray1.png'; // Adjust the path as necessary

// const SpinningBall = () => {
//   const ballStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundImage: `url(${texturedBallImage})`, // Use the imported image
//     backgroundSize: 'cover', // Ensure the image covers the ball completely
//     borderRadius: '50%', // Make it round
//     width: '50px', // Size of the ball
//     height: '50px', // Size of the ball
//   };

//   const spinningAnimation = {
//     y: ["0%", "-200%", "0%"], // Move up then down
//     rotate: 720, // Spin one full rotation
//     transition: {
//       y: {
//         repeat: Infinity, // Repeat forever
//         repeatType: "loop",
//         duration: 5, // Total duration for one cycle
//         ease: "easeInOut", // Easing function for the animation
//       },
//       rotate: {
//         repeat: Infinity,
//         repeatType: "loop",
//         duration: 5, // Match duration with vertical movement
//         ease: "linear", // Linear easing for smooth rotation
//       },
//     },
//   };

//   return (
//     <motion.div style={ballStyle} animate={spinningAnimation} />
//   );
// };

// export default SpinningBall;
