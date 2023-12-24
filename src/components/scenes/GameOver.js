import React, { useState } from 'react'
import { SCENES, updateLevel, updateScene } from '../../handlers/sceneHandlers_new'
import { ACTIONS, useDispatchContext, useStateContext } from '../../MainContext'

const GameOver = () => {
  // const GameOver = ({}) => {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  // Dummy data for the player's character and stats
  const playerData = {
    characterName: 'Hero',
    level: 10,
    experience: 2300,
    gold: 500,
    achievements: ['Dragon Slayer', 'Treasure Hunter', 'Survivor'],
  }

  // Dummy gameplay tip
  const tipOfTheDay = 'Tip: Use potions wisely to stay alive longer!'

  const [shareUrl, setShareUrl] = useState('') // URL for social sharing

  // Function to retry the game (reset game state)
  const handleRetry = () => {
    // Implement game state reset logic here
    // alert('Starting a new game...')
    loadChooseCharacterScene()
  }

  // Function to share on social media
  const handleShare = () => {
    // Implement social media sharing logic here
    setShareUrl('https://your-game-website.com/game-over') // Replace with your game's URL
  }

  const loadChooseCharacterScene = () => {
    console.log(`func: loadNextLevel()`)
    // dispatch(setSceneAction())
    const nextSceneState = updateScene(state, {
      screen: SCENES.CHOOSECHARACTER,
      details: null,
    })
    const nextLevelState = updateLevel(nextSceneState, 1)
    dispatch({
      payload: nextLevelState,
      type: ACTIONS.UPDATE_GAMEDATA,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 font-[silkscreen]">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Game Over</h1>
      <div className="text-white mb-6 grid grid-cols-2 gap-4">
        <h2 className="col-span-2">Character Summary</h2>
        <p className="font-bold">Name</p>
        <p>{playerData.characterName}</p>
        <p className="font-bold">Level</p>
        <p>{playerData.level}</p>
        <p className="font-bold">Experience</p>
        <p>{playerData.experience}</p>
        <p className="font-bold">Gold</p>
        <p>{playerData.gold}</p>
        <p className="font-bold col-span-2">Achievements</p>
        <p className="col-span-2">{playerData.achievements.join(', ')}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        onClick={handleRetry}
      >
        Try Again
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
        onClick={handleShare}
      >
        Share on Social Media (coming soon)
      </button>
      <div className="text-white mt-6">
        <p>{tipOfTheDay}</p>
      </div>
      {shareUrl && (
        <div className="text-white mt-4">
          <p>Share this game over screen:</p>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {shareUrl}
          </a>
        </div>
      )}
    </div>
  )
}

export default GameOver
