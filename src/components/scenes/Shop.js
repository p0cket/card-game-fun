import React, { useContext } from 'react'
import ShopItem from '../common/ShopItem'
import { sampleShopItems } from '../../consts/items/basicItems'
import { useDispatchContext } from '../../MainContext'
import mart1 from '../../assets/mart/mart1.png'
import mart2 from '../../assets/mart/mart2.png'
import mart3 from '../../assets/mart/mart3.png'

const martImages = [mart1, mart2, mart3]
const chooseRandom = (items) =>
  items[Math.floor(Math.random() * items.length)] // Replace with your randomItem
const randomMartImg = chooseRandom(martImages)

const Shop = () => {
  // const { gameData, dispatch } = useContext(GameContext) // Replace with your context
  const dispatch = useDispatchContext()

  const handlePurchase = (item) => {
    // if (gameData.gold >= item.price) {
    //   dispatch({ type: 'PURCHASE_ITEM', payload: item })
    //   // Further logic for purchasing
    // } else {
    //   alert('Not enough gold!')
    // }
  }
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img src={randomMartImg} alt="mart"/>
      <h1 className="text-lg font-bold text-center mb-2">
        Monster Hunter Shop
      </h1>
      <div className="mb-4 ">
        Gold: <span className="font-semibold">43</span>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> */}
      <div className="flex gap-4">
        {sampleShopItems.slice(0, 3).map((item) => (
          <ShopItem key={item.id} item={item} onPurchase={handlePurchase} />
        ))}
      </div>
    </div>
  )
}

export default Shop

// import React from "react"
// // import { sampleItems } from "../../consts/consts";
// import { allShopItems } from "../../consts/allShopItems"
// import { shuffle } from "../../utils/reducer-utils"
// import Card from "../common/Card"
// import ThemedButton from "../common/ThemedButton"
// import { buyCardAction, setSceneAction } from "../../actions"

// const Shop = ({ gameData, dispatch }) => {
//   const shuffledCards = shuffle(allShopItems)
//   const itemSelection = shuffledCards.slice(0, 4)
//   // const {itemSelection, setItemSelection} = useState(shuffledCards.slice(0,4))
//   // TODO: change buyCardAction to get rid of the card after adding to deck, and not change scenes
//   const buyCard = (card) => {
//     console.log(`adding this card:`, card)
//     dispatch(buyCardAction(card))
//   }
//   const loadNextLevel = () => {
//     console.log(`loadNextLevel`)
//     dispatch(setSceneAction())
//   }

//   return (
//     <div>
//       <div className="battleStats">
//         <p>
//           {`${gameData.gold}`}
//           <span style={{ color: "#e6ecc3" }}>Gold</span>
//           <span style={{ color: "#e6ecc3" }}> Level</span>
//           {gameData.curScene.lvl}
//           {" -"}
//           <span style={{ color: "#e6ecc3" }}>ACT</span>
//           {gameData.curScene.act}-
//         </p>
//       </div>

//       <h1>Welcome to the Shop</h1>
//       <br />
//       <h3>Its dangerous to go alone, give me money</h3>
//       <div>
//         Items for sale (Just attacks for now. I`m too busy for this), also you
//         can only buy 1 right now :P
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         {itemSelection.map((card) => {
//           return <Card key={card.id} cardValue={card} useCard={buyCard} />
//         })}
//       </div>
//       <ThemedButton text={`Leave without buying something`} onClick={loadNextLevel} />
//       {/* <button onClick={loadNextLevel}>Leave without buying something</button> */}
//     </div>
//   )
// }

// export default Shop
