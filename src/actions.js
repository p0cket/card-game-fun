import { uniqueId } from "./utils/reducer-utils"

export const ACTIONS = {
  SET_TRANS: "set-trans",
  SET_SCENE: "set_scene",
  SET_MYDATA: "set-mydata",
  APPLY_HEAL: "apply-heal",
  SET_MYBALANCE: "set-mybalance",
  SET_ENEMY: "set-enemy",
  SET_ATK: "set-atk",
  SET_DECK: "set-deck",
  SET_ALERT: "set_alert",
  DRAW_CARD: "draw-card",
  PLAY_CARD: "play-card",
  SELECT_REST: "select-rest",
  GENERATE_REWARDS: "generate-rewards",
  SELECT_REWARD: "select-reward",
  PURCHASE_ITEM: "purchase-item",
  DISCARD_CARD: "discard-card",
  BEGIN_BATTLE: "begin-battle",
  TAKE_DAMAGE: "take-damage",
  END_TURN: "end-turn",
  ADD_CARD: "add-card",
  GAME_OVER: "game-over",
}

export const ENEMY_TYPES = {
  REG: "regular",
  MINI: "miniboss",
  BOSS: "boss",
}

export const addCardAction = (card) => {
  const cardWithFreshID = {...card, id: uniqueId()}
  return {
    type: ACTIONS.SELECT_REWARD,
    payload: { card: cardWithFreshID, battlePayload: {
      enemySeed: Math.random(),
      atkSeed: Math.random(),
      beginBattleSeed: Math.random(),
      startingHandCount: 5,
    }},
  }
}

export const playCardAction = (card) => {
  return {
    type: ACTIONS.PLAY_CARD,
    payload: { card ,
    battlePayload: {
      enemySeed: Math.random(),
      atkSeed: Math.random(),
      beginBattleSeed: Math.random(),
      startingHandCount: 5,
    }},
  }
}

export const endTurnAction = () => {
  console.log(`End Turn`)
  return { type: ACTIONS.END_TURN, payload: { seed: Math.random() } }
}

// @TODO finish or remove this Transition functionality
export const transitionSceneAction = () => {
  return {
    type: ACTIONS.SET_TRANS,
    payload: {
      enemySeed: Math.random(),
      atkSeed: Math.random(),
      beginBattleSeed: Math.random(),
      startingHandCount: 5,
    },
  }
}

export const setSceneAction = () => {
  return {
    type: ACTIONS.SET_SCENE,
    payload: {
      enemySeed: Math.random(),
      atkSeed: Math.random(),
      beginBattleSeed: Math.random(),
      startingHandCount: 5,
    },
  }
}

export const buyCardAction = (card) => {
  console.log(`adding this card:`, card)
  return {
    type: ACTIONS.PURCHASE_ITEM,
    payload: {
      card,
      battlePayload: {
        enemySeed: Math.random(),
        atkSeed: Math.random(),
        beginBattleSeed: Math.random(),
        startingHandCount: 5,
      },
    },
  }
}

export const eventChoiceAction = (type, num) => {
  return {
    type: ACTIONS.EVENT_CHOICE,
    payload: {
      type,
      num,
      battlePayload: {
        enemySeed: Math.random(),
        atkSeed: Math.random(),
        beginBattleSeed: Math.random(),
        startingHandCount: 5,
      },
    },
  }
}
