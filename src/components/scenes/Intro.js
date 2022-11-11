import React from "react";
import { setSceneAction } from "../../actions";


const Intro = ({dispatch}) => {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch(setSceneAction());
  };

  return (
    <>
      <h1>Slay all the things!</h1>
      <div>This is a card game, let's see how far you can go </div>
      <h3>instructions</h3>
      <div>Your cards can ONLY BE USED ONCE. Use them strategically to defeat bosses</div>

      <div>
        Most importantly, have fun{" "}
        <span role="img" aria-label="emoji smile">
          💞😇💞
        </span>
      </div>
      <br />
      <button onClick={loadNextLevel}>Next Level</button>
    </>
  );
};

export default Intro;
