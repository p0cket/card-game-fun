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
        <h1>Dialog Text Should Go Here</h1>
        <Dialog />
        <div class="content">
          <div>In 2020 - Society was relied on traditional methods for productivity and transportation.</div>
          <div>In 2025 - We discovered mystical creatures that harnessed the power of the elements</div>
          <div>In 2030 - The incredible creatures revolutionized mankind</div>
          <div>Today, you get yours.</div>
          <br />
          <div>
            "Heres your Chibipal, now you are old enough to learn. It is the last of its' kind. It can learn moves" -Professor Saple
          </div>
        </div>
        <div class="content">
          <img
            style={{ width: 120, height: 100 }}
            src="/creatures/Chibipal.png"
            alt="Chibipal Backside"
          />
          <h3>instructions</h3>
          <div>
            <p>Your cards can ONLY BE USED ONCE.</p>
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
