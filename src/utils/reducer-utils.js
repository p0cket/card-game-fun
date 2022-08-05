import { enemies } from "../consts/consts";

export const shuffle = (array, seed) => {
  return array.sort(() => seed - 0.5);
};

// seed, and lvl/miniboss/boss/etc. What type
export const decideEnemy = (seed, enemiesArr) => {
  //@todo: check for which level enemies they should be
  //return those level enemies like
  // use enemiesArr instead of `enemies` 
  const rndm = Math.floor(seed * enemies.length);
  const ourEnemy = enemies[rndm];
  return ourEnemy;
};

export const decideEnemyATK = (seed, enemyAttacks) => {
  const randomizeATK = Math.floor(seed * enemyAttacks.length);
  const nextATK = enemyAttacks[randomizeATK];
  return nextATK;
};