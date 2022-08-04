import React from "react";
import Card from "../Card";
import Item from "../Item";
const cardValue1 = { type: "poison", name: "syphon life", num: 4, cost: 2 };
const cardValue2 = {
  type: "lightning",
  name: "electric symphony",
  num: 8,
  cost: 1,
};
const cardValue3 = {
  type: "normal",
  name: "backstab",
  num: 4,
  cost: 1,
};

const Reward = () => {
  return (
    <div>
      <h1>Reward Component</h1>
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>
      </div>
      <div>
        <Card cardValue={cardValue1} />
        <Card cardValue={cardValue2} />
        <Card cardValue={cardValue3} />
      </div>
      <div style={{ padding: "5px" }}>
        <button style={{ padding: "3px", margin: "5px" }}>
          Buy {cardValue1.name}
        </button>
        <button style={{ padding: "3px", margin: "5px" }}>
          Buy {cardValue2.name}
        </button>
        <button style={{ padding: "3px", margin: "5px" }}>
          Buy {cardValue3.name}
        </button>
      </div>
    </div>
  );
};

export default Reward;
