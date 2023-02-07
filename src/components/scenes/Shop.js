import React from "react"
// import { sampleItems } from "../../consts/consts";
import { allShopItems } from "../../consts/allShopItems"
import { shuffle } from "../../utils/reducer-utils"
// import Item from "../Item";
import Card from "../common/Card"
import { buyCardAction, setSceneAction } from "../../actions"

const Shop = ({ gameData, dispatch }) => {
  const shuffledCards = shuffle(allShopItems)
  const itemSelection = shuffledCards.slice(0,4)
  // const {itemSelection, setItemSelection} = useState(shuffledCards.slice(0,4))
  // TODO: change buyCardAction to get rid of the card after adding to deck, and not change scenes
  const buyCard = (card) => {
    console.log(`adding this card:`, card)
    //@TODO: Add ability to buy more than one card at a time
    dispatch(buyCardAction(card))
  }
  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    dispatch(setSceneAction());
  };  

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
      <div>Items for sale (Just attacks for now. I'm too busy for this), also you can only buy 1 right now :P</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
                {itemSelection.map((card) => {
          return <Card key={card.id} cardValue={card} useCard={buyCard} />
        })}
        {/* {allShopItems.map((card) => {
          return <Card key={card.id} cardValue={card} useCard={buyCard} />
        })} */}
      </div>
      <button onClick={loadNextLevel}>Leave without buying something</button>

      
    </div>
  )
}

export default Shop
