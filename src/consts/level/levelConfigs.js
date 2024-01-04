import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
import { SCENES } from '../../handlers/sceneHandlers_new'
import { allTrainers, bossBarry } from '../party/trainers'

export const battleConfig = () => {
  const selectedTrainer = randomlySelectTrainer(allTrainers)
  console.log(`selectedTrainer`, selectedTrainer, allTrainers)
  console.table(selectedTrainer)
  return {
    type: 'trainer',
    trainer: selectedTrainer,
    area: 'tranquil forest',
    difficulty: 'easy',
    refillEnergy: true,
    sceneType: SCENES.BATTLE,
  }
}
export const bossConfig = {
  trainer: bossBarry,
  // pal: MoltenScale,
  type: 'boss',
  area: 'tranquil forest',
  difficulty: 'easy',
  refillEnergy: true,
  sceneType: SCENES.BOSS,
}
export const restConfig = {
  type: 'rest',
  // trainer: selectedTrainer,
  // area: 'tranquil forest',
  difficulty: 'easy',
  refillEnergy: true,
  sceneType: SCENES.REST,
}
export const eventConfig = {
  type: 'event',
  // trainer: selectedTrainer,
  // area: 'tranquil forest',
  difficulty: 'easy',
  refillEnergy: true,
  sceneType: SCENES.EVENT,
}

// if clicked rest:
//     handleChangeLevel(state, {
//   screen: SCENES.REST,
//   details: {
//     type: 'rest',
//     // trainer: selectedTrainer,
//     // area: 'tranquil forest',
//     difficulty: 'easy',
//     refillEnergy: true,
//   },
// })
// if clicked event:
// handleChangeLevel(state, {
//   screen: SCENES.EVENT,
//   details: {
//     type: 'event',
//     // trainer: selectedTrainer,
//     // area: 'tranquil forest',
//     difficulty: 'easy',
//     refillEnergy: true,
//   },
// })
