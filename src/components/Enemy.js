import React, { useState, useEffect } from "react"
// import { motion } from "framer-motion/dist/framer-motion"

const Enemy = ({ enemyData }) => {
  const { name, health, bio, status, nextAttack } = enemyData

  // width:50%; margin-left:20%
  const [danceLeft, setDanceLeft] = useState(true)
  useEffect(() => {
    setTimeout(() => setDanceLeft(!danceLeft), 2000)
  }, [danceLeft])

  const styles = {
    cardStyle: {
      backgroundColor: "#fffff0",
      width: "50%",
      margin: "auto",
      fontFamily: "Silkscreen",
      // marginLeft: "20%",
      // marginRight: "20%",
      // color: "blue",
      // display: "inline",
      // border: "2px solid silver",
      // borderRadius: "10px",
      // padding: "7px",
      // margin: "3px",
    },
    pokeBorderStyle: {
      // border: "gray",
      // borderBottomStyle: "dotted",
      // borderLeftStyle: "dotted",
      // margin: "10px"
    },
  }
  const fullHealth = 100

  return (
    // <div style={{ border: "2px dotted lightgray", borderRadius: "10px" }}>
    //   <div style={{ border: "2px dotted lightgray", borderRadius: "30px" }}>
    <div style={styles.cardStyle}>
      <div style={styles.pokeBorderStyle}>
        <h2>
          {name}{" "}
          <span role="img" aria-label="emoji heart">
            🫀
          </span>
          {health ? health : "None"}{" "}
          <progress
            id="health"
            value={health}
            max={fullHealth}
            style={{ color: "red" }}
          ></progress>
        </h2>
        <h3 style={{ color: "gray" }}>{bio}</h3>
      </div>
      <br />
      <div>{danceLeft ? "🔥\\_(X_X)-/🔥" : "🔥\\-(X_X)_/🔥"}</div>
      <br />
      <div style={{ color: "red" }}>
        {" "}
        {status ? `He is ${status}ed` : `unaffected`}
      </div>
      <br />
      <div style={{}}>
        {/* Next attack: <br /> */}
        {`On his turn: ${nextAttack.name} [👊${nextAttack.damage}`}
        <span style={{ color: "brown" }}>
          {" "}
          {nextAttack.status ? `stuns` : ``}
        </span>
        ]
      </div>
    </div>
  )
}
export default Enemy
