// Replace the other functions of the same name
// so you can use the functions in Battle.js

import { enemies } from "../components/consts"
import { startHandCount } from "../consts/consts"

export const decideEnemyATK = (enemyAttacks) => {
  if (enemyAttacks) {
    const randomizeATK = Math.floor(Math.random() * enemyAttacks.length)
    const nextATK = enemyAttacks[randomizeATK]
    return nextATK
  } else {
    console.log(`no enemyAttacks passed into decideEnemyATK`)
  }
}

export const getBattlePayloadRandomized = () => {
  return {
    enemySeed: Math.random(),
    atkSeed: Math.random(),
    beginBattleSeed: Math.random(),
    startingHandCount: startHandCount,
  }
}