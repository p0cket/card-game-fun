import React from "react"
import { setSceneAction } from "../../actions"
import { motion } from "framer-motion/dist/framer-motion"
import heroFrontImg from "../../assets/Anime_protag_pixelated.png"
import "../common/Button.css"

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
      // fontFamily: 'Silkscreen', cursive,
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
      <img
        style={{ width: 300, height: 300 }}
        src={heroFrontImg}
        alt="Hero Frontside"
      />
      <div>This is a card game, let's see how far you can go </div>
      <br />
      <div>Heres your Chibipal, its the last one I had. It can learn moves</div>
      <img
        style={{ width: 120, height: 100 }}
        src="/creatures/Chibipal.png"
        alt="Chibipal Backside"
      />
      <h3>instructions</h3>
      <div>
        Your cards can ONLY BE USED ONCE. Use them strategically to command your
        Chibipal and defeat enemies. You can save the wooorrrrld!
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
    </>
  )
}

export default Intro
