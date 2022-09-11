// import { enemies } from "../consts/consts";
import { enemyTypes, allEnemies } from "../consts/enemies";
const { enemies } = enemyTypes;
// actOne: [],
// actOneMini: [],
// actOneBoss: [],
// actTwo: [],

export const battlePayload = {
  enemySeed: Math.random(),
  atkSeed: Math.random(),
  beginBattleSeed: Math.random(),
  startingHandCount: 3,
};

export const shuffle = (array, seed) => {
  return array.sort(() => seed - 0.5);
};

export const decideEnemyArr = (act, type) => {
  // acts would be Act1, Act2, Act3
  // types woul be regular, miniboss, boss
  return allEnemies[act][type];
};

// seed, and lvl/miniboss/boss/etc. What type
export const decideEnemy = (seed, enemiesArr) => {
  //@todo: check for which level enemies they should be
  //return those level enemies like
  // use enemiesArr instead of `enemies`
  const rndm = Math.floor(seed * enemies.length);
  //
  //
  // const rndm = Math.floor(seed * enemiesArr.length);
  //
  //
  // const ourEnemy = enemiesArr[rndm];
  //
  //
  const ourEnemy = enemies[rndm];
  return ourEnemy;
};

export const decideEnemyATK = (seed, enemyAttacks) => {
  const randomizeATK = Math.floor(seed * enemyAttacks.length);
  const nextATK = enemyAttacks[randomizeATK];
  return nextATK;
};
