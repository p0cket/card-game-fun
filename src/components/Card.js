import React from 'react'
const Card = ({ cardValue, playCard }) => {
  const { type, name, num, cost } = cardValue;
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

  // const addCard = (card) => {
  //   dispatch({
  //     type: ACTIONS.ADD_CARD,
  //     payload: { card },
  //   });
  // };

  const energyEmoji = "🧪";
  return (
    <>
      <button style={styles.cardStyle} onClick={() => playCard(cardValue)}>
        {`${name} ${energyEmoji.repeat(cost)}`}
        <h5 style={{ color: "gray" }}>{`(${type})`}</h5>
        <div style={{ color: "gray" }}>{`Deals ${num} damage`}</div>
      </button>
    </>
  );
};

export default Card;