import React from "react";
import Card from "../Card";
import Item from "../Item";
import { ACTIONS } from "../../actions";

const cardsForSale = [
  { type: "poison", name: "syphon life", num: 4, cost: 2, id: 20 },
  {
    type: "lightning",
    name: "electric symphony",
    num: 8,
    cost: 1,
    id: 21
  },
  {
    type: "normal",
    name: "backstab",
    num: 4,
    cost: 1,
    id: 22
  },
];

const Reward = (gameData, dispatch) => {
  //@TODO add card function ----
  // const addCard = (card) => {
  //   dispatch({
  //     type: ACTIONS.ADD_CARD,
  //     payload: { card },
  //   });
  // };
  // ------------

  return (
    <div>
      <h1>Reward Component</h1>
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>
 {cardsForSale.map(card => {
  const {type, name, num, cost} = card
  return (
    <>
      <div>
        <p>type: {type}</p>
        <p>name: {name}</p>
        <p>Damage: {num}</p>
        <p>cost: {cost}</p>
        <button>Add to deck</button>
        {/* <button onClick={addCard(card)}>Add to deck</button> */}
      </div>
    </>
  )
 })}
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default Reward;
