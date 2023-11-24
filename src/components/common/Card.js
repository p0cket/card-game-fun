import React from "react"
import { motion } from 'framer-motion'
import { EFFECTS } from "../../effects"

const Card = ({ cardValue, useCard, isBattle, isOnSale }) => {
  const { STUN, DRAW, SLEEP, POISON, DOUBLEDAMAGE, BUILDUP } = EFFECTS
  const { type, name, num, cost, effect, effectChance, qty, id } = cardValue

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
      backgroundImage: "url(/backgrounds/gridBGlightGreen.png)",
      backgroundRepeat: "repeat",
      backgroundSize: "1000px",
      width: "150px",
      height: "200px",
      padding: "2px",
      cursor: "pointer",
    },
  }

  let effectString = ""

  switch (effect) {
    case STUN:
      effectString = `${effectChance? `${effectChance*100}% chance` :""} Stuns for 1 turn`
      break
    case DRAW:
      effectString = `Draws ${qty} cards`
      break
    case SLEEP:
      effectString = `Puts to Sleep`
      break
    case POISON:
      effectString = `Applies ${qty} Poison`
      break
    case DOUBLEDAMAGE:
      effectString = `DoubleDamage`
      break
    case BUILDUP:
      // effectString = `${qty} BuildUp bonus. +2 dmg each`
      effectString = `BuildUp: ${qty}*2 bonus dmg`
      break
    default:
      effectString = ``
    // console.log(`"Card" effectString default case`)
  }

  const energyEmoji = "🧪"
  return (
    <>
      <div style={{ display: "flex" }}>
        {/* <AnimatePresence> */}
          <motion.button
            // exit={{ x: -300, opacity: 0 }}
            exit={{ y: -500 }}
            key={id}
            whileHover={{
              scale: 2.0,
              transition: { type: "spring", duration: 1.5, bounce: 0.6 },
            }}
            //Uncomment for the tap turning
            // whileTap={{
            //   scale: 0.2,
            //   rotate: -90,
            // }}
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
                {effectString}
                {/* {effect ? `Causes ${qty ? qty : ""} ${effect}` : ``}{" "} */}
              </div>
              {/* Add on sale stuff like this: {cardValue.price && isOnSale ? <div>price: {cardValue.price}</div> : <></>} */}
              {cardValue.price && isBattle !== true ? (
                <div>price: {cardValue.price}</div>
              ) : (
                <></>
              )}
            </span>
          </motion.button>
        {/* </AnimatePresence> */}
      </div>
    </>
  )
}

export default Card
