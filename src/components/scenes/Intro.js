import React, { useState } from "react";
import "./Intro.css";
import { setSceneAction } from "../../actions";
import { motion } from "framer-motion/dist/framer-motion";
// @TODO: Add typewriter effect to text
import heroFrontImg from "../../assets/Anime_protag_pixelated.png";
import "../common/Button.css";
import { AnimatePresence } from "framer-motion";

import Dialog from "../common/Dialog";
import ThemedButton from "../common/ThemedButton";
import {
  ACTIONS,
  useDispatchContext,
  useStateContext,
} from "../../MainContext";
import { getRandomPALAcronym } from "../../consts/fun/pal";
import {
  SCENES,
  updateLevel,
  updateScene,
} from "../../handlers/sceneHandlers_new";

const Intro = ({ dispatch }) => {
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

  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch(setSceneAction());

    const nextSceneState = updateScene(contextualState, SCENES.CHOOSECHARACTER);
    const nextLevelState = updateLevel(nextSceneState, 1);
    console.log("cont state B4:", contextualState);
    contextualDispatch(nextLevelState, ACTIONS.UPDATEGAMEDATA);
    console.log("next level state:", nextLevelState);
    console.log("cont state:", contextualState);
  };

  const circleVariants = {
    initial: { y: 0 },
    animate: { y: "-100vh" },
    exit: { opacity: 0 },
  };

  const explosionVariants = {
    initial: { scale: 0 },
    animate: { scale: [1, 2, 2, 1, 1], opacity: [1, 1, 1, 0, 0] },
  };

  const Circle = ({ onComplete }) => (
    <motion.div
      variants={circleVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
      style={{
        background: "red",
        borderRadius: "50%",
        width: "100px",
        height: "100px",
      }}
    />
  );

  const Explosion = () => (
    <motion.div
      variants={explosionVariants}
      initial="initial"
      animate="animate"
      style={{
        position: "absolute",
        top: "0",
        background: "orange",
        borderRadius: "50%",
        width: "200px",
        height: "200px",
      }}
    />
  );

  const [explode, setExplode] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <>
      <div>
        <div
          className="font-silkscreen flex flex-col items-center
         bg-repeat bg-cover bg-white text-white p-5"
        >
          <div style={{ color: "gray" }}>Rebirth v0.21</div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 2 }}
              style={styles.fontStyle}
            >
              Super Chibipal Slayer!
              <h5>{getRandomPALAcronym()}</h5>
            </motion.div>
          </div>
          <div>
            <img
              style={{ width: 240, height: 200, padding: "20px" }}
              src="/creatures/Chibipal.png"
              alt="Chibipal Backside"
            />
          </div>
          <div style={{ paddingRight: "5px", paddingLeft: "5px" }}>
            {/* <div style={{color: 'white'}}>  Hi Lisa, I made this game for you to play</div> */}
            <Dialog
              size="20"
              myText={`In 2025 - We discovered mystical creatures that harnessed the power of the elements. 
      In 2030 - The incredible creatures revolutionized mankind. Today, you get yours.`}
            />
            <br />
          </div>{" "}
          <div style={{ position: "relative", height: "100vh" }}>
            <AnimatePresence>
              {!explode && <Circle onComplete={() => setExplode(true)} />}
              {explode && <Explosion />}
            </AnimatePresence>
          </div>
          <div style={{ padding: "30px" }}>
            {" "}
            <button onClick={() => setStartAnimation(true)}>
              Start Animation
            </button>
            <ThemedButton text={`Lets Adventure!`} onClick={loadNextLevel} />
          </div>
          <ThemedButton text={`Options`} onClick={loadNextLevel} />
          <ThemedButton text={`Museum`} onClick={loadNextLevel} />
          <div style={{ color: "white" }}>
            {JSON.stringify(contextualState)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
