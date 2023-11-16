import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'

// Define the array of images to display
const images = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
  'https://images.unsplash.com/photo-1505209363824-6bc9cf6ed81e',
  'https://images.unsplash.com/photo-1506102383123-c8ef1e872756',
]

// Define the variants for the animation
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

// Define the duration of the animation in seconds
const duration = 1

// Define the interval of the carousel in seconds
const interval = 5

// Define the component for the carousel
const Carousel = ({ ourImages = images }) => {
  // Use state to keep track of the current image index and the direction of the animation
  const [[page, direction], setPage] = useState([0, 0])

  // Use a ref to store the id of the timer
  const timerRef = React.useRef()

  // Use an effect to start the timer and clear it on unmount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPage(([prevPage, prevDirection]) => [
        wrap(0, ourImages.length, prevPage + 1),
        1,
      ])
    }, interval * 1000)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  // Use an effect to reset the timer when the page changes
  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPage(([prevPage, prevDirection]) => [
        wrap(0, ourImages.length, prevPage + 1),
        1,
      ])
    }, interval * 1000)
  }, [page])

  // Render the carousel component
  return (
    <div className="carousel-container relative w-full h-[200px] overflow-hidden">
    <AnimatePresence initial={false} custom={direction}>
      <motion.img
        key={page}
        src={ourImages[page]}
        className="carousel-image absolute w-full h-full object-contain"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration },
        }}
    // <div className="carousel-container">
    //   <AnimatePresence initial={false} custom={direction}>
    //     <motion.img
    //       key={page}
    //       src={ourImages[page]}
    //       className="carousel-image"
    //       custom={direction}
    //       variants={variants}
    //       initial="enter"
    //       animate="center"
    //       exit="exit"
    //       transition={{
    //         x: { type: 'spring', stiffness: 300, damping: 30 },
    //         opacity: { duration },
    //       }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              setPage(([prevPage, prevDirection]) => [
                wrap(0, ourImages.length, prevPage + 1),
                1,
              ])
            } else if (swipe > swipeConfidenceThreshold) {
              setPage(([prevPage, prevDirection]) => [
                wrap(0, ourImages.length, prevPage - 1),
                -1,
              ])
            }
          }}
        />
      </AnimatePresence>
    </div>
  )
}

// Define some helper functions for the swipe gesture
const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export default Carousel
