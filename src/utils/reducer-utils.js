import { enemies } from "../consts/consts";

export const shuffle = (array, seed) => {
  return array.sort(() => seed - 0.5);
};

export const decideEnemy = (seed) => {
  const rndm = Math.floor(seed * enemies.length);
  const ourEnemy = enemies[rndm];
  return ourEnemy;
};

export const decideEnemyATK = (seed, enemyAttacks) => {
  const randomizeATK = Math.floor(seed * enemyAttacks.length);
  const nextATK = enemyAttacks[randomizeATK];
  return nextATK;
};
