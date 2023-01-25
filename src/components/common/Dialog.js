// import "./styles.css"
// .App {
//     font-family: sans-serif;
//     text-align: center;
//   }
import React from "react"
import { motion } from "framer-motion"

export const Dialog = () => {
  const initialText =
    "this is a test, as you can see the display inline-block isn't respected. If it was, the 10rem with would be very noticeable"

  return (
    <>
      {initialText.split("").map((text, index) => {
        return (
          <motion.span
            key={index}
            animate={{
              backgroundColor: ["#00000000", "#000", "#00000000"],
              color: ["#00000000", "#00000000", "#000"],
              width: ["5px", "5px", "0px"],
            }}
            transition={{
              duration: 0.05,
              delay: index * 0.05,
            }}
          >
            {text}
          </motion.span>
        )
      })}
    </>
  )
}

export default Dialog
