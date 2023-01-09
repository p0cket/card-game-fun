import React from "react"
import { motion } from "framer-motion/dist/framer-motion"

const Card = ({ cardValue, useCard, isOnSale }) => {
  const { type, name, num, cost, effect } = cardValue
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
      fontFamily: 'Silkscreen',
      backgroundColor: 'green',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: 'url(/backgrounds/gridBGlight.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '1000px',
      width: '150px',
      height: '200px',
      padding: '2px'
    }
  }

  const energyEmoji = "🧪"
  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.1,
          rotate: 1,
          transition: {
            yoyo: Infinity,
          },
        }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%",
        }}
        // style={styles.cardStyle}
        style={styles.newCardStyle}
        onClick={() => useCard(cardValue)}
      >
        {`${name} ${energyEmoji.repeat(cost)}`}
        <h5 style={{ color: "gray" }}>{`(${type})`}</h5>
        <div style={{ color: "gray" }}>{`Deals ${num} damage`}</div>
        <div style={{ color: "brown" }}> {effect ? `${effect}s` : ``} </div>
        {/* {cardValue.price && isOnSale ? <div>price: {cardValue.price}</div> : <></>} */}
        {cardValue.price ? <div>price: {cardValue.price}</div> : <></>}
      </motion.button>
    </>
  )
}

export default Card
