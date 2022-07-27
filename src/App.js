import "./styles.css";
import Screen from "./components/Screen";
import React, { useReducer } from "react";
import mapGenerator from "./components/mapGenerator";
import enemies from "./components/enemies";

export const ACTIONS = {
  SET_SCENE: "set_scene",
  SET_MYDATA: "set-mydata",
  SET_ENEMY: "set-enemy",
  SET_ALERT: "set_alert",
  DRAW_CARD: "draw-card",
  PLAY_CARD: "play-card",
  DISCARD_CARD: "discard-card",
  BEGIN_BATTLE: "begin-battle",
  TAKE_DAMAGE: "take-damage",
};

function reducer(gameData, action) {
  //@TODO when you get a chance, destructure it all
  // const {payload} = action;
  switch (action.type) {
    case ACTIONS.SET_SCENE:
      console.log(
        `action.payload`,
        action.payload,
        `gameData.curScene`,
        gameData.curScene
      );
      return {
        ...gameData,
        curScene: action.payload,
      };
    case ACTIONS.SET_MYDATA:
      return {};
    case ACTIONS.SET_ALERT:
      return {
        ...gameData,
        alert: action.payload.alert,
      };
    case ACTIONS.DRAW_CARD:
      if (gameData.deck.length > 0) {
        gameData.battle.hand = [...gameData.battle.hand, gameData.deck[0]];
        gameData.deck.slice(1);
        return {
          ...gameData,
          battle: {
            ...gameData.battle,
            hand: [...gameData.battle.hand, gameData.deck[0]],
          },
        };
      } else {
        return {
          ...gameData,
          alert: "No cards left to draw :( ",
        };
      }
    case ACTIONS.PLAY_CARD:
      if (gameData.hero.energy >= action.payload.cost) {
        gameData.battle.enemy.health =
          gameData.battle.enemy.health - action.payload.damage;
        gameData.hero.energy = gameData.hero.energy - action.payload.cost;
        if (gameData.battle.enemy.health <= 0) {
          console.log(`you defeated the enemy!`);
        }
      } else {
        gameData.alert = "Not enough energy to play that card :( ";
      }
      //put the card in the discard
      return { ...gameData };
    case ACTIONS.DISCARD_CARD:
      gameData.battle.discarded = [
        ...gameData.battle.discarded,
        action.payload.cardToRemove,
      ];
      return gameData;
    case ACTIONS.BEGIN_BATTLE:
      // CAN I DO THIS
      //this should set the screen to be battle screen
      gameData.battle.beginning = true;
      //then decide the opponent
      setEnemyHandler(gameData, action.payload.enemy);
      setEnemyAtkHandler(gameData, action.payload.startingAtk);
      return {...gameData};
    case ACTIONS.END_TURN: {
      const finalHealth = gameData.hero.health - action.payload.damage;
      if (finalHealth > 0) {
        gameData.hero.health = finalHealth;
        // const atk = decideEnemyATK();
        setEnemyAtkHandler(gameData, action.payload.atk); //setting atk for next turn
      } else {
        console.log(`game over man :)`);
      }
      return {...gameData};
    }
    default:
      console.log(`no action type matched, returning gameData`);
      return gameData;
  }
}

function setEnemyHandler(gameData, action) {
  // this replaces SET_ENEMY
  gameData.battle.enemy = action;
  // ourSetEnemy = action
  return gameData;
}
function setEnemyAtkHandler(gameData, action) {
  // this replaces SET_ENEMY_ATTACK
  gameData.battle.enemy.nextAttack = action;
  return gameData; 
}

let startingData = {
  deck: [],
  gold: 50,
  hero: {
    health: 100,
    energy: 10,
    status: "Feeling Fine",
  },
  battle: {
    enemy: {
      name: "sample guy",
      bio: "just a standaard enemi",
      health: "30",
      energy: 6,
      status: "Feelin great",
      nextAttack: "none",
      attacks: [
        {
          name: "hitting you",
          type: "hit",
          damage: 20,
          status: "dizzy",
        },
        {
          name: "hitting again",
          type: "hit",
          damage: 40,
          status: "none",
        },
      ],
    },

    hand: [],
    discarded: [],
    beginning: false,
  },
  curScene: { scene: "intro", lvl: 0 },
  alert: "",
};

const types = ["Fire", "Water", "Blood", "Poison"];
const names = ["FireBreath", "WaterGun", "LifeSteal", "ToxicSplash"];
const numbers = [1, 2, 3, 4, 5, 6];
let deck = [];
let shuffDeck = new Set();
let preparedDeck = [];
let map = mapGenerator();

const makeDeck = (emptyDeck) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < types.length; j++) {
      emptyDeck.push({
        type: types[j],
        name: names[j],
        num: numbers[i],
        cost: 1,
      });
    }
  }
};

const shuffle = (thisDeck, shuffledDeck) => {
  let i = 0;
  while (i < thisDeck.length) {
    let num = Math.floor(Math.random() * thisDeck.length);
    if (!shuffledDeck.has(thisDeck[num])) {
      shuffledDeck.add(thisDeck[num]);
      i++;
    }
  }
  //set back from a Set() to an Array
  preparedDeck = [...shuffledDeck];
};

makeDeck(deck);
shuffle(deck, shuffDeck);

export default function App() {
  const [gameData, dispatch] = useReducer(reducer, startingData);

  //---enemy and enemy attack functions
  // randomness is not pure, time, are all impurity
  const decideEnemy = () => {
    const rndm = Math.floor(Math.random * enemies.length);
    console.log("deciding enemy:", rndm, enemies[rndm], enemies);
    const ourEnemy = enemies[rndm];
    return ourEnemy;
  };
  const decideEnemyATK = () => {
    const randomizeATK = Math.floor(
      Math.random() * gameData.battle.enemy.attacks.length
    );
    const nextATK = gameData.battle.enemy.attacks[randomizeATK];
    return nextATK;
  };
  //--
  const loadNextLevel = () => {
    console.log(`loadNextLevel`);
    // console.log(` map[gameData.curScene.lvl + 1]: ${map[gameData.curScene.lvl + 1]} , gameData.curScene.lvl + 1:  ${gameData.curScene.lvl + 1}  ]`)
    const nextLevel = {
      scene: map[gameData.curScene.lvl + 1],
      lvl: gameData.curScene.lvl + 1,
    };
    dispatch({ type: ACTIONS.SET_SCENE, payload: nextLevel });

    //I think I can do two dispatches
    const curLevelNum = gameData.curScene.lvl;
    const levelToSet = map[curLevelNum];
    if (levelToSet === "battle") {
      const decidedEnemy = decideEnemy();
      const startingAtk = decideEnemyATK();
      dispatch({
        type: ACTIONS.BEGIN_BATTLE,
        // payload: "start",
        // enemy: decidedEnemy,
        // startingAtk: startingAtk,
        payload: {
          enemy:decidedEnemy,
          startingAtk: startingAtk
        }
      });
    }
  };
  console.log(`x`);

  return (
    <div className="App">
      <h3>dashboard stuff</h3>
      <h3>
        {`Hero: 💞${gameData.hero.health}HP 🧪${gameData.hero.energy}Energy 💰${gameData.gold} ---ACT1: level
        ${gameData.curScene.lvl}---`}
      </h3>
      <Screen gameData={gameData} dispatch={dispatch} map={map} />
      <button onClick={loadNextLevel}>Next Level</button>
    </div>
  );
}