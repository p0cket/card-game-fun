import React, { useState, useEffect } from 'react'
// import enemies from "./enemies";

const Enemy = ({ enemyData }) => {
  const { name, health, bio, status, nextAttack } = enemyData;
  const [danceLeft, setDanceLeft] = useState(true);
  useEffect(() => {
    setTimeout(() => setDanceLeft(!danceLeft), 2000)
  }, [danceLeft])


  return (
    <div style={{ border: "2px dotted lightgray", borderRadius: "10px" }}>
      <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
        ---{name} <span role='img'  aria-label="emoji heart">🫀</span>{health ? health : "None"}---
      </div>
      <div>{bio}</div>
      <br />
      <div>
        {danceLeft ? '🔥\\_(X_X)-/🔥' : '🔥\\-(X_X)_/🔥'}
      </div>
      <br />
      {/* @TODO fix status so it shows something other than None */}
      <div>Status: He is {status}</div>
      <br />
      <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
        Next attack: <br />
        {`${nextAttack.name}  ${nextAttack.damage}`}
        <div>status inflict? {nextAttack.status}</div>
      </div>
    </div>
  );
};
export default Enemy;
