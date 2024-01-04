import React from 'react'
import './Victory.css'
import emblemBug from '../../assets/emblems/emblem_bug2.png'
// import devProfileImage from '/misc/Pocket.jpg';  // import victory image
// import { Pocket } from "/misc/Pocket.js"
// import {pocket2} from "./Pocket.png"
const Victory = () => {
  return (
    <div className="victory-screen bg-green-200 p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center font-[silkscreen]">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Congrats, Champion!
      </h1>
      <p className="text-lg text-green-600 mb-4">
        Your strategic mastery has led you to victory!
      </p>
      {/* TODO: Add Results here */}
      {/* <div className="font-medium text-green-700">
        <p className="mb-2">Achievements:</p>
        <ul className="list-disc list-inside">
          <li>Completed Some challenges</li>
          <li>Received exclusive rewards</li>
          <li>Pal companions have grown stronger</li>
        </ul>
      </div> */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-green-800">
          Thanks for playing! Badges hopefully would
          be equipped in future runs.
        </h2><div className=" text-green-800 mb-4">-Pocket</div>
        <div className=" text-green-800">Elevation Badge</div>
        <img src={emblemBug} />
        {/* <p className="font-semibold text-green-700 mb-2">Select your prize:</p>
        <div className="flex flex-col space-y-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
            Prize Option 1
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
            Prize Option 2
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
            Prize Option 3
          </button>
        </div> */}
      </div>
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
