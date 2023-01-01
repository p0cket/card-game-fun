import React from "react"
// import { sampleItems } from "../../consts/consts";
import { allShopItems } from "../../consts/allShopItems"
// import Item from "../Item";
import Card from "../common/Card"
import { buyCardAction } from "../../actions"

const Shop = ({ gameData, dispatch }) => {
  const buyCard = (card) => {
    console.log(`adding this card:`, card)
    dispatch(buyCardAction(card))
  }

  return (
    <div>
      <div className="battleStats">
        <p>
          {`${gameData.gold}`}
          <span style={{ color: "#e6ecc3" }}>Gold</span>
          <span style={{ color: "#e6ecc3" }}> Level</span>
          {gameData.curScene.lvl}
          {" -"}
          <span style={{ color: "#e6ecc3" }}>ACT</span>
          {gameData.curScene.act}-
        </p>
      </div>

      <h3>Shop Component</h3>
      <br />
      <h3>Its dangerous to go alone, give me money</h3>
      <div>Items for sale (Just attacks for now. I'm too busy for this)</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
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
  )
}

export default Shop
