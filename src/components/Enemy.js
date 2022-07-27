import React from 'react'
// import enemies from "./enemies";

const Enemy = ({ enemyData }) => {
  const { name, health, bio, status, nextAttack } = enemyData;

  return (
    <div style={{ border: "2px dotted lightgray", borderRadius: "10px" }}>
      <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
        ---{name} 🫀{health ? health : "None"}---
      </div>
      <div>{bio}</div>
      <br />
      <div>
        {Math.floor(Math.random() * 2) === 1
          ? "🔥\\_(X_X)-/🔥"
          : "🔥\\-(X_X)_/🔥"}
      </div>
      <br />
      <div>Status: He is 📊 {status}</div>
      <br />
      <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
        Next attack: <br />
        {`${nextAttack.name}  💨${nextAttack.damage}`}
        <div>status inflict? {nextAttack.status}</div>
      </div>
    </div>
  );
};
export default Enemy;
