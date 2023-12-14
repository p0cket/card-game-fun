import React from 'react'
import './Victory.css'
// import devProfileImage from '/misc/Pocket.jpg';  // import victory image
// import { Pocket } from "/misc/Pocket.js"
// import {pocket2} from "./Pocket.png"
const Victory = () => {
  return (
    <div className="victory-screen">
      {/* <img src={pocket2} alt="Developer of the game" /> */}
      <h1>Congratulations, you have defeated the (current) game!</h1>
      <p>Your victory is a testament to your skill and determination.</p>
      <div>Results</div>
      <div>This and this happened</div>
      <div>Your recieved this and this and this for winning</div>
      <div>
        your pals ___ and ___ leveled up and or learnt a thing. You recieved a
        TM or something
      </div>
      <div>prize choice 1</div>
      <button>Claim prize</button>
      <div>prize choice 2</div>
      <button>Claim prize</button>
      <div>prize choice 3</div>
      <button>Claim prize</button>
    </div>
  )
}
// const Victory = ({gameData, dispatch}) => {
//   return (
//     <div className="victory-screen">
//       {/* <img src={pocket2} alt="Developer of the game" /> */}
//       <h1>Congratulations, you have won the game!</h1>
//       <p>Your victory is a testament to your skill and determination.</p>
//       <p>
//         You had {gameData.gold} Gold, {gameData.hero.health} health, and got to the
//         final level: {gameData.curScene.lvl}
//       </p>
//       <button onClick={() => window.location.reload()}>Play Again</button>
//     </div>
//   )
// }

export default Victory
