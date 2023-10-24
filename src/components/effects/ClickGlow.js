// import {motion, useMotionValue, useTransform } from 'framer-motion/dist/framer-motion'
// import React from 'react'

// function ClickGlow() {
//   const scale = useMotionValue(1)
//   const opacity = useTransform(scale, [1, 1.5], [0, 1])

//   return (
//     <div>
//       <motion.div
//         style={{
//           width: 100,
//           height: 100,
//           background: 'white',
//           borderRadius: '50%',
//           cursor: 'pointer',
//           boxShadow: scale
//             .to([1, 1.3, 1.6], [0, 15, 0])
//             .to(
//               (s) => `0 0 ${s}px ${s}px rgba(255,255,255,${opacity.get()})`,
//             ),
//         }}
//         animate={{ scale }}
//         onClick={() => {
//           scale.start((i) => (i > 1 ? 1 : 1.6))
//         }}
//         transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//       />
//     </div>
//   )
// }

// export default ClickGlow
