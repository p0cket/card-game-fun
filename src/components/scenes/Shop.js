import React from "react";
import { sampleItems } from "../../consts/consts";
// import Card from "../Card";
import Item from "../Item";

const Shop = ({dispatch}) => {
  return (
    <div>
      <h3>Shop Component</h3>
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>Items for sale</div>
      <h2>@TODO, make the buttons add the boosts. for now, just click (next level) below</h2>
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
    </div>
  );
};

export default Shop;
