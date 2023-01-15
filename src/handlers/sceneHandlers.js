import { map } from "../consts/mapGenerator"
import { SCENES } from "../scenes"
import { ENEMY_TYPES } from "../actions"
import { decideEnemyArr } from "../utils/reducer-utils"
import { startingData } from "../consts/consts"
import { setEnemyHandler, setAtkHandler, beginBattleHandler } from "./battleSetupHandlers"

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
      console.log(
        `setSceneHandler type isn't battle, type is: ${nextLevel.scene}`,
        nextLevel
      )
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
