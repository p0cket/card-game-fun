/* eslint-disable indent */
import { dmgEmoji, energyEmoji } from '../consts/consts'
import { EFFECTS } from '../effects'
import { setAlertHandler } from './dataHandlers'
import { winBattleHandler } from './sceneHandlers'
import { setDialogHandler } from './dataHandlers'
import { SCENES } from './sceneHandlers_new'
import { ACTIONS } from '../MainContext'

// NEW AND TASTY Handlers
// const contextualState = useStateContext()
// const contextualDispatch = useDispatchContext()
const changeTurn = (currentPlayer, contextualState, contextualDispatch) => {
  const newPlayer = currentPlayer === 'player' ? 'opponent' : 'player'

  const newState = {
    battleManager: {
      ...contextualState.battleManager,
      turn: contextualState.battleManager.turn + 1,
      currentPlayer: newPlayer,
    },
  }

  contextualDispatch({
    type: ACTIONS.UPDATEGAMEDATA,
    payload: newState,
  })
}

const endBattle = (win, contextualState, contextualDispatch) => {
  // Implement logic to determine win or lose
  const newState = { ...contextualState } // Create a copy of the current state

  if (win) {
    // Implement logic for winning the battle
    newState.current.level++ // Increment the level
    newState.current.scene = {
      screen: SCENES.VICTORY, // Transition to the level screen
      details: null, //VICTORY DETAILS, based on who you beat, etc. You can set details for the new level
    }
  } else {
    // Implement logic for losing the battle
    newState.current.scene = {
      screen: SCENES.GAMEOVER, // Transition to the game over screen
      details: null, // You can provide details for the game over
    }
  }

  contextualDispatch({
    type: ACTIONS.UPDATEGAMEDATA,
    payload: newState,
  })
}

// OLD AND YUCKY Deprecated because we switched to moves from cards
export const playCardHandler = (state, { card, battlePayload }) => {
  console.log(`playCardHandler: payload&card`, card, battlePayload)
  let nextState = { ...state }
  const myEnergy = nextState.hero.energy
  const enemyHealth = nextState.battle.enemy.health
  let damage = card.num
  let energyCost = card.cost
  let cardName = card.name

  //Can the USER use the card?
  if (myEnergy < energyCost) {
    return setAlertHandler(
      nextState,
      `Not enough energy to play that card :(. End turn to replenish Energy!`,
    )
  }
  //if the USER can use the card:
  //apply hero buff effects
  switch (nextState.hero.effects.buff) {
    case EFFECTS.DOUBLEDAMAGE:
      damage = damage * 2
      break
    case null:
      console.log(`null (regular) case for no hero buffs applied`)
      break
    default:
      console.log(`default case for hero buffs applied`)
  }

  //Check if the enemy is defeated
  if (enemyHealth - damage <= 0) {
    nextState = winBattleHandler(nextState, { battlePayload: battlePayload })
  }

  // TODO Add note about the buff, and effects applied
  const dialog = `${energyCost}${energyEmoji} used ${cardName}. Dealt ${damage}${dmgEmoji}!`

  nextState = setDialogHandler(nextState, { dialog })

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

  // TODO: Finish PRESENCE effects. PRESENCE buffs other cards while the card is in hand.
  // Presence may have to apply earlier.
  for (let i = 0; i < nextState.battle.hand.length; i++) {
    switch (nextState.battle.hand[i].effect) {
      case EFFECTS.BUILDUP:
        nextState.battle.hand[i].num += 2
        nextState.battle.hand[i].qty += 1
        // nextState.hero.effects
        break
      default:
        console.log(`no individual effects (like BUILDUP) found for this card`)
    }
  }

  return discardCardHandler(nextState, { cardToAddToDiscarded: card })
}
export const discardCardHandler = (state, payload) => {
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
export const applyStatusHandler = (state, { card, battlePayload }) => {
  let nextState = { ...state }
  const statusEffect = card.effect
  console.log(`Apply Status of ${statusEffect}`, card, battlePayload)

  console.log(
    `card.effectChance: ${card.effectChance},atkSeed ${
      battlePayload.atkSeed
    }, ${card.effectChance > battlePayload.atkSeed}`,
  )

  // if a card has a percentage chance of having an effect work, try that before applying.
  if (!card.effectChance || card.effectChance > battlePayload.atkSeed) {
    // success, apply status
    switch (statusEffect) {
      case EFFECTS.STUN:
        console.log(`stun case met, applying stun`)
        return {
          ...nextState,
          battle: {
            ...nextState.battle,
            enemy: { ...nextState.battle.enemy, status: EFFECTS.STUN },
          },
        }
      case EFFECTS.POISON:
        // add poison effect to enemy.
        // TODO finish poison
        if (!nextState.battle.enemy.poison) {
          return {
            ...nextState,
            battle: {
              ...nextState.battle,
              // enemy: { ...nextState.battle.enemy, status: EFFECTS.POISON },
              enemy: { ...nextState.battle.enemy, poison: card.qty },
            },
          }
        } else {
          return {
            ...nextState,
            battle: {
              ...nextState.battle,
              // enemy: { ...nextState.battle.enemy, status: EFFECTS.POISON },
              enemy: {
                ...nextState.battle.enemy,
                poison: nextState.battle.enemy.poison + card.qty,
              },
            },
          }
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
      case 'sheild':
        // temporary
        return {
          ...nextState,
        }
      case 'armor':
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
          `drawing ${card.qty}, hand length before:${nextState.battle.hand.length}`,
        )
        for (let i = 0; i < card.qty; i++) {
          nextState = drawCardHandler(nextState)
        }
        console.log(
          `drew ${card.qty} cards, now hand is ${nextState.battle.hand.length} cards`,
          nextState,
        )
        return nextState
      case EFFECTS.LIFESTEAL:
        const healAmount = card.num
        nextState.hero.health = nextState.hero.health + healAmount
        return { ...nextState }
      default:
        console.log(`no statusEffect matched, returning state`)
        return nextState
    }
  } else {
    console.log(
      `percentage chance of effect landing was less than the seed, returning state`,
    )
    // TODO no status applied, set Dialog to reflect this. This state must be mutating somehow
    // const newDialog = nextState.battle.dialog + ` no Effect applied`
    // console.log(`newDialog SHOULD be:`, newDialog)
    // nextState = setDialogHandler(nextState, { newDialog })
    // ${appliedEffect? `Applied ${appliedEffect} effect`: ""}

    return nextState
  }
}
export const drawCardHandler = (state) => {
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
      alert: 'No cards left to draw :( ',
    }
  }
}
