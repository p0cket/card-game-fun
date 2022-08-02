import { ACTIONS } from "./actions";
import { startingDeck, startingData } from "./components/consts";
import { shuffle, decideEnemy, decideEnemyATK } from "./utils/reducer-utils";
import { map } from "./components/mapGenerator";

export default function reducer(state, action) {
  // @TODO when you get a chance, destructure it all
  // const {payload} = action;
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      return setSceneHandler(state, action.payload);
    case ACTIONS.SET_MYDATA:
      return action.payload;
    case ACTIONS.SET_ALERT:
        return setAlertHandler(state, action.payload)
    //   return {
    //     ...state,
    //     alert: action.payload,
    //   };
    case ACTIONS.SET_DECK:
      return { ...state, deck: action.payload };
    case ACTIONS.DRAW_CARD:
      return drawCardHandler(state, action.payload);
    
    case ACTIONS.PLAY_CARD:
      return playCardHandler(state, action.payload);
    
    case ACTIONS.DISCARD_CARD:
      return discardCardHandler(state, action.payload);
    
    case ACTIONS.SET_ENEMY:
      return setEnemyHandler(state, action.payload);
    case ACTIONS.SET_ATK:
      return setAtkHandler(state, action.payload);
    case ACTIONS.BEGIN_BATTLE:
      return beginBattleHandler(state, action.payload);

    case ACTIONS.END_TURN:
      return endTurnHandler(state, action.payload);

    case ACTIONS.GAME_OVER:
      return gameOverHandler(state);

    default:
      console.log(`no action type matched, returning state`);
      return state;
  }
}

const setAlertHandler = (state, payload) => {
  console.error('payload', payload)
  return {
    ...state,
    alert: payload,
  }
}


const playCardHandler = (state, { card }) => {
  if (state.hero.energy < card.cost) {
    return setAlertHandler(state, `Not enough energy to play that card :(`)
  }

  console.log(`PlayCard payload:`, card.num, card.cost);
  // if (state.hero.energy >= action.payload.cost) {
  if (state.battle.enemy.health - card.num <= 0) {
    console.log(`you defeated the enemy!`);
    //also use energy needed to make the card
    //end battle logic
    //move to next scene
  }
  const myHandIndex = state.battle.hand.indexOf(card);
  const hand = [...state.battle.hand];
  hand.splice(myHandIndex, 1);
  //[1,2,3].splice(0, 1) -> [1]
  
  console.log(`myHandIndex: ${myHandIndex},[...state.battle.hand]`,[...state.battle.hand], 'hand', hand)
  console.log(`initialState: `, state)
  const energyLeft = state.hero.energy - card.cost;
  const enemyHealthLeft = state.battle.enemy.health - card.num;
  const nextState = {
    ...state,
    hero: { ...state.hero, energy: energyLeft },
    battle: {
      ...state.battle,
      enemy: {
        ...state.battle.enemy,
        health: enemyHealthLeft,
      },
      hand,
    },
  };
  console.log(`nextState: `,nextState)
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
}

const endTurnHandler = (state, payload) => {
  const { hero, battle } = state;
  const finalHealth = hero.health - battle.enemy.nextAttack.damage;
  if (finalHealth > 0) {
    const nextState = {
      ...state,
      hero: { ...state.hero, health: finalHealth },
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
      scene: "game over",
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
  if (nextLevel.scene === "battle") {
    const { enemySeed, atkSeed, beginBattleSeed, startingHandCount } = payload;
    nextState = setEnemyHandler(nextState, { seed: enemySeed });
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

const setEnemyHandler = (state, payload) => {
  const { seed } = payload;
  return {
    ...state,
    battle: { ...state.battle, enemy: decideEnemy(seed) },
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
    battle: { ...state.battle, beginning: true },
    deck: [...shuffledDeck],
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
