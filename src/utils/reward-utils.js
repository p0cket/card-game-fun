import { shuffle } from './reducer-utils'

export const generateRewardPackSelection = (packPool, seed, qty) => {
  const shuffledPackSelection = shuffle(packPool, seed)
  const slicedPackSelection = shuffledPackSelection.slice(0, qty)
  return slicedPackSelection
}
