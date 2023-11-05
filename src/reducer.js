import { DEPRECATED_ACTIONS} from "./actions"
import {
  setMyDataHandler,
  healHandler,
  setMyBalanceHandler,
  addCardHandler,
  addPackHandler,
  setAlertHandler,
} from "./handlers/dataHandlers"
import {
  endTurnHandler,
  setEnemyHandler,
  setAtkHandler,
  beginBattleHandler,
  generateRewardsHandler,
  setRewardHandler,
} from "./handlers/battleSetupHandlers"
import {
  playCardHandler,
  discardCardHandler,
  drawCardHandler,
} from "./handlers/battleHandlers"
import {
  setSceneHandler,
  setTransitionHandler,
  gameOverHandler,
} from "./handlers/sceneHandlers"
import {
  restHandler,
  eventChoiceHandler,
  purchaseHandler,
} from "./handlers/eventHandlers"

export default function reducer(state, action) {
  //we can always deep clone the state immediately here,
  //solving all problems of stale state
  const { payload } = action
  switch (action.type) {
    case DEPRECATED_ACTIONS.SET_TRANS:
      return setTransitionHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_SCENE:
      return setSceneHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_MYDATA:
      return setMyDataHandler(state)
    case DEPRECATED_ACTIONS.APPLY_HEAL:
      return healHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_MYBALANCE:
      return setMyBalanceHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_ALERT:
      return setAlertHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_DECK:
      return { ...state, deck: payload }
    case DEPRECATED_ACTIONS.DRAW_CARD:
      return drawCardHandler(state, payload)
    case DEPRECATED_ACTIONS.PLAY_CARD:
      return playCardHandler(state, payload)
    case DEPRECATED_ACTIONS.DISCARD_CARD:
      return discardCardHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_ENEMY:
      return setEnemyHandler(state, payload)
    case DEPRECATED_ACTIONS.SET_ATK:
      return setAtkHandler(state, payload)
    // level handlers
    case DEPRECATED_ACTIONS.EVENT_CHOICE:
      return eventChoiceHandler(state, payload)
    case DEPRECATED_ACTIONS.GENERATE_REWARDS:
      return generateRewardsHandler(state, payload)
    case DEPRECATED_ACTIONS.SELECT_REWARD:
      return setRewardHandler(state, payload)
    case DEPRECATED_ACTIONS.PURCHASE_ITEM:
      return purchaseHandler(state, payload)
    case DEPRECATED_ACTIONS.SELECT_REST:
      return restHandler(state)
    case DEPRECATED_ACTIONS.BEGIN_BATTLE:
      return beginBattleHandler(state, payload)
    case DEPRECATED_ACTIONS.END_TURN:
      return endTurnHandler(state, payload)
    case DEPRECATED_ACTIONS.ADD_CARD:
      return addCardHandler(state, payload)
    case DEPRECATED_ACTIONS.SELECT_PACK:
      return addPackHandler(state, payload)
    case DEPRECATED_ACTIONS.GAME_OVER:
      return gameOverHandler(state)
    default:
      console.log(`no action type matched, returning state`)
      return state
  }
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
