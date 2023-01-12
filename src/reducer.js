import { ACTIONS, ENEMY_TYPES } from "./actions"
import { SCENES } from "./scenes"
import { EFFECTS } from "./effects"
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
  //we can always deep clone the state immediately here,
  //solving all problems of stale state
  const { payload } = action
  switch (action.type) {
    case ACTIONS.SET_TRANS:
      return setTransitionHandler(state, payload)
    case ACTIONS.SET_SCENE:
      return setSceneHandler(state, payload)
    case ACTIONS.SET_MYDATA:
      return setMyDataHandler(state)
    case ACTIONS.APPLY_HEAL:
      return healHandler(state, payload)
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

// @TODO Organize these handlers.

// General GameData Handlers
const setMyDataHandler = (state) => {
  return state
}

const healHandler = (state, payload) => {
  let nextState = { ...state }
  const newHealth = nextState.hero.health + payload
  console.log(`newHealth is  ${newHealth}`)
  nextState = { ...nextState, hero: { ...nextState.hero, health: newHealth } }
  console.log(`nextState`, nextState)
  return nextState
}

const setMyBalanceHandler = (state, payload) => {
  const newBalance = state.gold + payload
  console.log(`newBalance is  ${newBalance}`)
  const nextState = { ...state, gold: newBalance }
  console.log(`nextState`, nextState)
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
  console.log(`playCardHandler: payload&card`, card, battlePayload)
  let nextState = { ...state }
  const myEnergy = nextState.hero.energy
  const enemyHealth = nextState.battle.enemy.health
  let damage = card.num
  let energyCost = card.cost

  if (myEnergy < energyCost) {
    return setAlertHandler(
      nextState,
      `Not enough energy to play that card :(. End turn to replenish Energy!`
    )
  }

  //apply hero buff effects
  switch (nextState.hero.effects.buff) {
    case EFFECTS.DOUBLEDAMAGE:
      damage = damage * 2
      break
    case null:
      console.log(`null (regular) case for hero buffs applied`)
      break
    default:
      console.log(`default case for hero buffs applied`)
  }

  //-----
  // create typeChart
  // Calculate super-effectiveness here
  // const multiplier = typeChart(attackType, defenderType)
  //-----

  //This should replace the full check for if we defeated the enemy, and allow the code to be executed elsewhere
  // nextState = checkIfDefeatedState(nextState, {damage, battlePayload})
  // This below is what is replaced by the line above
  if (enemyHealth - damage <= 0) {
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
    })
    console.log(`nextState`, nextState)

    const payload = battlePayload
    console.log(`payload`, battlePayload)

    // replace with something like setTransitionHandler
    // nextState = setTransitionHandler(nextState, payload)
    //
    //
    nextState = setSceneHandler(nextState, payload)
  }
  //

  // remove the card
  const myHandIndex = nextState.battle.hand.indexOf(card)
  let hand = [...nextState.battle.hand]
  hand.splice(myHandIndex, 1)

  // apply the spliced hand (removed the used card) into the state
  nextState = {
    ...nextState,
    battle: {
      ...nextState.battle,
      hand: hand,
    },
  }

  if (card.effect != null || undefined) {
    const statusPayload = { card, battlePayload }
    nextState = applyStatusHandler(nextState, statusPayload)
    console.log(
      `now back in playCardHandler after applying our effect, lets see our state`,
      nextState
    )
  }

  const energyLeft = myEnergy - energyCost
  const enemyHealthLeft = nextState.battle.enemy.health - damage
  nextState = {
    ...nextState,
    hero: { ...nextState.hero, energy: energyLeft },
    battle: {
      ...nextState.battle,
      enemy: {
        ...nextState.battle.enemy,
        health: enemyHealthLeft,
      },
      // hand,
    },
  }
  console.log(`endOf playCardHandler- nextState is: `, nextState)
  return discardCardHandler(nextState, { cardToAddToDiscarded: card })
}

//@TODO: we are extracting the defeat state to make it reusable
// eslint-disable-next-line
const checkIfDefeatedState = (state, { damage, battlePayload }) => {
  let nextState = { ...state }
  const enemyHealth = nextState.battle.enemy.health

  if (enemyHealth - damage <= 0) {
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
    })
    console.log(`nextState`, nextState)

    const payload = battlePayload
    console.log(`payload`, battlePayload)
    nextState = setSceneHandler(nextState, payload)
  }
}

const applyStatusHandler = (state, { card, battlePayload }) => {
  let nextState = { ...state }
  const statusEffect = card.effect
  console.log(`Apply Status of ${statusEffect}`, card, battlePayload)
  switch (statusEffect) {
    case EFFECTS.STUN:
      return {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: { ...nextState.battle.enemy, status: EFFECTS.STUN },
        },
      }
    case EFFECTS.POISON:
      // add poison effect to enemy.
      return {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: { ...nextState.battle.enemy, status: EFFECTS.POISON },
        },
      }
    case EFFECTS.SLEEP:
      // 50% chance of waking up
      return {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: { ...nextState.battle.enemy, status: EFFECTS.SLEEP },
        },
      }
    case "sheild":
      // temporary
      return {
        ...nextState,
      }
    case "armor":
      return {
        ...nextState,
      }
    case EFFECTS.DOUBLEDAMAGE:
      // double attacks this turn
      // nextState.hero.effects.buff = EFFECTS.DOUBLEDAMAGE
      return {
        ...nextState,
        hero: {
          ...nextState.hero,
          effects: { ...nextState.hero.effects, buff: EFFECTS.DOUBLEDAMAGE },
        },
      }
    case EFFECTS.DRAW:
      console.log(
        `drawing ${card.qty}, hand length before:${nextState.battle.hand.length}`
      )
      for (let i = 0; i < card.qty; i++) {
        nextState = drawCardHandler(nextState)
      }
      console.log(
        `drew ${card.qty} cards, now hand is ${nextState.battle.hand.length} cards`,
        nextState
      )
      return nextState
    default:
      console.log(`no statusEffect matched, returning state`)
      return nextState
  }
}

const discardCardHandler = (state, payload) => {
  // notes the card that is in the discard pile.
  // removing from deck happens elsewhere
  return {
    ...state,
    battle: {
      ...state.battle,
      discarded: [...state.battle.discarded, payload.cardToAddToDiscarded],
    },
  }
}

const endTurnHandler = (state, payload) => {
  let nextState = { ...state }
  //
  const { hero, battle } = nextState
  const enemyStatus = nextState.battle.enemy.status
  const heroBuff = nextState.hero.effects.buff

  // apply status effects. maybe a applyStatusEffectsHandler()
  let finalHealth = hero.health
  //  let finalHealth = hero.health - battle.enemy.nextAttack.damage

  // ENDTURN: Resolve applied enemy effects
  switch (enemyStatus) {
    case EFFECTS.STUN:
      console.log(`stunned, so don't attack, set status to _null_`)
      const enemyWithoutStatusState = {
        ...nextState,
        battle: {
          ...nextState.battle,
          enemy: { ...nextState.battle.enemy, status: null },
        },
      }
      nextState = enemyWithoutStatusState
      break
    case EFFECTS.POISON:
      console.log(`Poisoned, so check if dead, and if not apply poison damage`)
      //checkEnemyDefeat(state, {damage, make battle payload})

      break
    case EFFECTS.SLEEP:
      console.log(
        `Sleep. 50% chance wakes up - status is removed, no damage applies while active`
      )
      // @TODO: replace Math.random() with Seed
      const decision = Math.floor(Math.random() * 2)
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
        ` enemyStatus of null matched, returning a hero-damaged state`
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
        `endTurnHandler: default case reached while checking heroBuff of: ${heroBuff}`
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

    // @TODO: upkeep handler
    // switch (heroStatus) {
    //   case EFFECTS.STUN:
    //     console.log(
    //       `upkeep: our hero is stunned, we can't attack, set status to _null_`
    //     )
    //     const enemyWithoutStatusState = {
    //       ...nextState,
    //     }
    //     nextState = enemyWithoutStatusState
    //     break
    //   default:
    //     console.log(`upkeep: no heroStatus matched`)
    // }

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
    console.log(`draw. Deck has ${state.deck.length} cards`)
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

const eventChoiceHandler = (state, { type, num, battlePayload }) => {
  //maybe as a `switch` statement to determine the actions
  // switch(type)
  let newState = { ...state }

  switch (type) {
    case "health":
      console.log(`health choice`)
      healHandler(newState, num)
      break
    case "money":
      console.log(`money choice`)
      if (num !== 0) {
        newState = setMyBalanceHandler(newState, num)
      }
      break
    case "cards":
      console.log(`cards choice`)
      break
    case "enemy":
      console.log(`enemy choice`)
      break
    case "story":
      console.log(`story choice`)
      break
    case "exit":
      console.log(`exit choice`)
      break
    default:
      console.log(`no proper executeChoice choice`)
      break
  }

  const nextSceneState = setSceneHandler(newState, battlePayload)
  return nextSceneState
}

const purchaseHandler = (state, payload) => {
  // ---
  const { card, battlePayload } = payload
  const nextState = { ...state }
  //subtract the money from the gameData.gold,
  // add the card from the payload
  if (!card.price) {
    console.warn(
      `card.price does not exist here. card.price = ${card.price}. fullcard:`,
      card
    )
  }
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
  // const nextState = {...state}
  // const nextState = addCardHandler(nextState, payload)
  // const newState = addCardHandler(nextState, payload)
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

// @TODO: Finish in progress setTransitionHandler or get rid of it:
const setTransitionHandler = (state, payload) => {
  // Probably need text to display and options here. maybe confetti?
  // Do you need a battle payload here? probably not.
  // const { enemySeed, atkSeed, beginBattleSeed, startingHandCount } = payload
  //
  const nextLevel = {
    scene: SCENES.TRANSITION,
    lvl: state.curScene.lvl,
    act: state.curScene.act,
  }
  let nextState = state
  return {
    ...nextState,
    curScene: nextLevel,
  }
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

  // THOUGHTS on TRANSITION scene
  // Send to map if needed but if not, don't send to map.
  // switch (map[state.curScene.lvl]) {
  //   case SCENES.BATTLE:
  //     return {...nextState}
  // }
  //

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
