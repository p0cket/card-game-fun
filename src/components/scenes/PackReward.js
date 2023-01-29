// import React from "react"
// import { setSceneAction, addPackAction } from "../../actions"
// import "./PackReward.css"
// import { allBasicPacks } from "../../consts/packs"
// import { generateRewardPackSelection } from "../../utils/reward-utils"

// function PackReward({ gameData, dispatch }) {
//   const addPackAndProceedToNextLevel = (Pack) => {
//     console.log(`adding this Pack:`, Pack)
//     dispatch(addPackAction(Pack))
//     dispatch(setSceneAction())
//   }
//   const loadNextLevel = () => {
//     console.log(`loadNextLevel`)
//     dispatch(setSceneAction())
//   }

//   const packSelection = generateRewardPackSelection(
//     allBasicPacks,
//     Math.random(),
//     3
//   ) 
//   console.log("packSelection", packSelection)
//   return (
//     <div className="pack-reward-container">
//       <h1 className="pack-reward-title">
//         Choose an infusion, you'll get a pack of cards:
//       </h1>
//       <div className="pack-reward-grid">
//         {packSelection.map((packObj) => {
//           const { title, desc, buttonText, img, pack } = packObj
//           return (
//             <div className="pack-container">
//               <div className="pack-card-heading">
//                 <div className="pack-title">
//                   <strong>{title}</strong>
//                 </div>
//                 <img src={img} alt={`${title} pack`} className="pack-image" />
//               </div>
//               <div className="pack-description">{desc}</div>
//               <div className="pack-cards-amount">
//                 You'll get {pack.length} cards:{" "}
//               </div>
//               <ul className="pack-card-list">
//                 {pack.map((card) => {
//                   return <li>{card.name}</li>
//                 })}
//               </ul>
//               <button className="pack-select-button" onClick={() => addPackAndProceedToNextLevel(pack)}>{buttonText}</button>
//             </div>
//           )
//         })}
//       </div>
//       <button className="next-level-button" onClick={loadNextLevel}>
//         I don't want anything
//       </button>
//     </div>
//   )
// }

// export default PackReward
