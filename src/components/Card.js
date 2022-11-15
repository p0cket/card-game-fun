import React from 'react'
const Card = ({ cardValue, useCard }) => {
  const { type, name, num, cost, effect } = cardValue;
  const styles = {
    cardStyle: {
      color: "blue",
      display: "inline",
      border: "2px solid silver",
      borderRadius: "10px",
      padding: "7px",
      margin: "3px"
    }
  };

  const energyEmoji = "🧪";
  return (
    <>
      <button style={styles.cardStyle} onClick={() => useCard(cardValue)}>
        {`${name} ${energyEmoji.repeat(cost)}`}
        <h5 style={{ color: "gray" }}>{`(${type})`}</h5>
        <div style={{ color: "gray" }}>{`Deals ${num} damage`}</div>
        <div style={{ color: "brown" }}> {effect ? `${effect}s` : `` } </div>
        { cardValue.price? <div>price: {cardValue.price}</div> : <></>}
      </button>
    </>
  );
};

export default Card;