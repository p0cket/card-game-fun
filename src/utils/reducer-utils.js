import { enemies } from "../consts/consts";

export const shuffle = (array, seed) => {
  return array.sort(() => seed - 0.5);
};

export const decideEnemy = (seed) => {
  //@todo: check for which level enemies they should be
  //return those level enemies like
  // const rndm = Math.floor(seed * enemies[lvl].length);
  // const ourEnemy = enemies[lvl][rndm];
  const rndm = Math.floor(seed * enemies.length);
  const ourEnemy = enemies[rndm];
  return ourEnemy;
};

export const decideEnemyATK = (seed, enemyAttacks) => {
  const randomizeATK = Math.floor(seed * enemyAttacks.length);
  const nextATK = enemyAttacks[randomizeATK];
  return nextATK;
};
