import { ACTIONS } from "./actions";
import { SCENES } from "./scenes";
import { startingDeck, startingData, fullEnergyAmount } from "./consts/consts";
import { shuffle, decideEnemy, decideEnemyATK } from "./utils/reducer-utils";
import { map } from "./consts/mapGenerator";

export default function reducer(state, action) {
  // @TODO when you get a chance, destructure it all
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      return setSceneHandler(state, payload);
    case ACTIONS.SET_MYDATA:
      return setMyDataHandler(state, payload);
    case ACTIONS.SET_MYBALANCE:
      return setMyBalanceHandler(state, payload);
    case ACTIONS.SET_ALERT:
      return setAlertHandler(state, payload);
    case ACTIONS.SET_DECK:
      return { ...state, deck: payload };
    case ACTIONS.DRAW_CARD:
      return drawCardHandler(state, payload);
    case ACTIONS.PLAY_CARD:
      return playCardHandler(state, payload);
    case ACTIONS.DISCARD_CARD:
      return discardCardHandler(state, payload);
    case ACTIONS.SET_ENEMY:
      return setEnemyHandler(state, payload);
    case ACTIONS.SET_ATK:
      return setAtkHandler(state, payload);
    // level handlers
    case ACTIONS.EVENT_CHOICE:
      return eventChoiceHandler(state, payload);
    case ACTIONS.SELECT_REWARD:
      return setRewardHandler(state, payload);
    case ACTIONS.SELECT_REST:
      return restHandler(state);
    case ACTIONS.BEGIN_BATTLE:
      return beginBattleHandler(state, payload);
    case ACTIONS.END_TURN:
      return endTurnHandler(state, payload);
    case ACTIONS.ADD_CARD:
      return addCardHandler(state, payload);
    case ACTIONS.GAME_OVER:
      return gameOverHandler(state);
    default:
      console.log(`no action type matched, returning state`);
      return state;
  }
}

const restHandler = (state) => {
  const fullHealed = {...state, hero: {...state.hero, health: startingData.hero.health} }
  return fullHealed;
}


const eventChoiceHandler = (state, payload) => {
  //maybe as a `switch` statement to determine the actions
  const newState = setMyBalanceHandler(state, payload);
  const fakeScenePayload = {
    enemySeed: Math.random(),
    atkSeed: Math.random(),
    beginBattleSeed: Math.random(),
    startingHandCount: 3,
  };
  //breaks here because of something...
  const nextSceneState = setSceneHandler(newState, fakeScenePayload);
  return nextSceneState;
};

const setRewardHandler = (state, payload) => {
  const newState = addCardHandler(state, payload);
  const fakeScenePayload = {
    enemySeed: Math.random(),
    atkSeed: Math.random(),
    beginBattleSeed: Math.random(),
    startingHandCount: 3,
  };
  const nextSceneState = setSceneHandler(newState, fakeScenePayload);
  return nextSceneState;
  // return newState;
};

const addCardHandler = (state, payload) => {
  const ourDeck = state.deck;
  console.log("adding this card to our deck", payload);
  ourDeck.push(payload);
  // set some notification that the card is added
  const updatedDeck = ourDeck;
  return { ...state, deck: updatedDeck };
};

const setAlertHandler = (state, payload) => {
  console.error("payload", payload);
  return {
    ...state,
    alert: payload,
  };
};

const setMyDataHandler = (payload) => {
  return payload;
};
const setMyBalanceHandler = (state, payload) => {
  const newBalance = state.gold + payload;
  const nextState = { ...state, gold: newBalance };
  return nextState;
};

const playCardHandler = (state, { card }) => {
  //
  let nextState = { ...state };
  //
  if (nextState.hero.energy < card.cost) {
    return setAlertHandler(nextState, `Not enough energy to play that card :(`);
  }
  if (nextState.battle.enemy.health - card.num <= 0) {
    console.log(`you defeated the enemy!`);
    // ---- for now, go to next level, later turn into:
    // set scene for a results screen.
    // results screen goes to a reward screen.
    // reward screen goes to next level. (or map)
    // setSceneHandler(state, payload)
    // ----

    //end battle logic
    nextState = setMyDataHandler({ ...nextState, gold: nextState.gold + 25 });

    const payload = {
      enemySeed: Math.random(),
      atkSeed: Math.random(),
      beginBattleSeed: Math.random(),
      startingHandCount: 3,
    };

    nextState = setSceneHandler(nextState, payload);
    // return nextState;
  }
  const myHandIndex = nextState.battle.hand.indexOf(card);
  const hand = [...nextState.battle.hand];
  hand.splice(myHandIndex, 1);

  const energyLeft = nextState.hero.energy - card.cost;
  const enemyHealthLeft = nextState.battle.enemy.health - card.num;
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
  };
  console.log(`nextState: `, nextState);
  return discardCardHandler(nextState, { cardToRemove: card });
};

const discardCardHandler = (state, payload) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      discarded: [...state.battle.discarded, payload.cardToRemove],
    },
  };
};

const endTurnHandler = (state, payload) => {
  const { hero, battle } = state;
  // apply status effects. maybe a applyStatusEffectsHandler()
  const finalHealth = hero.health - battle.enemy.nextAttack.damage;
  if (finalHealth > 0) {
    const nextState = {
      ...state,
      hero: { ...state.hero, health: finalHealth, energy: fullEnergyAmount },
    };
    return setAtkHandler(nextState, payload);
  } else {
    return gameOverHandler(state);
  }
};
const gameOverHandler = (state) => {
  return {
    ...startingData,
    curScene: {
      scene: SCENES.GAMEOVER,
      lvl: 0,
    },
  };
};

const setSceneHandler = (state, payload) => {
  const nextLevel = {
    scene: map[state.curScene.lvl + 1],
    lvl: state.curScene.lvl + 1,
  };
  let nextState = state;
  if (nextLevel.scene === SCENES.BATTLE) {
    const { enemySeed, atkSeed, beginBattleSeed, startingHandCount } = payload;
    // give also the lvl and miniboss or boss
    console.log(`state`, state);
    nextState = setEnemyHandler(nextState, { seed: enemySeed });
    console.log(`nextState`, nextState);
    nextState = setAtkHandler(nextState, { seed: atkSeed });
    nextState = beginBattleHandler(nextState, {
      seed: beginBattleSeed,
      startingHandCount,
    });
  }

  return {
    ...nextState,
    curScene: nextLevel,
  };
};

const setEnemyHandler = (state, payload) => {
  const { seed } = payload;
  return {
    ...state,
    battle: { ...state.battle, enemy: decideEnemy(seed) },
  };
};

const setAtkHandler = (state, payload) => {
  const { seed } = payload;
  return {
    ...state,
    battle: {
      ...state.battle,
      enemy: {
        ...state.battle.enemy,
        nextAttack: decideEnemyATK(seed, state.battle.enemy.attacks),
      },
    },
  };
};

// handlers can call other handlers, which return state
const beginBattleHandler = (state, payload) => {
  const { startingHandCount, seed } = payload;
  let shuffledDeck = [];
  if (state.deck.length > 0) {
    // impure
    shuffledDeck = shuffle(startingDeck, seed);
  } else {
    shuffledDeck = shuffle(state.deck, seed);
  }
  let nextState = {
    ...state,
    battle: { ...state.battle, beginning: true, hand: [] },
    deck: [...shuffledDeck],
    hero: { ...state.hero, energy: fullEnergyAmount },
  };

  for (let i = 0; i < startingHandCount; i++) {
    nextState = drawCardHandler(nextState);
  }

  return nextState;
};

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
    };
  } else {
    return {
      ...state,
      alert: "No cards left to draw :( ",
    };
  }
};
