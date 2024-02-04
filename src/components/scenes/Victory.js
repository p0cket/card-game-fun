import React, { useEffect, useState } from 'react'
import './Victory.css'
import emblemBug from '../../assets/emblems/emblem_bug2.png'
import { useStateContext } from '../../MainContext'
import Button from '../common/Button'
import { loreSnippets } from '../../consts/lore/victoryLore'
// import devProfileImage from '/misc/Pocket.jpg';  // import victory image
// import { Pocket } from "/misc/Pocket.js"
// import {pocket2} from "./Pocket.png"

const Victory = () => {
  const state = useStateContext()
  const inDebug = state.debug && state.debug.isOpen
  const [generatedLore, setGeneratedLore] = useState('')
  const getRandomLoreElement = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }
  useEffect(() => {
    const randomLore = getRandomLoreElement(loreSnippets)
    setGeneratedLore(randomLore)
  }, [])
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
          Thanks for playing! In a future update, Badges hopefully can be
          equipped for bonus stats!
        </h2>
        <div className=" text-green-800 mb-4">-Pocket</div>
        <div className=" text-green-800">Elevation Badge</div>
        <img src={emblemBug} />
        <div>
          <div>Youve discovered some lore:</div>
          <div className="lore-title font-bold">{generatedLore.title}</div>
          <div className="lore-description">{generatedLore.description}</div>
        </div>
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
        {inDebug && (
          <>
            Share with friends: Meet my Dream Team! 🐲🔥 Lv.15, 🌿🐉 Lv.12, 🌊🐍
            Lv.10. Team Power: 2500 💪. Build your own unstoppable team [Game
            Link] Just conquered the Tower! 🐉5 (dragons caught) 🌟Lvl 10 Hydra
            🗝️3 (rare artifacts found). Can you top this? [Game Link]
            <div>Give feedback: Google forms link</div>
            <Button>Donate</Button>
            <div>Donate if you like the game, and Ill make it better :) </div>
          </>
        )}
        <div>No Chibipals were harmed in the creation of this game.</div>
      </div>
    </div>
  )
}
//       {/* <img src={pocket2} alt="Developer of the game" /> */}
//       <h1>Congratulations, you have won the game!</h1>
//       <p>Your victory is a testament to your skill and determination.</p>
//       <p>
//         You had {gameData.gold} Gold, {gameData.hero.health} health, and got to the
//         final level: {gameData.curScene.lvl}

export default Victory
