import React from 'react'
// Line 10:  Emojis should be wrapped in <span>, 
//have role="img", 
//and have an accessible description with 
//aria-label or aria-labelledby  jsx-a11y/accessible-emoji


const Intro = () => {
  return (
    <>
      <h1>Slay all the things!</h1>
      <div>This is a card game, lets see how far you can go </div>
      <h3>instructions</h3>
      <div>Draw some cards, play them to defeat enemies, etc.</div>
      <div>Most importantly, have fun <span role='img'  aria-label="emoji smile">💞😇💞</span></div>
      <br />
    </>
  );
};

export default Intro;
