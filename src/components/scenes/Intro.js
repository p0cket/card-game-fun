import React from "react"
import "./Intro.css"
import { setSceneAction } from "../../actions"
import { motion } from "framer-motion/dist/framer-motion"
// @TODO: Add typewriter effect to text
import heroFrontImg from "../../assets/Anime_protag_pixelated.png"
import "../common/Button.css"

import Dialog from "../common/Dialog"

const Intro = ({ dispatch }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }
  const styles = {
    fontStyle: {
      fontFamily: "Silkscreen",
      fontSize: "100px",
      color: "white",
    },
    fontFam: {
      fontFamily: "Silkscreen",
    },
  }

  return (
    <>
      <button onClick={loadNextLevel}>go</button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 2 }}
        style={styles.fontStyle}
      >
        Super Chibipal Slayer!
      </motion.div>
      <br />
      <div className="intro-container">
        <img
          style={{ width: 500, height: 500 }}
          src={heroFrontImg}
          alt="Hero Frontside"
        />

        <div class="content">
          <Dialog
            size="30"
            myText={`In 2025 - We discovered mystical creatures that harnessed the power of the elements. 
      In 2030 - The incredible creatures revolutionized mankind.`}
          />
          <div></div>
          <div>Today, you get yours.</div>
          <br />
        </div>
        <div class="content">
          <img
            style={{ width: 120, height: 100 }}
            src="/creatures/Chibipal.png"
            alt="Chibipal Backside"
          />
          <h3>instructions</h3>
          <div>
            <h1>Your cards can ONLY BE USED ONCE.</h1>
            <h3>They are burned after.</h3>
            <p>
              {" "}
              Use them strategically to command your Chibipal and defeat
              enemies.
            </p>
            <p> You can save the wooorrrrld!</p>
          </div>

          <div>
            Most importantly, have fun{" "}
            <span role="img" aria-label="emoji smile">
              💞😇💞
            </span>
          </div>
          <br />
          <div style={{ padding: "30px" }}>
            <button onClick={loadNextLevel} className="simpleButton">
              Lets a' go!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Intro
