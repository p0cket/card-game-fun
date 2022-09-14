// import { enemies } from "../consts/consts";
import { allEnemies } from "../consts/enemies";
// const { enemies } = enemyTypes;
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
  const rndm = Math.floor(seed * enemiesArr.length);
  const ourEnemy = enemiesArr[rndm];
  return ourEnemy;
};

export const decideEnemyATK = (seed, enemyAttacks) => {
  // console.log(`setAtkHandler: missing attacks`, state.battle.enemy);
  console.log(`ennmyATK enemyAttacks`, enemyAttacks, `seed`, seed)
  const randomizeATK = Math.floor(seed * enemyAttacks.length);
  const nextATK = enemyAttacks[randomizeATK];
  console.log(`decideEnemyATK: next attack`, nextATK);

  return nextATK;
};
