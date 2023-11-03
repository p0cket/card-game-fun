import React from 'react'
import { motion } from 'framer-motion'

export const Dialog = ({ myText, size, speed = 0.02 }) => {
  // const initialText = "Dialogue.js sample text. It is long so that it is noticable"
  //if newText, wait .5 seconds, and then run the text

  const usedText = myText ? myText : 'default'
  return (
    <>
      {usedText.split('').map((text, index) => {
        return (
          <motion.span
            key={index}
            initial="hidden"
            animate={{
              backgroundColor: ['#00000000', '#000', '#00000000'],
              //For Black
              // color: ["#00000000", "#00000000", "#000"],
              //For White
              color: ['#ffffff00', '#ffffff00', '#ffffff'],
              width: ['5px', '5px', '0px'],
            }}
            transition={{
              duration: 0.05,
              //speed
              delay: index * speed,
            }}
            style={{ fontSize: `${size}px`, fontFamily: 'Silkscreen' }}
            // animate={replay ? "visible" : "hidden"}
          >
            {text}
          </motion.span>
        )
      })}
    </>
  )
}

export default Dialog
