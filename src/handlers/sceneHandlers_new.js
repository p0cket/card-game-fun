// This is the part of startingData that this applies to:
// export const newStartingData = {
//     current: {
//       level: null,
//       act: null,
//       scene: null,
//       curEvent: null,
//     },
//   };

export const SCENES = {
  TRANSITION: 'transition',
  INTRO: 'intro',
  SHOP: 'shop',
  MAP: 'map',
  EVENT: 'event',
  REST: 'rest',
  REWARD: 'reward',
  RESULTS: 'results',
  TREASURE: 'treasure',
  MYSTERY: 'mystery',//Should it be mystery or secret?
  // SECRET: 'secret',
  ROBBER: 'robber',
  CONVO: 'convo',
  BATTLE: 'battle',
  MINIBOSS: 'miniboss',
  BOSS: 'boss',
  GAMEOVER: 'game-over',
  VICTORY: 'victory',
  CHOOSECHARACTER: 'choose-character',
  // PACKREWARD: 'pack-reward',
}

/**
 * Update the current level.
 *
 * @param {object} newData - The current data object to update.
 * @param {number} newLevel - The new level value.
 * @returns {object} - A copy of the updated data object with the level updated.
 */
export function updateLevel(newData, newLevel) {
  const updatedData = { ...newData }
  updatedData.current.level += newLevel
  return updatedData
}

/**
 * Update the current act.
 *
 * @param {object} newData - The current data object to update.
 * @param {number} newAct - The new act value.
 * @returns {object} - A copy of the updated data object with the act updated.
 */
export function updateAct(newData, newAct) {
  const updatedData = { ...newData }
  updatedData.current.act = newAct
  return updatedData
}

/**
 * Update the current scene.
 *
 * @param {object} newData - The current data object to update.
 * @param {number} newScene - The new scene value.
 * @returns {object} - A copy of the updated data object with the scene updated.
 */
export function updateScene(newData, newScene) {
  console.log(
    `[updateScene] newData, newScene, newData.current.scene`,
    newData,
    newScene,
    // newData?.current?.scene
  )
  console.log(`newScene`, newScene)
  const updatedData = { ...newData }
  updatedData.current.scene = newScene
  return updatedData
}

export const changeLevel = (state, scene) => {
  console.log(`state before changing level:`, state, `also scene:`, scene)
  // let changesToBeMade = {}
  // now make any changes on the scene details before you return the new scene
  // ex: Which trainer is battling, which area, etc.
  // ex: Which event is happening
  // switch (scene) {
  //   case SCENES.TRANSITION:
  //     console.log(`[changeLevel] Transistion case. Scene: ${scene}`, state)
  //     // everything that happens when you have a transition
  //     break
  //   case SCENES.INTRO:
  //     console.log(`[changeLevel] Intro case. Scene: ${scene}`, state)
  //     // everything that happens when you have an intro
  //     break
  //   case SCENES.MAP:
  //     console.log(`[changeLevel] Map case. Scene: ${scene}`, state)
  //     // when you're going to the map, any changes that nee
  //     break
  //   case SCENES.REWARD:
  //     console.log(`[changeLevel] Reward case. Scene: ${scene}`, state)
  //     // when you're going to the reward, any changes that need to be made
  //     break
  //   case SCENES.CONVO:
  //     console.log(`[changeLevel] Convo case. Scene: ${scene}`, state)
  //     // when you're going to the convo, any changes that need to be ma
  //     break
  //   //Battle Cases:
  //   case SCENES.BATTLE:
  //     console.log(`[changeLevel] Battle case. Scene: ${scene}`, state)
  //     // when you're going to the battle, any changes that need to be ma
  //     break
  //   case SCENES.MINIBOSS:
  //     console.log(`[changeLevel] Miniboss case. Scene: ${scene}`, state)
  //     // when you're going to the miniboss, any changes that need to be ma
  //     break
  //   case SCENES.BOSS:
  //     console.log(`[changeLevel] Boss case. Scene: ${scene}`, state)
  //     // when you're going to the boss, any changes that need to be ma
  //     break
  //   case SCENES.GAMEOVER:
  //     console.log(`[changeLevel] Game over case. Scene: ${scene}`, state)
  //     // when you're going to the game over, any changes that need to be ma
  //     break
  //   case SCENES.RESULTS:
  //     console.log(`[changeLevel] RESULTS case. Scene: ${scene}`, state)
  //     // when you're going to the RESULTS, any changes that need to be ma
  //     break
  //   case SCENES.VICTORY:
  //     console.log(`[changeLevel] Victory case. Scene: ${scene}`, state)
  //     // when you're going to the victory, any changes that need to be ma
  //     break
  //   case SCENES.CHOOSECHARACTER:
  //     console.log(`[changeLevel] Choose character case. Scene: ${scene}`, state)
  //     // when you're going to the choose character, any changes that need to be ma
  //     break
  //   case SCENES.SHOP:
  //     console.log(`[changeLevel] Shop case. Scene: ${scene}`, state)
  //     // when you're going to the shop, any changes that need to be made
  //     break
  //   case SCENES.EVENT:
  //     console.log(`[changeLevel] Event case. Scene: ${scene}`, state)
  //     // when you're going to the event, any changes that need to be ma
  //     break
  //   case SCENES.REST:
  //     console.log(`[changeLevel] Rest case. Scene: ${scene}`, state)
  //     // when you're going to the rest, any changes that need to be made
  //     break
  //   default:
  //     console.log(`[changeLevel] default case reached of ${scene}`, state)
  //     break // default to level 1 for now. Eventually, this will be a function that returns the level based on the scene.
  // }
  // send to next level
  const nextSceneState = updateScene(state, scene)
  const nextLevelState = updateLevel(nextSceneState, 1)
}

/**
 * Update the current event.
 *
 * @param {object} newData - The current data object to update.
 * @param {number} newEvent - The new event value.
 * @returns {object} - A copy of the updated data object with the event updated.
 */
export function updateCurEvent(newData, newEvent) {
  const updatedData = { ...newData }
  updatedData.current.curEvent = newEvent
  return updatedData
}

// Battle scene handler
export const setupOpponent = (state, opponent) => {
  const newState = {
    ...state,
    opponent: opponent,
  }
  console.log(`sceneHandlers_new -> setupOpponent: newState with opponent`, opponent, newState)
  return newState
}