import React from 'react'
// import enemies from "./enemies";

const Enemy = ({ enemyData }) => {
  const { name, health, bio, status, nextAttack } = enemyData;

  return (
    <div style={{ border: "2px dotted lightgray", borderRadius: "10px" }}>
      <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
        ---{name} <span role='img'  aria-label="emoji heart">🫀</span>{health ? health : "None"}---
      </div>
      <div>{bio}</div>
      <br />
      <div>
        {Math.floor(Math.random() * 2) === 1
          ? <span role='img'  aria-label="emoji enemy">"🔥\\_(X_X)-/🔥"</span>
          : <span role='img'  aria-label="emoji enemy"> "🔥\\-(X_X)_/🔥"</span>}
      </div>
      <br />
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
