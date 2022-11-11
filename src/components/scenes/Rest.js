import React from "react";
import { ACTIONS } from "../../actions";
import { setSceneAction } from "../../actions";

const Rest = ({dispatch}) => {
    const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch(setSceneAction());
  };

  const healToFullHealth = () => {
    dispatch({
      type: ACTIONS.SELECT_REST,
    });
  };
  return (
    <>
      <h2>Rest Component</h2>
      <h3>Stay a while, and listen</h3>
      <div>As you come upon a campfire, you feel calm.</div>
      <div>A wise old scholar greets you.</div>
      <div>
        You realize the old man will keep watch and alarm you if there is any
        danger
      </div>
      <button
        onClick={() => {
          healToFullHealth();
        }}
      >
        Heal
      </button>
      <br />
      <button onClick={loadNextLevel}>Next Level</button>
      <br />
    </>
  );
};

export default Rest;
