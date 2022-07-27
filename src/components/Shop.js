import React from 'react'
import Card from "./Card";
const cardValue1 = { type: "poison", name: "syphon", num: 4, cost: 2 };
const cardValue2 = {
  type: "lightning",
  name: "electric symphony",
  num: 8,
  cost: 1
};
const cardValue3 = {
  type: "normal",
  name: "backstab",
  num: 4,
  cost: 0
};

const Shop = () => {
  return (
    <div>
      Shop Component
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>
        <Card cardValue={cardValue1} />
        <Card cardValue={cardValue2} />
        <Card cardValue={cardValue3} />
      </div>
    </div>
  );
};

export default Shop;
