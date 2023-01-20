import { dmgEmoji, energyEmoji } from "../consts/consts"
import { EFFECTS } from "../effects"
import { setAlertHandler } from "./dataHandlers"
import { winBattleHandler } from "./sceneHandlers"
import { setDialogHandler } from "./dataHandlers"

export const playCardHandler = (state, { card, battlePayload }) => {
  console.log(`playCardHandler: payload&card`, card, battlePayload)
  let nextState = { ...state }
  const myEnergy = nextState.hero.energy
  const enemyHealth = nextState.battle.enemy.health
  let damage = card.num
  let energyCost = card.cost
  let cardName = card.name

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
      console.log(`null (regular) case for no hero buffs applied`)
      break
    default:
      console.log(`default case for hero buffs applied`)
  }
  //-----
  // create typeChart
  // Calculate super-effectiveness here
  // const multiplier = typeChart(attackType, defenderType)
  //-----

  //Check if the enemy is defeated
  if (enemyHealth - damage <= 0) {
    nextState = winBattleHandler(nextState, { battlePayload: battlePayload })
  }

  // TODO Add note about the buff, and effects applied
  const dialog = `Pal used ${energyCost}${energyEmoji} to do: ${cardName}! Pal dealt ${damage}${dmgEmoji}`
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
  console.log(`endOf playCardHandler- nextState is: `, nextState)
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
      alert: "No cards left to draw :( ",
    }
  }
}
