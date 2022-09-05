import React from "react";
import { Typography } from "antd";

const Intro = () => {
  return (
    <>
      <Typography>
        <h1>Slay your way to the top!</h1>
        <div>
          <div>whispers of an evil wizard and his dragon protect the artifact</div>
          <div>This artifact grants one wish to its' holder</div>
          <h4>Eternal Life? Riches? Turning back time?</h4>
          <h4>Good luck!</h4>
        </div>
        <h3>instructions</h3>
        <div>This is a card game, lets see how far you can go</div>
        <div>Draw some cards, play them to defeat enemies, etc.</div>
        <div>
          Most importantly, have fun{" "}
          <span role="img" aria-label="emoji smile">
            💞😇💞
          </span>
        </div>
      </Typography>
    </>
  );
};

export default Intro;
