// import { enemies } from "../consts/consts";
import { allEnemies } from '../consts/enemies'
// const { enemies } = enemyTypes;
// actOne: [],
// actOneMini: [],
// actOneBoss: [],
// actTwo: [],

// (make the codegolf clearer below:) export const shuffle = (array, seed) => {
export const shuffle = (a, s) => {
  const obj = Object.entries(
    a.reduce((o, n) => {
      const hash = (n.id * (1 + s)) % a.length
      if (!o[hash]) {
        o[hash] = []
      }
      o[hash].push(n)
      return o
    }, {}),
  )
  obj.sort(([ahash], [bhash]) => ahash - bhash)
  return obj.reduce((f, [, v]) => [...f, ...v], [])
}
// a = [1,2,3,4,5], s = .5
// o = { 1.5: [1], 2.5: [2], 3.5: [3], 4.5: [4], .5: [5] }
// obj = [[.5, [5]], [1.5, [1]], [2.5, [2]], ...]
// [5, 1, 2, 3, 4]

export const decideEnemyArr = (act, type) => {
  // acts would be Act1, Act2, Act3
  // types woul be regular, miniboss, boss
  console.log('our data for act and type', act, type)
  return allEnemies[act][type]
}

// seed, and lvl/miniboss/boss/etc. What type
export const decideEnemy = (seed, enemiesArr) => {
  //@todo: check for which level enemies they should be
  //return those level enemies like
  const rndm = Math.floor(seed * enemiesArr.length)
  const ourEnemy = enemiesArr[rndm]
  return ourEnemy
}

export const decideEnemyATK = (seed, enemyAttacks) => {
  // console.log(`setAtkHandler: missing attacks`, state.battle.enemy);
  console.log(`ennmyATK enemyAttacks`, enemyAttacks, `seed`, seed)
  const randomizeATK = Math.floor(seed * enemyAttacks.length)
  const nextATK = enemyAttacks[randomizeATK]
  console.log(`decideEnemyATK: next attack`, nextATK)

  return nextATK
}

let id = 20
// export const uniqueId = (prefix = '') => prefix + id++;
export const uniqueId = () => id++
// if I need packId to be unique and generated, I can uncomment below
// let packId = 20
// export const uniquePackId = () => packId++
export const applyUniqueId = (card) => {
  // return {...card, Id: uniqueId()}
  return { ...card, id: uniqueId() }
}
