import { map } from "../consts/mapGenerator_old"
// import { SCENES } from "../scenes"
import { ENEMY_TYPES } from "../actions"
import { decideEnemyArr } from "../utils/reducer-utils"
import { startingData } from "../consts/consts"
import { setMyDataHandler } from "./dataHandlers"
import {
  setEnemyHandler,
  setAtkHandler,
  beginBattleHandler,
  generateRewardsHandler,
} from "./battleSetupHandlers"
import { SCENES } from "./sceneHandlers_new"

export const setSceneHandler = (state, payload) => {
  const { enemySeed, atkSeed, beginBattleSeed, startingHandCount } = payload
  const nextLevel = {
    scene: map[state.curScene.lvl + 1],
    lvl: state.curScene.lvl + 1,
    act: state.curScene.act,
  }
  let nextState = state
  let enemyArr = []

  switch (nextLevel.scene) {
    case SCENES.BATTLE:
      enemyArr = decideEnemyArr(state.curScene.act, ENEMY_TYPES.REG)

      // typical battle code:
      nextState = setEnemyHandler(nextState, {
        seed: enemySeed,
        enemyArr: enemyArr,
      })
      nextState = setAtkHandler(nextState, { seed: atkSeed })
      nextState = beginBattleHandler(nextState, {
        seed: beginBattleSeed,
        startingHandCount,
      })
      break
    case SCENES.MINIBOSS:
      enemyArr = decideEnemyArr(state.curScene.act, `mini`)
      // typical battle code:
      nextState = setEnemyHandler(nextState, {
        seed: enemySeed,
        enemyArr: enemyArr,
      })
      nextState = setAtkHandler(nextState, { seed: atkSeed })
      nextState = beginBattleHandler(nextState, {
        seed: beginBattleSeed,
        startingHandCount,
      })
      break
    case SCENES.BOSS:
      enemyArr = decideEnemyArr(state.curScene.act, `boss`)
      // typical battle code:
      nextState = setEnemyHandler(nextState, {
        seed: enemySeed,
        enemyArr: enemyArr,
      })
      nextState = setAtkHandler(nextState, { seed: atkSeed })
      nextState = beginBattleHandler(nextState, {
        seed: beginBattleSeed,
        startingHandCount,
      })
      break
    default:
      // console.log(
      //   `setSceneHandler type isn't battle, type is: ${nextLevel.scene}`,
      //   nextLevel
      // )
  }

  return {
    ...nextState,
    curScene: nextLevel,
  }
}

// @TODO: Finish in progress setTransitionHandler or get rid of it:
export const setTransitionHandler = (state, payload) => {
  // Probably need text to display and options here. maybe confetti?
  // Do you need a battle payload here? probably not.
  // const { enemySeed, atkSeed, beginBattleSeed, startingHandCount } = payload
  //

  let nextState = { ...state }

  const nextLevel = {
    scene: SCENES.TRANSITION,
    lvl: nextState.curScene.lvl,
    act: nextState.curScene.act,
  }

  nextState = {
    ...nextState,
    curScene: nextLevel,
    curEvent: payload.choice,
  }

  return nextState
}

export const winBattleHandler = (state, { battlePayload }) => {
  //why was `payload` not working? Investigate
  // const {battlePayload} = payload

  let nextState = { ...state }
  console.log(`you defeated the enemy!`)
  //put hand back into deck
  let nextDeck = []
  nextDeck.push(...nextState.deck)
  nextDeck.push(...nextState.battle.hand)
  console.log(`nextDeck`, nextDeck)

  // generate new rewards
  nextState = generateRewardsHandler(nextState, battlePayload)

  nextState = setMyDataHandler({
    ...nextState,
    gold: nextState.gold + 25,
    deck: nextDeck,
    hero: {
      ...nextState.hero,
      effects: { ...nextState.hero.effects, buff: null },
    },
    battle: {
      ...nextState.battle,
      enemy: {
        ...nextState.battle.enemy,
        status: "none",
      },
    },
  })
  console.log(`nextState`, nextState)

  const payload = battlePayload
  console.log(`payload`, battlePayload)

  // replace with something like setTransitionHandler
  // nextState = setTransitionHandler(nextState, payload)
  //
  //
  nextState = setSceneHandler(nextState, payload)
  return nextState
}

export const gameOverHandler = (state) => {
  return {
    ...startingData,
    curScene: {
      scene: SCENES.GAMEOVER,
      lvl: 0,
      act: 0,
    },
  }
}
