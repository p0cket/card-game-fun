import { ACTIONS } from "./actions"
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
    case ACTIONS.SELECT_PACK:
      return addPackHandler(state, payload)
    case ACTIONS.GAME_OVER:
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
