import React from "react"
import { setSceneAction } from "../../actions"
import { motion } from "framer-motion/dist/framer-motion"
import heroFrontImg from "../../assets/Anime_protag_pixelated.png"
import "./Intro.css"

const Intro = ({ dispatch }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }
  const styles = {
    fontStyle: {
      fontFamily: "Silkscreen",
      fontSize: "100px",
      // fontFamily: 'Silkscreen', cursive,
    },
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 2 }}
        style={styles.fontStyle}
      >
        Slay all the things!
      </motion.div>
      <img src={heroFrontImg} alt="Hero Frontside" />
      <div>This is a card game, let's see how far you can go </div>
      <h3>instructions</h3>
      <div>
        Your cards can ONLY BE USED ONCE. Use them strategically to defeat
        bosses
      </div>

      <div>
        Most importantly, have fun{" "}
        <span role="img" aria-label="emoji smile">
          💞😇💞
        </span>
      </div>
      <br />
      <button onClick={loadNextLevel}>Next Level</button>
    </>
  )
}

export default Intro
