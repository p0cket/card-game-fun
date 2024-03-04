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