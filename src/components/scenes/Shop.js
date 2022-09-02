import React from "react";
import { sampleItems } from "../../consts/consts";
// import Card from "../Card";
import Item from "../Item";

const Shop = ({dispatch}) => {
  console.log(sampleItems);

  return (
    <div>
      <h3>Shop Component</h3>
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>Items for sale</div>
      <div>
        {sampleItems.map((item) => {
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
      </div>
      {/* <div>
        <div>Cards for sale:</div>
        <Card cardValue={cardValue1} />
        <Card cardValue={cardValue2} />
        <Card cardValue={cardValue3} />
      </div> */}
    </div>
  );
};

export default Shop;
