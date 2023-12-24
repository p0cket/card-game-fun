import { randomlySelectTrainer } from '../../handlers/Battle/prepareBattle'
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
  }
}
export const bossConfig = {
  trainer: bossBarry,
  // pal: MoltenScale,
  type: 'boss',
  area: 'tranquil forest',
  difficulty: 'easy',
  refillEnergy: true,
}
export const restConfig = {
  type: 'rest',
  // trainer: selectedTrainer,
  // area: 'tranquil forest',
  difficulty: 'easy',
  refillEnergy: true,
}
export const eventConfig = {
  type: 'event',
  // trainer: selectedTrainer,
  // area: 'tranquil forest',
  difficulty: 'easy',
  refillEnergy: true,
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
