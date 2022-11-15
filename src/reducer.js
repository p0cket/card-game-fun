import { ACTIONS, ENEMY_TYPES } from "./actions"
import { SCENES } from "./scenes"
import { startingDeck, startingData, fullEnergyAmount } from "./consts/consts"
import { allAvailableRewards } from "./consts/allAvailableRewards"
import {
  shuffle,
  decideEnemyArr,
  decideEnemy,
  decideEnemyATK,
} from "./utils/reducer-utils"
import { map } from "./consts/mapGenerator"

export default function reducer(state, action) {
  //option to deep clone the state immediately here,
  //solving all problems of stale state
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
    case ACTIONS.GENERATE_REWARDS:
      return generateRewardsHandler(state, payload)
    case ACTIONS.SELECT_REWARD:
      return setRewardHandler(state, payload)
    case ACTIONS.PURCHASE_ITEM:
      return purchaseHandler(state, payload)
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

// General GameData Handlers
const setMyDataHandler = (payload) => {
  return payload
}

const setMyBalanceHandler = (state, payload) => {
  const newBalance = state.gold + payload
  const nextState = { ...state, gold: newBalance }
  return nextState
}

const setAlertHandler = (state, payload) => {
  console.error("payload", payload)
  return {
    ...state,
    alert: payload,
  }
}

// Battle Handlers

const playCardHandler = (state, { card, battlePayload }) => {
  console.log(`payload&card`, card, battlePayload)
  let nextState = { ...state }
  const myEnergy = nextState.hero.energy
  const enemyHealth = nextState.battle.enemy.health

  if (myEnergy < card.cost) {
    return setAlertHandler(nextState, `Not enough energy to play that card :(`)
  }
  if (enemyHealth - card.num <= 0) {
    console.log(`you defeated the enemy!`)

    //put hand back into deck
    let nextDeck = []
    nextDeck.push(...nextState.deck)
    nextDeck.push(...nextState.battle.hand)
    console.log(`nextDeck`, nextDeck)

    // generate new rewards
    nextState = generateRewardsHandler(
      nextState,
      battlePayload
      //(seed, level)
    )

    nextState = setMyDataHandler({
      ...nextState,
      gold: nextState.gold + 25,
      deck: nextDeck,
    })
    console.log(`nextState`, nextState)

    const payload = battlePayload
    console.log(`payload`, battlePayload)

    nextState = setSceneHandler(nextState, payload)
  }
  // play the card
  const myHandIndex = nextState.battle.hand.indexOf(card)
  const hand = [...nextState.battle.hand]
  hand.splice(myHandIndex, 1)

  if (card.effect != null) {
    const statusPayload = {card, battlePayload}
    nextState = applyStatusHandler(nextState, statusPayload)
  }

  // If status affect, use status affect
  // appliedStatusState = applyStatusHandler(state, payload)

  // poison deals damage,
  // stun makes him not attack next turn
  // injure makes his attacks weaker
  // sleep makes him possibly not attack for multiple turns

  // buffs
  // evasion buff
  // armor buff
  // heal buff

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

const applyStatusHandler = (state, { card, battlePayload }) => {
  console.log(`Apply Status effect`, card, battlePayload)

  const nextState = { ...state }
  const statusEffect = card.effect
  console.log(`Apply Status of ${statusEffect}`, card, battlePayload)
  switch (statusEffect) {
    case "stun":
      return {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: { ...nextState.battle.enemy, status: "stun" },
        },
      }
    default:
      console.log(`no statusEffect matched, returning state`)
      return nextState
  }
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
    let nextState = setAtkHandler(drawCardState, payload)
    // Clear the alert messages
    nextState = setAlertHandler(nextState, ``)

    return nextState
  } else {
    return gameOverHandler(state)
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

const addCardHandler = (state, payload) => {
  const ourDeck = state.deck
  ourDeck.push(payload.card)
  // set some notification that the card is added
  const updatedDeck = ourDeck
  console.log(`adding card to deck, and full deck here`, payload, updatedDeck)
  return { ...state, deck: updatedDeck }
}

// GameEvent Handlers

const restHandler = (state) => {
  const fullHealed = {
    ...state,
    hero: { ...state.hero, health: startingData.hero.health },
  }
  return fullHealed
}

const eventChoiceHandler = (state, { num, battlePayload }) => {
  //maybe as a `switch` statement to determine the actions
  const newState = setMyBalanceHandler(state, num)
  const nextSceneState = setSceneHandler(newState, battlePayload)
  return nextSceneState
}

const purchaseHandler = (state, payload) => {
  // ---
  const { card, battlePayload } = payload
  const nextState = { ...state }
  //subtract the money from the gameData.gold,
  // add the card from the payload
  if (nextState.gold >= card.price) {
    const addedCardState = addCardHandler(nextState, { card })
    const newGoldBalance = addedCardState.gold - card.price

    const newCardandGoldState = { ...addedCardState, gold: newGoldBalance }
    const returnableState = setSceneHandler(newCardandGoldState, battlePayload)
    return returnableState
  } else {
    // if you don't have enough money, you can buy.
    console.log(`not enough money to buy ${card.name}`)
    return nextState
  }
  // return returnableState
  // ---
}

const generateRewardsHandler = (state, payload) => {
  console.log(
    `generateRewardsHandler running:`,
    state,
    `payload (currently none)`,
    payload
  )
  // take list of rewards, use a seed for the randomization
  let randomizedCards = shuffle(allAvailableRewards, Math.random())
  // let randomizedCards = shuffle(rewardAttacks, Math.random() * seed)
  console.log(`reward card arr`, randomizedCards)

  const cardsToReturn = randomizedCards.slice(0, 3)
  console.log(`reward card arr sliced for only 3`, randomizedCards)

  const nextState = { ...state, availableRewards: cardsToReturn }
  return nextState
}

const setRewardHandler = (state, payload) => {
  const newState = addCardHandler(state, payload)

  const newStateWithFreshRewards = generateRewardsHandler(
    newState
    // ,payload (seed, level)
  )
  const nextSceneState = setSceneHandler(
    newStateWithFreshRewards,
    payload.battlePayload
  )
  return nextSceneState
  // return newState;
}

// Set Level Handlers
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
