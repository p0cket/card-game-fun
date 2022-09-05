import React from "react";
// import Card from "../Card";
import { Button, Card, Layout } from "antd";
import Item from "../Item";
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
      <h3>The dust settled and things were left behind.</h3>
      <Layout>
        {cardsForSale.map((card) => {
          const { type, name, num, cost } = card;
          const energyEmoji = "🧪";
          const { Meta } = Card;
          return (
            <Card
              key={card.id}
              extra={energyEmoji.repeat(cost)}
              style={{ width: 300 }}
              cardValue={card}
              onClick={() => {
                addCard(card);
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta
                title={`${name}`}
                description={`${type} • Deals ${num} damage`}
              />
              <p>a long description of what happens in the attack</p>
            </Card>
          );
        })}
      </Layout>
    </div>
  );
};

export default Reward;
