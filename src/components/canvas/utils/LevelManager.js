import { lvlOne, lvlTwo } from '../levels/testLevels'
const levels = {
  1: lvlOne,
  2: lvlTwo,
}

let currentLevel = 1
let gameObjects = [] // Global game object storage

// Function to clear current level's game objects
function removeAllGameObjects() {
  gameObjects = [] // Clears the array of game objects
  // Additionally, clear the canvas or game world if necessary
}

// Function to create a game object and return it
function createGameObject(type, x, y, width, height, properties = {}) {
  return { type, x, y, width, height, ...properties }
}

// Function to add a game object to the level
function addGameObjectToLevel(gameObject) {
  gameObjects.push(gameObject)
  // Further logic to add the game object to the game world or canvas
}

// Function to load a level with its configuration
function loadLevel(levelConfig) {
  clearCurrentLevel()
  levelConfig.boundaries.forEach(createBoundary)
  levelConfig.NPCs.forEach(createNpc)
  // Load other configurations as needed
}

// Clears all game objects from the current level
function clearCurrentLevel() {
  removeAllGameObjects()
}

// Creates and adds a boundary object to the level
function createBoundary(boundary) {
  const newBoundary = createGameObject(
    'Boundary',
    boundary.x,
    boundary.y,
    boundary.width,
    boundary.height,
  )
  addGameObjectToLevel(newBoundary)
}

// Creates and adds an NPC object to the level
function createNpc(npc) {
  const newNpc = createGameObject('NPC', npc.x, npc.y, 50, 50, npc.properties) // Assuming NPCs have additional properties
  addGameObjectToLevel(newNpc)
}

// Loads the current level configuration
export function loadCurrentLevel() {
  const levelConfig = levels[currentLevel]
  if (levelConfig) {
    loadLevel(levelConfig)
  } else {
    console.error('Level config not found for level:', currentLevel)
  }
}

// Advances the game to the next level
export function goToNextLevel() {
  currentLevel += 1
  if (currentLevel > Object.keys(levels).length) {
    console.log('Congratulations, you completed the game!')
    // Handle game completion or loop back to the first level
  } else {
    loadCurrentLevel()
  }
}

// Sets the game to a specific level and loads it
export function setLevel(levelNumber) {
  if (levels[levelNumber]) {
    currentLevel = levelNumber
    loadCurrentLevel()
  } else {
    console.error('Invalid level number:', levelNumber)
  }
}
