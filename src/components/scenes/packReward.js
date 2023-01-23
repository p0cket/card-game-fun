import React from "react"
import { setSceneAction } from "../../actions"
import "./PackReward.css"

function PackReward({ gameData, dispatch }) {
  const loadNextLevel = () => {
    console.log(`loadNextLevel`)
    dispatch(setSceneAction())
  }
  return (
    <div className="pack-reward-container">
      <h1 className="pack-reward-title">
        Choose an infusion, you'll get a pack of cards:
      </h1>
      <div className="pack-reward-grid">
        <div className="pack-container">
          <img
            // src={require("./poison.png")}
            // src={require("")}
            src={'/packImages/Poison.png'}

            alt="Poison Pack"
            className="pack-image"
          />
          <div className="pack-title">Poison</div>
          <div className="pack-description">Poison deals damage at end of every turn, based on the amount that you stack</div>
          <ul className="pack-card-list">
            <li>Card 1</li>
            <li>Card 2</li>
            <li>Card 3</li>
          </ul>
          <button className="pack-select-button">Professor, inject me</button>
        </div>
        <div className="pack-container">
          <img
            // src={require("./doubledamage.png")}
            src={'/packImages/DoubleDamage.png'}

            alt="Double Damage Pack"
            className="pack-image"
          />
          <div className="pack-title">DoubleDamage</div>
          <div className="pack-description">
            Buff yourself with `DoubleDamage` and every attack after will do double damage this turn
          </div>
          <ul className="pack-card-list">
            <li>Card 1</li>
            <li>Card 2</li>
            <li>Card 3</li>
          </ul>
          <button className="pack-select-button">Teach me, wise one</button>
        </div>
        <div className="pack-container">
          <img
            // src={require("./stun.png")}
            src={'/packImages/Stun.png'}
            alt="Stun Pack"
            className="pack-image"
          />
          <div className="pack-title">Stun</div>
          <div className="pack-description">Stun will disable an enemy from attacking for coming attack</div>
          <ul className="pack-card-list">
            <li>Card 1</li>
            <li>Card 2</li>
            <li>Card 3</li>
          </ul>
          <button className="pack-select-button">Show me how you stunned them</button>
        </div>
      </div>
      <button className="next-level-button" onClick={loadNextLevel}>
        Next Level
      </button>
    </div>
  )
}

export default PackReward


// import React from "react"
// import { setSceneAction } from "../../actions"

// function PackReward({ gameData, dispatch }) {
//   const loadNextLevel = () => {
//     console.log(`loadNextLevel`)
//     dispatch(setSceneAction())
//   }
//   return (
//     <div>
//       <h1>Choose an infusion, you'll get a pack of cards:</h1>
//       <br />
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <div style={{ padding: "20px" }}>
//           <div>Poison:</div>
//           <div>Poison cards description</div>
//           <div>cards mapped</div>
//           <br />
//           <button>Professor, inject me</button>
//         </div>
//         <div style={{ padding: "20px" }}>
//           <div>DoubleDamage:</div>
//           <div>DoubleDamage cards description</div>
//           <div>cards mapped</div>
//           <br />
//           <button>Teach me, wise one</button>
//         </div>
//         <div style={{ padding: "20px" }}>
//           <div>Stun:</div>
//           <div>Stun cards description</div>
//           <div>cards mapped</div>
//           <br />
//           <button>How did you stun them?</button>
//         </div>
//       </div>
//       <br />
//       <button onClick={loadNextLevel}>Next Level</button>
//     </div>
//   )
// }

// export default PackReward
