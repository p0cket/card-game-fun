// Deprecated for UI change, but may reuse later
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion/dist/framer-motion"
import enemyTestImg from "../../assets/fluffic GB Test_cropped.jpg"

const Enemy = ({ enemyData }) => {
  const { name, health, bio, status, nextAttack, img } = enemyData
  let enemyImg = enemyTestImg
  //Do we have an image for this creature yet?
  if (img !== null) {
    console.log(`enemy.img is: ${img},not null on this render`)
    enemyImg = img
  }
  // width:50%; margin-left:20%
  const [danceLeft, setDanceLeft] = useState(true)

  useEffect(() => {
    setTimeout(() => setDanceLeft(!danceLeft), 2000)
  }, [danceLeft])

  const imgVariants = {
    hover: {
      scale: 1.1,
      initial: {
        y: 20,
      },
      animate: {
        y: -20,
      },
      transition: {
        delay: 0.1,
        duration: 10,
        yoyo: Infinity,
      },
    },
    visible: {
      x: [0, 15, -10, 15, -15, 10, -15, 0],
      transition: {
        // delay: 0.5,
        duration: 15,
        yoyo: Infinity,
      },
    },
  }

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
            style={{
              backgroundColor: "#4caf50",
            }}
          ></progress>
        </h2>
        <h3 style={{ color: "gray" }}>{bio}</h3>
      </div>
      <br />
      <div>{danceLeft ? "🔥\\_(X_X)-/🔥" : "🔥\\-(X_X)_/🔥"}</div>
      <br />
      <motion.img
        style={{ width: 120, height: 100 }}
        animate="visible"
        whileHover="hover"
        variants={imgVariants}
        src={enemyImg}
        alt="Enemy"
      />
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
