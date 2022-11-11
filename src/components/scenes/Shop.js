import React from "react";
// import { sampleItems } from "../../consts/consts";
import { allShopItems } from "../../consts/allShopItems";
// import Item from "../Item";
import Card from "../Card";
import { buyCardAction } from "../../actions";

const Shop = ({ gameData, dispatch }) => {

  const buyCard = (card) => {
    console.log(`adding this card:`, card)
    dispatch(buyCardAction(card))
  }


  return (
    <div>
      <h3>Shop Component</h3>
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>Items for sale (Just attacks for now)</div>
      <div>
      {allShopItems.map((card) => {
          return <Card key={card.id} cardValue={card} useCard={buyCard} />
        })}
      </div>
      {/* <div>
        {allShopItems.map((item) => {
          return (
            <Item 
              name={item.name}
              desc={item.desc}
              flavortext={item.flavortext}
              price={item.price}
              boost={item.boost}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default Shop;
