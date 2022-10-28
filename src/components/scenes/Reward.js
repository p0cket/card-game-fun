import React from "react";
import Card from "../Card";
import { ACTIONS } from "../../actions";

const cardsForSale = [
  { type: "poison", name: "syphon life", num: 4, cost: 2, id: 20 },
  {
    type: "lightning",
    name: "electric symphony",
    num: 8,
    cost: 1,
    id: 21,
  },
  {
    type: "normal",
    name: "backstab",
    num: 4,
    cost: 1,
    id: 22,
  },
];

const Reward = ({ gameData, dispatch }) => {
  //@TODO add card function ----
  const addCard = (card) => {
    console.log(`adding this card:`, card);
    dispatch({
      // type: ACTIONS.ADD_CARD,
      type: ACTIONS.SELECT_REWARD,
      payload: { card },
    });
  };
  // ------------

  return (
    <div>
      <h1>Reward Component</h1>
      <br />
      <h3>Thank you for vanquishing those foes.</h3>
      <h4>Please take something, its on us</h4>
      <div>
        {cardsForSale.map((card) => {
          return <Card key={card.id} cardValue={card} useCard={addCard} />;
        })}
      </div>
    </div>
  );
};

export default Reward;
