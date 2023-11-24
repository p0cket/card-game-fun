import { shuffle } from '../utils/reducer-utils'
import { EFFECTS } from '../effects'
import { allAvailableRewards } from '../consts/allAvailableRewards'
import { startingDeck, fullEnergyAmount } from '../consts/consts'
import { decideEnemy, decideEnemyATK } from '../utils/reducer-utils'
import { drawCardHandler } from './battleHandlers'
import { addCardHandler, setAlertHandler } from './dataHandlers'
import {
  setSceneHandler,
  gameOverHandler,
  winBattleHandler,
} from './sceneHandlers'

export const endTurnHandler = (state, payload) => {
  const { enemySeed, atkSeed, beginBattleSeed, startingHandCount } = payload
  let nextState = { ...state }
  //
  const { hero, battle } = nextState
  const enemyStatus = nextState.battle.enemy.status
  const heroBuff = nextState.hero.effects.buff

  // apply status effects. maybe a applyStatusEffectsHandler()
  let finalHealth = hero.health
  //  let finalHealth = hero.health - battle.enemy.nextAttack.damage

  // TODO: Add check for battle-long battleBuffs

  // ENDTURN: Resolve applied enemy effects
  //First special cases like Poison
  if (nextState.battle.enemy.poison) {
    console.log(`Poisoned, so check if dead, and if not apply poison damage`)
    if (nextState.battle.enemy.health - nextState.battle.enemy.poison <= 0) {
      // you win the battle, continue
      nextState = winBattleHandler(nextState, {
        battlePayload: {
          enemySeed,
          atkSeed,
          beginBattleSeed,
          startingHandCount,
        },
      })
    } else {
      // Take enemy health away from poison damage
      nextState = {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: {
            ...nextState.battle.enemy,
            // health: nextState.battle.enemy.health - poisonDamage,
            health:
              nextState.battle.enemy.health - nextState.battle.enemy.poison,
          },
        },
      }
    }
  }

  let enemyWithoutStatusState
  let decision
  // Then the rest of the status effects
  switch (enemyStatus) {
    case EFFECTS.STUN:
      console.log(`stunned, so don't attack, set status to _null_`)
      enemyWithoutStatusState = {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: { ...nextState.battle.enemy, status: null },
        },
      }
      nextState = enemyWithoutStatusState
      break
    case EFFECTS.SLEEP:
      console.log(
        `Sleep. 50% chance wakes up - status is removed, no damage applies while active`,
      )
      // @TODO: replace Math.random() with Seed
      decision = Math.floor(Math.random() * 2)
      if (decision === 1) {
        const enemyAppliedSleepState = {
          ...nextState,
          battle: {
            ...nextState.battle,
            enemy: { ...nextState.battle.enemy, status: null },
          },
        }
        nextState = enemyAppliedSleepState
      }
      break
    case null:
      console.log(
        ` enemyStatus of null matched, returning a hero-damaged state`,
      )
      finalHealth = finalHealth - battle.enemy.nextAttack.damage
      break
    default:
      console.log(`no enemyStatus matched, returning state`)
  }

  //ENDTURN: Resolve your buffs
  switch (heroBuff) {
    case EFFECTS.DOUBLEDAMAGE: {
      // your buff lasts one turn. Set back to _null_
      const removedDoubleDamageState = {
        ...nextState,
        hero: {
          ...nextState.hero,
          effects: {
            ...nextState.hero.effects,
            buff: null,
          },
        },
      }
      nextState = removedDoubleDamageState
      break
    }
    default:
      console.log(
        `endTurnHandler: default case reached while checking heroBuff of: ${heroBuff}`,
      )
  }

  if (finalHealth > 0) {
    // if not dead, update health and fill energy, draw a card, and set enemy's attack
    const endTurnState = {
      ...nextState,
      hero: {
        ...nextState.hero,
        health: finalHealth,
        energy: fullEnergyAmount,
      },
    }

    const drawCardState = drawCardHandler(endTurnState)
    const drawSecondCardState = drawCardHandler(drawCardState)
    nextState = setAtkHandler(drawSecondCardState, payload)
    // Clear the alert messages
    nextState = setAlertHandler(nextState, ``)

    return nextState
  } else {
    return gameOverHandler(state)
  }
}

export const setEnemyHandler = (state, payload) => {
  const { seed, enemyArr } = payload

  return {
    ...state,
    battle: { ...state.battle, enemy: decideEnemy(seed, enemyArr) },
  }
}

export const setAtkHandler = (state, payload) => {
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

export const beginBattleHandler = (state, payload) => {
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

export const generateRewardsHandler = (state, payload) => {
  console.log(
    `generateRewardsHandler running:`,
    state,
    `payload (currently none)`,
    payload,
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

export const setRewardHandler = (state, payload) => {
  // const nextState = {...state}
  // const nextState = addCardHandler(nextState, payload)
  // const newState = addCardHandler(nextState, payload)
  const newState = addCardHandler(state, payload)

  const newStateWithFreshRewards = generateRewardsHandler(
    newState,
    // ,payload (seed, level)
  )
  const nextSceneState = setSceneHandler(
    newStateWithFreshRewards,
    payload.battlePayload,
  )
  return nextSceneState
  // return newState;
}
