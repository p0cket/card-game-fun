// import enemies from "./enemies";

const Enemy = ({ enemyData }) => {
  // const randomizeEnemy = () => {
  //   const randomizedNum = Math.floor(Math.random() * enemies.length);
  //   const randomizedEnemy = enemies[randomizedNum];

  //   return randomizedEnemy;
  // };
  //what is the condition/state change that triggers a fresh enemy
  // can't do:
  // setEnemyData(curEnemy);

  //---
  // useEffect(() => {
  //   const curEnemy = randomizeEnemy();
  //   setEnemyData(curEnemy);
  // }, [setEnemyData]);

  // not until it is fully rendered
  // if (!enemyData) {
  //   return null;
  // }
  //----
  const { attacks, name, health, bio, status } = enemyData;
  // const { attacks, name, health, bio, status } = enemies[1];
  // console.log("attacks", typeof attacks, attacks.length);

  const randomizeAtk = Math.floor(Math.random() * attacks.length);
  const nextAtk = attacks[randomizeAtk];
  // console.log(nextAtk);

  // searches based on level and any other parameters, generates an enemy from list
  // of enemies with different abilities

  return (
    <div style={{ border: "2px dotted lightgray", borderRadius: "10px" }}>
      <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
        ---{name} 🫀{health ? health : "None"}---
        {/* ---{name} 🫀{enemyHealth ? enemyHealth : "None"}--- */}
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
        {`${nextAtk.name}  💨${nextAtk.damage}`}
        <div>status inflict? {nextAtk.status}</div>
      </div>
    </div>
  );
};
export default Enemy;
// const name = `EvilMan`;
// const health = enemyHealth;
// const bio = `A bad duuude`;
// const passive = `none`;
// const status = `chillin`;
// // console.log("enemyHealth", enemyHealth, typeof enemyHealth);
// // console.log("enemies", enemies);
// // console.log("enemy we need", enemies[0]);

// const attacks = [
//   {
//     name: "eating a snack",
//     type: "heal",
//     damage: -30,
//     status: "none"
//   },
//   {
//     name: "flails fist at you",
//     type: "hit",
//     damage: 20,
//     status: "dizzy"
//   }
// ];

// console.log("enemies", enemies);
