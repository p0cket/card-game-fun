import React from "react";
import "./Intro.css";
import { setSceneAction } from "../../actions";
import { motion } from "framer-motion/dist/framer-motion";
// @TODO: Add typewriter effect to text
import heroFrontImg from "../../assets/Anime_protag_pixelated.png";
import "../common/Button.css";

import Dialog from "../common/Dialog";
import ThemedButton from "../common/ThemedButton";
import { useDispatchContext, useStateContext } from "../../MainContext";

const Intro = ({ dispatch }) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch(setSceneAction());
  };
  const styles = {
    fontStyle: {
      fontFamily: "Silkscreen",
      // fontSize: "100px",
      fontSize: "22px",
      color: "white",
      padding: "20px",
    },
    fontFam: {
      fontFamily: "Silkscreen",
    },
  };

  const contextualState = useStateContext();
  const contextualDispatch = useDispatchContext();

  return (
    <>
      {/* <button onClick={loadNextLevel}>go</button> */}
      <div>
        <div
          className="font-silkscreen flex flex-col items-center
         bg-repeat bg-cover bg-white text-white p-5"
        >
          {/* small screens should have this text smaller */}
          {/* <div className="bg-green-600 text-white p-5 text-4xl sm:text-2xl font-silkscreen">
            Super Chibipal Slayer!
          </div>  */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 2 }}
              style={styles.fontStyle}
            >
              Super Chibipal Slayer!
            </motion.div>
          </div>
          <div>
            {/* <img
              style={{ width: 500, height: 500 }}
              src={heroFrontImg}
              alt="Hero Frontside"
            /> */}
            <img
              style={{ width: 240, height: 200, padding: "20px" }}
              src="/creatures/Chibipal.png"
              alt="Chibipal Backside"
            />
          </div>
          <div style={{ paddingRight: "5px", paddingLeft: "5px" }}>
            <Dialog
              size="20"
              myText={`In 2025 - We discovered mystical creatures that harnessed the power of the elements. 
      In 2030 - The incredible creatures revolutionized mankind. Today, you get yours.`}
            />
            <br />
          </div>{" "}
          {/* @TODO: Add instructions page */}
          {/* <div >
            <div>
              <div>instructions</div>
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
            <div style={{ padding: "30px" }}>
              <ThemedButton text={`Lets a' go`} onClick={loadNextLevel} />
            </div>
          </div> */}
          <div style={{ padding: "30px" }}>
            <ThemedButton text={`Lets Adventure!`} onClick={loadNextLevel} />
          </div>
          <div style={{ color: "white" }}>
            {JSON.stringify(contextualState)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
