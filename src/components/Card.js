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

  const energyEmoji = "🧪";

  return (
    <>
      <button style={styles.cardStyle} onClick={() => playCard()}>
        {`${name} ${energyEmoji.repeat(cost)}`}
        <h5 style={{ color: "gray" }}>{`(${type})`}</h5>
        <div style={{ color: "gray" }}>{`Deals ${num} damage`}</div>
        {/* type: types[j], name: names[j], num */}
      </button>
    </>
  );
};

export default Card;
