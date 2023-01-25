import React from "react"
import { motion } from "framer-motion/dist/framer-motion"

const Card = ({ cardValue, useCard, isBattle, isOnSale }) => {
  const { type, name, num, cost, effect, qty } = cardValue

  const styles = {
    cardStyle: {
      backgroundColor: "#f0feff",
      color: "blue",
      display: "inline",
      border: "2px solid silver",
      borderRadius: "10px",
      padding: "7px",
      margin: "3px",
      fontFamily: "Silkscreen",
    },
    fontStyle: {
      fontFamily: "Silkscreen",
      // Fonts: add Koulen, Press Start 2P, Squada One?
      // fontFamily: 'Silkscreen', cursive,
    },
    newCardStyle: {
      fontFamily: "Silkscreen",
      backgroundColor: "green",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundImage: "url(/backgrounds/gridBGlight.png)",
      backgroundRepeat: "repeat",
      backgroundSize: "1000px",
      width: "150px",
      height: "200px",
      padding: "2px",
      cursor: "pointer",
    },
  }

  const energyEmoji = "🧪"
  return (
    <>
      <div style={{ display: "flex" }}>
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: 1,
            transition: {
              yoyo: Infinity,
            },
          }}
          whileTap={{
            scale: 0.2,
            rotate: -90,
          }}
          // style={styles.cardStyle}
          style={{
            ...styles.newCardStyle,
            border: `2px solid ${
              type === "Poison"
                ? "#99ff99"
                : type === "Electric"
                ? "yellow"
                : type === "Technical"
                ? "blue"
                : type === "Physical"
                ? "white"
                : type === "Psychic"
                ? "purple"
                : "silver"
            }`,
          }}
          onClick={() => useCard(cardValue)}
        >
          <div style={{ display: "flex", flex: "1" }}>
            {`${name} ${energyEmoji.repeat(cost)}`}
          </div>
          <div style={{ display: "flex", flex: "1" }}>
            <h5 style={{ color: "gray" }}>{`(${type})`}</h5>
          </div>
          <div style={{ color: "gray", display: "flex", flex: "1" }}>
            {num <= 0 ? " " : `Deals ${num} damage`}
          </div>
          <span style={{ display: "flex", flex: "1" }}>
            <div style={{ color: "brown" }}>
              {" "}
              {/* {effect ? `Causes ${qty ? qty : ``} ${effect}` : ``}{" "} */}
              {effect ? `Causes ${qty ? qty : ""} ${effect}` : ``}{" "}
            </div>
            {/* TODO Add on sale stuff like this: {cardValue.price && isOnSale ? <div>price: {cardValue.price}</div> : <></>} */}
            {cardValue.price && (isBattle!==true) ? <div>price: {cardValue.price}</div> : <></>}
          </span>
        </motion.button>
      </div>
    </>
  )
}

export default Card
