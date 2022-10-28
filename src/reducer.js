import { ACTIONS, ENEMY_TYPES } from "./actions"
import { SCENES } from "./scenes"
import { startingDeck, startingData, fullEnergyAmount } from "./consts/consts"
import {
  shuffle,
  decideEnemyArr,
  decideEnemy,
  decideEnemyATK,
  battlePayload,
} from "./utils/reducer-utils"
import { map } from "./consts/mapGenerator"

export default function reducer(state, action) {
  // @TODO when you get a chance, destructure it all
  const { payload } = action
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      return setSceneHandler(state, payload)
    case ACTIONS.SET_MYDATA:
      return setMyDataHandler(state, payload)
    case ACTIONS.SET_MYBALANCE:
      return setMyBalanceHandler(state, payload)
    case ACTIONS.SET_ALERT:
      return setAlertHandler(state, payload)
    case ACTIONS.SET_DECK:
      return { ...state, deck: payload }
    case ACTIONS.DRAW_CARD:
      return drawCardHandler(state, payload)
    case ACTIONS.PLAY_CARD:
      return playCardHandler(state, payload)
    case ACTIONS.DISCARD_CARD:
      return discardCardHandler(state, payload)
    case ACTIONS.SET_ENEMY:
      return setEnemyHandler(state, payload)
    case ACTIONS.SET_ATK:
      return setAtkHandler(state, payload)
    // level handlers
    case ACTIONS.EVENT_CHOICE:
      return eventChoiceHandler(state, payload)
    case ACTIONS.SELECT_REWARD:
      return setRewardHandler(state, payload)
    case ACTIONS.SELECT_REST:
      return restHandler(state)
    case ACTIONS.BEGIN_BATTLE:
      return beginBattleHandler(state, payload)
    case ACTIONS.END_TURN:
      return endTurnHandler(state, payload)
    case ACTIONS.ADD_CARD:
      return addCardHandler(state, payload)
    case ACTIONS.GAME_OVER:
      return gameOverHandler(state)
    default:
      console.log(`no action type matched, returning state`)
      return state
  }
}

const restHandler = (state) => {
  const fullHealed = {
    ...state,
    hero: { ...state.hero, health: startingData.hero.health },
  }
  return fullHealed
}

const eventChoiceHandler = (state, payload) => {
  //maybe as a `switch` statement to determine the actions
  const newState = setMyBalanceHandler(state, payload)
  const fakeScenePayload = battlePayload
  //breaks here because of something...
  const nextSceneState = setSceneHandler(newState, fakeScenePayload)
  return nextSceneState
}

const setRewardHandler = (state, payload) => {
  const newState = addCardHandler(state, payload)
  const fakeScenePayload = battlePayload
  const nextSceneState = setSceneHandler(newState, fakeScenePayload)
  return nextSceneState
  // return newState;
}

const addCardHandler = (state, payload) => {
  const ourDeck = state.deck
  ourDeck.push(payload.card)
  // set some notification that the card is added
  const updatedDeck = ourDeck
  console.log(`adding card to deck, and full deck here`, payload, updatedDeck)
  return { ...state, deck: updatedDeck }
}

const setAlertHandler = (state, payload) => {
  console.error("payload", payload)
  return {
    ...state,
    alert: payload,
  }
}

const setMyDataHandler = (payload) => {
  return payload
}
const setMyBalanceHandler = (state, payload) => {
  const newBalance = state.gold + payload
  const nextState = { ...state, gold: newBalance }
  return nextState
}

const playCardHandler = (state, { card }) => {
  //
  let nextState = { ...state }
  //
  if (nextState.hero.energy < card.cost) {
    return setAlertHandler(nextState, `Not enough energy to play that card :(`)
  }
  if (nextState.battle.enemy.health - card.num <= 0) {
    console.log(`you defeated the enemy!`)
    // ---- for now, go to next level, later turn into:
    // set scene for a results screen.
    // results screen goes to a reward screen.
    // reward screen goes to next level. (or map)
    // setSceneHandler(state, payload)
    // ----

    //end battle logic

    //put hand back into deck
    console.log(
      `nextState.deck`,
      nextState.deck,
      `nextState.battle.hand`,
      nextState.battle.hand
    )
    let nextDeck = []
    nextDeck.push(...nextState.deck)
    nextDeck.push(...nextState.battle.hand)
    console.log(`nextDeck`, nextDeck)
    nextState = setMyDataHandler({
      ...nextState,
      gold: nextState.gold + 25,
      deck: nextDeck,
    })
    console.log(`nextState`, nextState)

    const payload = battlePayload

    nextState = setSceneHandler(nextState, payload)
    // return nextState;
  }
  const myHandIndex = nextState.battle.hand.indexOf(card)
  const hand = [...nextState.battle.hand]
  hand.splice(myHandIndex, 1)

  const energyLeft = nextState.hero.energy - card.cost
  const enemyHealthLeft = nextState.battle.enemy.health - card.num
  nextState = {
    ...nextState,
    hero: { ...nextState.hero, energy: energyLeft },
    battle: {
      ...nextState.battle,
      enemy: {
        ...nextState.battle.enemy,
        health: enemyHealthLeft,
      },
      hand,
    },
  }
  console.log(`nextState: `, nextState)
  return discardCardHandler(nextState, { cardToRemove: card })
}

const discardCardHandler = (state, payload) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      discarded: [...state.battle.discarded, payload.cardToRemove],
    },
  }
}

const endTurnHandler = (state, payload) => {
  const { hero, battle } = state
  // apply status effects. maybe a applyStatusEffectsHandler()
  const finalHealth = hero.health - battle.enemy.nextAttack.damage
  if (finalHealth > 0) {
    // if not dead, update health and fill energy, draw a card, and set enemy's attack
    const endTurnState = {
      ...state,
      hero: { ...state.hero, health: finalHealth, energy: fullEnergyAmount },
    }
    const drawCardState = drawCardHandler(endTurnState)
    const nextState = setAtkHandler(drawCardState, payload)

    return nextState
  } else {
    return gameOverHandler(state)
  }
}

const gameOverHandler = (state) => {
  return {
    ...startingData,
    curScene: {
      scene: SCENES.GAMEOVER,
      lvl: 0,
      act: 0,
    },
  }
}

const setSceneHandler = (state, payload) => {
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

const setEnemyHandler = (state, payload) => {
  const { seed, enemyArr } = payload

  return {
    ...state,
    battle: { ...state.battle, enemy: decideEnemy(seed, enemyArr) },
  }
}

const setAtkHandler = (state, payload) => {
  const { seed } = payload

  return {
    ...state,
    battle: {
      ...state.battle,
      enemy: {
        ...state.battle.enemy,
        nextAttack: decideEnemyATK(seed, state.battle.enemy.attacks),
      },
    },
  }
}

// handlers can call other handlers, which return state
const beginBattleHandler = (state, payload) => {
  const { startingHandCount, seed } = payload
  let shuffledDeck = []
  if (state.deck.length <= 0) {
    // impure
    console.log(`using starting deck`)
    shuffledDeck = shuffle(startingDeck, seed)
  } else {
    console.log(`using current deck`, state.deck)
    shuffledDeck = shuffle(state.deck, seed)
  }
  let nextState = {
    ...state,
    battle: { ...state.battle, beginning: true, hand: [] },
    deck: [...shuffledDeck],
    hero: { ...state.hero, energy: fullEnergyAmount },
  }

  for (let i = 0; i < startingHandCount; i++) {
    nextState = drawCardHandler(nextState)
  }

  return nextState
}

//handlers are pure too
const drawCardHandler = (state) => {
  if (state.deck.length > 0) {
    return {
      ...state,
      battle: {
        ...state.battle,
        hand: [...state.battle.hand, state.deck[0]],
      },
      deck: state.deck.slice(1),
    }
  } else {
    return {
      ...state,
      alert: "No cards left to draw :( ",
    }
  }
}
