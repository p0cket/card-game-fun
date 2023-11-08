import {
  healHandler,
  setMyBalanceHandler,
  addCardHandler,
} from './dataHandlers'
import { setSceneHandler, setTransitionHandler } from './sceneHandlers'

// GameEvent Handlers
export const restHandler = (state) => {
  const fullHealed = {
    ...state,
    hero: { ...state.hero, health: state.hero.maxHP },
  }
  return fullHealed
}

// const eventChoiceHandler = (state, { type, num, battlePayload }) => {
export const eventChoiceHandler = (state, { choice, battlePayload }) => {
  let newState = { ...state }

  switch (choice.resultType) {
    case 'health':
      console.log(`health choice`)
      newState = healHandler(newState, choice.resultNum)
      // newState = setEventResultOBJ(newState, choice)
      break
    case 'money':
      console.log(`money choice`)
      if (choice.resultNum !== 0) {
        newState = setMyBalanceHandler(newState, choice.resultNum)
        // newState = setEventResultOBJ(newState, choice)
      }
      break
    case 'cards':
      console.log(`cards choice`)
      break
    case 'enemy':
      console.log(`enemy choice`)
      break
    case 'story':
      console.log(`story choice`)
      break
    case 'exit':
      console.log(`exit choice`)
      break
    default:
      console.log(`no proper executeChoice choice`)
      break
  }

  console.log(`eventChoiceHandler b4`)

  // Work on setting up the transition element
  const transSceneState = setTransitionHandler(newState, {
    choice,
    battlePayload,
  })
  console.log(`eventChoiceHandler after`, newState)

  return transSceneState

  // const nextSceneState = setSceneHandler(newState, battlePayload)
  // return nextSceneState
}

export const purchaseHandler = (state, payload) => {
  // ---
  const { card, battlePayload } = payload
  const nextState = { ...state }
  //subtract the money from the gameData.gold,
  // add the card from the payload
  if (!card.price) {
    console.warn(
      `card.price does not exist here. card.price = ${card.price}. fullcard:`,
      card,
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
